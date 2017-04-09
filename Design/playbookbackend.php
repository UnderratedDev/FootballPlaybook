<?php
    $db = mysqli_connect ("localhost", "root", 1234) or die (mysqli_connect_error());
	mysqli_select_db ($db, "playbookdatabase") or die (mysqli_error($db));
    
    # $date = date('m/d/Y h:i:s a', time());
    
    if (!empty ($_POST['deleteId'])) {
        $deleteId = $_POST['deleteId'];
        mysqli_query ($db, "DELETE FROM PlayFull WHERE PlayID = " . $deleteId) or die (mysqli_error($db));
    }
    
    if (!empty ($_POST['name']) && !empty ($_POST['playString']) && !empty ($_POST['canvasObj'])) {  
        $playName    = $_POST['playString'];
        $playStr     = $_POST['name'];
        $canvasJSON  = $_POST['canvasObj'];
        $playStr     = mysqli_real_escape_string($db, $playStr);
        $playName    = mysqli_real_escape_string($db, $playName);
        $values = "('" . $playName . "', '" . $playStr. "', 'Yudhvir', '" . $canvasJSON . "','1000-01-01 00:00:00')";
        
        // echo "INSERT INTO PlayFull (PlayName, PlayString, CreatedBy, CanvasObj, CreateDate) VALUES " . $values;
        
        mysqli_query ($db, "INSERT INTO PlayFull (PlayName, PlayString, CreatedBy, CanvasObj, CreateDate) VALUES " . $values) or die (mysqli_error($db));
        
        $id = $db->insert_id;
        
        $result = mysqli_query ($db, "SELECT * FROM PlayFull WHERE PlayID = " . $id) or die (mysqli_error($db));
        $row = mysqli_fetch_assoc ($result);
        
        echo json_encode ($row);
    }
    
    if (!empty ($_POST['getData']) && $_POST['getData'] == 1) {
        $result = mysqli_query ($db, "SELECT * FROM playfull");
        $resultArr = array ();
        while ($row = mysqli_fetch_assoc ($result))
            array_push ($resultArr, $row);
        $Jresult = json_encode($resultArr);
        echo $Jresult;
    }
?>