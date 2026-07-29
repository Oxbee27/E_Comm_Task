const demo_url = "https://dummyjson.com/products";


// Get all products with pagination
async function getProducts(limit = 10, skip = 0) {

    const response = await fetch(`${demo_url}?limit=${limit}&skip=${skip}`);

    if (!response.ok) {
        throw new Error("Failed to load products");
    }

    return await response.json();
}


// Get a single product by ID
async function getProduct(id) {

    const response = await fetch(`${demo_url}/${id}` );

    if (!response.ok) {
        throw new Error("Failed to load product");
    }

    return await response.json();
}


// Get all categories
async function getCategories() {

    const response = await fetch("https://dummyjson.com/products/categories");

    if (!response.ok) {
        throw new Error("Failed to load categories");
    }

    return await response.json();
}


// Search products
async function getSearch(query) {

    const response = await fetch(`${demo_url}/search?q=${query}`
    );

    if (!response.ok) {
        throw new Error("Failed to load search results");
    }

    return await response.json();
}


// Get products by category
async function getProductsByCategory(category) {

    const response = await fetch(`${demo_url}/category/${category}`);

    if (!response.ok) {
        throw new Error("Failed to load category products");
    }

    return await response.json();
}