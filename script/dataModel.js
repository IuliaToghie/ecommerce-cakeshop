import {initialProducts, updateDoc, cartDataRef} from './firebase';

const dataModel = (function() {
    const getLocalCartData = () => JSON.parse(sessionStorage.getItem('cartData'));
    const setLocalCartData = (data) => sessionStorage.setItem('cartData', JSON.stringify(data));

    const addProductToCart = (id, count = undefined) => {
        initialProducts
            .then((response) => {
                const {products} = response.data();

                const selectedProduct = products.filter((item) => item.id === parseFloat(id))[0];
                let existingCartData = getLocalCartData();
                existingCartData ? existingCartData : [];

                let newId = existingCartData[existingCartData.length - 1] ? existingCartData[existingCartData.length - 1].id : 0;
                newId += 1;

                existingCartData.push({
                    ...selectedProduct,
                    id: newId,
                    count: count ? count : 1
                });

                setLocalCartData(existingCartData);

                updateDoc(cartDataRef, {
                    products: existingCartData
                });
            });
    };

    const removeProductFromCart = (id) => {
        const localCartData = getLocalCartData();

        const arr = localCartData.filter((item) => item.id !== parseFloat(id));

        setLocalCartData(arr);

        updateDoc(cartDataRef, {
            products: arr
        });
    }

    return {
        addProductToCart,
        removeProductFromCart,
        setLocalCartData
    };
})();

export default dataModel;