<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");

    class Steel {
        function addSteel($json){
            include "connection.php";
        
            $json = json_decode($json, true);
            $steeldeck_regisDate = $json['steeldeck_regisDate'];
            $steeldeck_roll = $json['steeldeck_roll'];
            $steeldeck_thickness = $json['steeldeck_thickness'];
            $roll_net_weight = $json['roll_net_weight'];

            $sql = "INSERT INTO tbl_steeldeck(steeldeck_regisDate, steeldeck_roll, steeldeck_thickness, roll_net_weight) ";
            $sql .= "VALUES(:steeldeck_regisDate, :steeldeck_roll, :steeldeck_thickness, :roll_net_weight)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":steeldeck_regisDate", $steeldeck_regisDate);
            $stmt->bindParam(":steeldeck_roll", $steeldeck_roll);
            $stmt->bindParam(":steeldeck_thickness", $steeldeck_thickness);
            $stmt->bindParam(":roll_net_weight", $roll_net_weight);
        
            $stmt->execute();
            $returnValue = $stmt->rowCount() > 0 ? 1 : 0;
        
            return $returnValue;
 
        }

        function getSteel() {
            include "connection.php";
    
            $sql = "SELECT * FROM tbl_steeldeck ";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $conn = null; $stmt=null;
            //var_dump($result);
            return json_encode($result);
        }

        function getSteelById($emp_id) {
            include "connection.php";
                
            $sql = "SELECT * FROM tbl_steeldeck WHERE steeldeck_id = :steeldeck_id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":steeldeck_id", $steeldeck_id);
            $stmt->execute();
            
            $userData = $stmt->fetch(PDO::FETCH_ASSOC);
    
            if ($userData) {
                $employee = $userData;
            }
            
            $conn = null;
            $stmt = null;
            
            echo json_encode($employee);
        }
        
        
    
        function updateSteel($json) {
            include "connection.php";
        
                $json = json_decode($json, true);
                $steeldeck_id = $json['steeldeck_id'];
                $steeldeck_regisDate = $json['steeldeck_regisDate'];
                $steeldeck_roll = $json['steeldeck_roll'];
                $steeldeck_thickness = $json['steeldeck_thickness'];
                $roll_net_weight = $json['roll_net_weight'];
        
                $sql = "UPDATE tbl_steeldeck SET steeldeck_regisDate = :steeldeck_regisDate, steeldeck_roll = :steeldeck_roll, steeldeck_thickness = :steeldeck_thickness, roll_net_weight = :roll_net_weight WHERE steeldeck_id = :steeldeck_id";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(":steeldeck_id", $steeldeck_id);
                $stmt->bindParam(":steeldeck_regisDate", $steeldeck_regisDate);
                $stmt->bindParam(":steeldeck_roll", $steeldeck_roll);
                $stmt->bindParam(":steeldeck_thickness", $steeldeck_thickness);
                $stmt->bindParam(":roll_net_weight", $roll_net_weight);
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

    $steel = new Steel();
    switch($operation){
        case "addSteel":
            echo $steel->addSteel($json);
            break;
        case "getSteel":
            echo $steel->getSteel();
            break;
            case "getSteelById":
                echo $steel->getSteelById($steeldeck_id);
                break;
            case "updateSteel":
                echo $steel->updateSteel($json);
                break;
    }

?>
