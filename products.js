console.log(window.location.pathname);

const productCards = document.getElementById("product");

console.log(productCards);

let currentCard = [];
const pageNum = 10;
let currentPage = 1;
function displayProducts(products) {
  currentCard = products;

  productCards.innerHTML = "";

  currentCard.forEach((product) => {
    productCards.innerHTML += `
            <div class="card">

                <img src="${product.thumbnail}" alt="${product.title}">

                <h2>${product.title}</h2>

                <p class="price">$${product.price}</p>

                <p>${product.rating}</p>

                <button onclick="viewProduct(${product.id})">
                    View Details
                </button>

            </div>
        `;
  });
}

async function loadProducts(page = 1) {
  currentPage = page;

  let skip = (page - 1) * pageNum;

  try {
    let data = await getProducts(pageNum, skip);

    console.log(data);
    console.log(data.products);

    displayProducts(data.products);

    createPages(data.total);
  } catch (error) {
    console.error("Product Error:", error);
  }
}

function viewProduct(id) {
  window.location.href = `product.html?id=${id}`;
}
loadProducts();
