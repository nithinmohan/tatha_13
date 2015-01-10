var salert=function(text)
{
 	$(".alert-wrap").show().animate({"opacity":"1"},1000);
 	$(".alert-progress").animate({ "width":"96%"},3000,function(){$(".alert-wrap").fadeOut(500)});
 	$(".alert-box p").html(text);
}
$(function(){
$(".alert-wrap").bind("click",function(){
$(".alert-wrap").fadeOut(500);
});
$(".alert-box").bind("mouseover",function(){
$(".alert-progress").stop();
});
$(".alert-box").bind("mouseout",function(){
$(".alert-progress").animate({ "width":"96%"},"slow",function(){$(".alert-wrap").fadeOut(500)});
});
})