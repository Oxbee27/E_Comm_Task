let shadowProducts = [];


// Save products locally

function setShadowProducts(products){

    shadowProducts = [...products];

}



// Get current local products

function getShadowProducts(){

    return shadowProducts;

}



// Add product locally

function addToShadow(product){

    shadowProducts.unshift(product);

}



// Update product locally

function updateShadow(id, updatedData){

    const index =
    shadowProducts.findIndex(
        product => product.id === id
    );


    if(index !== -1){

        shadowProducts[index] = {

            ...shadowProducts[index],

            ...updatedData

        };

    }

}



// Remove product locally

function removeFromShadow(id){

    shadowProducts =
    shadowProducts.filter(
        product => product.id !== id
    );

}



// Restore state after failure

function restoreShadow(products){

    shadowProducts = [...products];

}