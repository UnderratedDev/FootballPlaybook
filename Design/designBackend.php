<?php
    $db = mysqli_connect ("localhost", "root", 1234) or die (mysqli_connect_error());
    mysqli_select_db ($db, "playbookdatabase") or die (mysqli_error);
	$posted_data;
	$playName;
	$playStr;
    
    if (!empty($_POST['posted_data']) && !empty($_POST['playName']) && !empty($_POST['playStr'])) {
        $posted_data = $_POST['posted_data'];
        $playName    = $_POST['playName'];
        $playStr     = $_POST['playStr'];
        $playId      = $_POST['id'];
        $playStr     = mysqli_real_escape_string($db, $playStr);
        $playName    = mysqli_real_escape_string($db, $playName);
        $playId      = mysqli_real_escape_string($db, $playId);
        if (!empty ($_POST['id'])) {
            mysqli_query ($db, "UPDATE PlayFull SET CanvasObj = '" . $posted_data . "', PlayName = '" . $playName 
                                . "', playString = '" . $playStr . "' WHERE PlayID = '" . $playId . "'") or die (mysqli_error($db));
        } else {  
            $values = "('" . $playName . "', '" . $playStr. "', 'Yudhvir', '" . $posted_data . "','1000-01-01 00:00:00')";
            mysqli_query ($db, "INSERT INTO PlayFull (PlayName, PlayString, CreatedBy, CanvasObj, CreateDate) VALUES " . $values) or die (mysqli_error($db));
        }
    } else if (!empty($_POST['defence']) && !empty($_POST['offence'])) {
        $def = file_get_contents ($_POST['defence'], FILE_USE_INCLUDE_PATH);
        $xml = simplexml_load_string($def);
        $json = json_encode($xml);
        // $array = json_decode($json, TRUE);
        echo $json;
        // $arr = file_get_contents ($_POST['offence'], FILE_USE_INCLUDE_PATH)
    }
	// $data = json_decode($posted_data);
    
	mysqli_select_db ($db, "PlaybookDatabase") or die(mysqli_error($db));
    
    $result    = mysqli_query ($db, "SELECT * FROM PlayFull");
    $resultArr = array(); 
    while ($row = mysqli_fetch_assoc($result))
        array_push($resultArr, $row);
    $j_Result = json_encode ($resultArr);
    
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