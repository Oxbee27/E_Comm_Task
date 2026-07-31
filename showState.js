let shadowProducts = [];

// Load saved products from browser storage
function loadShadowProducts() {
    const saved = localStorage.getItem("products");

    if (saved) {
        shadowProducts = JSON.parse(saved);
    }
}

function saveShadowProducts() {
    localStorage.setItem(
        "products",
        JSON.stringify(shadowProducts)
    );
}

function setShadowProducts(products) {
    shadowProducts = [...products];
    saveShadowProducts();
}

function getShadowProducts() {
    return shadowProducts;
}

function addToShadow(product) {
    shadowProducts.push(product);
    saveShadowProducts();
}

function updateShadow(id, updatedData) {
    const index = shadowProducts.findIndex(
        product => product.id === id
    );

    if (index !== -1) {
        shadowProducts[index] = {
            ...shadowProducts[index],
            ...updatedData
        };

        saveShadowProducts();
    }
}

function removeFromShadow(id) {
    shadowProducts = shadowProducts.filter(
        product => product.id !== id
    );

    saveShadowProducts();
}

function restoreShadow(products) {
    shadowProducts = [...products];
    saveShadowProducts();
}

loadShadowProducts();