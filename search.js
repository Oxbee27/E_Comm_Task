const searchinput = document.getElementById("search");

searchinput.addEventListener("keyup", async function(){

    const query = searchinput.value.trim()

    if(query === ""){
        loadProduct(1)
    return

    }

    try{


const data = await getSearch(query)

    displayProducts(data.products)

pagination.innerHTML ="";

} catch (error){

console.log(error)


}

    })

