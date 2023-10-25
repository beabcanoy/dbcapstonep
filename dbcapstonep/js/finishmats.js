const setEventListeners = () =>{
    document.getElementById("btn-add").addEventListener("click", ()=> {registerFinishProduct();});
    
  }
  
  const registerFinishProduct = () =>{
    document.getElementById("blankModalTitle").innerText = "Finish Product";
    document.getElementById("blankModalMainDiv").innerText = "";
    document.getElementById("blankModalMainDiv2").innerText = "";
    fm_date, fm_companyName, fm_productName, fm_rawType, fm_color, fm_thickness, fm_width, fm_length, fm_netweight
    var materialForm = `
        <label for="date" class="form-label mt-2">Date:</label>
        <input type="date" id="date" name="date" class="form-control form-control-sm" required>

        <label for="companyName" class="form-label mt-2">Company Name:</label>
        <input type="text" id="companyName" name="companyName" class="form-control form-control-sm" required>

        <label for="prodName" class="form-label mt-2">Product Name:</label>
        <input type="text" id="prodName" name="prodName"  class="form-control form-control-sm"required>
        
        <label for="rawType" class="form-label mt-2">Raw Type:</label>
        <input type="text" id="rawType" name="rawType"  class="form-control form-control-sm"required>
        
        <label for="color" class="form-label mt-2">Color:</label>
        <input type="text" id="color" name="color"  class="form-control form-control-sm"required>

        <label for="thickness" class="form-label mt-2">Thickness:</label>
        <input type="text" id="thickness" name="thickness"  class="form-control form-control-sm"required>

        <label for="width" class="form-label mt-2">Width:</label>
        <input type="text" id="width" name="width"  class="form-control form-control-sm"required>

        <label for="net-weight" class="form-label mt-2">Net Weight:</label>
        <input type="number" id="net-weight" name="net-weight"  class="form-control form-control-sm"required>
    `;
    document.getElementById("blankModalMainDiv").innerHTML = materialForm;
  
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
    const Roll = document.getElementById("roll").value;
    const Thickness = document.getElementById("thickness").value;
    const Width = document.getElementById("width").value;
    const netWeight = document.getElementById("netweight").value;

    const json = {
        cpurlin_date: Date,
        cpurlin_roll: Roll,
        cpurlin_thickness: Thickness,
        cpurlin_width : Width,
        cpurlin_netweight: netWeight
    };

    const formData = new FormData();
    formData.append("json", JSON.stringify(json));
    formData.append("operation", "addCpurlin");


    axios({
        url: "http://localhost/dbcapstonep/api/c-purlin.php",
        method: "post",
        data: formData
    })
    .then(response => {
        if (response.data == 1) {
            console.log(response.data);
            alert("Record successfully saved!");
            getCpurlin();
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

const getCpurlin = () => {
    const formData = new FormData();
    formData.append("operation", "getCpurlin");

    axios({
        url: "http://localhost/dbcapstonep/api/c-purlin.php",
        method: "post",
        data: formData
    })
        .then(response => {
            if (response.data.length == 0) {
                alert("There are no records retrieved.")
            } else {
                displayCpurlin(response.data);
            }
        })
        .catch(error => {
            alert(error);
        });
}

const displayCpurlin = (rsMaterials) =>{
    const tableRecords = document.getElementById("c-purlin-records");
    
    var html = `
    <div class="table-responsive">
    <table class="table align-middle table-hover">
        <thead>
            <tr>
            <th>Date</th>
            <th>Roll</th>
            <th>Thickness</th>
            <th>Width</th>
            <th>Net Weight</th>
            <th>Action</th>
            </tr>
        </thead>
    <tbody>
    `;
    
    rsMaterials.forEach(material=>{
        html +=`
            <tr>
            <td>${material.cpurlin_date}</td>
            <td>${material.cpurlin_roll}</td>
            <td>${material.cpurlin_thickness} mm</td>
            <td>${material.cpurlin_width}</td>
            <td>${material.cpurlin_netweight} KGS</td>
                <td>
                    <button data-material-id="${material.cpurlin_id}" class="btnEdit btn btn-warning">Update</button>
                    <button data-material-id="${material.cpurlin_id}" class="btnDelete btn btn-danger">Archive</button>
                </td>
            </tr>
        `;
    });
    html += `</tbody></table></div>`;
    
    tableRecords.innerHTML = html;
    
    }

setEventListeners();
getCpurlin();