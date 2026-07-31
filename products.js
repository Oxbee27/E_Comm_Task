console.log(window.location.pathname);

const productCards = document.getElementById("product");

let currentProducts = [];
const pageNum = 10;
let currentPage = 1;

// Load products
async function loadProducts(page = 1) {
    currentPage = page;

    const skip = (page - 1) * pageNum;

    try {
        const data = await getProducts(pageNum, skip);

        currentProducts = data.products;

        displayProducts(currentProducts);

        createPages(data.total);

    } catch (error) {
        console.error("Product Error:", error);
    }
}

// Display product cards
function displayProducts(products) {

    productCards.innerHTML = "";

    products.forEach(product => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>

            <button class="cart-btn" onclick="addToCart(${product.id})">
                🛒 Add to Cart
            </button>

            <button class="view-btn" onclick="viewProduct(${product.id})">
                View Product
            </button>
        `;

        productCards.appendChild(card);
    });
}

// ----------------------
// CART
// ----------------------

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id) {

    const product = currentProducts.find(
        p => p.id === id
    );

    if (!product) {
        alert("Product not found");
        return;
    }

    const existing = cart.find(
        item => item.id === id
    );

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    alert(`${product.title} added to cart!`);
}

// View single product
function viewProduct(id) {
    window.location.href = `product.html?id=${id}`;
}

// Load first page
loadProducts();