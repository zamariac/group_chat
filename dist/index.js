$(document).ready(function(){

	var bluePrint = Backbone.Router.extend ({
		routes: {
			"" : "home",
			"home": "home",
			"2": "chat2",
			"3": "chat3",
			"chat-leaders": "chatLeaders",
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
					chatroom: 1, //set this to attr or hash value of anchor tags? 1,2,3??
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
				for (var i=0; i<messages.length; i++){
					 var currentMessage = messages[i];
					 var messageTime = currentMessage.created_at;
					 // console.log(moment(messageTime).minute());
					 // console.log(messageTime);
					if(currentMessage.hasOwnProperty("username") && currentMessage.hasOwnProperty("text")){
						returnHtml = returnHtml + "<div>"+"["+moment(messageTime).format("hh: mm: ss") + "] " + "<strong>"+currentMessage.username +"</strong>"+ ": " + currentMessage.text + "</div>";
					}
				}
				return returnHtml;
			}	
		},

		leaderboard: function(){
			console.log("leaderboard");
			$(".page").hide();
			$("#leaderboard").show();

			setInterval(getLeaders, 5000);

			function getLeaders(){
				$.get(
					"https://warm-meadow-2141.herokuapp.com/messages/leaderboard",
					onLeadersReceived,
					"json"
					);
			}

			function onLeadersReceived(data) {
				var leaderboardResults = renderLeaders(data);
				var $leaderWindow = $("#display-leaders");
				$leaderWindow.html(leaderboardResults);
				console.log(data); //just getting 1 object, not array of objects
			}

			function renderLeaders(leaders){
				var returnHtml = "";
				for (name in leaders){
					value = leaders[name];
					// var currentLeader = leaders[i];
					// console.log(currentLeader);
					returnHtml = returnHtml + "<div>"+ name+ ": " + "<strong>"+value +"</strong>" + "</div>";
				}
				return returnHtml;
			}	
		},

		chat2: function() {
			console.log("chat2");
		},

		chat3: function() {
			console.log("chat3");
		},

		chatLeaders: function() {
			
		}
	});

	var myRouter = new bluePrint();
	Backbone.history.start();

});

