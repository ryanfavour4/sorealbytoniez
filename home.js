

var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});








// slide hero

var counter = 1

setInterval(function(){
    document.getElementById('radio'+counter).checked = true
    counter++
    if(counter > 3){
        counter = 1
    }
},4000)



// remove overlay

const btnremove = document.getElementById('btnRemove')
const overlay = document.getElementById('overLay')
const header = document.querySelector('header')
const main = document.querySelector('main')
const footer = document.querySelector('footer')

btnremove.addEventListener('click',(e)=>{
    e.preventDefault()
    overlay.classList.add('gone')
    header.classList.add('appear')
    main.classList.add('appear')
    footer.classList.add('appear')

    setTimeout(()=>{
      overlay.remove()
    },1000)
})


// form submission

var form = document.getElementById("my-form");
    
async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Thanks for your submission!";
      form.reset()
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        } else {
          status.innerHTML = "Oops! There was a problem submitting your form"
        }
      })
    }
  }).catch(error => {
    status.innerHTML = "Oops! There was a problem submitting your form"
  });
}
form.addEventListener("submit", handleSubmit)










