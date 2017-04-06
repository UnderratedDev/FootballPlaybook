<?php
    $db = mysqli_connect ("localhost", "root", 1234) or die (mysqli_connect_error());
	mysqli_select_db ($db, "Playbook") or die(mysqli_error);
    mysqli_query ($db, "INSERT INTO PlayFull (PlayName, PlayString, CreatedBy, UpdateDate) VALUES ('Morris', 'Hello', 'Yudhvir', null)");
    $result = mysqli_query ($db, "SELECT * FROM PlayFull");
    $resultArr = array ();
    while ($row = mysqli_fetch_assoc ($result))
        array_push ($resultArr, $row);
    $Jresult = json_encode($resultArr);
    echo $Jresult;
?>