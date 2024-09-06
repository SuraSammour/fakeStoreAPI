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
            <tr>
            <td>${product.id}</td>
             <td>${product.title}</td>
             <td><img src="${product.thumbnail}"/></td> 
             <td>
             <a href="./details.html?id=${product.id}">Details</a>
             <button onclick='deleteProduct(${product.id})'>delete</button>
             </td>
            </tr>
           `;
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

const deleteProduct=async(id)=>{
    try{
        const {data}=await axios.delete(`https://dummyjson.com/products/${id}`);
        alert("product deleted successfully");
    }
   catch(error){
    alert("can not deleted this product");
   }
    

}
displayProducts();