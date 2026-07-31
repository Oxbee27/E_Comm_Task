const categorySelect = document.getElementById("allproducts");

async function loadCategories() {
    try {
        const categories = await getCategories();

        
        categorySelect.innerHTML = `<option value="all">All Products</option>`;

        categories.forEach(category => {
            const option = document.createElement("option");

            if (typeof category === "string") {
                option.value = category;
                option.textContent = category;
            } else {
                option.value = category.slug;
                option.textContent = category.name;
            }

            categorySelect.appendChild(option);
        });

    } catch (error) {
        console.error("Category Error:", error);
    }
}

categorySelect.addEventListener("change", async (e) => {

    const category = e.target.value;

    try {

        let data;

        if (category === "all") {
            data = await getProducts(100, 0);
        } else {
            data = await getProductsByCategory(category);
        }

        displayProducts(data.products);

    } catch (error) {
        console.error(error);
    }

});