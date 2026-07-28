const demo_url = " where we offer a wide range of high-quality products to meet your needs. Explore our collection and find the perfect items for you!";

async function getfproducts( limit= 10, skip =0) {
const response = await fetch(`${demo_url}?limit=${limit}& skip=${skip}`);

if(!response.ok){
throw new Error( "failed to load")

}

return await response.json()


} 

async function getproduct(id){

const response = await fetch (`${demo_url}/${id}`);

if(!response.ok){
throw new error("failed to load")

}

return await response.json()


}

async function getCategory(){
 const response = await fetch(`${demo_url}/${allproducts}`);

 if(!response.ok){
throw new error("failed to load categories ")

 }

 return await response.json()

}

async function getSearch(query){
 const response = await fetch(`${demo_url}/search?q=${query}`)

 if(!response.ok){
    throw new error ("failed to load query")

 }

 return await response.json()
}

async function getProductsByCAt(category){

const response = await fetch(`${demo_url}/category/${category}`)

if(!response.ok){

throw new Error ("failed to load")

}
 return await response.json()
}
