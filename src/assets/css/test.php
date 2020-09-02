
<?php
$matrix=  array();

foreach (range(1,4) as $row) {
 foreach (range(1,4) as $col) {
  $matrix[$row][$col] = $row.$col;
 }
}

print_r($matrix);
