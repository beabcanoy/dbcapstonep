document.getElementById("btnLogin").addEventListener("click", (e) => {
    const username = document.getElementById("adminUsername").value;
    const password = document.getElementById("adminPassword").value;
  
    if (username === "" || password === "") {
      alert("Please enter both username and password.");
    } else {
      const json = {
        admin_username: username,
        admin_password: password,
      };
  
      axios({
        url: "http://localhost/dbmaterial/api/admin.php",
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
            const admin_id = employeeData.id;
            window.location.href = `dashboard.html?admin_id=${admin_id}`;
          } else {
            alert("Login failed. Please check your username and password.");
          }
        })
        .catch((error) => {
          alert("An error occurred while attempting to log in.");
        });
    }
  });
  