const tableBody = document.querySelector("#adminTable tbody");
const activityLog = document.getElementById("activityLog");
const loadButton = document.getElementById("loadProducts");
const addForm = document.getElementById("addProductForm");

console.log("Table Body:", tableBody);
console.log("Load Button:", loadButton);

loadButton.addEventListener("click", loadAdminProducts);

async function loadAdminProducts() {
    try {
        console.log("Loading products...");

        const savedProducts = getShadowProducts();

        // Only fetch from API the first time
        if (savedProducts.length === 0) {

            const data = await getProducts(30, 0);

            if (!data || !Array.isArray(data.products)) {
                throw new Error("No products returned from API.");
            }

            setShadowProducts(data.products);
        }

        displayTable();

        addLog("Loaded products");

    } catch (error) {
        console.error(error);
        addLog("Failed to load products");
    }
}
function displayTable() {
    tableBody.innerHTML = "";

    const products = getShadowProducts();

    console.log("Products:", products);

    products.forEach(product => {
        const row = `
            <tr>
                <td>${product.id}</td>
                <td>${product.title}</td>
                <td>$${product.price}</td>
                <td>${product.stock ?? 0}</td>
                <td>
                    <button onclick="editProduct(${product.id})">
                        EDIT
                    </button>

                    <button onclick="quickEdit(${product.id})">
                        PATCH
                    </button>

                    <button onclick="removeProduct(${product.id})">
                        DELETE
                    </button>
                </td>
            </tr>
        `;

        tableBody.innerHTML += row;
    });
}

async function editProduct(id) {
    const products = getShadowProducts();

    const product = products.find(p => p.id === id);

    if (!product) return;

    const backup = [...products];

    const newTitle = prompt("Enter new title:", product.title);
    if (newTitle === null) return;

    const newPrice = Number(prompt("Enter new price:", product.price));
    if (isNaN(newPrice)) {
        alert("Invalid price");
        return;
    }

    const newStock = Number(prompt("Enter new stock:", product.stock));
    if (isNaN(newStock)) {
        alert("Invalid stock");
        return;
    }

    // Update the local copy immediately
    updateShadow(id, {
        title: newTitle,
        price: newPrice,
        stock: newStock
    });

    displayTable();

    addLog(`Edited product ${id}`);

    try {
        await updateProduct(id, {
            title: newTitle,
            price: newPrice,
            stock: newStock
        });
    } catch (error) {
        restoreShadow(backup);
        displayTable();
        addLog(`Update failed - rollback ${id}`);
    }
}
// Delete product
async function removeProduct(id) {

    const confirmDelete = confirm("Delete this product?");

    if (!confirmDelete) return;

    const backup = [...getShadowProducts()];

    removeFromShadow(id);

    displayTable();

    addLog(`Deleted product ${id}`);

    try {
        await deleteProduct(id);

    } catch (error) {

        restoreShadow(backup);

        displayTable();

        addLog(`Delete failed - rollback ${id}`);
    }
}
// Add product
addForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const title = document.getElementById("productTitle").value;
    const price = Number(document.getElementById("productPrice").value);
    const stock = Number(document.getElementById("productStock").value);

    const newProduct = {
        title,
        price,
        stock
    };

    try {
        const createdProduct = await createProduct(newProduct);

        // Add to local shadow data
        addToShadow(createdProduct);

        // Refresh table
        displayTable();

        addLog(`Added product ${createdProduct.id}`);

        addForm.reset();

    } catch (error) {
        console.error(error);
        addLog("Failed to add product");
    }
});

function addLog(message) {
    if (!activityLog) return;

    const li = document.createElement("li");
    li.textContent = message;
    activityLog.prepend(li);
}