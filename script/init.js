import ui from "./ui.js";
import events from "./events.js";
import {initialProducts, cartData} from './firebase';
import dataModel from "./dataModel.js";

// MVC Pattern - Model / View / Controller
(function() {
    const path = window.location.pathname;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const paramId = urlParams.get('id');

    const productsContainer = document.getElementById('products-container');
    const productsContainer2 = document.querySelector('.all-products-container');

    initialProducts
        .then((response) => {
            const {products} = response.data();
            
            const popularProducts = products.filter((item) => [1, 2, 3, 4, 5, 6].includes(item.id));
            const item = products.filter((item) => item.id === parseFloat(paramId))[0];
            const allProductsPage = path.includes('allProducts');

            ui.populateAllProducts(!allProductsPage ? popularProducts : products, !allProductsPage ? productsContainer : productsContainer2);

            if(path.includes('productDetails') && paramId) {
                ui.populateProductPage(item);
            }

            events.initDynamicallyEvents();
        });

    cartData
        .then((response) => {
            const {products} = response.data();

            dataModel.setLocalCartData(products ? products : []);
        });

    ui.updateUI();

    events.initStaticEvents();
})();