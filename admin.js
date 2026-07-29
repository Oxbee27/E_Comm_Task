const tableBody = document.querySelector("#adminTable td");

const activityLog = document.getElementById("activityLog");

const loadButton = document.getElementById("loadProducts");

const addForm = document.getElementById("addProductForm");

loadButton.addEventListener( "click", loadAdminProducts );

async function loadAdminProducts(){

    try{

        const data = await getProducts(30,0);


        setShadowProducts(data.products);


        displayTable();


        addLog( "Loaded products from API" );


    } catch(error){

        console.error(error);

        addLog( "Failed to load products" );

    }

}

function displayTable(){


    td.innerHTML = "";


    const products =
    getShadowProducts();



    products.forEach(product=>{


        td.innerHTML += `


        <tr>


            <td>
                ${product.id}
            </td>


            <td>
                ${product.title}
            </td>


            <td>
                $${product.price}
            </td>


            <td>
                ${product.stock ?? 0}
            </td>


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


    });


}

async function quickEdit(id){


    const products =
    getShadowProducts();



    const product =
    products.find(
        p=>p.id===id
    );



    if(!product) return;



    const backup =
    [...products];



    const newStock =
    Number(
        prompt(
            "New stock:",
            product.stock
        )
    );



    updateShadow(id,{

        stock:newStock

    });



    displayTable();



    addLog(
        `Quick edited product ${id}`
    );



    try{


        await patchProduct(
            id,
            {

                stock:newStock

            }
        );


    }


    catch(error){


        restoreShadow(backup);


        displayTable();



        addLog(
            `PATCH failed - rollback ${id}`
        );


    }


}

async function removeProduct(id){


    const backup =
    [
        ...getShadowProducts()
    ];



    removeFromShadow(id);



    displayTable();



    addLog(
        `Deleted product ${id}`
    );



    try{


        await deleteProduct(id);



    }


    catch(error){


        restoreShadow(backup);


        displayTable();



        addLog(
            `Delete failed - rollback ${id}`
        );


    }


}