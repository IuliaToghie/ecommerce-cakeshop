import {cartDataRef, onSnapshot} from './firebase';

const ui = (function () {
    // Get the DOM Elements
    const productsContainer = document.querySelector('.navigation-bottom');

    const getImageSource = (imageName) => require(`../images/${imageName}`).default;

    function toggleMobileMenu(event) {
        const {currentTarget} = event;
        const menu = currentTarget.nextElementSibling;
        const displayValue = window.getComputedStyle(menu).getPropertyValue('display');

        // Check the element style and toggle according to it
        if (displayValue === 'none') {
            menu.style.display = 'flex';
        } else {
            menu.style.display = 'none';
        }
    }

    function addTopSpacing() {
        // Get the header element
        const headerEl = document.querySelector('.navigation-header');

        // Always check if the DOM element exists
        if(headerEl) {
            // Change the style for the body element
            // Get the headerHeight and set it
            const height = headerEl.getBoundingClientRect().height;
            // String interpolation
            document.body.style.paddingTop = `${height}px`;
        }
    }

    // Reset the element style
    function resetMenu() {
        if (window.innerWidth >= 600) {
            productsContainer.style.display = 'flex';
        } else if (window.innerWidth < 600) {
            productsContainer.style.display = 'none';
        }
    }

    function changeImage(event) {
        const {target} = event;
        const expandImage = document.getElementById("expanded-image");

        if(target.tagName === 'IMG') {
            expandImage.src = target.src;
        }
    }

    function renderCartCount(length) {
        const count = document.getElementById('cart-products-count');

        if(count) {
            count.textContent = length;
        }
    }

    function calculateCartTotal(data) {
        const tax = 10;
        const subTotal = data.map((item) => item.price * item.count).reduce((total, currentNumber) => total + currentNumber, 0);
        const total = subTotal + tax;

        const totalContainer = document.querySelector('.subtotal-section');

        let html = `
            <tr>
                <td>Subtotal:</td>
                <td>$${subTotal}</td>
            </tr>

            <tr>
                <td>Shipping tax:</td>
                <td>$${tax}</td>
            </tr>

            <tr>
                <td class="text-uppercase fw-bold">total</td>
                <td>$${subTotal > 0 ? total : 0}</td>
            </tr>
        `;

        if(totalContainer) {
            totalContainer.innerHTML = html;
        }
    }

    function populateAllProducts(data, container) {
        let html = '';

        data.forEach((item) => {
            html += `
                <div class="product">
                    <a href="/productDetails.html?id=${item.id}">
                        <img class="product-picture img-fluid" src="${getImageSource(item.picture)}" alt="${item.productName}" />
                    </a>

                    <p class="product-title">${item.productName}</p>

                    <img class="img-fluid" src="${getImageSource('full-rank.svg')}" alt="Rank" width="80"/>

                    <p class="product-price">$${item.price}</p>

                    <button class="btn add-cart-btn" data-product-id="${item.id}">
                        <img class="img-fluid cart-icon" src="${getImageSource('cart.svg')}" alt="Cart" />
                        Add to cart
                    </button>
                </div>
            `;
        });

        if(container) {
            container.innerHTML = html;
        }
    }

    function populateProductPage(item) {
        const productContainer = document.getElementById('product-details');

        let html = `
            <img class="img-fluid product-picture" src="${getImageSource(item.picture)}" alt="${item.picture}" />

            <div class="product-features">
                <div class="product-title-review">
                    <p class="product-title">${item.productName}</p>

                    <img src="${getImageSource('full-rank.svg')}" alt="rank" />
                </div>

                <p class="product-price">$${item.price}</p>

                <p>Product details</p>

                <p class="details-section">${item.details}</p>

                <div class="quantity-section">
                    <p>Quantity:</p>

                    <input type="number" min="1" value="1" id="count-input">
                </div>

                <button class="btn add-cart-btn" data-product-id="${item.id}">
                    <img class="img-fluid cart-icon" src="${getImageSource('cart.svg')}" alt="Cart" />
                    Add to cart
                </button>
            </div>
        `;

        if(productContainer) {
            productContainer.innerHTML = html;
        }
    }

    function populateCart(data) {
        const container = document.getElementById('products-container-cart');

        let html = "";

        data.forEach((item) => {
            html += `
                <tr>
                    <td class="product-features">
                        <a href="/productDetails.html?id=${item.id}">
                            <img class="product-picture img-fluid" src="${getImageSource(item.picture)}" alt="${item.productName}" />
                        </a>

                        <div class="product-info">
                            <p class="title">${item.productName}</p>

                            <p>$${item.price}</p>

                            <span class="remove-cart-btn text-uppercase" data-product-id="${item.id}">remove</span>
                        </div>
                    </td>

                    <td class="quantity-section">
                        ${item.count}
                    </td>

                    <td class="price">$${item.price * item.count}</td>
                </tr>
            `;
        })

        if(container) {
            container.innerHTML = html;
        }
    }

    const updateUI = () => {
        onSnapshot(cartDataRef, (responseSubscription) => {
            const data = responseSubscription.data().products;

            ui.populateCart(data);
            ui.renderCartCount(data.length);
            ui.calculateCartTotal(data);
          });
    }

    return {
        populateAllProducts,
        addTopSpacing,
        resetMenu,
        toggleMobileMenu,
        changeImage,
        populateProductPage,
        populateCart,
        renderCartCount,
        calculateCartTotal,
        updateUI
    };
})();

export default ui;