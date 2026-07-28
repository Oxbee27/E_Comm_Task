const productCards = document.getElementById("pr_details");
let currentCard = []

async function displayProducts(product){

currentCard = product

productCards.innerHTML = "",

pr_detail.forEach(product => {

productCards.innerHTML = `

<div class="card">

<img src="${product.thubmnail}" alt="${product.title}"

<h2>${product.title}</h2>

<p class="price">${product.price}</p>
<p> ${product.rating}</p>

<button onclick = "viewproduct(${product.id}">
view details </button>






</div>

`
  
});


}


async function loadProduct(page = 1){

 currentPage = page

let skip = (page - 1) * productPerPage

let data = await getProducts ( productPerPage, skip)

displayProducts(data.product)
createpages(data.total)

}

function viewproduct(id){
window.location.href = `product,html?id=${id}`

}
