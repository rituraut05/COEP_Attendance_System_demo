<?php
ini_set('display_errors',1); 
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$servername = "localhost";
$username = "id4274817_root";
$password = "rrrrrrrr";
$dbname = "id4274817_1234";

$conn = mysqli_connect($servername, $username, $password, $dbname);
if(!$conn){
	die("Connection failed: " .mysqli_connect_error());
}

    if(!mysqli_query($conn, "update attendance set attendance = 0")){
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