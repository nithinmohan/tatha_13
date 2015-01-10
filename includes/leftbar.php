<?php
require_once("initdb.php");
$sub=1;
$flag='';
$query0=$mysqli->query("SELECT name,cat_id FROM event_cats WHERE par_cat='1'");
while($eventcategory=$query0->fetch_assoc())
{
	echo "<div class=\"menuitem\">";
	echo "<div class=\"red2\"></div>";
	echo "<div class=\"text\"><p>".$eventcategory['name']."</p></div>";
	if($sub>8) $flag='2';
	echo "<div class=\"submenuholder".$flag."\">";
	
	$query1=$mysqli->query("SELECT name,cat_id,shortdesc,validate FROM events WHERE cat_id=$eventcategory[cat_id] AND validate=1");
	while($event=$query1->fetch_assoc())
	echo "	<div data-eventcat=\"".$eventcategory['name']."\" data-event=\"".$event['name']."\">".$event['name']."</div>";
	
	echo "</div>";
	echo "</div>";
	$sub=$sub+1;
}
?>