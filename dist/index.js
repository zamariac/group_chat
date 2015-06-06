$(document).ready(function(){

	var bluePrint = Backbone.Router.extend ({
		routes: {
			"" : "home",
			"home": "home",
			"2": "chat2",
			"3": "chat3",
			"chat-leaders": "chatLeaders",
			"leaderboard": "leaderboard" //g
			},


		home: function(){
			// console.log("chatroom");
			$(".page").hide();
			$("#home").show();
			$("#window2").hide();
			$("#window3").hide();
			$("#window").show();
			$("#Submit2").hide();
			$("#Submit3").hide();
			$("#Submit").show();

			$("#Submit").on("click", function(e) {
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
					"https://warm-meadow-2141.herokuapp.com/messages/1",
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
						 if (currentMessage.chatroom === 1) {
						 // console.log(moment(messageTime).minute());
						 // console.log(messageTime);
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
			$("#display-leaders").show();
			$("#display-chatleaders").hide();

			setInterval(getLeaders, 500);

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
			$(".page").hide();
			$("#home").show();
			$("#window").hide();
			$("#window2").show();
			$("#window3").hide();
			$("#Submit").hide();
			$("#Submit3").hide();
			$("#Submit2").show();

			$("#Submit2").on("click", function(e) {
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
					chatroom: 2, //set this to attr or hash value of anchor tags? 1,2,3??
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
					"https://warm-meadow-2141.herokuapp.com/messages/2",
					onMessagesReceived,
					"json"
					);
			}

			function onMessagesReceived(data) {
				var myChatroom = render2(data);
				// console.log(data);
				var $chatWindow = $("#window2");
				$chatWindow.html(myChatroom);

				// console.log(data[0].created_at);
			}

			function render2(messages){
				var returnHtml = "";
				for (var i=0; i<messages.length; i++){
					 var currentMessage = messages[i];
					 var messageTime = currentMessage.created_at;
					 if (currentMessage.chatroom === 2) {
					 // console.log(moment(messageTime).minute());
					 // console.log(messageTime);
						returnHtml = returnHtml + "<div>"+"["+moment(messageTime).format("hh: mm: ss") + "] " + "<strong>"+currentMessage.username +"</strong>"+ ": " + currentMessage.text + "</div>";
					}
				}
				return returnHtml;
			}
		},

		chat3: function() {
			console.log("chat3");
			$(".page").hide();
			$("#home").show();
			$("#window").hide();
			$("#window2").hide();
			$("#window3").show();
			$("#Submit").hide();
			$("#Submit2").hide();
			$("#Submit3").show();

			$("#Submit3").on("click", function(e) {
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
					chatroom: 3, //set this to attr or hash value of anchor tags? 1,2,3??
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
					"https://warm-meadow-2141.herokuapp.com/messages/3",
					onMessagesReceived,
					"json"
					);
			}

			function onMessagesReceived(data) {
				var myChatroom = render3(data);
				// console.log(data);
				var $chatWindow = $("#window3");
				$chatWindow.html(myChatroom);

				// console.log(data[0].created_at);
			}

			function render3(messages){
				var returnHtml = "";
				for (var i=0; i<messages.length; i++){
					 var currentMessage = messages[i];
					 var messageTime = currentMessage.created_at;
					 if (currentMessage.chatroom === 3) {
					 // console.log(moment(messageTime).minute());
					 // console.log(messageTime);
						returnHtml = returnHtml + "<div>"+"["+moment(messageTime).format("hh: mm: ss") + "] " + "<strong>"+currentMessage.username +"</strong>"+ ": " + currentMessage.text + "</div>";
					}
				}
				return returnHtml;
			}	
		},

		chatLeaders: function() {
			console.log("chatLeaders")
			$(".page").hide();
			$("#leaderboard").show();
			$("#display-leaders").hide();
			$("#display-chatleaders").show();

			setInterval(getLeaders, 500);

			function getLeaders(){
				$.get(
					"https://warm-meadow-2141.herokuapp.com/messages/active_chatrooms",
					onChatLeadersReceived,
					"json"
					);
			}

			function onChatLeadersReceived(data) {
				var leaderboardResults = renderChatLeaders(data);
				var $leaderWindow = $("#display-chatleaders");
				$leaderWindow.html(leaderboardResults);
				console.log(data); //just getting 1 object, not array of objects
			}

			function renderChatLeaders(leaders){
				var returnHtml = "";
				for (name in leaders){
					value = leaders[name];
					// var currentLeader = leaders[i];
					// console.log(currentLeader);
					returnHtml = returnHtml + "<div>"+ name+ ": " + "<strong>"+value +"</strong>" + "</div>";
				}
				return returnHtml;
			}	
		}
	});

	var myRouter = new bluePrint();
	Backbone.history.start();

});

