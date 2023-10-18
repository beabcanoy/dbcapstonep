<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");

    class Steel {
        function addSteel($json){
            include "connection.php";
        
            $json = json_decode($json, true);
            $steel_roll = $json['steel_roll'];
            $steel_actual_thickness = $json['steel_actual_thickness'];
            $steel_total_weight = $json['steel_total_weight'];
            $steel_total_weight_left = $json['steel_total_weight_left'];

            $sql = "INSERT INTO tbl_steeldeck(steel_roll, steel_actual_thickness, steel_total_weight, steel_total_weight_left) ";
            $sql .= "VALUES(:steel_roll, :steel_actual_thickness, :steel_total_weight, :steel_total_weight_left)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":steel_roll", $steel_roll);
            $stmt->bindParam(":steel_actual_thickness", $steel_actual_thickness);
            $stmt->bindParam(":steel_total_weight", $steel_total_weight);
            $stmt->bindParam(":steel_total_weight_left", $steel_total_weight_left);
        
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
    }

?>
