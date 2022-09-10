
// firebase SDK 


  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBApuv94MjF-mM6ijJOhgiUJF_3UR1jWIQ",
    authDomain: "soreal-cosmetics.firebaseapp.com",
    projectId: "soreal-cosmetics",
    storageBucket: "soreal-cosmetics.appspot.com",
    messagingSenderId: "1042927136120",
    appId: "1:1042927136120:web:9b75e935b77972e9906c8d"
  };

  // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const db = firebase.firestore()
    db.settings({ timestampsInSnapshots: true });
    

























    /*
 grabbing the collections data from firebase
  and looping inside of its snapshots
 */

db.collection("orders").orderBy('createdAt').get().then((snapshot) => {
    const numberOfOrders = document.querySelector('.numberOfOrders')
    numberOfOrders.innerHTML = snapshot.docs.length
    snapshot.docs.forEach((doc) => {
        /* renerdoc is taking each doc as its variable
         to use outside of this async fetch block                     
        */
         renderDoc(doc)
    });
});


const usersOrderdUl = document.querySelector('.usersOrderd')

function renderDoc(doc){
        let liTag = document.createElement('li')
        liTag.classList.add('eachShoppeer')
        liTag.setAttribute("data-id",doc.id)



        liTag.innerHTML = `

        <input type="checkbox" name="" id="Completed">

        <div class="basicinfo">
            <p class="name"><span class="tag">Name </span>: ${doc.data().name}</p>
            <p class="email"><span class="tag">Email </span>: ${doc.data().email}</p>
            <p class="number"><span class="tag">Number </span>: ${doc.data().number}</p>
            <p class="number"><span class="tag">Date </span>: ${doc.data().date}</p>
        </div>
        <div class="addressinfo">
            <p class="country"><span class="tag">Country </span>: ${doc.data().country}</p>
            <p class="state"><span class="tag">State </span>: ${doc.data().state}</p>
            <p class="city"><span class="tag">City </span>: ${doc.data().city}</p>
            <p class="street"><span class="tag">Street </span>: ${doc.data().street}</p>
        </div>
        
        <div class="productsNeeded">
            <div class="USERORDERED"><h4>USER ORDER</h4></div>
            
            <ol class="productsParent">

                ${JSON.parse(doc.data().cart).map((each)=>{
                    return (`<li class="eachProd">
                     <p class="ProdName">
                           Product Name : ${each.name}
                      </p>
                     <p class="ProdQuantity">
                           Products Price : ${each.numberofunits}
                     </p>
                        <p class="ProdPrice">
                           Price :  $${each.price}
                        </p>
                            </li>`);
                })}
                
            </ol>
        </div>
        <div class="total"><h3>Total : $
        ${doc.data().total}</h3></div>        
        `
    usersOrderdUl.appendChild(liTag)
    const done = document.querySelector("#Completed")
    done.setAttribute("data-id",doc.id)
}