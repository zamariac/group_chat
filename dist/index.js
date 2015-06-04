$(document).ready(function(){

	var bluePrint = Backbone.Router.extend ({
			routes: {
				"" : "home",
				"home": "home",
				"leaderboard": "leaderboard" 
			},


		home: function(){
			console.log("chatroom")

			$(".page").hide();
			$("#home").show();

			// var $user = $("#user").val();
			
			// var $text = $("#message").val();


			$("#submit-form").on("submit", function(e) {
			e.preventDefault();
			console.log($("#user").val());
			console.log($("#message").val());

		
				var myObj = {
				username: $("#user").val(),
				text: $("#message").val(), 
			}

				console.log(myObj)

			$.post("https://warm-meadow-2141.herokuapp.com/messages",
					myObj, 
					"json"

					)


		});	

		
			
		},



		leaderboard: function(){
			console.log("leaderboard")

			$(".page").hide();
			$("#leaderboard").show();

		}

	});

		var myRouter = new bluePrint();
		Backbone.history.start();

		

		
		





})

