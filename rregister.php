<?php
require_once("config.php");
session_start();

function _error($msg) {
  global $mysqli;
  $mysqli->close();
  die("[0,\"$msg\"]");
}

if (!isset($_SESSION['user']))
  die("[-1]");
if (isset($_POST["ecode"])) {
  $ecode = $_POST["ecode"];
  $mysqli = new mysqli($host,$db_user,$db_password,$db_name);
  if ($mysqli->connect_errno)
    die('[0,"Connect failed: '.$mysqli->connect_error.'"]');
  $nex_res = $mysqli->query("SELECT MAX(team_id) FROM event_reg WHERE code='$ecode'");
  $next_tid = 101;
  if (($row=$nex_res->fetch_row()) && $row[0])
    $next_tid = $row[0]+1;
  $query = "INSERT INTO event_reg(code, team_id, tat_id) VALUES ";
  if (isset($_POST['mates']))
    foreach($_POST['mates'] as $value)
      $query .= "('$ecode', '$next_tid', '$value'), ";
  $query .= "('$ecode', '$next_tid', '$_SESSION[tat_id]')";
  if ($mysqli->query($query))
    echo "[1,\"$next_tid\",\"$ecode\"]";
  else if (preg_match('/PRIMARY/',$mysqli->error))
    echo '[0,"Something went wrong! Please try again later. Or contact the event manager!"]';
  else
    echo '[0,"An undocumented error occurred!"]';
  $mysqli->close();
} else echo '[]';
?>