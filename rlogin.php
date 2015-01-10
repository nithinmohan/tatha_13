<?php
require_once("initdb.php");
session_start();

if (isset($_SESSION['user']))
  echo "[-1,\"$_SESSION[user]\",\"$_SESSION[tat_id]\"]";
else if (isset($_POST["user"])) {
  $user = $mysqli->real_escape_string(strtolower(trim($_POST["user"])));
  $pass = $_POST["pass"];
  $pass = hash('sha256',$_POST["pass"]);
  $result=$mysqli->query("SELECT id, name, clg_id FROM student_reg WHERE user='$user' AND pass='$pass'");
  if ($row = $result->fetch_assoc()) {
    $_SESSION['user'] = $user;
    $_SESSION['tat_id'] = $row['id'];
    $_SESSION['clg_id'] = $row['clg_id'];
    echo "[1,\"$user\",$row[id],\"$row[name]\"]";
  } else
    echo '[0,"Invalid username/password!"]';
  $mysqli->close();
} else echo '[]';
?>