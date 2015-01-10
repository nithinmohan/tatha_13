<?php
require_once("config.php");
session_start();

if (isset($_SESSION['user']))
  die('[-1]');
if (isset($_POST["user"])) {
  $user = strtolower(trim($_POST["user"]));
  $pass = $_POST["pass"];
  $name = $_POST["name"];
  $phone = trim($_POST["phone"]);
  $clg = $_POST["clg"];
  $email = $_POST["email"];
  $year = $_POST["year"];
  $error = "";
  $upat = '/^\w[a-zA-Z0-9._]+$/';
  $npat = '/^[a-zA-Z. ]+$/';
  $ppat = '/^\+?[0-9]{2,7}[- ]?[0-9]{6,8}$/';
  $epat = '/^[a-zA-Z0-9.-_]+@[a-zA-Z]+(\.[a-zA-Z]{2,4}){1,3}/';
  if (!$user || !preg_match($upat, $user))
    $error = "Invalid username!";
  else if (!$pass)
    $error = "Invalid password!";
  else if (!$name || !preg_match($npat, $name))
    $error = "Invalid name!";
  else if (!$clg)
    $error = "Select a college!";
  else if (!$phone || !preg_match($ppat, $phone))
    $error = "Invalid phone number!";
  else if (!$email || !preg_match($epat, $email))
    $error = "Invalid email!";

  if ($error)
    die("[0,\"$error\"]");

  $mysqli = new mysqli($host,$db_user,$db_password,$db_name);
  if ($mysqli->connect_errno)
    die('[0,"Connect failed: '.$mysqli->connect_error.'"]');

  $pass = hash('sha256',$pass);
  if ($mysqli->query("INSERT INTO `student_reg`(`user`, `pass`, `name`, `phone`, `clg_id`, `email`) VALUES ('$user', '$pass', '$name', '$phone', '$clg', '$email')"))
  {
    $tathva_id=$mysqli->query("SELECT id FROM student_reg WHERE user='$user'");
    while ($trow = $tathva_id->fetch_assoc()) 
    {
     echo "[1,\"$user\",\"$name\",\"$trow[id]\"]";
    }
  }  
  else
    echo '[0,"Username already exists!"]';
  $mysqli->close();
} 
else echo '[]';
?>