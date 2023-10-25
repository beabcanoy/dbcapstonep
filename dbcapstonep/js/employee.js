const setEventListeners = () =>{
    document.getElementById("btn-add").addEventListener("click", ()=> {registerEmployee();});
    
  }
  
  const registerEmployee = () =>{
    document.getElementById("blankModalTitle").innerText = "New Employee";
    document.getElementById("blankModalMainDiv").innerText = "";
    document.getElementById("blankModalMainDiv2").innerText = "";
  
    var employeeForm = `
    <label for="name" class="form-label mt-2">Name:</label>
    <input type="text" id="name" name="name" class="form-control form-control-sm" required>
    
    <label for="username" class="form-label mt-2">Username:</label>
    <input type="text" id="username" name="username" class="form-control form-control-sm" required>
    
    <label for="password" class="form-label mt-2">Password:</label>
    <input type="password" id="password" name="password" class="form-control form-control-sm" required>
    
    <label for="contact" class="form-label mt-2">Contact #:</label>
    <input type="text" id="contact" name="contact" class="form-control form-control-sm" required>
    
    <label for="email" class="form-label mt-2">Email:</label>
    <input type="email" id="email" name="email" class="form-control form-control-sm" required>
    
    <label for="address" class="form-label mt-2">Address:</label>
    <input type="text" id="address" name="address" class="form-control form-control-sm" required>
    
    <label for="gender" class="form-label mt-2">Gender:</label>
    <select class="form-select" id="gender" name="gender" required>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>
    `;
    document.getElementById("blankModalMainDiv").innerHTML = employeeForm;
  
    const btnRegister = document.createElement("button");
    btnRegister.innerText = "Register Employee";
    btnRegister.classList.add("btn", "btn-primary", "mt-3", "w-100");
    btnRegister.onclick = ()=>{saveEmployeeRegistration();};
  
    document.getElementById("blankModalMainDiv2").append(btnRegister);
  
    const myModal = new bootstrap.Modal(document.getElementById('blankModal'), {
        keyboard: true,
        backdrop: "static"
    });
    myModal.show();
  }
  
  const saveEmployeeRegistration = () =>{

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
            getEmployee();
        } else {
            alert("Record NOT saved!");
        }
    })
    .catch(error =>{
        alert(error);
    })

    const myModal = bootstrap.Modal.getInstance(document.getElementById('blankModal'));
    myModal.hide();

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

const displayRecords = (rsUsers) =>{
    const tableRecords = document.getElementById("user-records");
    
    var html = `
    <div class="table-responsive">
    <table class="table align-middle table-hover">
        <thead>
            <tr>
            <th>Name</th>
            <th>Contact #</th>
            <th>Email</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Status</th>
            <th>Action</th>
            </tr>
        </thead>
    <tbody>
    `;
    
    rsUsers.forEach(employee=>{
        html +=`
            <tr>
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
            </tr>
        `;
    });
    html += `</tbody></table></div>`;
    
    tableRecords.innerHTML = html;
    
    tableRecords.querySelectorAll('.btnEdit').forEach(button => {
      button.addEventListener('click', function() {
          const userId = this.getAttribute('data-user-id');
          openEditModal(userId);
      });
    });
    
    }

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
            if(response.data == 1) {
                alert("Employee updated successfully!");
                const myModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
                myModal.hide();
                getEmployee();
            } else {
                alert("Update failed!");
            }
        })
        .catch(error => {
            alert(error);
        });
      }
      

setEventListeners();
getEmployee();