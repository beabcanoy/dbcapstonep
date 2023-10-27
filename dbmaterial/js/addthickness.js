const setEventListeners = () =>{
    document.getElementById("btn-add").addEventListener("click", ()=> {registerThickness();});
    
  }
  
  const registerThickness = () =>{
    document.getElementById("blankModalTitle").innerText = "Add New Thickness";
    document.getElementById("blankModalMainDiv").innerText = "";
    document.getElementById("blankModalMainDiv2").innerText = "";
  
    var materialForm = `
        <label for="date" class="form-label mt-2">Date:</label>
        <input type="date" id="date" name="date" class="form-control form-control-sm" required>
        <label for="thick" class="form-label mt-2">Color Thickness:</label>
        <input type="number" id="thick" name="thick" class="form-control form-control-sm" required>
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
    const Thickness = document.getElementById("thick").value;

    const json = {
        date: Date,
        thickness: Thickness
    };

    const formData = new FormData();
    formData.append("json", JSON.stringify(json));
    formData.append("operation", "addThickness");


    axios({
        url: "http://localhost/dbmaterial/api/addthickness.php",
        method: "post",
        data: formData
    })
    .then(response => {
        if (response.data == 1) {
            console.log(response.data);
            alert("Record successfully saved!");
            getThickness();
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

const getThickness = () => {
    const formData = new FormData();
    formData.append("operation", "getThickness");

    axios({
        url: "http://localhost/dbmaterial/api/addthickness.php",
        method: "post",
        data: formData
    })
        .then(response => {
            if (response.data.length == 0) {
                alert("There are no records retrieved.")
            } else {
                displayThickness(response.data);
            }
        })
        .catch(error => {
            alert(error);
        });
}

const displayThickness = (rsMaterials) =>{
    const tableRecords = document.getElementById("material-records");
    
    var html = `
    <div class="table-responsive">
    <table class="table align-middle table-hover">
        <thead>
            <tr>
            <th>Date</th>
            <th>Thickness</th>
            <th>Action</th>
            </tr>
        </thead>
    <tbody>
    `;
    
    rsMaterials.forEach(material=>{
        html +=`
            <tr>
            <td>${material.date}</td>
            <td>${material.thickness} mm</td>
                <td>
                    <button data-material-id="${material.thickness_id}" class="btnEdit btn btn-warning">Update</button>
                    <button data-material-id="${material.thickness_id}" class="btnDelete btn btn-danger">Archive</button>
                </td>
            </tr>
        `;
    });
    html += `</tbody></table></div>`;
    
    tableRecords.innerHTML = html;
    
    }

setEventListeners();
getThickness();