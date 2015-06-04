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

