<?php
require_once("config.php");

function fill_clgs($sx, $limit, $exclude=array()) {
  global $clgs, $mysqli;
  $addq = (empty($exclude)) ? '' : 'AND id NOT IN ('.implode(',',$exclude).')';
  $result=$mysqli->query("SELECT id, name FROM colleges WHERE (name LIKE '$sx') $addq AND validated=1 LIMIT $limit");
  $ids = array();
  while ($row = $result->fetch_assoc()) {
	$clgs[] = array("id" => $row['id'], "name" => $row['name']);
	$ids[] = $row['id'];
  }
  $result->free();
  return $ids;
}
if (isset($_GET["q"])) {
  $mysqli = new mysqli($host,$db_user,$db_password,$db_name);
  if ($mysqli->connect_errno)
	die('[0,"Connect failed: '.$mysqli->connect_error.'"]');

  $q = $mysqli->real_escape_string(trim($_GET["q"]));
  $clgs = array();
  $ids = fill_clgs("$q%", 8);
  if (count($ids)<8) {
	$q_fltrd = preg_replace('/[^a-zA-Z]/','',$q);
	$sx = preg_replace('/([a-zA-Z])([a-zA-Z])/','$1% $2', $q_fltrd);
	$sx = preg_replace('/([a-zA-Z])([a-zA-Z])/','$1% $2', $sx);
	$sx = "$sx%";
	$ids = array_merge(fill_clgs($sx, 8-count($ids), $ids), $ids);
	if (count($ids)<8) {
	  $sx = preg_replace('/([a-zA-Z])([a-zA-Z])/','$1%$2%', $q_fltrd);
	  $ids = array_merge(fill_clgs($sx, 8-count($ids), $ids), $ids);
	  if (count($ids)<8) {
		$q_fltrd = preg_replace('/[^a-zA-Z]/','5', $q);
		$q_fltrd = preg_replace('/5+/','|', $q_fltrd);
		$q_fltrd = trim($q_fltrd, '|');
		$sx = '%'.str_replace('|',"%' AND name like '%", $q_fltrd).'%';
		$ids = array_merge(fill_clgs($sx, 8-count($ids), $ids), $ids);
	  }
	}
  }
  $mysqli->close();
  print json_encode($clgs);
}
?>