//Hi there,
//This is the javascript code written, modified and hacked into by the nitcians
//Escpecially the tathva Web-team.
//Feel free to hack into the code and take what intrests you.(After the October 20th)
//Dont forget to send a hi to us ;)
var centery,staticrotatebar,mousemovemanage;
var eventid,eventclass,eventcode;
var minpart=0,maxpart=0;

$('body').css({'height':$(window).height(),'width':$(window).width()});
var arcpics={
	1:"/images/yellow.png",
	2:"/images/green.png",
	3:"/images/blue.png",
	4:"/images/indigo.png",
	5:"/images/violet.png",
	0:"/images/red.png"
}
var menuangles={
	0:{
		div:$("#zero"),
		backimg:"/images/1.png",
		start:0,
		end:360+-15
	},
	1:{
		div:$("#one"),
		backimg:"/images/2.png",
		start:60,
		end:360+9
	},
	2:{
		div:$("#two"),
		backimg:"/images/3.png",
		start:120,
		end:360+33
	},
	3:{
		div:$("#three"),
		backimg:"/images/4.png",
		start:180,
		end:360+57
	},
	4:{
		div:$("#four"),
		backimg:"/images/5.png",
		start:240,
		end:360+81
	},
	5:{
		div:$("#five"),
		backimg:"/images/6.png",
		start:300,
		end:360+105
	},
	limit:6

}
var obj={
	container:$("#container"),
	fullcirurl:"/images/fullcir.png",
	baseangle:60
};
var angle=function(x,y)
{
	var ang=Math.atan(y/x)*57.2957795;
	if(x<0)
	{
		ang=180+ang;
	}
	else if(x>0 && y<0)
	{
		ang=360+ang;
	}
	return ang;
}
var notselected=function(){
	obj.container.addClass("movecenter");
	obj.container.removeClass("movedown");
	for(i=0;i<menuangles.limit;i++)
	{
		menuangles[i].div.css({
			"-webkit-transform": "rotate("+menuangles[i].start+"deg)",	
			"-moz-transform": "rotate("+menuangles[i].start+"deg)"	,
			"-ms-transform": "rotate("+menuangles[i].start+"deg)",
			"transform": "rotate("+menuangles[i].start+"deg)"	
		});
	}
}
var selected=function(){
	obj.container.addClass("movedown");
	obj.container.removeClass("movecenter");
	for(i=0;i<menuangles.limit;i++)
	{
		menuangles[i].div.css({
			"-webkit-transform": "rotate("+menuangles[i].end+"deg)"	,
			"-moz-transform": "rotate("+menuangles[i].end+"deg)",	
			"-ms-transform": "rotate("+menuangles[i].end+"deg)",	
			"transform": "rotate("+menuangles[i].end+"deg)",	
		});
	}
}
var menumanager=function(){
	for(i=0;i<menuangles.limit;i++)
	{
		menuangles[i].div.css({
			"-webkit-transform": "rotate("+menuangles[i].start+"deg)",
			"-moz-transform": "rotate("+menuangles[i].start+"deg)",
			"-ms-transform": "rotate("+menuangles[i].start+"deg)",
			"transform": "rotate("+menuangles[i].start+"deg)",
			"background-image":"url("+menuangles[i].backimg+")"});
	}
}
var makecircle=function(){
	var $cir=obj.container;
	var $fullcir=$cir.append("<div class='fullback highz' style='position:absolute;top:0px;left:0px;width:"+$cir.width()+"px;height:"+$cir.height()+"px;border-radius:"+$cir.width()/2+"px;"+"background-image:url("+obj.fullcirurl+");'></div>").find(':last');
	var $partcir=$cir.append("<div class='fullback highz' style='position:absolute;top:0px;left:0px;width:"+$cir.width()+"px;height:"+$cir.height()+"px;border-radius:"+$cir.width()/2+"px;'></div>").find(':last');
	var centerx=$cir.offset().left+$cir.width()/2;
	centery=$cir.offset().top+$cir.height()/2;
	var centerxlocal=$cir.width()/2;
	var centerylocal=$cir.height()/2;
	var x,y,ang,num,oldnum=-1;
	$partcir.css({
		'-webkit-transform-origin': centerxlocal+ "px "+centerylocal+ "px",
		'-moz-transform-origin': centerxlocal+ "px "+centerylocal+ "px",
		'-ms-transform-origin': centerxlocal+ "px "+centerylocal+ "px",
		'transform-origin': centerxlocal+ "px "+centerylocal+ "px",
		'webkit-transition':"background .5s",
		'moz-transition':"background .5s",
		'ms-transition':"background .5s",
		'transition':"background .5s"
	});

	$(".menus").css({
		'-webkit-transform-origin': (centerxlocal)+ "px "+(centerylocal)+ "px",
		'-moz-transform-origin': (centerxlocal)+ "px "+(centerylocal)+ "px",
		'-ms-transform-origin': (centerxlocal)+ "px "+(centerylocal)+ "px",
		'transform-origin': (centerxlocal)+ "px "+(centerylocal)+ "px"
	});
	menumanager();
	mousemovemanage=function(event)
	{
		x=event.pageX;
		y=event.pageY;
		ang=angle((x-centerx),(-(y-centery)));
		num=ang/obj.baseangle;
		num=num>>0;
		$partcir.css({
			WebkitTransform: 'rotate(' + (-ang) + 'deg)',
			MozTransform: 'rotate(' + (-ang) + 'deg)',
			Transform: 'rotate(' + (-ang) + 'deg)'
		});
		if((num!=oldnum||oldnum==-1))
			oldnum=num;
		$partcir.css({
			"background-image":"url("+arcpics[num]+")"
		})
	}
	staticrotatebar=function(){
		$partcir.css({
			"background-image":""
		})
	}
	$(document).bind("mousemove",function(event){
		mousemovemanage(event);
	});
}
var link,oldlink="",newclass,oldclass="",eventid,eventclass,eventlink;
$(function(){
	var History = window.History;
	makecircle(obj);
	$(".skewmenus,.menus").click(function(){
		newclass=$(this).attr('class');
		link=$(this).attr('href');
		var state=History.getState();
		if((link!=state.data.state)||$(this).hasClass("skewmenus"))
		{
			oldlink=link;
			History.pushState({state:link,rand:Math.random()}, link, "/"+subDir+link);
		}
	})
	$("#home").click(function(){
			History.pushState({state:link,rand:Math.random()}, link, "/"+subDir);
		});
	$("#competitions-text").click(function(){
			History.pushState({state:link,rand:Math.random()}, link, "/"+subDir+"Competitions");
		});
	$("#nites-text").click(function(){
			History.pushState({state:link,rand:Math.random()}, link, "/"+subDir+"Nites");
		});

	$(".submenuholder>div,.submenuholder2>div").bind("click",function(){
		eventclass=$(this).data("eventcat");
		eventid=$(this).data("event");
		eventlink=link+"/"+eventclass+"/"+eventid;
		var state=History.getState();
		if(eventlink!=state.data.state){
		History.pushState({state:eventlink,rand:Math.random()}, eventclass, "/"+subDir+eventlink); // logs {state:1,rand:"some random value"}, "State 1", "?state=1"
	}
});
var $maincircle=$("#main-circle"),
$menuholder=$("#menuholder"),
$centralcircle=$("#central-circle"),
$comingsoon=$("#comingsoon"),
$notfound=$("#notfound"),
$menublocks=$("#menublocks"),
$otherthings=$("#otherthings *");
$leccontainer=$("#leccontainer");
$exccontainer=$("#exccontainer");//Exhibitions being added.
$nitescontainer=$("#nitescontainer");//nites being added.
$highcontainer=$("#hilitescontainer");//Highlights being added
$fblike=$(".fb-like");
$home=$("#home");
$menupaneholder=$(".menupaneholder");
$contentpane=$("#contentpane");
$wcontentpane=$("#wcontentpane");
$workshopscolor=$("#workshopscolor");
$lecturescolor=$("#lecturescolor");
$nitescolor=$("#nitescolor");
$exhibitionscolor=$("#exhibitionscolor");
$highlightscolor=$("#highlightscolor");
subDir="2013/";
History.Adapter.bind(window, 'statechange', function() {
	var State = History.getState(), // Note: We are using History.getState() instead of event.state
	rootUrl = History.getRootUrl(),
	relativeUrl = State.url.replace(rootUrl + subDir , '');
	if (relativeUrl == '') {
		$fblike.removeClass("displaynone");
		$home.addClass("homehide");
		$maincircle.removeClass("selected");
		$maincircle.removeClass("opacity0");
		$maincircle.removeClass("displaynone");
		$menuholder.addClass("menuholderhide");
		$menuholder.removeClass("menuholdershow");
		$centralcircle.removeClass("contentsquare");
		$centralcircle.addClass("circle");
		setTimeout(notselected,200);
		$leccontainer.removeClass("displayblock");
		$leccontainer.addClass("displaynone");
		$exccontainer.removeClass("displayblock");//Exhibitions being added
		$exccontainer.addClass("displaynone"); //Exhibitions being added
                $nitescontainer.removeClass("displayblock");//Nites being added
		$nitescontainer.addClass("displaynone"); //Nites being added
                $highcontainer.removeClass("displayblock");//highlights being added
		$highcontainer.addClass("displaynone"); //Highlights being added
		$menupaneholder.addClass("menuholderhide");
		$menupaneholder.removeClass("menuholdershow");
		$notfound.removeClass("show404");
		$notfound.addClass("hide404");
		$otherthings.removeClass("opacity0");
		$otherthings.removeClass("lowz");
		$otherthings.removeClass("displaynone");
		$otherthings.addClass("displayshow");
		$(document).bind("mousemove",function(event){
			mousemovemanage(event);
		});
		$menublocks.removeClass("highz");
		$menublocks.addClass("lowz");
		$contentpane.addClass("contentpanehide");
		$contentpane.removeClass("contentpaneshow");
		$wcontentpane.addClass("contentpanehide");
		$wcontentpane.removeClass("contentpaneshow");
		$comingsoon.addClass("soonhide");
		$comingsoon.removeClass("soonshow");
		document.title="Tathva 2013";
	}
	else {
			$home.removeClass("homehide");
			$(document).unbind("mousemove");
			staticrotatebar();
			link=relativeUrl.split('/')[0];
			if (relativeUrl[relativeUrl.length - 1] == '/') {
				relativeUrl = relativeUrl.substr(0, relativeUrl.length - 1);
			}
			$fblike.addClass("displaynone");
			$otherthings.addClass("opacity0");
			$otherthings.addClass("lowz");
			$otherthings.addClass("displaynone");
			$otherthings.removeClass("displayshow");
			setTimeout(selected,200);
			$menupaneholder.addClass("menuholderhide");
			$menupaneholder.removeClass("menuholdershow");
			$maincircle.addClass("selected");
			$maincircle.addClass("opacity0");
			$maincircle.addClass("displaynone");
			$comingsoon.removeClass("soonshow");
			$comingsoon.addClass("soonhide");
			$notfound.removeClass("show404");
			$notfound.addClass("hide404");
			$menublocks.removeClass("lowz");
			$menublocks.addClass("highz");
			$centralcircle.removeClass("circle");
			$centralcircle.addClass("contentsquare");
			$leccontainer.removeClass("displayblock");
			$leccontainer.addClass("displaynone");
			$exccontainer.removeClass("displayblock");//Exhibitions being addded
			$exccontainer.addClass("displaynone"); //Exhibitions being addded
                        $nitescontainer.removeClass("displayblock");//Nites being addded
			$nitescontainer.addClass("displaynone"); //Nites being addded
                        $highcontainer.removeClass("displayblock");//Highlights being addded
			$highcontainer.addClass("displaynone"); //Highlights being addded
			$contentpane.addClass("contentpanehide");
			$contentpane.removeClass("contentpaneshow");
			$wcontentpane.addClass("contentpanehide");
			$wcontentpane.removeClass("contentpaneshow");
			$menuholder.addClass("menuholderhide");
			$menuholder.removeClass("menuholdershow");
			if (relativeUrl.split('/')[0] == 'Competitions') { //Events section
				imagechange=false;
				$menuholder.removeClass("menuholderhide");
				$menuholder.addClass("menuholdershow");
				$(".ereg").hide();
				$contentpane.removeClass("contentpanehide");
				$contentpane.addClass("contentpaneshow");
				if (relativeUrl.search('/') == -1) {
				i=1;
					while(i<=8)
					{
						$("#plink"+i).html("").parent().addClass("dnone");
						i++;
					}
					while(i<=11)
					{
						$("#plink"+i).html("").parent().parent().addClass("dnone");
						i++;
					}
					var t="War is not just another occupation now, its no longer a matter of choice. Time and basic human nature saw to it that the thirst for victory is hardwired to our system. Tathva brings you a whole new reason to go neck to neck. An arena to cure you of all your addictions and .8 million to boot.";
					$("#view1").html(t);
					$("#pane-back").html("Competitions");
				}
				else {
					var n = relativeUrl.split('/');
					eve = relativeUrl.split('/')[n.length - 1];
					$.ajax({
		 dataType: 'json',
		 url: '/content.php',
		 data: {'event':eve},
		 type: 'POST',
		 success: function(tarun) 
		 {
		   eventcode=tarun['code'];
		   if((eventcode!="PAE")&&(eventcode!="SCQ"))
		   {
		   	$(".ereg").show();
		   }
		   $('#cntct1, #cntct2, #cntct3, #cntct4').hide();
		   var i=2;j=tarun['count'];
		   var content="", plink="", pcontent="", index="tab";
		   var intro=tarun['tab1'];
		   $("#pane-back").html(tarun['name']).addClass("fetched");
		   $("#plink1").html("INTRODUCTION").parent().removeClass("dnone");
		   $("#plink9").html("CONTACT");
		   $("#plink10").html("PARTICIPATION");
		   $("#plink11").html("PRIZES");
			 $("#plink9").parent().parent().removeClass("dnone");
		   $("#plink10").parent().parent().removeClass("dnone");
		   $("#plink11").parent().parent().removeClass("dnone");
		   $("#view1").html(intro);
		   while(i<=8)
		   	{
		   		$("#plink"+i).html("").parent().addClass("dnone");
		   		$("#view"+i).html("").addClass("dnone");
		   		i=i+1;
		   	}
		   	i=2;
			while(i<=j)
		   	{
		   		index=index+i;
		   		content=tarun[index].split("||ttl||");
		   		plink=content[0];
		   		pcontent=content[1];
		   		index="tab";
		   		$("#plink"+i).html(plink).parent().removeClass("dnone");
		   		$("#view"+i).html(pcontent).removeClass("dnone");		
		   		i=i+1;
		   	}
		   i=1;
		   var cname,cphone,cmail,contact;
		   while(i<=4)
		   	 {
				contact=tarun['contact'][i].split("||@||");
				if(contact[0]!=''){
					$('#cntct'+i).show();
				}
				cname="<b>"+contact[0]+"</b>";
				cphone="Phone: +91 "+contact[1];
				cmail="Email: "+contact[2]+"@tathva.org";
		   		$("#cname"+i).html(cname).parent().removeClass("dnone");
		   		$("#cphone"+i).html(cphone).parent().removeClass("dnone");
		   		$("#cmail"+i).html(cmail).parent().removeClass("dnone");
		   	 	i=i+1;
		   	 }
		   	var pcontent1,par1;
		   	par1=tarun['participation'].split("||@||");
		 	minpart=par1[0];
		 	maxpart=par1[1];
		   	pcontent="<b>Teams</b><br>Minimum no. of participants in a team: "+ par1[0] + "<br>Maximum no. of participants in a team: "+ par1[1];
		   	$("#view10").html(pcontent);
		   	pcontent='<b>Prizes</b></br>'+tarun['prize'];
		   	$("#view11").html(pcontent);
			$('#plink1').trigger('click');
			$('#pane-right .pcontent').each(function(){
				$(this).hide();
			});
			$('#pane-right .pcontent').first().show();
		 }
		});
				}
			} //Endif events
			else if (relativeUrl.split('/')[0] == 'Workshops') {
				imagechange=false;
				$workshopscolor.removeClass("menuholderhide");
				$workshopscolor.addClass("menuholdershow");
				//$comingsoon.addClass("soonshow");
				//$comingsoon.removeClass("soonhide");
				$(".ereg").hide();
				$wcontentpane.removeClass("contentpanehide");
				$wcontentpane.addClass("contentpaneshow");
				if (relativeUrl.search('/') == -1) {
				}
				else {
					var n = relativeUrl.split('/');
					eve = relativeUrl.split('/')[n.length - 1];
					$.ajax({
    					 dataType: 'json',
    					 url: '/workshop.php',
    					 data: {'event':eve},
    					 type: 'POST',
    					 success: function(kiran) 
    					 {
		   				   eventcode=kiran['code'];
    					 	if(eventcode!="PAE")
		   						{
		   							$(".ereg").show();
		   						}
    					   $('#wcntct1, #wcntct2, #wcntct3, #wcntct4').hide();
    					   var i=2;j=kiran['count'];
    					   var content="", wplink="", pcontent="", index="tab";
    					   var intro=kiran['tab1'];
    					   $("#wpane-back").html(kiran['name']).addClass("fetched");
    					   $("#wplink1").html("INTRODUCTION").parent().removeClass("dnone");
    					   if(eventcode!="PAE")
		   						{
    					   			$("#wplink9").show();
    					   			$("#wplink9").html("CONTACT");
    					   			$("#wplink10").show();
    					   			$("#wplink10").html("INFO");
		   						}
		   					else $("#wplink10").hide();
    					   $("#wview1").html(intro);
    					   while(i<=8)
    					   	{
    					   		$("#wplink"+i).html("").parent().addClass("dnone");
    					   		$("#wview"+i).html("").addClass("dnone");
    					   		i=i+1;
    					   	}
    					   	i=2;
							while(i<=j)
    					   	{
    					   		index=index+i;
    					   		content=kiran[index].split("||ttl||");
    					   		wplink=content[0];
    					   		pcontent=content[1];
    					   		index="tab";
    					   		$("#wplink"+i).html(wplink).parent().removeClass("dnone");
    					   		$("#wview"+i).html(pcontent).removeClass("dnone");		
    					   		i=i+1;
    					   	}
    					   // alert(kiran['contact']);
    					   i=1;
    					   var wcname,wcphone,wcmail,wcontact;
    					   while(i<=4)
    					   	 {
								wcontact=kiran['contact'][i].split("||@||");
								if(wcontact[0]!=''){
									$('#wcntct'+i).show();
													}
								wcname="<b>"+wcontact[0]+"</b>";
								wcphone="Phone: +91 "+wcontact[1];
								wcmail="Email: "+wcontact[2]+"@tathva.org";
    					   		$("#wcname"+i).html(wcname).parent().removeClass("dnone");
    					   		$("#wcphone"+i).html(wcphone).parent().removeClass("dnone");
    					   		$("#wcmail"+i).html(wcmail).parent().removeClass("dnone");
    					   	 	i=i+1;
    					   	 }
    					   	var pcontent1,par1;
    					   	par1=kiran['participation'].split("||@||");
    					   	minpart=par1[0];
		 					maxpart=par1[1];
    					   	if(par1[0]!='')
    					   	pcontent="Minimum participants: "+ par1[0] + "</br>Maximum Participants: "+ par1[1] +"</br>Other Details</br>" + kiran['prize'];
    					   	else pcontent="</br>Maximum Participants: "+ par1[1] +"</br></br><b>Other Details</b></br>" + kiran['prize'];
    					   	$("#wview10").html(pcontent);
							$('#wplink1').trigger('click');
							$('#wpane-right .pcontent').each(function(){
								$(this).hide();
							});
							$('#wpane-right .pcontent').first().show();
    					 }
    				});
				}
			} //Endif ajax
			//Endif workshops
			else if (relativeUrl.split('/')[0] == 'Nites') {
				//$comingsoon.addClass("soonshow");
				//$comingsoon.removeClass("soonhide");
				$nitescolor.removeClass("menuholderhide");
				$nitescolor.addClass("menuholdershow");
                                $nitescontainer.addClass("displayblock");//Nites
				$nitescontainer.removeClass("displaynone");//Nites

							} //Endif proshows
			else if (relativeUrl.split('/')[0] == 'Lectures') {
				$lecturescolor.removeClass("menuholderhide");
				$lecturescolor.addClass("menuholdershow");
				$leccontainer.addClass("displayblock");
				$leccontainer.removeClass("displaynone");
			} //Endif showcase
			else if (relativeUrl.split('/')[0] == 'Highlights') {
				$highlightscolor.removeClass("menuholderhide");
				$highlightscolor.addClass("menuholdershow");
				//$comingsoon.addClass("soonshow");
				//$comingsoon.removeClass("soonhide");
                                $highcontainer.addClass("displayblock");//Highlights
				$highcontainer.removeClass("displaynone");//highlights
			} //Endif sponsors
			else if (relativeUrl.split('/')[0] == 'Exhibitions') {
				//$comingsoon.addClass("soonshow");
				//$comingsoon.removeClass("soonhide");
				$exhibitionscolor.removeClass("menuholderhide");
				$exhibitionscolor.addClass("menuholdershow");
				$exccontainer.addClass("displayblock");//Exhibitions beging added
				$exccontainer.removeClass("displaynone");//Exhibitions being added
			} 
			else {
				$notfound.addClass("show404");
				$notfound.removeClass("hide404");
			}
		}
	});
$(window).trigger("statechange");
});