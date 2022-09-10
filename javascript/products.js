

// open and close cart

const backArrow = document.querySelector('.backArrow')
const cart = document.querySelector('.cart')
const cartSlideBody = document.querySelector('.cartSlideBody')

backArrow.addEventListener('click', (e) => {
    cartSlideBody.classList.remove('slideOut')
})
cart.addEventListener('click', (e) => {
    cartSlideBody.classList.add('slideOut')
})

// 





// render products to screen 

const productsParent = document.querySelector('.productsParent')
const filterBtns = document.querySelectorAll('.genre')


let http = new XMLHttpRequest()
http.open('get', '../javascript/products.json', true)
http.send()
http.onload = function () {


    if (this.readyState == 4 && this.status == 200) {


        prodJson = JSON.parse(this.responseText)


        prod = prodJson




        prodItem = prod.forEach((item) => {

            productsParent.innerHTML += `
            <div class="productBox" id="${item.genre}">
               <div class="prodImg">
                   <img src="${item.images}" alt="${item.name}">
               </div>
               <div class="prodDesc">
                   <h4 class="name">${item.name}</h4>
                   <h4 class="price">Price : $${item.price}</h4>
                   <div class="infoShop">
                       <img src="../images/info.svg" onclick="infoBtn('${item.name}')" class="info" alt="">
                       <button id="addToCart" onclick="addToCart(${item.id})">
                          <img src="../images/plus.svg" alt="">
                       </button>
                   </div>
               </div>
           </div>
           `
        })


    }






    // search functionality

    const prodName = document.querySelectorAll('.name')

    const searchBar = document.querySelector('#inputSearcher')

    searchBar.addEventListener('keyup', () => {
        let searchBarValue = searchBar.value.toLowerCase()

        prodName.forEach((eachProdName) => {
            let prodLowerName = eachProdName.textContent.toLowerCase();

            if (prodLowerName.includes(searchBarValue)) {
                eachProdName.parentElement.parentElement.classList.add('appear')
                eachProdName.parentElement.parentElement.classList.remove('disappear')
            }
            else {
                eachProdName.parentElement.parentElement.classList.add('disappear')
                eachProdName.parentElement.parentElement.classList.remove('appear')
            }
        })
    })




    // add a check mark when users buy 

    const cartBtns = document.querySelectorAll('#addToCart')
    cartBtns.forEach((cartBtn) => {
        cartBtn.addEventListener("click", () => {

            cartBtn.children[0].attributes.src.nodeValue = '../images/checkmark.svg'
        })
    })





    // filter btn functionality 

    filterBtns.forEach(filterBtn => {
        filterBtn.addEventListener('click', function (e) {
            const genres = e.target.id
            const prodBlackBox = document.querySelectorAll('.productBox')

            const genresCategory = prodJson.filter((filteredItems) => {
                if (filteredItems.genre === genres) {
                    filterBtn.classList.add('grey')

                    return filteredItems.genre
                }
            })

            const genreId = genresCategory.forEach((gen) => {
                var all = document.querySelector("#all")
                EachBox = prodBlackBox.forEach((EachBox) => {

                    all.addEventListener('click', () => {
                        EachBox.style.display = ""
                        filterBtn.classList.remove('grey')
                    })

                    if (gen.genre !== EachBox.id) {
                        filterBtn.classList.add('grey')
                        EachBox.style.display = "none"
                    }
                    else {

                        EachBox.style.display = ""

                    }

                })

            });

        })
    });



}








// show description modal

const detailBox = document.querySelector('.boxModal')
const whiteBoard = document.querySelector('.textDesc')

function infoBtn(e) {
    detailBox.classList.remove('disappear')
    detailBox.classList.add('appear')
    whiteBoard.innerHTML = e
}



const okbtn = document.querySelector('.okbtn')

okbtn.addEventListener('click', () => {
    detailBox.classList.remove('appear')
    detailBox.classList.add('disappear')
})













// users cart

let Userscart = JSON.parse(localStorage.getItem('Soreal-Cart')) || []

updateCart()




