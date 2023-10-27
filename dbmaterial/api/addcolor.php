<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");

    class Color{
        function addColor($json){
            include "connection.php";
        
            $json = json_decode($json, true);
            $color_name = $json['color_name'];
            $color_date = $json['color_date'];

            $sql = "INSERT INTO tbl_color(color_name, color_date) ";
            $sql .= "VALUES(:color_name, :color_date)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":color_name", $color_name);
            $stmt->bindParam(":color_date", $color_date);
        
            $stmt->execute();
            $returnValue = $stmt->rowCount() > 0 ? 1 : 0;
        
            return $returnValue;
 
        }

        function getColor() {
            include "connection.php";
    
            $sql = "SELECT * FROM tbl_color ";
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

    $color = new Color();
    switch($operation){
        case "addColor":
            echo $color->addColor($json);
            break;
        case "getColor":
            echo $color->getColor();
            break;
    }

?>
