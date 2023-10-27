const setEventListeners = () =>{
  document.getElementById("btn-add").addEventListener("click", ()=> {registerSteelDeck();});
  
}

const registerSteelDeck = () =>{
  document.getElementById("blankModalTitle").innerText = "Steel Deck";
  document.getElementById("blankModalMainDiv").innerText = "";
  document.getElementById("blankModalMainDiv2").innerText = "";

  var materialForm = `
      <label for="date" class="form-label mt-2">Date:</label>
      <input type="date" id="date" name="date" class="form-control form-control-sm" required>
      <label for="roll" class="form-label mt-2">Roll:</label>
      <input type="number" id="roll" name="roll" class="form-control form-control-sm" required>
      <label for="thickness" class="form-label mt-2">Thickness:</label>
      <input type="text" id="thickness" name="thickness"  class="form-control form-control-sm"required>
      <label for="net_weight" class="form-label mt-2">Net Weight:</label>
      <input type="text" id="net_weight" name="net_weight"  class="form-control form-control-sm"required>
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
  const Roll = document.getElementById("roll").value;
  const Thickness = document.getElementById("thickness").value;
  const netWeight = document.getElementById("net_weight").value;
  const json = {
      steeldeck_regisDate: Date,
      steeldeck_roll: Roll,
      steeldeck_thickness: Thickness,
      roll_net_weight : netWeight
  };

  const formData = new FormData();
  formData.append("json", JSON.stringify(json));
  formData.append("operation", "addSteel");


  axios({
      url: "http://localhost/dbmaterial/api/steel.php",
      method: "post",
      data: formData
  })
  .then(response => {
      if (response.data == 1) {
          alert("Record successfully saved!");
          getSteel();
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

const getSteel = () => {
  const formData = new FormData();
  formData.append("operation", "getSteel");

  axios({
      url: "http://localhost/dbmaterial/api/steel.php",
      method: "post",
      data: formData
  })
      .then(response => {
          if (response.data.length == 0) {
              alert("There are no records retrieved.")
          } else {
            displaySteel(response.data);
          }
      })
      .catch(error => {
          alert(error);
      });
}

const displaySteel = (rsMaterials) =>{
  const tableRecords = document.getElementById("steel-deck-records");
  
  var html = `
  <div class="table-responsive">
  <table class="table align-middle table-hover">
      <thead>
          <tr>
          <th>Date</th>
          <th>Roll</th>
          <th>Thickness</th>
          <th>Weight</th>
          <th>Action</th>
          </tr>
      </thead>
  <tbody>
  `;
  rsMaterials.forEach(material=>{
      html +=`
          <tr>
          <td>${material.steeldeck_regisDate}</td>
          <td>${material.steeldeck_roll}</td>
          <td>${material.steeldeck_thickness} mm</td>
          <td>${material.roll_net_weight} KGS</td>
              <td>
                  <button data-material-id="${material.steeldeck_id}" class="btnEdit btn btn-warning">Update</button>
                  <button data-material-id="${material.steeldeck_id}" class="btnDelete btn btn-danger">Archive</button>
              </td>
          </tr>
      `;
  });
  html += `</tbody></table></div>`;
  
  tableRecords.innerHTML = html;
  
  }

setEventListeners();
getSteel();