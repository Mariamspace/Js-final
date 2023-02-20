function copyMenu() {
    var dptCategory = document.querySelector('.dpt-cat');
    var dptPlace = document.querySelector('.departments');
    dptPlace.innerHTML = dptCategory.innerHTML;

    var mainNav = document.querySelector('.header-nav nav');
    var navPlace = document.querySelector('.off-canvas nav');
    navPlace.innerHTML = mainNav.innerHTML;

    var topNav = document.querySelector('.header-top .wrapper');
    var topPlace = document.querySelector('.off-canvas .thetop-nav');
    topPlace.innerHTML = topNav.innerHTML;
}
copyMenu();

//menu on mobile
const menuButton = document.querySelector('.trigger'),
      closeButton = document.querySelector('.t-close'),
      addclass = document.querySelector('.site');
menuButton.addEventListener('click', function() {
    addclass.classList.toggle('showmenu')
})
closeButton.addEventListener('click', function() {
    addclass.classList.remove('showmenu')
})
//submenu on mobile
const submenu = document.querySelectorAll('.has-child .icon-small');
submenu.forEach((menu) => menu.addEventListener('click', toggle));

function toggle(e) {
    e.preventDefault();
    submenu.forEach((item) => item != this ? item.closest('.has-child').classList.remove('expand') : null);
    if (this.closest('.has-child').classList != 'expand');
    this.closest('.has-child').classList.toggle('expand')
}

//Fetching Products
document.addEventListener('DOMContentLoaded', function() {
    let products = document.querySelector('.productssec');
    let url = `https://api.escuelajs.co/api/v1/products?offset=0&limit=10`;
    let opset = 0;
    async function fetchProducts(url) {
        try {
            let data = await fetch(url);
            opset = opset + 5;
            if (data.ok) {
                let response = await data.json();

                for (let i = 0; i < response.length; i++) {
                    let description = response[i].description;
                    let title = response[i].title;
                    products.innerHTML += `
       <div class="product">
           <img src="${response[i].images[1]}" alt="${
            response[i].category.name
          }" class="product-img">
           <div class="product-content">
           <h2 class="product-title">${
             title.length > 18 ? title.substring(0, 18).concat(' ...') : title
           }</h2>
           <h4 class="product-category">${response[i].category.name}</h4>
           <p class="product-description">${
             description.length > 80
               ? description.substring(0, 80).concat(' ...more')
               : description
           }</p>
           <div class="product-price-container">
               <h3 class="product-price">$${response[i].price}</h3>
               <a href="#!" data-productId="${
                 response[i].id
               }" class="add-to-cart"><ion-icon name="cart-outline"></ion-icon></a>
           </div>
           </div>
          
       </div>
       `;
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
    fetchProducts(url);

    window.addEventListener('scroll', function() {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 3 / 4) {
            setTimeout(() => {
                fetchProducts(
                    `https://api.escuelajs.co/api/v1/products?offset=${opset}&limit=5`
                );
            }, 1000);
        }
    });
});
