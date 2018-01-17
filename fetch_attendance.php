<?php
$servername = "localhost";
$username = "id4274817_root";
$password = "rrrrrrrr";
$dbname = "id4274817_1234";

$conn = mysqli_connect($servername, $username, $password, $dbname);
if(!$conn){
	die("Connection failed: " .mysqli_connect_error());
}

$showData = "SELECT * FROM attendance";
$data = array();
$result = mysqli_query($conn, $showData);

if(mysqli_num_rows($result) > 0){
	while($row = mysqli_fetch_assoc($result)){
		$data[] = $row;
	}
} else {
	echo "0 results";
};
//print json_encode($data);
$response = json_encode($data);
mysqli_close($conn);
echo($response);
?>