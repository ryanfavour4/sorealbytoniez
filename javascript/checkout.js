// they are not really numbers but still strings
const TotalCartCostLS = localStorage.getItem("Soreal-Total-Price")
const expensePrice = document.querySelector('.expensePrice')
const shippingPrice = document.querySelector('.shippingPrice')
const totalCostPrice = document.querySelector('.totalCostPrice')


// success modal 
const successModal = document.querySelector('.successModal')
const okAndClear = document.querySelector('.okAndClear')


// convert to numbers
const TotalCartCost = JSON.parse(TotalCartCostLS)
const expensePriceJS = JSON.parse(expensePrice.textContent)
const shippingPriceJS = JSON.parse(shippingPrice.textContent)
const totalCostPriceJS = JSON.parse(totalCostPrice.textContent)

expensePrice.innerHTML = TotalCartCost
shippingPrice.innerHTML = TotalCartCost * 2 / 50
totalCostPrice.innerHTML = TotalCartCost + TotalCartCost * 2 / 50


// for fire base purposes
const finalPrice = totalCostPrice.innerHTML
localStorage.setItem('cartTotalPrice', finalPrice)
const allPrice = localStorage.getItem('cartTotalPrice', finalPrice)





// go back buttons
function goBack(){
    window.confirm('Are you sure you want to exit this page') ? window.history.back() : null
}



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
    



    // users cart from ls as string
    let Userscart = localStorage.getItem('Soreal-Cart')


    // date 
    let current = new Date().toDateString()


    // submitButton and inputs
    const submit = document.querySelector('.confirm')
    const UserName = document.querySelector('.UserName')
    const UserNumber = document.querySelector('.UserNumber')
    const UserEmail = document.querySelector('.UserEmail')
    const UserCountry = document.querySelector('.UserCountry')
    const UserState = document.querySelector('.UserState')
    const UserCity = document.querySelector('.UserCity')
    const UserStreet = document.querySelector('.UserStreet')


    submit.addEventListener('click',(e)=>{
        e.preventDefault()

        db.collection("orders").add({
            name : UserName.value ,
            number : UserNumber.value ,
            email : UserEmail.value ,
            country : UserCountry.value ,
            state : UserState.value ,
            city : UserCity.value ,
            street : UserStreet.value ,
            cart : Userscart,
            total:allPrice,
            createdAt : current,
            date : current
        });



        UserName.value = '' 
        UserNumber.value = '' 
        UserEmail.value = '' 
        UserCountry.value = '' 
        UserState.value = '' 
        UserCity.value = '' 
        UserStreet.value = ''
        successModal.classList.add('appear')
  
    })

okAndClear.addEventListener('click',()=>{
      successModal.classList.remove('appear')
      localStorage.setItem('Soreal-Cart', [])
})