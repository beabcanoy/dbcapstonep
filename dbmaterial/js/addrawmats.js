const setEventListeners = () =>{
    document.getElementById("btn-add").addEventListener("click", ()=> {registerRawMats();});
    
  }
  
  const registerRawMats = () =>{
    document.getElementById("blankModalTitle").innerText = "Add New Raw Material";
    document.getElementById("blankModalMainDiv").innerText = "";
    document.getElementById("blankModalMainDiv2").innerText = "";
  
    var materialForm = `
        <label for="date" class="form-label mt-2">Date:</label>
        <input type="date" id="date" name="date" class="form-control form-control-sm" required>
        <label for="name" class="form-label mt-2">Name:</label>
        <input type="text" id="name" name="name" class="form-control form-control-sm" required>
    `;
    document.getElementById("blankModalMainDiv").innerHTML = materialForm;

    const rawDateInput = document.getElementById("date");
    const today = new Date().toISOString().split("T")[0];
    rawDateInput.value = today;
    rawDateInput.min = today;
    rawDateInput.max = today;
  
    const btnRegister = document.createElement("button");
    btnRegister.innerText = "Register material";
    btnRegister.classList.add("btn", "btn-primary", "mt-3", "w-100");
    btnRegister.onclick = ()=>{saveMaterialRegistration();};
  
    document.getElementById("blankModalMainDiv2").append(btnRegister);
  
    const myModal = new bootstrap.Modal(document.getElementById('blankModal'), {
        keyboard: true,
        backdrop: "static"
    });
    myModal.show();
  }
  
  const saveMaterialRegistration = () =>{

    const Date = document.getElementById("date").value;
    const Name = document.getElementById("name").value;

    const json = {
        rawType_date: Date,
        rawType_name: Name
    };

    const formData = new FormData();
    formData.append("json", JSON.stringify(json));
    formData.append("operation", "addRawMats");


    axios({
        url: "http://localhost/dbmaterial/api/rawmats.php",
        method: "post",
        data: formData
    })
    .then(response => {
        if (response.data == 1) {
            console.log(response.data);
            alert("Record successfully saved!");
            getRawType();
        } else {
            console.log(response.data);
            alert("Record NOT saved!");
        }
    })
        .catch(error => {
            alert(error);
        });

    const myModal = bootstrap.Modal.getInstance(document.getElementById('blankModal'));
    myModal.hide();

}

const getRawType = () => {
    const formData = new FormData();
    formData.append("operation", "getRawMats");

    axios({
        url: "http://localhost/dbmaterial/api/rawmats.php",
        method: "post",
        data: formData
    })
        .then(response => {
            if (response.data.length == 0) {
                alert("There are no records retrieved.")
            } else {
                displayRawType(response.data);
            }
        })
        .catch(error => {
            alert(error);
        });
}

const displayRawType = (rsMaterials) =>{
    const tableRecords = document.getElementById("raw-type-records");
    
    var html = `
    <div class="table-responsive">
    <table class="table align-middle table-hover">
        <thead>
            <tr>
            <th>Date</th>
            <th>Raw Name</th>
            <th>Action</th>
            </tr>
        </thead>
    <tbody>
    `;
    
    rsMaterials.forEach(material=>{
        html +=`
            <tr>
            <td>${material.rawType_date}</td>
            <td>${material.rawType_name}</td>
                <td>
                    <button data-material-id="${material.rawType_id}" class="btnEdit btn btn-warning">Update</button>
                    <button data-material-id="${material.rawType_id}" class="btnDelete btn btn-danger">Archive</button>
                </td>
            </tr>
        `;
    });
    html += `</tbody></table></div>`;
    
    tableRecords.innerHTML = html;
    
    }

setEventListeners();
getRawType();