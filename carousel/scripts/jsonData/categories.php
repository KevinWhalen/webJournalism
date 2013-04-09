<?php
$sqldb = "mysql";
$dbhost = "dbdev.cs.kent.edu";
$dbname = "kwhalen";
$dbuser = "kwhalen";
$dbpass = "810161389";

// grab parameters sent from front end
//$title = $_GET['']; // or $_POST['']
//$title = mysqli_real_escape_string($title);


// Connect to MySQL Server
try {
	// database handle
	$dbh = new PDO("$sqldb:host=$dbhost;dbname=$dbname", 
		"$dbuser", "$dbpass");

	$sql = "SELECT DISTINCT category AS categories FROM video";
	$statement = $dbh->query($sql);
	$data = Array();
	$data = $statement->fetchAll();
	echo json_encode($data);

	$dbh = NULL;

} catch (PDOException $e) {
	print "Error!: " . $e->getMessage() . "<br/>";
	//die();
}/* finally { // CS server's PHP does not support finally (throws 500)
	if ($dbh){
		$dbh = NULL;
	}
}
*/

/*
// create query statement
$statement = $dbh->query("SELECT DISTINCT category AS categories FROM video");
// run query
$row = $statement->fetch(PDO::FETCH_ASSOC);
//echo htmlentities($row['categories']);
echo json_encode($row);
*/


// use the prepare and execute model when the statement is built instead of
// explicitly written. (instead of making a query and fetching results.)
//===============================================================
/* Execute a prepared statement by passing an array of values */
/*
$sql = 'SELECT name, colour, calories
    FROM fruit
	WHERE calories < :calories AND colour = :colour';
// statement handle
$sth = $dbh->prepare($sql, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
$sth->execute(array(':calories' => 150, ':colour' => 'red'));
$red = $sth->fetchAll();
$sth->execute(array(':calories' => 175, ':colour' => 'yellow'));
$yellow = $sth->fetchAll();


	foreach($dbh->query('SELECT * from FOO') as $row) {
		print_r($row);
	}


PDO::exec() - Execute an SQL statement and return the number of affected rows
PDO::query() - Executes an SQL statement, returning a result set as a PDOStatement object
PDOStatement::execute() - Executes a prepared statement
*/

//===============================================================
/* Connection examples */
/* PDO object oriented database API
$pdo = new PDO('mysql:host=example.com;dbname=database', 'user', 'password');
$statement = $pdo->query("SELECT 'Hello, dear MySQL user!' AS _message FROM DUAL");
$row = $statement->fetch(PDO::FETCH_ASSOC);
echo htmlentities($row['_message']);
*/
/* // mysql precedural
	mysql_connect($dbhost, $dbuser, $dbpass);
	mysql_select_db($dbname) or die(mysql_error());
	$qry_result = mysql_query($query) or die(mysql_error());
	$query = "SELECT videoId FROM video WHERE category = '$title'";
	while($row = mysql_fetch_array($qry_result)){}
*/

?>
