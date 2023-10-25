<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");

    class Cpurlin {
        function addCpurlin($json){
            include "connection.php";
        
            $json = json_decode($json, true);
            $cpurlin_date = $json['cpurlin_date'];
            $cpurlin_roll = $json['cpurlin_roll'];
            $cpurlin_thickness = $json['cpurlin_thickness'];
            $cpurlin_width = $json['cpurlin_width'];
            $cpurlin_netweight = $json['cpurlin_netweight'];

            $sql = "INSERT INTO tbl_cpurlin(cpurlin_date, cpurlin_roll, cpurlin_thickness, cpurlin_width, cpurlin_netweight) ";
            $sql .= "VALUES(:cpurlin_date, :cpurlin_roll, :cpurlin_thickness, :cpurlin_width, :cpurlin_netweight)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":cpurlin_date", $cpurlin_date);
            $stmt->bindParam(":cpurlin_roll", $cpurlin_roll);
            $stmt->bindParam(":cpurlin_thickness", $cpurlin_thickness);
            $stmt->bindParam(":cpurlin_width", $cpurlin_width);
            $stmt->bindParam(":cpurlin_netweight", $cpurlin_netweight);
        
            $stmt->execute();
            $returnValue = $stmt->rowCount() > 0 ? 1 : 0;
        
            return $returnValue;
 
        }

        function getCpurlin() {
            include "connection.php";
    
            $sql = "SELECT * FROM tbl_cpurlin ";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $conn = null; $stmt=null;
            //var_dump($result);
            return json_encode($result);
        }
    }
    $json = isset($_POST['json']) ? $_POST['json'] : "";
    $operation = $_POST['operation'];

    $cpurlin = new Cpurlin();
    switch($operation){
        case "addCpurlin":
            echo $cpurlin->addCpurlin($json);
            break;
        case "getCpurlin":
            echo $cpurlin->getCpurlin();
            break;
    }

?>
