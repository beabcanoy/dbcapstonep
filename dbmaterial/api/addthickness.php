<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");

    class Thickness{
        function addThickness($json){
            include "connection.php";
        
            $json = json_decode($json, true);
            $thickness = $json['thickness'];
            $date = $json['date'];

            $sql = "INSERT INTO tbl_thickness(thickness, date) ";
            $sql .= "VALUES(:thickness, :date)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":thickness", $thickness);
            $stmt->bindParam(":date", $date);
        
            $stmt->execute();
            $returnValue = $stmt->rowCount() > 0 ? 1 : 0;
        
            return $returnValue;
 
        }

        function getThickness() {
            include "connection.php";
    
            $sql = "SELECT * FROM tbl_thickness ";
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

    $thickness = new Thickness();
    switch($operation){
        case "addThickness":
            echo $thickness->addThickness($json);
            break;
        case "getThickness":
            echo $thickness->getThickness();
            break;
    }

?>
