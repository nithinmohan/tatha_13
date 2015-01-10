$.widget( "custom.college_ac", $.ui.autocomplete, {
		_renderMenu: function( ul, items ) {
			var self = this;
			$.each( items, function( index, item ) {
				if (item.value)
					self._renderItem( ul, item );
				else
					ul.append( "<li><i>"+item.label+"</i></li>" );
			});
			ul.append( "<li class='ui-ac-new-college'><span id='new-college' style='cursor:pointer;'>Can&#39;t find your college?</span></li>" );

		}
	});
	$(document).on("click", "#new-college", function () {
		$("#college_name").college_ac("close");
		$("#registration_details").hide();
		$("#clgwrap").show();
		$("#registration_header").html("Add College");
	})
	var college_xhr;
	$("#college_name").college_ac({
		source: function( request, response ) {
				if (college_xhr)
					college_xhr.abort();
				college_xhr = $.ajax({
					url: "rclg.php",
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
				$(this).hide().val(ui.item.id);
				$("#college_overshadow").val(ui.item.label).show();
				$("#college_select_close").show();
				return false;
			}
		}
	});

$("#college_overshadow").bind("click",function()
		{
				$("#college_overshadow").html("").hide();
				$("#college_name").val("").show();
		})
		$("#new_college_details form").submit(function () {
		$.ajax("/rnewclg.php", {
			dataType: "json",
			data: { "newclg": $("#ncname").val() },
			type: "POST",
			success: function (data) {
				if (data[0] == 1) {
					
					salert("College successfully added!");
$("#clgwrap").fadeOut();
				} else {
					salert("Sorry, something went wrong! If the problem persists, contact Event Coordinator.");
$("#clgwrap").fadeOut();
					
				}
			},
			error: function (jqXHR, textStatus) {
					salert("Sorry, something went wrong! If the problem persists, contact Event Coordinator.");
$("#clgwrap").fadeOut();
			}
		});
		return false;
	});
	$("#clgregback").bind("click",function(){
$("#clgwrap").fadeOut();
	})
	