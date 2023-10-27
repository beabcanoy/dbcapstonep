const setEventListeners = () => {
    document.getElementById("btn-deduct").addEventListener("click", () => {
      getRawType();
    });
  }
  
  const getRawType = () => {
    document.getElementById("blankModalTitle").innerText = "Finish Product";
    document.getElementById("blankModalMainDiv").innerText = "";
    document.getElementById("blankModalMainDiv2").innerText = "";
  
    const formData = new FormData();
    formData.append("operation", "getRawType");
  
    axios({
      url: "http://localhost/dbmaterial/api/finishmats.php",
      method: "post",
      data: formData
    })
      .then(response => {
        if (response.data.length === 0) {
          alert("There are no records retrieved.");
        } else {
          const raws = response.data;
          const rawOptions = raws.map(raw =>
            `<option value="${raw.rawType_id}">${raw.rawType_name}</option>`
          ).join('');
        
    
    var materialForm = `
        <label for="date" class="form-label mt-2">Date:</label>
        <input type="date" id="date" name="date" class="form-control form-control-sm">

        <label for="companyName" class="form-label mt-2">Company Name:</label>
        <input type="text" id="companyName" name="companyName" class="form-control form-control-sm">

        <label for="prodName" class="form-label mt-2">Product Name:</label>
        <input type="text" id="prodName" name="prodName"  class="form-control form-control-sm">

        <label for="rawType" class="form-label mt-2">Raw Type</label>
        <select class="form-select" id="rawType" aria-label="Default select example">
        ${rawOptions}
        </select>
        
        <label for="color" class="form-label mt-2">Color:</label>
        <input type="text" id="color" name="color"  class="form-control form-control-sm">

        <label for="thickness" class="form-label mt-2">Thickness:</label>
        <input type="text" id="thickness" name="thickness"  class="form-control form-control-sm">

        <label for="width" class="form-label mt-2">Width:</label>
        <input type="text" id="width" name="width"  class="form-control form-control-sm">

        <label for="length" class="form-label mt-2">Length:</label>
        <input type="text" id="length" name="length"  class="form-control form-control-sm">

        <label for="net-weight" class="form-label mt-2">Net Weight:</label>
        <input type="number" id="net-weight" name="net-weight"  class="form-control form-control-sm">
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
    btnRegister.onclick = () => {
      saveMaterialRegistration();
    };

    document.getElementById("blankModalMainDiv2").append(btnRegister);

    const myModal = new bootstrap.Modal(document.getElementById('blankModal'), {
      keyboard: true,
      backdrop: "static"
    });
    myModal.show();
  }
})
.catch(error => {
  alert(error);
});
}

const saveMaterialRegistration = () => {
const Date = document.getElementById("date").value;
const Company = document.getElementById("companyName").value;
const Product = document.getElementById("prodName").value;
const RawType = document.getElementById("rawType").value;
const Color = document.getElementById("color").value;
const Thickness = document.getElementById("thickness").value;
const Width = document.getElementById("width").value;
const Length = document.getElementById("length").value;
const netWeight = document.getElementById("net-weight").value; // corrected id

const json = {
fm_date: Date,
fm_companyName: Company,
fm_productName: Product,
fm_rawType: RawType,
fm_color: Color,
fm_thickness: Thickness,
fm_width: Width,
fm_length: Length,
fm_netweight: netWeight
};

const formData = new FormData();
formData.append("json", JSON.stringify(json));
formData.append("operation", "addFinishMats");

axios({
url: "http://localhost/dbmaterial/api/finishmats.php",
method: "post",
data: formData
})
.then(response => {
  if (response.data == 1) {
    console.log(response.data);
    alert("Record successfully saved!");
    getFinishMats();
  } else {
    console.log(response.data);
    alert("Record NOT saved!");
  }
})
.catch(error => {
  alert(error);
});

const myModal = new bootstrap.Modal(document.getElementById('blankModal'));
myModal.hide();
}

const getFinishMats = () => {
const formData = new FormData();
formData.append("operation", "getFinishMats");

axios({
url: "http://localhost/dbmaterial/api/finishmats.php",
method: "post",
data: formData
})
.then(response => {
  if (response.data.length === 0) {
    alert("There are no records retrieved.");
  } else {
    displayFinishMats(response.data);
  }
})
.catch(error => {
  alert(error);
});
}

const displayFinishMats = (rsMaterials) => {
const tableRecords = document.getElementById("finish_mats-records");

var html = `
<div class="table-responsive">
<table class="table align-middle table-hover">
    <thead>
        <tr>
        <th>Date</th>
        <th>Buyer Name</th>
        <th>Product Name</th>
        <th>Raw Type</th>
        <th>Color</th>
        <th>Thickness</th>
        <th>Width</th>
        <th>Length</th>
        <th>Net Weight</th>
        <th>Action</th>
        </tr>
    </thead>
<tbody>
`;
rsMaterials.forEach(material => {
html += `
        <tr>
        <td>${material.fm_date}</td>
        <td>${material.fm_companyName}</td>
        <td>${material.fm_productName}</td>
        <td>${material.fm_rawType}</td>
        <td>${material.fm_color}</td>
        <td>${material.fm_thickness} mm</td>
        <td>${material.fm_width}</td>
        <td>${material.fm_length}</td>
        <td>${material.fm_netweight} KGS</td>
            <td>
                <button data-material-id="${material.fm_id}" class="btnEdit btn btn-warning">Update</button>
                <button data-material-id="${material.fm_id}" class="btnDelete btn btn-danger">Archive</button>
            </td>
        </tr>
    `;
});
html += `</tbody></table></div>`;

tableRecords.innerHTML = html;
}

const getRawOptions = () => {
const formData = new FormData();
formData.append("operation", "getRawType");

return axios({
url: "http://localhost/dbmaterial/api/finishmats.php",
method: "post",
data: formData
})
.then(response => {
  const raws = response.data;
  console.log(raws);
  return raws.map(raw =>
    `<option value="${raw.rawType_id}">${raw.rawType_name}</option>`
  ).join('');
});
}

setEventListeners();
getFinishMats();