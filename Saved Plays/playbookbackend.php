<?php
    $db = mysqli_connect ("localhost", "root", 1234) or die (mysqli_connect_error());
	mysqli_select_db ($db, "Playbook") or die(mysqli_error);
    mysqli_query ($db, "INSERT INTO PlayFull (PlayName, PlayString, CreatedBy, CanvasString, UpdateDate) VALUES ('playname', 'playstring', 'Yudhvir', 'cs', null)");
    mysqli_query ($db, "INSERT INTO PlayFull (PlayName, PlayString, CreatedBy, CanvasString, UpdateDate) VALUES ('morris', 'arr', 'Yudhvir', 'cs', null)");
    mysqli_query ($db, "INSERT INTO PlayFull (PlayName, PlayString, CreatedBy, CanvasString, UpdateDate) VALUES ('jason', 'sek', 'Yudhvir', 'cs', null)");
    mysqli_query ($db, "INSERT INTO PlayFull (PlayName, PlayString, CreatedBy, CanvasString, UpdateDate) VALUES ('yudhvir', 'raj', 'Yudhvir', 'cs', null)");
    mysqli_query ($db, "INSERT INTO PlayFull (PlayName, PlayString, CreatedBy, CanvasString, UpdateDate) VALUES ('playname', 'playstring', 'Yudhvir', 'cs', null)");
    mysqli_query ($db, "INSERT INTO PlayFull (PlayName, PlayString, CreatedBy, CanvasString, UpdateDate) VALUES ('playname', 'playstring', 'Yudhvir', 'cs', null)");
    $result = mysqli_query ($db, "SELECT * FROM PlayFull");
    $resultArr = array ();
    while ($row = mysqli_fetch_assoc ($result))
        array_push ($resultArr, $row);
    $Jresult = json_encode($resultArr);
    echo $Jresult;
?>