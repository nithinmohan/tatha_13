<?php
require_once("config.php");

if (isset($_POST["newclg"])) {
  $mysqli = new mysqli($host,$db_user,$db_password,$db_name);
  if ($mysqli->connect_errno)
    die('[0,"Connect failed: '.$mysqli->connect_error.'"]');

  $nc = $mysqli->real_escape_string(trim($_POST["newclg"]));
  if (preg_match('/fuck|wank|fanny|bastard|bitch|suck|\bdick|\bcock|boobs|ass.?hole/i', $nc))
	echo '[0]';
    else if ($mysqli->query("INSERT INTO colleges(name,validated) VALUES ('$nc',1)")) {
	$result=$mysqli->query("SELECT id, name FROM colleges WHERE name='$nc'");
	$row = $result->fetch_assoc();
	echo "[1,$row[id],\"$row[name]\"]";
  } else
	echo '[0]';
  $mysqli->close();
} else echo '[]';
?>