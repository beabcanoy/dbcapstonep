<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");

    class RawMats{
        function addRawMats($json){
            include "connection.php";
        
            $json = json_decode($json, true);
            $rawType_name = $json['rawType_name'];
            $rawType_date = $json['rawType_date'];

            $sql = "INSERT INTO tbl_rawtype(rawType_name, rawType_date) ";
            $sql .= "VALUES(:rawType_name, :rawType_date)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":rawType_name", $rawType_name);
            $stmt->bindParam(":rawType_date", $rawType_date);
        
            $stmt->execute();
            $returnValue = $stmt->rowCount() > 0 ? 1 : 0;
        
            return $returnValue;
 
        }

        function getRawMats() {
            include "connection.php";
    
            $sql = "SELECT * FROM tbl_rawtype ";
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

    $rawmats = new RawMats();
    switch($operation){
        case "addRawMats":
            echo $rawmats->addRawMats($json);
            break;
        case "getRawMats":
            echo $rawmats->getRawMats();
            break;
    }

?>