function addToCart(id) {


    if (Userscart.some((prodIncart) => prodIncart.id === id)) {

        const cartBtns = document.querySelectorAll('#addToCart')

        cartBtns.forEach((cartBtn) => {

            cartBtn.addEventListener("click", () => {

                cartBtn.children[0].attributes.src.nodeValue = '../images/checkmark.svg'
            })
        })

        alert("product already in cart")

    }

    else {
        const products = prod.find((product) => product.id === id)
        Userscart.push({
            ...products,
            numberofunits: 1
        })
    }





    if (Userscart.length > 0) {
        cart.classList.add('incart')
    }

    // calling the update cart function from inside of this function 
    // so now its in sync with the loading json products and not ahead of it


    updateCart()


    localStorage.setItem('Soreal-Cart',JSON.stringify(Userscart))

}












// this function connects everything together
function updateCart() {
    rendercartitems()
    rendersubtotal()
    if (Userscart.length > 0) {
        cart.classList.add('incart')
    }
    localStorage.setItem('Soreal-Cart',JSON.stringify(Userscart))
}








// render users goods inside of the cart slide



function rendercartitems() {

    const UsersCartContents = document.querySelector('.UsersContents')



    UsersCartContents.innerHTML = ''
    
    Userscart.forEach((eachProd) => {
        UsersCartContents.innerHTML += `
            <div class="itemBox">
            <div class="imgItem">
                <img src="${eachProd.images}" alt="${eachProd.name}">
                <div class="priceAndName">
                    <h3 class="itemName">${eachProd.name}</h3>
                    <h3 class="itemPrice">$${eachProd.price}</h3>
                </div>
            </div>
            
            <div class="itemButtons">
                <div class="incrementBtns">
                    <div class="btn minus"  onclick="changeNumberOfUnits('minus',${eachProd.id})" >-</div>
                     <div class="number">${eachProd.numberofunits}</div>
                 <div class="btn plus" onclick="changeNumberOfUnits('plus',${eachProd.id})">+</div>
                </div>

                <button onclick="removeItemFromCart(${eachProd.id})">Delete</button>
            </div>
        </div>
            `
    })

    localStorage.setItem('Soreal-Cart',JSON.stringify(Userscart))

}











// total item in cart and total price

function rendersubtotal() {

    const priceTag = document.querySelector(".totalPrice")
 
    let totalPrice = 0
    Userscart.forEach((item) => {
        totalPrice += item.price * item.numberofunits
        priceTag.innerHTML = ` Total Price : $ ${totalPrice} `
    })

    localStorage.setItem('Soreal-Cart',JSON.stringify(Userscart)) 
    localStorage.setItem('Soreal-Total-Price', totalPrice)
}










// delete an item with double click

function removeItemFromCart(id) {


    Userscart = Userscart.filter((item) => item.id !== id)

    const priceTag = document.querySelector(".totalPrice")

    if (Userscart.length == 0) {
        let totalPrice = 0
        priceTag.innerHTML = ` Total Price : $ ${totalPrice} `

        cart.classList.remove('incart')
    } else {
        rendersubtotal()
    }

    updateCart()

    localStorage.setItem('Soreal-Cart',JSON.stringify(Userscart))

}













// change number of units

function changeNumberOfUnits(action, id) {

    Userscart = Userscart.map((item) => {

        let numberofunits = item.numberofunits

            if (item.id === id) {
                if (action === 'minus' && numberofunits > 1) {
                    numberofunits--
                }
                else if (action === 'plus') {
                    numberofunits++
                }
            }

        return {
            ...item,
            numberofunits: numberofunits
        }
    })

    updateCart()

    
    localStorage.setItem('Soreal-Cart',JSON.stringify(Userscart))

}











// go to check out section 

let toCheckOut = document.querySelector('#checkoutpage')


const checkoutBtn = document.querySelector('.checkout').addEventListener('click', ()=>{
    if(Userscart.length < 1){
        alert('Nothing in your cart ')
        return false
    }else{
        toCheckOut.pathname = './HTML/checkout.html'
    }
})
