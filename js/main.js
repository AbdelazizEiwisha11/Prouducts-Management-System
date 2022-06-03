let title = document.getElementById('titelInput');
let price = document.getElementById('priceInput');
let taxes = document.getElementById('taxesInput');
let ads = document.getElementById('adsInput');
let discount = document.getElementById('discountInput');
let total = document.getElementById('total');
let count = document.getElementById('countInput');
let category = document.getElementById('categoryInput');
let btnCreate = document.getElementById('create');
let btnDeletAll = document.getElementById('deleteAll');
let mood = 'create'
let temp;
let ProductContainer;

//Chech if localstorage Have Prouducts
if(localStorage.getItem('product') != null){
    ProductContainer = JSON.parse(localStorage.getItem('product'));
    displayProducts(ProductContainer);
}else{
    ProductContainer = [];
}

//Calc Total Price
function calcTotal(){
    if(price.value != ""){
        let totalPrice = ((+price.value + +taxes.value + +ads.value) - +discount.value);
        total.innerHTML = totalPrice;
        total.style.background = '#198754'
    }else{
        total.innerHTML = '';
        total.style.background = '#0d6efd'
    }
}

//create New Product
function createProduct(){

    let newProuduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    //Create Mood
    if(title.value != '' && price.value != '' && category.value != ''){
        if(mood === 'create'){
            if(newProuduct.count > 1){
                for(let i = 0; i < newProuduct.count; i++){
                    ProductContainer.push(newProuduct);
                }
            }else{
                ProductContainer.push(newProuduct);  
            }

        // Update Mood
        }else{
            ProductContainer[temp] = newProuduct;
            mood = 'create';
            count.style.display = 'block';
            btnCreate.innerHTML = 'Create';
        }
        
        clearInputs();
    }
    //Save in localStogare
    localStorage.setItem('product', JSON.stringify(ProductContainer));
    displayProducts(ProductContainer);
    calcTotal();
}

//Add onclick to Create Button
btnCreate.addEventListener('click', function(){
    createProduct();
})

//clear inputs Data
function clearInputs(){
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML = ''
    count.value = ''
    category.value = ''
}

//Display Products in the Table
function displayProducts(arry){

    table = '';
    for(let i = 0; i<arry.length; i++){
        table += `
            <tr >
                <td>${i+1}</td>
                <td>${arry[i].title}</td>
                <td>${arry[i].price}</td>
                <td>${arry[i].taxes}</td>
                <td>${arry[i].ads}</td>
                <td>${arry[i].discount}</td>
                <td>${arry[i].total}</td>
                <td>${arry[i].category}</td>
                <td><button onclick="updateProudect(${i})"  class="btn-warning rounded-3 p-1">update</button></td>
                <td><button onclick="deleteProuduct(${i})" class="btn-danger rounded-3 p-1">delete</button></th>
            </tr>
        ` 
    }
    document.getElementById('tbody').innerHTML = table
    
    if(arry.length > 0 ){
        btnDeletAll.classList.replace('d-none', 'd-block');
        document.getElementById('allProuductsCount').innerHTML = arry.length;
    }else{
        btnDeletAll.classList.replace('d-block', 'd-none');
    }
}

//Delete Prouduct from the table
function deleteProuduct(index){
    ProductContainer.splice(index, 1);
    localStorage.setItem('product', JSON.stringify(ProductContainer));
    displayInputs(ProductContainer);
}

//Delete All Prouducts
function deleteAllProuducts(){
    ProductContainer.splice(0);
    localStorage.clear();
    displayProducts(ProductContainer);
}

//Add onclick to Delete All Button
btnDeletAll.addEventListener('click',function(){
    deleteAllProuducts();
})

//Update Prouduct
function updateProudect(productIndex){

    title.value = ProductContainer[productIndex].title;
    price.value = ProductContainer[productIndex].price;
    taxes.value = ProductContainer[productIndex].taxes;
    ads.value = ProductContainer[productIndex].ads;
    discount.value = ProductContainer[productIndex].discount;
    calcTotal();
    count.style.display ='none';
    category.value = ProductContainer[productIndex].category;
    btnCreate.innerHTML = 'Update';
    mood = "update";
    temp = productIndex;
    scroll({
        top:0,
        behavior:'smooth',
    })
}

//get search mood
let searchMood = 'title';
let search = document.getElementById('SearchInput');

function getSearchMood(id){
    if(id == 'btnTitelSearch'){
        searchMood = 'title';
    }else{
        searchMood = 'category';
    }
    search.placeholder ='Search By ' + searchMood;
    search.focus();
    search.value = '';
    displayProducts(ProductContainer);
}

//search about product
function searchProducts(value){

    let serchResalt = [];

    for(let i = 0; i< ProductContainer.length; i++){
        //Search By Title
        if(searchMood == 'title'){
            if(ProductContainer[i].title.includes(value.toLowerCase())){
                serchResalt.push(ProductContainer[i])
            }
        }
        //Search By Category
        else{
            if(ProductContainer[i].category.includes(value.toLowerCase())){
                serchResalt.push(ProductContainer[i])
            }
        }
        displayProducts(serchResalt);
    }
}