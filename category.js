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





}