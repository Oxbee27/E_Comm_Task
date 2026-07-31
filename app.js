const demo_url = "https://dummyjson.com/products";

// Get all products
async function getProducts(limit = 10, skip = 0) {
    const response = await fetch(
        `${demo_url}?limit=${limit}&skip=${skip}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    return await response.json();
}

// Get one product
async function getProduct(id) {

    const response = await fetch(
        `https://dummyjson.com/products/${id}`
    );

    if (!response.ok) {
        throw new Error("Failed to load product");
    }

    return await response.json();
}

// Get all categories
async function getCategories() {
    const response = await fetch(`${demo_url}/categories`);

    if (!response.ok) {
        throw new Error("Failed to load categories");
    }

    return await response.json();
}

// Search products
async function getSearch(query) {
    const response = await fetch(`${demo_url}/search?q=${query}`);

    if (!response.ok) {
        throw new Error("Failed to load search results");
    }

    return await response.json();
}

// Get products by category
async function getProductsByCategory(category) {
    let url;

    if (category === "all" || category === "allproducts") {
        url = demo_url;
    } else {
        url = `${demo_url}/category/${category}`;
    }

    console.log("Fetching:", url);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to load products (${response.status})`);
    }

    return await response.json();
}

// Create product
async function createProduct(productData) {
    const response = await fetch(`${demo_url}/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
    });

    if (!response.ok) {
        throw new Error("Failed to create product");
    }

    return await response.json();
}

// Update product (PUT)
async function updateProduct(id, productData) {
    const response = await fetch(`${demo_url}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
    });

    if (!response.ok) {
        throw new Error("Failed to update product");
    }

    return await response.json();
}

// Partial update (PATCH)
async function patchProduct(id, productData) {
    const response = await fetch(`${demo_url}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productData)
    });

    if (!response.ok) {
        throw new Error("Failed to patch product");
    }

    return await response.json();
}

// Delete product
async function deleteProduct(id) {
    const response = await fetch(`${demo_url}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Failed to delete product");
    }

    return await response.json();
}