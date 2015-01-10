var user="";
var eventregflag=0;
var userregflag=0;
var clgid=1;
var userstatus,name,tatid;
function tat_logout() {
	$.ajax("/rlogout.php", { //data returned: [1]
		dataType: "json",
		success: function()
		{
			$("#notloggedin").html("...logging out...");
			rlstart();
			setTimeout(function(){

			$("#notloggedin").html("LOGIN / REGISTER");
			},1500);
			user="";
		}
	});
}

function eventreg()
 {
	if (user != "") 
	{
		$("#eventregwrap").show();
		$("#mates_input").show();
	 	$("#par_details").html("Team should consist of "+minpart+" to "+maxpart+" members");
		if(maxpart==1)
		{
			$("#mates_input").hide();
	 		$("#par_details").html("Single Event");
		}
	}
	else
		$("#reg-wrap").show();

 }

function fillProfile(d)  //tat_id: "", name: "", college: "", phone: "", email: "", events: []
{
	$("#usid").html("<span class=\"grey\">Tathva ID - </span>TAT"+d['tat_id']);
	$("#uscollege").html(d['college']);
	$("#usphone").html("<span class=\"grey\">Phone: </span>"+d['phone']);
	$("#usmail").html("<span class=\"grey\">Email: </span>"+d['email']);
	myevents=d['events'];
	if(myevents[0]['team_id'] != '')
   	{
		$("#usersevents").html("<div id=\"eventhead\"></div>");
		$.each(myevents, function(i, item) 
		{
	   		$("#usersevents").append("<div class=\"profileevent\"><div class=\"everight\" id=\"t"+i+"\"></div><div class=\"eveleft\">"+item.eventname+"</div><div class=\"eveleft\">"+item.eventcode+""+item.team_id+"</div></div>");
   			mymates=myevents[i]['mates'];
   			$.each(mymates, function(j, itema) 
			{
				$("#t"+i).append(itema.name+" - TAT"+itema.tat_id+"<br>");
   			});	
   		});
  	}
   	else
   	{
   		salert("123");
   	}
}
function updateLogIn(d) 
{
	$("#loggedin-profile").hide();
	if ((d[0]==1)||(d[0]==-1))
	{
		user=d[1];
		$('#reg-wrap').hide();  
		$("#loggedin").show();
		$("#loggedin-profile").hide();
		$("#notloggedin").hide();
		$("#usname").html(d[1]);
		$("#usid").html("TAT"+d[2]);
		w=$("#loggedin-status").width();
		$("#loggedin-profile").width(w);
		$.ajax("/rprofile.php", 
		{
			dataType: "json",
			success: fillProfile,
			error: function(){salert("Something went wrong!");}
		});
	} 
	else if(d[0]==0)
	{
		salert("Incorrect username/password combination");
	}
	return;
	
}
function show_profile()
 {
 	$("#loggedin-profile").show();
 }
function rlstart()
 {
	$('.error').hide();  
	$("#reg-wrap").hide();
	show_log();	
	$("#loggedin").hide();
	$("#loggedin-profile").hide();
	$("#notloggedin").show();
 }
 function signup(d)
 {
 	if(d[0]==0)
 	{
 		salert(d[1]);
 	}
 	else
 	{
 		salert("Welcome to Tathva, "+d[2]+". Please Log In");
 		rlstart();
 	}

 } 
function show_log()
 {
 	$("#gotolog").click();
 }
