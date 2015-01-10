$(function () 
 {
   alert("Hello");
   $.ajax
   ({
     dataType: 'json',
     url: 'fetchlinks.php',
     data: {'cat':title},
     type: 'GET',
     success: function(data) 
     {
       var evename = '';
       data.forEach(function(ele) 
       {
         evename = evename + "<a href='/" + ele.name.replace(/\ /g, '_') + "'><li>" + ele.name + '</li></a> - ' + ele.shortdesc;
         console.log("Hello");
       });
       $("#list").html(evename);
     }
   });
   eventname="agam";
   $.ajax({
     dataType: 'json',
     url: 'content.php',
     data: {'event':eventname},
     type: 'GET',
     success: function(data) 
     {
       $("#idea").html(data['content']);
     }
 }); 
})