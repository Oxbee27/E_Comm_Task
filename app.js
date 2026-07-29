
const demo_url = "https://dummyjson.com/products";

async function getProducts(limit = 10, skip = 0) {
    const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    return await response.json();
}

async function getProduct(id) {

    const response = await fetch(
        `${demo_url}/${id}`
    );

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

async function getSearch(query) {

    const response = await fetch(`${demo_url}/search?q=${query}`
    );

    if (!response.ok) {
        throw new Error("Failed to load search results");
    }

    return await response.json();
}

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
// button.addEventListener("click", ...);