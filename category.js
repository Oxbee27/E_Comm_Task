const selectCategory = document.getElementById("allproduct");


async function loadCategories(){

try{
const allproduct = await getCategory();

allproduct.array.forEach(category => {

const value = value.slug || category
const text = value.name || category


selectCategory += `
<option value ="${value}">${text}


`
    
});


} catch(error){
console,log(error)


}


selectCategory.addEventListener( "update", async function() {

const category = selectCategory.value


if(category = ""){

loadProduct(1)
return

}

try{

const data = await getProductsByCAt(category);

displayProducts(data.products)

pagination.innerHTML = "";


} catch (error){
console.log(error)


}

})














}