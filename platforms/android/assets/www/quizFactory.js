quizApp.factory('quizFactory', function() {
	var questions = [
		{
			question: "Which is the largest country in the world by population?",
			options: ["India", "USA", "China", "Russia"],
			questionId: 211,
			type:"r"
		},
		{
			question: "When did the second world war end?",
			options: ["1945", "1939", "1944", "1942"],
			questionId: 220,
			type:"r"
		},
		{
			question: "Which was the first country to issue paper currency?",
			options: ["USA", "France"],
			questionId: 223,
			type:"r"
		},
		{
			question: "Which city hosted the 1996 Summer Olympics?",
			options: ["Atlanta", "Sydney", "Athens", "Beijing"],
			questionId: 210,
			type:"c"
		},
		{	
			question: "Who invented telephone?",
			options: ["Albert Einstein", "Alexander Graham Bell", "Isaac Newton", "Marie Curie"],
			questionId: 212,
			type:"c"
		},
		{
			question: "When did the second world war end?",
			options: ["1945", "1939", "1944", "1942"],
			questionId: 229,
			type:"r"
		}
	];
	
	var userResponse = [];
	
	
	var getQuestion= function(id) {
		if(id < questions.length) {
			return questions[id];
		} else {
			return false;
		}
		
		
	}
	
	var setAnswers= function(id,ans){
		var response = {
				Qid : id,
				Qans : ans
		}
		if(localStorage.getItem("userQuizResponse") !="" && localStorage.getItem("userQuizResponse") != null){
			userResponse = JSON.parse(localStorage.getItem("userQuizResponse"));
		}else{
			userResponse = [];
		}
		var objlist = $.grep(userResponse, function(e){ return e.Qid == id; });
		if(objlist.length<1){
			userResponse.push(response);
		}else{
			 var index = -1;
			  for(var i = 0; i < userResponse.length; i++){
				  if(userResponse[i].Qid ==id){
					  index = i;
					  break;
				  }
			  }
			  
			  userResponse.splice(index,1);
			  userResponse.push(response);
			 
		}
		if(typeof(Storage) !== "undefined") {
			localStorage.removeItem("userQuizResponse");
			localStorage.setItem("userQuizResponse", JSON.stringify(userResponse));
		}
		
	}
  
	var getAllResponse = function(){
		userResponse = JSON.parse(localStorage.getItem("userQuizResponse"));
		return userResponse;
	}
	
	var getResponseByQuestionId = function(id){
		userResponse = JSON.parse(localStorage.getItem("userQuizResponse"));
		var objlist = $.grep(userResponse, function(e){ return e.Qid == id; });
		return objlist[0];
	}
	var resetResponse = function(){
		//userResponse = [];
		//localStorage.removeItem("userQuizResponse");
	}
	
	return {
		getQuestion: getQuestion,
		setAnswers: setAnswers,
		getAllResponse : getAllResponse,
		getResponseByQuestionId:getResponseByQuestionId,
		resetResponse:resetResponse
	};
});