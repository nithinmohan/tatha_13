<?php
require_once("initdb.php");
session_start();

if (!isset($_SESSION['user']))
  die('[]');
$tat_id = $_SESSION['tat_id'];
$pres=$mysqli->query("SELECT name, phone, email, (SELECT colleges.name FROM colleges WHERE colleges.id=clg_id) AS clg FROM student_reg WHERE id='$tat_id'");
if ($row = $pres->fetch_assoc()) {
  $clg = trim($row['clg']);
  echo "{\"tat_id\":\"$tat_id\",\"name\":\"$row[name]\",\"college\":\"$clg\",\"phone\":\"$row[phone]\",\"email\":\"$row[email]\",\"events\":[";
  $eres=$mysqli->query("SELECT code, team_id, (SELECT name FROM events WHERE events.code=event_reg.code) AS ename FROM event_reg WHERE tat_id='$tat_id'");
  $i=0;
  while ($erow = $eres->fetch_assoc()) {
    !$i && ($i=1) || print ",";
    echo "{\"eventname\":\"$erow[ename]\",\"eventcode\":\"$erow[code]\",\"team_id\":\"$erow[team_id]\",\"mates\":[";
    $tres=$mysqli->query("SELECT tat_id, (SELECT name FROM student_reg WHERE id=tat_id) AS name FROM event_reg WHERE code='$erow[code]' AND team_id='$erow[team_id]' AND tat_id!='$tat_id'");
    $j=0;
    while ($trow = $tres->fetch_assoc()) {
      !$j && ($j=1) || print ",";
      echo "{\"tat_id\":\"$trow[tat_id]\",\"name\":\"$trow[name]\"}";
    }
    $tres->free();
    echo "]}";
  }
  $eres->free();
  echo "]}";
} else {
  session_destroy();
  echo "[]";
}
$pres->free();
?>
