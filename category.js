const categorySelect = document.getElementById("allproducts");


async function loadCategories() {

    try {

        const categories = await getCategories();

        categories.forEach(category => {

            const option = document.createElement("option");

            option.value = category.slug || category;
            option.textContent = category.name || category;

            categorySelect.appendChild(option);

        });

    } catch(error) {

        console.error(error);

    }

}