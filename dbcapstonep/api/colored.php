<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");

    class Colored {
        function addColored($json){
            include "connection.php";
        
            $json = json_decode($json, true);
            $colored_date = $json['colored_date'];
            $colored_color = $json['colored_color'];
            $colored_thickness = $json['colored_thickness'];
            $colored_price = $json['colored_price'];
        
            $sql = "INSERT INTO tbl_colored_coil(colored_date, colored_color, colored_thickness, colored_price) ";
            $sql .= "VALUES(:colored_date, :colored_color, :colored_thickness, :colored_price)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":colored_date", $colored_date);
            $stmt->bindParam(":colored_color", $colored_color);
            $stmt->bindParam(":colored_thickness", $colored_thickness);
            $stmt->bindParam(":colored_price", $colored_price);
        
            $stmt->execute();
            $returnValue = $stmt->rowCount() > 0 ? 1 : 0;
        
            return $returnValue;
 
        }

        function getColored() {
            include "connection.php";
    
            $sql = "SELECT * FROM tbl_colored_coil ";
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

    $colored = new Colored();
    switch($operation){
        case "addColored":
            echo $colored->addColored($json);
            break;
        case "getColored":
            echo $colored->getColored();
            break;
    }

?>
