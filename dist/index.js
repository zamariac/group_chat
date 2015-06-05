$(document).ready(function(){

	var bluePrint = Backbone.Router.extend ({
		routes: {
			"" : "home",
			"home": "home",
			"leaderboard": "leaderboard" 
			},


		home: function(){
			// console.log("chatroom");

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
					chatroom: 1,
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

			setInterval(getMessages, 5000);

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
				// console.log(data);
				var $chatWindow = $("#window");
				$chatWindow.html(myChatroom);

				// console.log(data[0].created_at);
			}

			function render(messages){
				var returnHtml = "";
				console.log(messages[0].created_at);
				for (var i=0; i<messages.length; i++){
					 var currentMessage = messages[i];
					 var messageTime = currentMessage.created_at;
					 // console.log(moment(messageTime).minute());
					 // console.log(messageTime);
					if(currentMessage.hasOwnProperty("username") && currentMessage.hasOwnProperty("text")){
						returnHtml = returnHtml + "<div>"+"["+moment(messageTime).format("hh: mm: ss") + "] " + "<strong>"+currentMessage.username +"</strong>"+ ":" + currentMessage.text + "</div>";
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

