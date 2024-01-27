document.addEventListener('DOMContentLoaded', async() => {
    const response =await fetch('http://localhost:4200/products',{
      method:"GET",
      headers:{
        "Authorization":`Bearer ${sessionStorage.getItem("AccessToken")}`
      }
    })
    const content=await response.json()
    populateTable(content.products)
})
    function populateTable(data) {
      console.log(data);
      const tableBody = document.querySelector('.container');
  
      // Xóa nội dung cũ của bảng (nếu có)
      tableBody.innerHTML = '';
      // Lặp qua mỗi mục dữ liệu và thêm vào bảng
      for(let i in data)
      {
        let html=`
        <div class="product_container" style=" background-color: #f2f2f2;
        padding: 20px;
        text-align: center;">
        <div class="box">
        <div class="box-content">
          <div class="img-box">
            <img id="Index${i}" src="../manager/products/ProductImage/${data[i].image_path}" alt="First Image" style="width:150px; height:150px;"></img>
            <img src="${data[i].img_link}" id="Index${i}_backupImage" style="display: none; width:150px; height:150px;">
          </div>
          <div class="detail-box">
            <div class="text">
              <h6>
                ${data[i].name}
              </h6>
            </div>
            <div class="like">
              <h6>
                 ${data[i].price}
              </h6>
            </div>
          </div>
        </div>
        </div>
        </div>
      `;
      tableBody.innerHTML += html;
      document.querySelector(`#Index${i}`).addEventListener("error",()=>{
        document.querySelector(`#Index${i}`).style.display='none'
        document.querySelector(`#Index${i}_backupImage`).style.display='block'
      })
    }
        
      
    }
    function loadBackupImage(id){
      document.querySelector(`.${id}`).style.display='none'
      document.querySelector(`.${id}_backupImage`).style.display='flex'
  }
  