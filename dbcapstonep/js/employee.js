document.getElementById("btnLogin").addEventListener("click", (e) => {
    const username = document.getElementById("employeeUsername").value;
    const password = document.getElementById("employeePassword").value;
  
    if (username === "" || password === "") {
      alert("Please enter both username and password.");
    } else {
      const json = {
        emp_username: username,
        emp_password: password,
      };
  
      axios({
        url: "http://localhost/dbcapstonep/api/employee.php",
        method: "post",
        data: {
          json: JSON.stringify(json),
          operation: "login",
        },
      })
        .then((response) => {
          if (response.data) {
            alert("Login successful!");
            const employeeData = response.data;
            const emp_id = employeeData.id;
            window.location.href = `dashboard.html?emp_id=${emp_id}`;
          } else {
            alert("Login failed. Please check your username and password.");
          }
        })
        .catch((error) => {
          alert("An error occurred while attempting to log in.");
        });
    }
  });
  