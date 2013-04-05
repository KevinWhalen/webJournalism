<?php

// It's a small data set and already exsists from testing as a JSON.
// Scratched any ideas of source the data from some where.
// ...Unless we feel the need to move it to the site's database.

// Script to source data from .json file for use as a global JSON object.
// Preformed at page load only.

$filename = "./data/reseached.json";

// file string
  $jsonString = file_get_contents($filename);

//  javacript
$out = json_encode($data);
echo "window.researchData = $out;" . PHP_EOL;

?>
