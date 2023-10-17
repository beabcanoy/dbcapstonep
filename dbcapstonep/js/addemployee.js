
const openModal = () => {
    const modal = document.getElementById("addUserModal");
    modal.style.display = "block";
}

const closeModal = () => {
    const modal = document.getElementById("addUserModal");
    modal.style.display = "none";
}

const addUserButton = document.querySelector('.add-button button');
addUserButton.addEventListener("click", openModal);

const closeModalButton = document.querySelector('#close_Modal');
closeModalButton.addEventListener("click", closeModal);

const addUserButtonModal = document.querySelector('#addUserButtonModal');
addUserButtonModal.addEventListener("click", () => {
    closeModal();
});
  

const saveEmployee = () => {
    const Name = document.getElementById("name").value;
    const Username = document.getElementById("username").value;
    const Password = document.getElementById("password").value;
    const Contact = document.getElementById("contact").value;
    const Email = document.getElementById("email").value;
    const Address = document.getElementById("address").value;
    const Gender = document.getElementById("gender").value;

    const json = {
        emp_name: Name,
        emp_username: Username,
        emp_password: Password,
        emp_contactNum: Contact,
        emp_email: Email,
        emp_address: Address,
        emp_gender: Gender
    };

    const formData = new FormData();
    formData.append("json", JSON.stringify(json));
    formData.append("operation", "saveEmployee");


    axios({
        url: "http://localhost/dbcapstonep/api/employee.php",
        method: "post",
        data: formData
    })
    .then(response => {
        if (response.data == 1) {
            alert("Record successfully saved!");
            closeModal();
            getEmployee();
        } else {
            alert("Record NOT saved!");
        }
    })
        .catch(error => {
            alert(error);
        });
}

const displayRecords = (data) => {
    const tableBody = document.querySelector('#employeeTable tbody');

    tableBody.innerHTML = '';

    data.forEach((employee) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.emp_name}</td>
            <td>${employee.emp_contactNum}</td>
            <td>${employee.emp_email}</td>
            <td>${employee.emp_address}</td>
            <td>${employee.emp_gender}</td>
            <td>${employee.emp_status}</td>
            <td>
                <button data-user-id="${employee.emp_id}" class="btnEdit btn btn-warning">Update</button>
                <button data-user-id="${employee.emp_id}" class="btnDelete btn btn-danger">Archive</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

const getEmployee = () => {
    const formData = new FormData();
    formData.append("operation", "getEmployee");

    axios({
        url: "http://localhost/dbcapstonep/api/employee.php",
        method: "post",
        data: formData
    })
        .then(response => {
            if (response.data.length == 0) {
                alert("There are no records retrieved.")
            } else {
                displayRecords(response.data);
            }
        })
        .catch(error => {
            alert(error);
        });
}

document.getElementById("employeeTable").addEventListener("click", (event) => {
    if (event.target.classList.contains("btnEdit")) {
      const emp_id = event.target.getAttribute("data-user-id");
      openEditModal(emp_id);
    }
});

const openEditModal = (emp_id) => {
    document.getElementById("editModalTitle").innerText = "Edit Employee";
    document.getElementById("editModalMainDiv").innerHTML = '';
    document.getElementById("editModalMainDiv2").innerHTML = '';

    const formData = new FormData();
    formData.append("operation", "getEmployeeById");
    formData.append("emp_id", emp_id);

    axios({
        url: "http://localhost/dbcapstonep/api/employee.php",
        method: "post",
        data: formData,
    })
        .then((response) => {
                const employee = response.data;
            if (employee) {
                let editForm = `
                    <div class="row">
                        <label for="edit_name" class="form-label mt-2">Name</label>
                        <input type="text" id="edit_name" class="form-control form-control-sm" value="${employee.emp_name}">

                        <label for="edit_contactNum" class="form-label mt-2">Contact #</label>
                        <input type="number" id="edit_contactNum" class="form-control form-control-sm" value="${employee.emp_contactNum}">

                        <label for="edit_email" class="form-label mt-2">Email</label>
                        <input type="text" id="edit_email" class="form-control form-control-sm" value="${employee.emp_email}">

                        <label for="edit_address" class="form-label mt-2">Address</label>
                        <input type="text" id="edit_address" class="form-control form-control-sm" value="${employee.emp_address}">

                        <label for="editGender" class="form-label mt-2">Gender</label>
                        <select class="form-select" id="editGender" aria-label="Gender select">
                            <option value="Male" ${employee.emp_gender === "Male" ? "selected" : ""}>Male</option>
                            <option value="Female" ${employee.emp_gender === "Female" ? "selected" : ""}>Female</option>
                            <option value="Other" ${employee.emp_gender === "Other" ? "selected" : ""}>Other</option>
                        </select>
                    </div>
                `;

                document.getElementById("editModalMainDiv").innerHTML = editForm;

                const btnSave = document.createElement("button");
                btnSave.innerText = "Update";
                btnSave.classList.add("btn", "btn-primary", "mt-3", "w-100");

                btnSave.addEventListener("click", () => {
                    saveUpdatedEmployee(emp_id);
                });

                document.getElementById("editModalMainDiv2").append(btnSave);

                const myModal = new bootstrap.Modal(document.getElementById('editModal'), {
                    keyboard: true,
                    backdrop: "static",
                });
                myModal.show();
            } else {
                alert("Employee data not found or is incomplete!");
            }
        })
        .catch((error) => {
            alert("Error fetching data: " + error);
        });
};


  
  const saveUpdatedEmployee = (emp_id) => {
    const Name = document.getElementById("edit_name").value;
    const Contact = document.getElementById("edit_contactNum").value;
    const Email = document.getElementById("edit_email").value;
    const Address = document.getElementById("edit_address").value;
    const Gender = document.getElementById("editGender").value;
  
    const json = {
      emp_id: emp_id,
      emp_name: Name,
      emp_contactNum: Contact,
      emp_email: Email,
      emp_address: Address,
      emp_gender: Gender
    };
  
    const formData = new FormData();
    formData.append("json", JSON.stringify(json));
    formData.append("operation", "updateEmployee");
  
    axios({
      url: "http://localhost/dbcapstonep/api/employee.php",
      method: "post",
      data: formData
    })
      .then(response => {
        if (response.data == 1) {
          alert("Employee updated successfully!");
          const myModal = new bootstrap.Modal(document.getElementById('editModal'));
          myModal.hide();
        } else {
          console.log(response.data);
        }
      })
      .catch(error => {
        alert(error);
      });
  }
  
  

addUserButtonModal.addEventListener("click", saveEmployee);
getEmployee();