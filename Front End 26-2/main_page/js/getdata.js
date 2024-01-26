document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:4200/product')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        populateTable(data);
      })
      .catch(error => {
        console.error('Fetch failed:', error);
      });

    function populateTable(data) {
      console.log(data);
      const tableBody = document.querySelector('.container');
  
      // Xóa nội dung cũ của bảng (nếu có)
      tableBody.innerHTML = '';
      let html = '';
      // Lặp qua mỗi mục dữ liệu và thêm vào bảng
      data.data.forEach(item => {
        let product_item = `
        <div class="product_container">
        <div class="box">
        <div class="box-content">
          <div class="img-box">
            <img src="${item.image_path} ${item.img.link}" alt="">
          </div>
          <div class="detail-box">
            <div class="text">
              <h6>
                ${item.name}
              </h6>
            </div>
            <div class="like">
              <h6>
                 ${item.price}
              </h6>
            </div>
          </div>
        </div>
        </div>
        </div>
      `;
        html += product_item;
      });
      tableBody.innerHTML = html;
    }
  });
  