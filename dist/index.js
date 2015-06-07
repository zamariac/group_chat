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

			if($("#user").val().length === 0 || $("#message").val().length === 0){
				console.log ("empty string") ; 
				console.log($("#user").val());
				console.log($("#message").val());
			}
			
			else {

				var snd = new Audio("GTalkNotify 2.mp3");
				snd.play();

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

			setInterval(getMessages, 1000);

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
				$chatWindow.html(myChatroom).emoticonize();
			}

			function render(messages){
				var returnHtml = "";
					for (var i=0; i<messages.length; i++){
						 var currentMessage = messages[i];
						 var messageTime = currentMessage.created_at;
						 var msgTxt = currentMessage.text;
						 var url = validator.contains(msgTxt, "http://");
						 var jpg = validator.contains(msgTxt, "jpg");
						 var png = validator.contains(msgTxt, "png");
						 var sound = 
						 console.log(url && jpg || url && png);
						 if(url && png) {
						 	returnHtml = returnHtml + "<div class='comment'>" + "<strong>"+currentMessage.username +"</strong>"+ " ("+moment(messageTime).format("hh: mm") + ")" + ": " + "<img src="+msgTxt+">" + "</div>";
						 }
						 else if(url && jpg) {
						 	returnHtml = returnHtml + "<div class='comment'>" + "<strong>"+currentMessage.username +"</strong>"+ " ("+moment(messageTime).format("hh: mm") + ")" + ": " + "<img src="+msgTxt+">" + "</div>";
						 }
						 else {
						 returnHtml = returnHtml + "<div class='comment'>"+ "<strong>"+currentMessage.username +"</strong>"+ " ("+moment(messageTime).format("hh: mm") + ")"+": " + msgTxt+ "</div>";
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
			$("#recent").show();
			$("#display-chatleaders").hide();

			setInterval(getLeaders, 1000);

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
				function getUsers(){
					$.get(
						"https://warm-meadow-2141.herokuapp.com/messages/recent_users",
						onUsersReceived,
						"json"
					);
				}
				getUsers();
				function onUsersReceived(users) {
					console.log(users);
					var returnUserHtml = "<h3>Recent Users</h3> <ul>";
					var $userWindow = $("#recent");
					for (var i= 0; i < users.length; i++){
						var currentUser = users[i];
						console.log(currentUser);
						returnUserHtml = returnUserHtml + "<li>" + currentUser + "</li>";
					}
				return $userWindow.html(returnUserHtml) + "</ul>";
	
				}
				
			}

			function renderLeaders(leaders){
				var returnHtml = "<h3>User Leaderboard</h3> <ol>";
				for (name in leaders){
					value = leaders[name];
					returnHtml = returnHtml + "<li>"+ name + " " +"<span class='badge'>"+value + " Msg"+"</span>" + "</li>";
				}
				return returnHtml + "</ol>";
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

			if($("#user").val().length === 0 || $("#message").val().length === 0){
				console.log ("empty string") ; 
				console.log($("#user").val());
				console.log($("#message").val());
			}
			
			else {

				var snd = new Audio("GTalkNotify 2.mp3");
				snd.play();
		
				var myObj = {
					chatroom: 2,
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
				var $chatWindow = $("#window2");
				$chatWindow.html(myChatroom).emoticonize();
			}

			function render2(messages){
				var returnHtml = "";
				for (var i=0; i<messages.length; i++){
					 var currentMessage = messages[i];
					 var messageTime = currentMessage.created_at;
					 var msgTxt = currentMessage.text;
					 var url = validator.contains(msgTxt, "http://");
					 var jpg = validator.contains(msgTxt, "jpg");
					 var png = validator.contains(msgTxt, "png");
					 console.log(url && jpg || url && png);
					 if(url && png) {
					 	returnHtml = returnHtml + "<div class='comment'>" + "<strong>"+currentMessage.username +"</strong>"+ " ("+moment(messageTime).format("hh: mm") + ")" + ": " + "<img src="+msgTxt+">" + "</div>";
					 }
					 else if(url && jpg) {
					 	returnHtml = returnHtml + "<div class='comment'>" + "<strong>"+currentMessage.username +"</strong>"+ " ("+moment(messageTime).format("hh: mm") + ")" + ": " + "<img src="+msgTxt+">" + "</div>";
					 }
					else {
						returnHtml = returnHtml + "<div class='comment'>"+ "<strong>"+currentMessage.username +"</strong>"+ " ("+moment(messageTime).format("hh: mm") + ")"+": " + msgTxt+ "</div>";
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

			if($("#user").val().length === 0 || $("#message").val().length === 0){
				console.log ("empty string") ; 
				console.log($("#user").val());
				console.log($("#message").val());
			}
			
			else {
		
				var snd = new Audio("GTalkNotify 2.mp3");
				snd.play();
				
				var myObj = {
					chatroom: 3,
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
				var $chatWindow = $("#window3");
				$chatWindow.html(myChatroom).emoticonize();
			}

			function render3(messages){
				var returnHtml = "";
				for (var i=0; i<messages.length; i++){
					 var currentMessage = messages[i];
					 var messageTime = currentMessage.created_at;
					 var msgTxt = currentMessage.text;
					 var url = validator.contains(msgTxt, "http://");
					 var jpg = validator.contains(msgTxt, "jpg");
					 var png = validator.contains(msgTxt, "png");
					 console.log(url && jpg || url && png);
					 if(url && png) {
					 	returnHtml = returnHtml + "<div class='comment'>" + "<strong>"+currentMessage.username +"</strong>"+ " ("+moment(messageTime).format("hh: mm") + ")" + ": " + "<img src="+msgTxt+">" + "</div>";
					 }
					 else if(url && jpg) {
					 	returnHtml = returnHtml + "<div class='comment'>" + "<strong>"+currentMessage.username +"</strong>"+ " ("+moment(messageTime).format("hh: mm") + ")" + ": " + "<img src="+msgTxt+">" + "</div>";
					 }					 
					else { 
						returnHtml = returnHtml + "<div class='comment'>"+ "<strong>"+currentMessage.username +"</strong>"+ " ("+moment(messageTime).format("hh: mm") + ")"+": " + msgTxt+ "</div>";
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
			$("#recent").hide();

			setInterval(getLeaders, 1000);

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
				console.log(data);
			}

			function renderChatLeaders(leaders){
				var returnHtml = "<h3>Most Active Chatrooms</h3>";
				for (name in leaders){
					value = leaders[name];
					returnHtml = returnHtml + "<div>"+"Chatroom"+name+ ": "+"<span class='badge'>"  +value + " Total Msg"+"</span></div>";
				}
				return returnHtml;
			}	
		}
	});
	

	var myRouter = new bluePrint();
	Backbone.history.start();


});

