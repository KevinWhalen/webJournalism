<?php
//!/usr/bin/php swap # for // or use fwrite(stream, output)
//fwrite(STDERR, "output check\n");
/* Script to extract a data set made of the dates used in the .csv weather 
 * files. Writes to weatherDates.json.
 *
 * Extra code is practice for a function to access all of the state .csv files.
*/

// specify input/output
$directory = "../csv";
$outputFile = "yearsUsed.json";

//verify directory and open. then read in file names and sort.
if ((is_dir($directory)) && ($handle = opendir($directory))){
	while (false !== ($entries[] = readdir($handle)));
	closedir($handle);
	sort($entries);
//	foreach ($entries as $entry){
	$entry = $entries[3];
//fwrite(STDOUT, $entry . PHP_EOL);
		if ($entry != "." && $entry != ".."){
			$fullname = $directory . "/" . $entry;
			$handle = fopen($fullname, 'r') or 
				die("Bad file name: $fullname".PHP_EOL);
			$csvArray = fgetcsv($handle) or 
				die ("Not .csv file: $entry".PHP_EOL);
			while ($column = current($csvArray)){
				if ($column == "YearMonth"){
					$key = key($csvArray);
				}
				next($csvArray);
			}
			$idx = 0;
			while (($line = fgetcsv($handle)) !== false) {
				$data[$idx] = $line[$key];
				$idx++;
			}
			fclose($handle);
		}
//	}
		$handle = fopen($outputFile, 'x') or 
			die("$outputFile may already exist".PHP_EOL);
		$out = json_encode($data);
		fwrite($handle, $out);
		fclose($handle);
} else print("Could not open directory: $directory".PHP_EOL);

?>
