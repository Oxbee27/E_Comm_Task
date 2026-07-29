const pagination = document.getElementById("pagination");

let pageNUm = 10
let currentPage = 1

function createpageNum(total){

pagination.innerHTML = "";

let totalpages = Math.ceil(total/pageNUm)

for( let page = 1; page <= totalpages; page++){

const button = document.createElement("button");

        button.textContent = page;

        if (page === currentPage) {
            button.disabled = true;
        }

        button.addEventListener("click", () => {
            loadProducts(page);
        });

        pagination.appendChild(button);
    }


}