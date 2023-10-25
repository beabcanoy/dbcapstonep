const setEventListeners = () =>{
    document.getElementById("btn-add").addEventListener("click", ()=> {registerColoredCoil();});
    
  }
  
  const registerColoredCoil = () =>{
    document.getElementById("blankModalTitle").innerText = "Colored Coils";
    document.getElementById("blankModalMainDiv").innerText = "";
    document.getElementById("blankModalMainDiv2").innerText = "";
  
    var materialForm = `
        <label for="date" class="form-label mt-2">Date:</label>
        <input type="date" id="date" name="date" class="form-control form-control-sm" required>
        <label for="color" class="form-label mt-2">Color:</label>
        <input type="text" id="color" name="color" class="form-control form-control-sm" required>
        <label for="thickness" class="form-label mt-2">Thickness:</label>
        <input type="text" id="thickness" name="thickness"  class="form-control form-control-sm"required>
        <label for="net-weight" class="form-label mt-2">Net Weight:</label>
        <input type="text" id="net-weight" name="net-weight"  class="form-control form-control-sm"required>
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
    const Color = document.getElementById("color").value;
    const Thickness = document.getElementById("thickness").value;
    const netWeight = document.getElementById("net-weight").value;

    const json = {
        colored_date: Date,
        colored_color: Color,
        colored_thickness: Thickness,
        colored_net_weight : netWeight
    };

    const formData = new FormData();
    formData.append("json", JSON.stringify(json));
    formData.append("operation", "addColored");


    axios({
        url: "http://localhost/dbcapstonep/api/colored.php",
        method: "post",
        data: formData
    })
    .then(response => {
        if (response.data == 1) {
            alert("Record successfully saved!");
            getColored();
        } else {
            alert("Record NOT saved!");
        }
    })
        .catch(error => {
            alert(error);
        });

    const myModal = bootstrap.Modal.getInstance(document.getElementById('blankModal'));
    myModal.hide();

}

const getColored = () => {
    const formData = new FormData();
    formData.append("operation", "getColored");

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

const displayColored = (rsMaterials) =>{
    const tableRecords = document.getElementById("colored-coil-records");
    
    var html = `
    <div class="table-responsive">
    <table class="table align-middle table-hover">
        <thead>
            <tr>
            <th>Date</th>
            <th>Color</th>
            <th>Thickness</th>
            <th>Net weight</th>
            <th>Action</th>
            </tr>
        </thead>
    <tbody>
    `;
    
    rsMaterials.forEach(material=>{
        html +=`
            <tr>
            <td>${material.colored_date}</td>
            <td>${material.colored_color}</td>
            <td>${material.colored_thickness} mm</td>
            <td>${material.colored_net_weight} KGS</td>
                <td>
                    <button data-material-id="${material.colored_id}" class="btnEdit btn btn-warning">Update</button>
                    <button data-material-id="${material.colored_id}" class="btnDelete btn btn-danger">Archive</button>
                </td>
            </tr>
        `;
    });
    html += `</tbody></table></div>`;
    
    tableRecords.innerHTML = html;
    
    }

setEventListeners();
getColored();