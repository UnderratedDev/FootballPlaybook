<?php
    $db = mysqli_connect ("localhost", "root", 1234) or die (mysqli_connect_error());
	$posted_data;
    
    if (!empty($_POST['posted_data'])) {
        $posted_data = $_POST['posted_data'];
        echo $posted_data;
    }
	// $data = json_decode($posted_data);
    
	// mysqli_select_db ($db, "Playbook") or die(mysqli_error);
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