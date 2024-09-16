const getProducts=async (page)=>{
    const limit=20;
    const skip=(page-1)*limit;
    const{data}=await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    return data;
}

const displayProducts=async(page=1)=>{
    try{
        const data=await getProducts(page);
        const products=data.products;
      //  const numberOfPages=Math.ceil(data.total / data.limit); 
      const numberOfPages=10;
        console.log(numberOfPages);
        const result=products.map((product)=>{
            return `
              <div class='product'>
             <h2>${product.title}</h2>
             <img src="${product.thumbnail}"/>
             <div class="product-links">
                <a href="./details.html?id=${product.id}">Details</a>
                <button onclick='deleteProduct(${product.id})'>delete</button>
            </div>
         </div>
           `;
        }).join('');
        document.querySelector(".products").innerHTML=result;

        const modal=document.querySelector(".sliderModal");
        const closeBtn=document.querySelector(".closeBtn");
        const leftBtn=document.querySelector(".leftBtn");
        const rightBtn=document.querySelector(".rightBtn");
        const allImages=Array.from(document.querySelectorAll("img"));
        let currentIndex=0;
        rightBtn.addEventListener("click",()=>{
          currentIndex++;

          if (currentIndex>=allImages.length)
            currentIndex=0;
          const nextImgSrc=allImages[currentIndex].getAttribute("src");
        modal.querySelector("img").setAttribute("src",nextImgSrc);
        
        })

        leftBtn.addEventListener("click",()=>{
            currentIndex--;
  
            if (currentIndex<0)
              currentIndex=allImages.length -1;
            const prevImgSrc=allImages[currentIndex].getAttribute("src");
          modal.querySelector("img").setAttribute("src",prevImgSrc);
          
          })
  







        for (let i=0;i<allImages.length;i++){
            allImages[i].addEventListener("click",(e)=>{
                
                modal.classList.remove("d-none");
                modal.querySelector("img").setAttribute("src",e.target.src);
                const currentImg=e.target;
                currentIndex=allImages.indexOf(currentImg);
                
            });
        }

        closeBtn.addEventListener("click",()=>{
            modal.classList.add("d-none");
        })

        modal.addEventListener("click",(e)=>{
         if(modal==e.target)
            modal.classList.add("d-none");
        });


       document.addEventListener("keydown",(e)=>{
       
        if(e.code=='ArrowRight'){
            currentIndex++;

            if (currentIndex>=allImages.length)
              currentIndex=0;
            const nextImgSrc=allImages[currentIndex].getAttribute("src");
          modal.querySelector("img").setAttribute("src",nextImgSrc);

        }
        else if(e.code=='ArrowLeft'){
            currentIndex--;
          
            if (currentIndex<0)
              currentIndex=allImages.length -1;
            const prevImgSrc=allImages[currentIndex].getAttribute("src");
          modal.querySelector("img").setAttribute("src",prevImgSrc);
        }
        else if(e.code=='Escape'){
            modal.classList.add("d-none");
        }
            
       })

   





        // pagination 
        let paginationLinks=``;
        if(page>1){
              paginationLinks+=` <li class="page-item"><button onclick=displayProducts(${page}-1) class="page-link">&laquo;</button></li>`;
        }
        else{
            paginationLinks+=` <li class="page-item"><button class="page-link">&laquo;</button></li>`;
        }
        
       
        for(let i=1;i<=numberOfPages;i++){
            paginationLinks+=`<li class="page-item"><button onclick=displayProducts(${i}) class="page-link" href="#">${i}</button></li>`
        }

        if(page<numberOfPages){
            paginationLinks+=`<li class="page-item"><button  onclick=displayProducts(${parseInt(page)}+1) class="page-link">&raquo;</button></li>`;
        }
       else{
        paginationLinks+=`<li class="page-item"><button class="page-link">&raquo;</button></li>`;
       }
        document.querySelector(".pagination").innerHTML=paginationLinks;
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

window.onscroll=function(){
    const nav=document.querySelector("nav");
    const about =document.querySelector(".about");
    if(window.scrollY > about.offsetTop){
        nav.classList.add('scrollNavbar');
    }
    else{
        nav.classList.remove('scrollNavbar');
    }
    
}