$(function()
{
	$(".ereg").click(function(){
		eventreg();
	});
	$("#event_regback").click(function(){
	$("#event_mates div").remove();
		$("#regfullwrap").hide();
	})
	//if(user !="")
	rlstart();
  	/* RegLog Form*/
	var $form_wrapper   = $("#form_wrapper"),
	//the current form is the one with class "active"
	$currentForm    = $form_wrapper.children('form.active'),
	//the switch form links
	$linkform       = $form_wrapper.find('.linkform');
	$form_wrapper.children('form').each(function(i){
	    var $theForm    = $(this);
	    //solve the inline display none problem when using fadeIn/fadeOut
	    if(!$theForm.hasClass('active'))
	        $theForm.hide();
	    $theForm.data({
	        width   : $theForm.width(),
	        height  : $theForm.height()
	    });
	});
	$linkform.bind('click',function(e){
	    var $link   = $(this);
	var target  = $link.attr('rel');
	$("#reg-logoption").toggleClass("moveleft");
	$("#reg-logoption").toggleClass("moveright");
	$currentForm.fadeOut(400,function(){
	    //remove class "active" from current form
	    $currentForm.removeClass('active');
	    //new current form
	    $currentForm= $form_wrapper.children('form.'+target);
	    //animate the wrapper
	    $form_wrapper.stop()
	                 .animate({
	                    width   : $currentForm.data('width') + 'px',
	                    height  : $currentForm.data('height') + 'px'
	                 },500,function(){
	                    //new form gets class "active"
	                    $currentForm.addClass('active');
	                   //show the new form
	                    $currentForm.fadeIn(400);
	                 });
	});
	e.preventDefault();
	});
	function setWrapperWidth(){
	    $form_wrapper.css({
	        width   : $currentForm.data('width') + 'px',
	        height  : $currentForm.data('height') + 'px'
	    });
	}

  	/*RegLog End*/
	$("#pic,#usname").click(function(){
		$("#loggedin-profile").fadeToggle();
  	});
	$(".call-login").click(function()
	{
	//	show_log();
		$("#reg-wrap").fadeIn();
	});
	$(".reg-back").click(function()
	{
		$("#reg-wrap").fadeOut();
	});
	$("#eventregback").click(function()
	{
		$("#eventregwrap").fadeOut();
	});
	$("#log-submit").click(function(){
		$('.error').hide();  
		var name = $("input#log-name").val();  
		if (name == "") {  
			$("label#log-name_error").show();  
			$("input#log-name").focus();  
			return false;  
		}  
		var password = $("input#log-password").val();  
		if (password == "") {  
			$("label#log-password_error").show();  
			$("input#log-password").focus();  
			return false;  
		} 
		$.ajax({  
			type: "POST",  
			url: "/rlogin.php",
			dataType:'json',
			data: {'user':name,'pass':password},  
			success: updateLogIn,
			error:function(){salert("error signin");}
		});  
		return false;  
	});  
	$("#reg-submit").click(function(){
		$('.error').hide();  
		var name = $("input#reg-name").val();  
		if (name == "") {  
			$("label#reg-name_error").show();  
			$("input#reg-name").focus();  
			return false;  
		}  
		var uname = $("input#reg-uname").val();  
		if (uname == "") {  
			$("label#reg-uname_error").show();  
			$("input#reg-uname").focus();  
			return false;  
		}  
		var password = $("input#reg-password").val();  
		if (password == "") {  
			$("label#reg-password_error").show();  
			$("input#reg-password").focus();  
			return false;  
		} 
		var repassword = $("input#reg-repassword").val();  
		if (repassword == "") {  
			$("label#reg-repassword_error").show();  
			$("input#reg-repassword").focus();  
			return false;  
		} 
		var email = $("input#reg-email").val();  
		if (email == "") {  
			$("label#reg-email_error").show();  
			$("input#reg-email").focus();  
			return false;  
		} 
		var coll=$("#college_overshadow").html();  
		if (coll == "") {  
			$("label#reg-clg_error").show();  
			$("input#reg-clg").focus();  
			return false;  
		} 
		var phno = $("input#reg-phno").val();  
		if (phno == "") {  
			$("label#reg-phno_error").show();  
			$("input#reg-phno").focus();  
			return false;  
		} 
		var year='1';
		if($("#checkbox").is(':checked')) 
    		year = 'f';
		if(password!=repassword)
		{
			salert("Passwords don't match!");
			return false; 
		}
		$.ajax({  
			type: "POST",  
			url: "/rsignup.php",
			dataType:'json',
			data: {'user':uname,'pass':password,'name':name,'phone':phno,'clg':clgid,'email':email,'year':year},
			success: signup,
			error: function()
			 {
			 	salert("Hello");
			 }
		});  
		return false;  
	});  
		$.ajax({  
			type: "POST",  
			url: "/rlogin.php",
			dataType:'json',
			data: {},  
			success: updateLogIn
		});  

$.widget( "custom.college_ac", $.ui.autocomplete, {
		_renderMenu: function( ul, items ) {
			var self = this;
			$.each( items, function( index, item ) {
				if (item.value)
					self._renderItem( ul, item );
				else
					ul.append( "<li><i>"+item.label+"</i></li>" );
			});
			//ul.append( "<li class='ui-ac-new-college'><span id='new-college'>Can&#39;t find your college?</span></li>" );/*tarunuday chk here*/
		}
	});
	var college_xhr;
		$("#college_name").college_ac({
		source: function( request, response ) {
				if (college_xhr)
					college_xhr.abort();

				college_xhr = $.ajax({
					url: "/rclg.php",
					dataType: "json",
					data: { "q": request.term },
					success: function (data) {
						if (!data.length)
							response( [{ label: "No matches!", value: "" }] );
						else
							response( $.map( data, function( item ) {
								return { id: item.id, label: item.name, value: item.name }
							}));
					},
					error: function (jqXHR, tStat) {
						response([{label: tStat, value: ""}]);
					}
				});
			},
		minLength: 1,
		select: function (event, ui) {
			if (ui.item) {
				$(this).hide().val(ui.item.label);
				clgid=ui.item.id;
				$("#college_overshadow").html(ui.item.label).show();
				return false;
			}
		}
	});
})
		$("#college_overshadow").bind("click",function()
		{
				$("#college_overshadow").html("").hide();
				$("#college_name").val("").show();
		})
