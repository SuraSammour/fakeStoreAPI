const getProducts=async ()=>{
    const{data}=await axios.get(`https://dummyjson.com/products`);
    return data;
}

const displayProducts=async()=>{
    try{
        const data=await getProducts();
        const products=data.products;
        const result=products.map((product)=>{
            return`
            <div class="product">
            <h2>${product.title}</h2>
            <img src="${product.thumbnail}"/>
            <a href="./details.html?id=${product.id}">Details</a>
            </div>`
        }).join('');
        document.querySelector(".products").innerHTML=result;
        
    }
  catch(error){
    const result=`
    <h2>Error!!</h2>
    <p>${error.message}</p>`
    document.querySelector(".products").innerHTML=result;
}finally{
    document.querySelector(".overlay").classList.add('d-none');
}
}
displayProducts();