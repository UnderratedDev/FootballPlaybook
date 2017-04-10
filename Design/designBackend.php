<?php
    $db = mysqli_connect ("localhost", "root", 1234) or die (mysqli_connect_error());
    mysqli_select_db ($db, "playbookdatabase") or die (mysqli_error);
	$posted_data;
	$playName;
	$playStr;
    $playId;
    
    if (!empty($_POST['posted_data']) && !empty($_POST['playName']) && !empty($_POST['playStr'])) {
        $posted_data = $_POST['posted_data'];
        $playName    = $_POST['playName'];
        $playStr     = $_POST['playStr'];
        if (!empty ($_POST['id'])) {
            $playId      = $_POST['id'];
            $playId      = mysqli_real_escape_string($db, $playId);
        }
        $playStr     = mysqli_real_escape_string($db, $playStr);
        $playName    = mysqli_real_escape_string($db, $playName);
        
        if (!empty ($_POST['id'])) {
            mysqli_query ($db, "UPDATE PlayFull SET CanvasObj = '" . $posted_data . "', PlayName = '" . $playName 
                                . "', playString = '" . $playStr . "' WHERE PlayID = '" . $playId . "'") or die (mysqli_error($db));
        } else {  
            $dateTime = date("Y-m-d H:i:s");
            $values = "('" . $playName . "', '" . $playStr. "', 'Yudhvir', '" . $posted_data . "','" . $dateTime . "')";
            mysqli_query ($db, "INSERT INTO PlayFull (PlayName, PlayString, CreatedBy, CanvasObj, CreateDate) VALUES " . $values) or die (mysqli_error($db));
        }
    } else if (!empty($_POST['defence']) && !empty($_POST['offence'])) {
        $def = file_get_contents ($_POST['defence'], FILE_USE_INCLUDE_PATH);
        $xml = simplexml_load_string($def);
        $json = json_encode($xml);
        $array = json_decode($json, TRUE);
        $jsonResult = array ();
        if (strcmp($_POST['defence'], 'xml/none.xml') !== 0) {
            foreach ($array as $play)
                foreach ($play['Player'] as $player)
                   array_push ($jsonResult, array ("x" => $player['X'], "y" => $player['Y'], "type" => $player['Type']));
        }
        $off = file_get_contents ($_POST['offence'], FILE_USE_INCLUDE_PATH);
        $xml = simplexml_load_string($off);
        $json = json_encode($xml);
        $array = json_decode($json, TRUE);
        if (strcmp($_POST['offence'], 'xml/none.xml') !== 0) {
            foreach ($array as $play)
                foreach ($play['Player'] as $player)
                   array_push ($jsonResult, array ("x" => $player['X'], "y" => $player['Y'], "type" => $player['Type']));
        }
        echo json_encode ($jsonResult);
    
        // $result    = mysqli_query ($db, "SELECT * FROM PlayFull");
        // $resultArr = array(); 
        // while ($row = mysqli_fetch_assoc($result))
           // array_push($resultArr, $row);
        // $j_Result = json_encode ($resultArr);
        /*
        foreach ($array as $value) {
            foreach ($value as $key) {
                array_push ($jsonResult, $key);
                // array_push ($jsonResult, $value);
                // array_push ($jsonResult, array ("x" => $key['X'], "y" => $key['Y'], "type" => $key['Type']));
            }
        } */
        // echo json_encode ($jsonResult);
        // $arr = file_get_contents ($_POST['offence'], FILE_USE_INCLUDE_PATH)
    }
	// $data = json_decode($posted_data);
    
    // echo $j_Result;
    
	// mysqli_query ($db, "INSERT INTO PlayFull (PlayName, PlayString, CreatedBy, UpdateDate) VALUES ('playname', 'playstring', 'Yudhvir', null)");
    // mysqli_query ($db, "INSERT INTO PlayFull (PlayName, PlayString, CreatedBy, UpdateDate) VALUES ('playname', 'playstring', 'Yudhvir', null)");
    /*
	$result = mysqli_query ($db, "SELECT * FROM PlayFull");
    $resultArr = array ();
    while ($row = mysqli_fetch_assoc ($result))
        array_push ($resultArr, $row);
    $Jresult = json_encode($resultArr);
    echo $Jresult; */
?>