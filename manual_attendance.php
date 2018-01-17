<?php
ini_set('display_errors',1); 
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$servername = "172.31.10.136";
$username = "root";
$password = "rrrrrrrr";
$dbname = "sds";

$conn = mysqli_connect($servername, $username, $password, $dbname);
if(!$conn){
	die("Connection failed: " .mysqli_connect_error());
}

$json = file_get_contents('php://input');
$json_array = json_decode($json, true);
    if(!mysqli_query($conn, "update attendance set attendance = 1 where mis = '$json_array[mis]'")){
        printf("Errormessage: %s\n", mysqli_error($conn));
        die();
    };
    //echo $mis;

    
    mysqli_close($conn);

    $response = array();
    $response["message"] = "Attendance saved";
    $response["success"] = 1;
    echo json_encode($response);

?>