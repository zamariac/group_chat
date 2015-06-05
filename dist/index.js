$(document).ready(function(){

	var bluePrint = Backbone.Router.extend ({
			routes: {
				"" : "home",
				"home": "home",
				"leaderboard": "leaderboard" 
			},


		home: function(){
			console.log("chatroom");

			$(".page").hide();
			$("#home").show();

			$("#submit-form").on("submit", function(e) {
			e.preventDefault();
			// console.log($("#user").val());
			// console.log($("#message").val());

			if($("#user").val().length === 0 || $("#message").val().length === 0){
				console.log ("empty string") ; 
				console.log($("#user").val());
				console.log($("#message").val());
			}
			
			else {
		
				var myObj = {
					username: $("#user").val(),
					text: $("#message").val()
				};

				console.log(myObj);

				$.post(
					"https://warm-meadow-2141.herokuapp.com/messages",
					myObj, 
					"json"

					);

				$("#message").val("");

			}

		});	

			setInterval(getMessages, 500);

			// window.setTimeout (function() {
			// var objDiv = document.getElementById("window");
			// objDiv.scrollTop = objDiv.scrollHeight;
			// }, 500);

			window.setInterval (function() {
			var objDiv = document.getElementById("window");
			objDiv.scrollTop = objDiv.scrollHeight;
			}, 1000);

			function getMessages(){
				$.get(
					"https://warm-meadow-2141.herokuapp.com/messages",
					onMessagesReceived,
					"json"
					);
			}

			function onMessagesReceived(data) {
				var myChatroom = render(data);
				var $window = $("#window");
				$window.html(myChatroom);
			}

			function render(messages){
				var returnHtml = "";
				for (var i=0; i<messages.length; i++){
					 var currentMessage = messages[i];
					if(currentMessage.hasOwnProperty("username") && currentMessage.hasOwnProperty("text")){
						returnHtml = returnHtml + "<div>" + currentMessage.username + ":" + currentMessage.text + "</div>";

					}



				}

					return returnHtml;
	
			}

		
			
		},



		leaderboard: function(){
			console.log("leaderboard");

			$(".page").hide();
			$("#leaderboard").show();

		}

	});

		var myRouter = new bluePrint();
		Backbone.history.start();

		

		
		





});