var mates_xhr;

function getMatesIds() {
			var emates = [];
			$("#event_mates>div>div>span").each(function (i) {
				emates[i] = $(this).html();
				//alert($(this).html());
			});
			return emates.join('|');
		}
		$("#mates_input").autocomplete({
			source: function( request, response ) 
			{
			if (mates_xhr)
			mates_xhr.abort();
			mates_xhr = $.ajax({
				url: "/rteam.php",
				dataType: "json",
				data: {
					"q": request.term,
					"exclude": getMatesIds()
				},
				success: function (data) 
				{
					response( $.map( data, function( item ) 
					{
						var that={
							label: item.name + " (TAT" + item.id + ")",
							value: item.id
						};
						return that;
						
					}));
				},
				error: function (jqXHR, tStat) 
				{
					response([]);
				}
			});
					//salert(mates_xhr);
			},
minLength: 1,
select: function (event, ui) 
{
	if (ui.item) {
		$(this).val("");
		$("<div><div class='input_mates sbutton' style='cursor:pointer;'>"+ui.item.label+"<span>"+ui.item.value+"</span></div><br></div>").insertBefore(this);
		//var prtpnt = $("#par_hidden").val().split("||@||");
		if ($("#event_mates>div").length >= maxpart-1)
			$(this).hide();
		//alert($("#event_mates>div").length );
		return false;
	}
}
});
$("#event_register form").submit(function () {
var emates=[];
		$("#event_mates>div>div>span").each(function (i) {
			emates[i] = $(this).html();
		});
		if (minpart-1 > emates.length) {
			$("#event_register p").html("*Minimum number of participants requirement not met!");
			return false;
		}

		//prevent user actions before ajax, by displaying an overlay or something
		$.ajax("/rregister.php", {
			dataType: "json",
			data: {"ecode":eventcode, "mates[]":emates},
			type: "POST",
			success: function (d) {
				if(d[0]==1)
				{
					salert("Registration succesful  Team ID is "+d[2]+d[1]);
					$("#regfullwrap").hide();
					$("#event_mates div").remove();
					$("#eventregwrap").hide();
					$.ajax("/rprofile.php", 
		{
			dataType: "json",
			success: fillProfile,
			error: function(){salert("Something went wrong!");}
		});
					//$("#event_register p").html("<span style='font-size:15px;'>Registration succesful <br/> Team ID is "+d[2]+d[1]+"</span>");
				}
				else if(d[0]==0)
				{
					salert(d[1]);
				}
				else
					salert("sadsdfsdfdsfs");
			},
			error:function()
			{
				salert("ds");
			}
		});
		return false;
	});


		$("#event_mates").on("click", ".input_mates", function () {
			$(this).parent().remove();
			if (($("#event_mates>div").length < maxpart-1))
				$("#mates_input").show();
		});