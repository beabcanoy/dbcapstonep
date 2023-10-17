<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");

class Employee
{
    function login($json)
    {
        include "connection.php";

        $json = json_decode($json, true);
        $emp_username = $json['emp_username'];
        $emp_password = $json['emp_password'];

        $sql = "SELECT * FROM tbl_employee ";
        $sql .= "WHERE emp_username=:emp_username AND emp_password=:emp_password";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":emp_username", $emp_username);
        $stmt->bindParam(":emp_password", $emp_password);
        $stmt->execute();
        $returnValue = 0;

        $sql = "UPDATE tbl_employee SET last_login = NOW() WHERE emp_username = :emp_username";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":emp_username", $emp_username);
        $stmt->execute();

        $sql = "UPDATE tbl_employee SET emp_status = 'inactive' WHERE last_login < NOW() - INTERVAL 7 DAY";
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $returnValue = 0;
        if ($stmt->rowCount() > 0) {
            $returnValue = $stmt->fetch(PDO::FETCH_ASSOC);
        }
        $stmt = null;
        $conn = null;
        return json_encode($returnValue);
    }

    function saveEmployee($json){
        include "connection.php";
    
        $json = json_decode($json, true);
    
        $emp_name = $json['emp_name'];
        $emp_username = $json['emp_username'];
        $emp_password = $json['emp_password'];
        $emp_gender = $json['emp_gender'];
        $emp_contactNum = $json['emp_contactNum'];
        $emp_email = $json['emp_email'];
        $emp_address = $json['emp_address'];
        $emp_status = 'active';
    
        $sql = "INSERT INTO tbl_employee(emp_name, emp_username, emp_password, emp_gender, emp_contactNum, emp_email, emp_address, emp_status) ";
        $sql .= "VALUES(:emp_name, :emp_username, :emp_password, :emp_gender, :emp_contactNum, :emp_email, :emp_address, :emp_status)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":emp_name", $emp_name);
        $stmt->bindParam(":emp_username", $emp_username);
        $stmt->bindParam(":emp_password", $emp_password);
        $stmt->bindParam(":emp_gender", $emp_gender);
        $stmt->bindParam(":emp_contactNum", $emp_contactNum);
        $stmt->bindParam(":emp_email", $emp_email);
        $stmt->bindParam(":emp_address", $emp_address);
        $stmt->bindParam(":emp_status", $emp_status);
    
        $stmt->execute();
        $returnValue = $stmt->rowCount() > 0 ? 1 : 0;
    
        return $returnValue;

    }

    function getEmployee() {
        include "connection.php";

        $sql = "SELECT * FROM tbl_employee ";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $conn = null; $stmt=null;
        //var_dump($result);
        return json_encode($result);
    }

    /*function archiveEmployee($empId){
        include "conn.php";
    
        $sql = "DELETE FROM tbl_employee WHERE emp_id = :empId";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":empId", $empId);
    
        $stmt->execute();
    
        $returnValue = 0;
        if($stmt->rowCount() > 0){
            $returnValue = 1;
        }
    
        $stmt = null;
        $conn = null;
    
        return $returnValue;
    }*/

    function getEmployeeById($emp_id) {
        include "connection.php";
            
        $sql = "SELECT * FROM tbl_employee WHERE emp_id = :emp_id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":emp_id", $emp_id);
        $stmt->execute();
        
        $userData = $stmt->fetch(PDO::FETCH_ASSOC);
        
        $conn = null;
        $stmt = null;
        
        if ($data) {
            $employee = $data;
        }
        
        echo json_encode($employee);
    }
    
    

    function updateEmployee($json) {
        include "connection.php";
    
            $json = json_decode($json, true);
            $emp_id = $json['emp_id'];
            $emp_name = $json['emp_name'];
            $emp_gender = $json['emp_gender'];
            $emp_contactNum = $json['emp_contactNum'];
            $emp_email = $json['emp_email'];
            $emp_address = $json['emp_address'];
    
            $sql = "UPDATE tbl_employee SET emp_name = :emp_name, emp_gender = :emp_gender, emp_contactNum = :emp_contactNum, emp_email = :emp_email, emp_address = :emp_address WHERE emp_id = :emp_id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":emp_id", $emp_id);
            $stmt->bindParam(":emp_name", $emp_name);
            $stmt->bindParam(":emp_gender", $emp_gender);
            $stmt->bindParam(":emp_contactNum", $emp_contactNum);
            $stmt->bindParam(":emp_email", $emp_email);
            $stmt->bindParam(":emp_address", $emp_address);
            $stmt->execute();
            $returnValue = 0;
            if ($stmt->rowCount() > 0) {
                $returnValue = 1;
            }
    
            $stmt = null;
            $conn = null;
    
            return $returnValue;
    }
    
}

$json = isset($_POST['json']) ? $_POST['json'] : "";
$operation = $_POST['operation'];

$employee = new Employee();
switch ($operation) {
    case "login":
        echo $employee->login($json);
        break;
    case "saveEmployee":
        echo $employee->saveEmployee($json);
        break;
    case "getEmployee":
        echo $employee->getEmployee($json);
        break;
    case "getEmployeeById":
        echo $employee->getEmployeeById($json);
        break;
    case "updateEmployee":
        echo $employee->updateEmployee($json);
        break;
    /*case "archiveEmployee":
        echo $employee->archiveEmployee($json);
        break;*/
    
}