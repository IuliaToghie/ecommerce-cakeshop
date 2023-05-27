import ui from './ui';
import dataModel from './dataModel';
import {cartData} from './firebase';

const events = (function() {
    function initStaticEvents() {
        const showMenu = document.querySelector('.toggle-container');
        const smallImagesSection = document.querySelector('.small-images-section');

        if(showMenu) {
            // Assign the event function
            showMenu.addEventListener('click', ui.toggleMobileMenu);
        }

        if(smallImagesSection) {
            smallImagesSection.addEventListener('click', ui.changeImage);
        }

        window.addEventListener('resize', ui.resetMenu);

        document.addEventListener('click', (event) => {
            const {target} = event;

            if(target.classList.contains('add-cart-btn')) {
                const {productId} = target.dataset;

                const countInput = document.getElementById('count-input');

                dataModel.addProductToCart(productId, countInput && countInput.value);
            }

            if(target.classList.contains('remove-cart-btn')) {
                const {productId} = target.dataset;

                dataModel.removeProductFromCart(parseFloat(productId));
            }
        });
    
        // When the page finished loading, top spacing it will be added
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                ui.addTopSpacing();
            }, 500)
        });
    }

    function initDynamicallyEvents() {}

    return {
        initStaticEvents,
        initDynamicallyEvents
    }
})();

export default events;