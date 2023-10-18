const openModal = () => {
    const modal = document.getElementById("addItemModal");
    modal.style.display = "block";
  };

  const closeModal = () => {
    const modal = document.getElementById("addItemModal");
    modal.style.display = "none";
  };

  const addItemButton = document.querySelector('.add-button button');
  const closeModalButton = document.querySelector('#close_modal');
  const addItemButtonModal = document.querySelector('#addItemButtonModal');

  addItemButton.addEventListener("click", openModal);
  closeModalButton.addEventListener("click", closeModal);
  addItemButtonModal.addEventListener("click", () => {
    closeModal();
  });

const addColored = () => {
    const Date = document.getElementById("date").value;
    const Color = document.getElementById("color").value;
    const Thickness = document.getElementById("thickness").value;
    const Price = document.getElementById("price").value;

    const json = {
        colored_date: Date,
        colored_color: Color,
        colored_thickness: Thickness,
        colored_price: Price
    };

    const formData = new FormData();
    formData.append("json", JSON.stringify(json));
    formData.append("operation", "addSteel");


    axios({
        url: "http://localhost/dbcapstonep/api/steel.php",
        method: "post",
        data: formData
    })
    .then(response => {
        if (response.data == 1) {
            alert("Record successfully saved!");
            getColored();
            closeModal();
        } else {
            alert("Record NOT saved!");
        }
    })
        .catch(error => {
            alert(error);
        });
}

const displaySteel = (data) => {
    const tableBody = document.querySelector('#itemTable tbody');
  
    if (tableBody) {
      tableBody.innerHTML = '';
  
      data.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.colored_date}</td>
          <td>${item.colored_color}</td>
          <td>${item.colored_thickness}</td>
          <td>${item.colored_price}</td>
          <td>
            <button data-item-id="${item.colored_id}" class="btnEdit btn btn-warning">Update</button>
            <button data-item-id="${item.colored_id}" class="btnDelete btn btn-danger">Archive</button>
          </td>
        `;
  
        tableBody.appendChild(row);
      });
    } else {
      console.error("Table body element not found.");
    }
  }
  
  const getColored = () => {
    const formData = new FormData();
    formData.append("operation", "getSteel");

    axios({
        url: "http://localhost/dbcapstonep/api/colored.php",
        method: "post",
        data: formData
    })
        .then(response => {
            if (response.data.length == 0) {
                alert("There are no records retrieved.")
            } else {
                displayColored(response.data);
            }
        })
        .catch(error => {
            alert(error);
        });
}

addItemButtonModal.addEventListener("click", addColored);
getColored();