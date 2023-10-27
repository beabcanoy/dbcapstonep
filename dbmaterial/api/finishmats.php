<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");

    class FinishMats {
        function addFinishMats($json){
            include "connection.php";
        
            $json = json_decode($json, true);
            $fm_date = $json['fm_date'];
            $fm_companyName = $json['fm_companyName'];
            $fm_productName = $json['fm_productName'];
            $fm_rawType = $json['fm_rawType'];
            $fm_color = $json['fm_color'];
            $fm_thickness = $json['fm_thickness'];
            $fm_width = $json['fm_width'];
            $fm_length = $json['fm_length'];
            $fm_pcs = $json['fm_pcs'];
            $fm_netweight = $json['fm_netweight'];

            $sql = "INSERT INTO tbl_finish_materials(fm_date, fm_companyName, fm_productName, fm_rawType, fm_color, fm_thickness, fm_width, fm_length, fm_pcs, fm_netweight) ";
            $sql .= "VALUES(:fm_date, :fm_companyName, :fm_productName, :fm_rawType, :fm_color, :fm_thickness, :fm_width, :fm_length, :fm_pcs, :fm_netweight)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(":fm_date", $fm_date);
            $stmt->bindParam(":fm_companyName", $fm_companyName);
            $stmt->bindParam(":fm_productName", $fm_productName);
            $stmt->bindParam(":fm_rawType", $fm_rawType);
            $stmt->bindParam(":fm_color", $fm_color);
            $stmt->bindParam(":fm_thickness", $fm_thickness);
            $stmt->bindParam(":fm_width", $fm_width);
            $stmt->bindParam(":fm_length", $fm_length);
            $stmt->bindParam(":fm_pcs", $fm_pcs);
            $stmt->bindParam(":fm_netweight", $fm_netweight);
        
            $stmt->execute();
            $returnValue = $stmt->rowCount() > 0 ? 1 : 0;
        
            return $returnValue;
 
        }

        /*function getFinishMats() {
            include "connection.php";
    
            $sql = "SELECT * FROM tbl_finish_materials ";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $conn = null; $stmt=null;
            //var_dump($result);
            return json_encode($result);
        }*/

        function getRawType() {
            include "connection.php";
    
            $sql = "SELECT rawType_id, rawType_name FROM tbl_rawType ";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $conn = null; $stmt=null;
            //var_dump($result);
            return json_encode($result);
        }
    
        function getRecords(){
            include "connection.php";
            $sql = "SELECT tbl_finish_materials.fm_date, tbl_finish_materials.fm_companyName, tbl_finish_materials.fm_productName, tbl_rawType.rawType_name, ";
            $sql .= "tbl_finish_materials.fm_color, tbl_finish_materials.fm_thickness, tbl_finish_materials.fm_width, tbl_finish_materials.fm_length, tbl_finish_materials.fm_pcs, tbl_finish_materials.fm_netweight ";
            $sql .= "FROM tbl_finish_materials ";
            $sql .= "INNER JOIN tbl_rawType ON tbl_finish_materials.fm_rawType = tbl_rawType.rawType_id";
            
            $stmt = $conn->prepare($sql);
            $stmt->execute();
    
            $returnValue = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $conn = null; $stmt=null;
    
            return json_encode($returnValue);
        }
    
    }
    $json = isset($_POST['json']) ? $_POST['json'] : "";
    $operation = $_POST['operation'];

    $finishmats = new FinishMats();
    switch($operation){
        case "addFinishMats":
            echo $finishmats->addFinishMats($json);
            break;
        case "getRawType":
            echo $finishmats->getRawType();
            break;
        case "getRecords":
            echo $finishmats->getRecords();
            break;
    }

?>
