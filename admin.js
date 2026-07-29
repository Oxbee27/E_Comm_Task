const tableBody = document.querySelector("#adminTable tbody");
const activityLog = document.getElementById("activityLog");
const loadButton = document.getElementById("loadProducts");
const addForm = document.getElementById("addProductForm");

// Check elements exist
console.log("Table Body:", tableBody);
console.log("Load Button:", loadButton);

// Attach event listener
loadButton.addEventListener("click", loadAdminProducts);

// Load products
async function loadAdminProducts() {
    try {
        console.log("Loading products...");

        const data = await getProducts(30, 0);

        console.log("API Response:", data);

        if (!data || !Array.isArray(data.products)) {
            throw new Error("No products returned from API.");
        }

        setShadowProducts(data.products);

        displayTable();

        addLog("Loaded products from API");
    } catch (error) {
        console.error(error);
        addLog("Failed to load products");
    }
}

// Display products in table
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

// Quick edit stock
async function quickEdit(id) {
    const products = getShadowProducts();

    const product = products.find(p => p.id === id);

    if (!product) return;

    const backup = [...products];

    const newStock = Number(prompt("New stock:", product.stock));

    updateShadow(id, {
        stock: newStock
    });

    displayTable();

    addLog(`Quick edited product ${id}`);

    try {
        await patchProduct(id, {
            stock: newStock
        });
    } catch (error) {
        restoreShadow(backup);
        displayTable();
        addLog(`PATCH failed - rollback ${id}`);
    }
}

// Delete product
async function removeProduct(id) {
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

// Activity log
function addLog(message) {
    if (!activityLog) return;

    const li = document.createElement("li");
    li.textContent = message;
    activityLog.prepend(li);
}