<?php
require_once("config.php");
session_start();

if (!isset($_SESSION['user']))
  die('[]');
if (isset($_GET["q"])) {
  $mysqli = new mysqli($host,$db_user,$db_password,$db_name);
  if ($mysqli->connect_errno)
    die('[0,"Connect failed: '.$mysqli->connect_error.'"]');
  $q = $mysqli->real_escape_string($_GET["q"]);
  if (preg_match('/^[0-9]+/i', $q))
	$sq = "id LIKE '$q%'";
  else if (preg_match('/^TAT[0-9]+/i', $q)) {
	$q = substr($q, 3);
	$sq = "id LIKE '$q%'";
  } else {
	$q = trim(preg_replace('/[^a-zA-Z]+/', ' ', $q));
	$sq = "name LIKE '%" . str_replace(' ', "%' AND name LIKE '%", $q) . "%'";
  }
  $addq = "'$_SESSION[tat_id]'";
  if (isset($_GET["exclude"]) && $_GET["exclude"]) {
	$addq .= ",'".str_replace('|', "','", $mysqli->real_escape_string($_GET["exclude"]))."'";
  }
  $result=$mysqli->query("SELECT id, name FROM student_reg WHERE $sq AND id NOT IN ($addq) LIMIT 10");
  $mates=array();
  while ($row = $result->fetch_assoc())
	$mates[] = array("id" => $row['id'], "name" => $row['name']);
  $result->free();
  $mysqli->close();
  print json_encode($mates);
} else
  echo '[]';
?>