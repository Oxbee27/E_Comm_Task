const pagination = document.getElementById("pagination");

function createPages(total) {

    pagination.innerHTML = "";

    const totalPages = Math.ceil(total / pageNum);

    for (let page = 1; page <= totalPages; page++) {

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