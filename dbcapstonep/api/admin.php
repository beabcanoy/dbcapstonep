<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");
    
    class Admin {

        function login($json){
            include "connection.php";
        
            $json = json_decode($json, true);
            $admin_username = $json['admin_username'];
            $admin_password = $json['admin_password'];
            
            $sql = "SELECT admin_id, admin_name, admin_username, admin_password FROM tbl_admin ";
            $sql .= "WHERE  admin_username=:username";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":admin_username", $admin_username);
            $stmt->execute();
            
            $returnValue = 0;
            if($stmt->rowCount() > 0){
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                $hashedPassword = $row['admin_password'];
                
                if (password_verify($admin_password, $hashedPassword)) {
                    $returnValue = $row;
                }
            }
            $stmt = null;
            $conn = null;
            return json_encode($returnValue);
        }

    }

    $json = isset($_POST['json']) ? $_POST['json'] : "";
    $operation = $_POST['operation'];

    $admin = new Admin();
    switch($operation){
        case "login":
            echo $admin->login($json);
            break;
    }
?>
