<?php
ini_set('display_errors',1); 
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$servername = "172.31.10.136";
$username = "root";
$password = "rrrrrrrr";
$dbname = "sds-attendance";

$conn = mysqli_connect($servername, $username, $password, $dbname);
if(!$conn){
	die("Connection failed: " .mysqli_connect_error());
}

$json = file_get_contents('php://input');
$json_array = json_decode($json, true);

 $mapping = array("57 99 DC F3"=>"111403059", "C4 DF 75 9F"=>"111403071", "57 B6 DD F3"=>"111403002", "2D 14 09 FB"=>"111410135", "04 94 76 9F"=>"111410133");


    foreach($json_array["mis"] as $mis) {
        if(!mysqli_query($conn,"update attendance set attendance = 1 where mis = '$mapping[$mis]'")){
            printf("Errormessage: %s\n", mysqli_error($conn));
            die();
        };
        printf("%d\n", $mapping[$mis]);
    
    }
    mysqli_close($conn);

    $response = array();
    $response["message"] = "Attendance saved";
    $response["success"] = 1;
    echo json_encode($response);

?>