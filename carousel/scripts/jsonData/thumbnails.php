<?php
$sqldb = "mysql";
$dbhost = "dbdev.cs.kent.edu";
$dbname = "kwhalen";
$dbuser = "kwhalen";
$dbpass = "810161389";

// parameters
if($_POST['category']){
	$pCategory = $_POST['category'];
} else if($_GET['category']){
	$pCategory = $_GET['category'];
} else {
	$pCategory = "suicide";
}
// should probably check that the category exists
// can't trust the front end when it allows it be set by GET


// Connect to MySQL Server
try {
	// database handle
	$dbh = new PDO("$sqldb:host=$dbhost;dbname=$dbname", 
		"$dbuser", "$dbpass");

	// query
	$sql = "SELECT thumbnail_default AS thumbnail, videoId as id  
			FROM video 
			WHERE category = :calories";

	// statement handle
$sth = $dbh->prepare($sql, Array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
	$sth->execute(Array(':calories' => $pCategory));
	$data = Array();
	$data = $sth->fetchAll();

//var_dump($data);
	// output results as JSON
	$rowCount = count($data);
	echo "[" . PHP_EOL;
	for ($i = 0; $i < $rowCount - 1; $i++){
		echo "{\"thumbnail\":\"" . $data[$i]['thumbnail'] . "\", ",
			"\"id\":\"" . $data[$i]['id'] . "\"}," . PHP_EOL;
	}
	echo "{\"thumbnail\":\"" . $data[($rowCount - 1)]['thumbnail'] . "\", ",
		"\"id\":\"" . $data[($rowCount - 1)]['id'] . "\"}," . PHP_EOL;
	echo "]" . PHP_EOL;

	// close connection
	$dbh = NULL;

} catch (PDOException $e) {
	print "Error!: " . $e->getMessage() . "<br/>";
	//die();
}

//var_dump($data[0]);
//var_dump(htmlentities($data[0][0]));
//var_dump(htmlspecialchars($data[0][0]));
//var_dump(urlencode($data[0][0]));
//var_dump(rawurlencode($data[0][0]));

//	echo json_encode($data);

?>

