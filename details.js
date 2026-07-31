const detailsContainer = document.getElementById("pr_details");

async function loadProductDetails() {

    const params = new URLSearchParams(window.location.search);

    const id = params.get("id");

    if (!id) {
        detailsContainer.innerHTML = `
            <h2>No product selected</h2>
        `;
        return;
    }

    try {

        const product = await getProduct(id);

        detailsContainer.innerHTML = `
            <div class="details-card">

                <img src="${product.thumbnail}" 
                     alt="${product.title}">

                <h2>${product.title}</h2>

                <p>${product.description}</p>

                <h3>$${product.price}</h3>

                <p>
                    Stock: ${product.stock}
                </p>

                <button onclick="addToCart(${product.id})">
                    🛒 Add to Cart
                </button>

            </div>
        `;

    } catch(error) {

        console.error(error);

        detailsContainer.innerHTML = `
            <p>Failed to load product details</p>
        `;
    }
}

loadProductDetails();