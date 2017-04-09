<?php
    $db = mysqli_connect ("localhost", "root", 1234) or die (mysqli_connect_error());
	mysqli_select_db ($db, "playbookdatabase") or die (mysqli_error);
    
    $date = date('m/d/Y h:i:s a', time());
    // mysqli_query ($db, "INSERT INTO PlayFull (PlayName, PlayString, CreatedBy, CanvasObj, CreateDate) VALUES ('playname', 'playstring', 'Yudhvir', 'cs', '1000-01-01 00:00:00')");
 /*  
    mysqli_query ($db, "INSERT INTO PlayFull (PlayName, PlayString, CreatedBy, CanvasString, CreateDate) VALUES ('morris', 'arr', 'Yudhvir', 'cs', null)");
    mysqli_query ($db, "INSERT INTO PlayFull (PlayName, PlayString, CreatedBy, CanvasString, CreateDate) VALUES ('jason', 'sek', 'Yudhvir', 'cs', null)");
    mysqli_query ($db, "INSERT INTO PlayFull (PlayName, PlayString, CreatedBy, CanvasString, CreateDate) VALUES ('yudhvir', 'raj', 'Yudhvir', 'cs', null)");
    mysqli_query ($db, "INSERT INTO PlayFull (PlayName, PlayString, CreatedBy, CanvasString, CreateDate) VALUES ('playname', 'playstring', 'Yudhvir', 'cs', null)");
    mysqli_query ($db, "INSERT INTO PlayFull (PlayName, PlayString, CreatedBy, CanvasString, CreateDate) VALUES ('playname', 'playstring', 'Yudhvir', 'cs', null)");
    */
    $result = mysqli_query ($db, "SELECT * FROM playfull");
    $resultArr = array ();
    while ($row = mysqli_fetch_assoc ($result))
        array_push ($resultArr, $row);
    $Jresult = json_encode($resultArr);
    echo $Jresult;
?>