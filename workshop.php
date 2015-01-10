<?php
require_once("initdb.php");
$event = $_POST['event'];
$query1=$mysqli->query("SELECT name,code,longdesc,contacts,shortdesc,tags,prize,prtpnt FROM events WHERE name='$event'");
$eve = $query1->fetch_assoc();
$data['name']=$eve['name'];
$data['code']=$eve['code'];
$data['shortdesc']=$eve['shortdesc'];
$content=explode("||sec||",$eve['longdesc']);
$data['count']=count($content);
$j=count($content);
$i=0; 
while($i<$j)
{
	$indexa="tab".($i+1);
	$content[$i] = preg_replace('/src=\"/', 'src="http://www.tathva.org/organiser/', $content[$i]);
	$data[$indexa]=$content[$i];
	$i=$i+1;
}
$contacts=explode("||0||",$eve['contacts']);
$data['contact'][1]=$contacts[0];
$data['contact'][2]=$contacts[1];
$data['contact'][3]=$contacts[2];
$data['contact'][4]=$contacts[3];
$data['tags']=$eve['tags'];
$data['prize']=$eve['prize'];
$data['participation']=$eve['prtpnt'];

echo json_encode($data);
?>
