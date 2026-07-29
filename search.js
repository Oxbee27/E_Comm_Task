const searchproduct = document.getElementById("search");

searchproduct.addEventListener("input", async function(){

    const query = searchproduct.Value.trim()

    if(query === ""){
        loadProduct(1)
    return

    }

    try{


const data = await searchproduct(query)

    displayProducts(data.product)

pagination.innerHTML ="";

} catch (error){

console.log(error)


}

    })

