<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");

    class Width{
        function addWidth($json){
            include "connection.php";
        
            $json = json_decode($json, true);
            $width = $json['width'];
            $date = $json['date'];

            $sql = "INSERT INTO tbl_width(width, date) ";
            $sql .= "VALUES(:width, :date)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":width", $width);
            $stmt->bindParam(":date", $date);
        
            $stmt->execute();
            $returnValue = $stmt->rowCount() > 0 ? 1 : 0;
        
            return $returnValue;
 
        }

        function getWidth() {
            include "connection.php";
    
            $sql = "SELECT * FROM tbl_width ";
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

    $width = new Width();
    switch($operation){
        case "addWidth":
            echo $width->addWidth($json);
            break;
        case "getWidth":
            echo $width->getWidth();
            break;
    }

?>
