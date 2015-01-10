<?php
if ($_GET['key'] != "ThisWorks") header("Location: index.php") && die();
require_once("config.php");
  $mysqli = new mysqli($host,$db_user,$db_password,'nitcfest_testing`);
  if ($mysqli->connect_errno)
    die('[0,"Connect failed: '.$mysqli->connect_error.'"]');
$result = $mysqli->query('DELETE FROM event_reg a WHERE team_id <> ( SELECT b.tat_id FROM event_reg b WHERE a.code  = b.code AND a.tat_id = b.tat_id )');
echo $result->affected_rows;
?>