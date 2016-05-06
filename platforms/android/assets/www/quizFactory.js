quizApp.factory('quizFactory', function() {
	var questions = [
		{
			question: "Which is the largest country in the world by population?",
			options: ["India", "USA", "China", "Russia"],
			questionId: 211
		},
		{
			question: "When did the second world war end?",
			options: ["1945", "1939", "1944", "1942"],
			questionId: 220
		},
		{
			question: "Which was the first country to issue paper currency?",
			options: ["USA", "France", "Italy", "China"],
			questionId: 223
		},
		{
			question: "Which city hosted the 1996 Summer Olympics?",
			options: ["Atlanta", "Sydney", "Athens", "Beijing"],
			questionId: 210
		},
		{	
			question: "Who invented telephone?",
			options: ["Albert Einstein", "Alexander Graham Bell", "Isaac Newton", "Marie Curie"],
			questionId: 212
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
		
	}
  
	var getAllResponse = function(){
		return userResponse;
	}
	
	var getResponseByQuestionId = function(id){
		var objlist = $.grep(userResponse, function(e){ return e.Qid == id; });
		return objlist[0];
	}
	var resetResponse = function(){
		userResponse = [];
	}
	
	return {
		getQuestion: getQuestion,
		setAnswers: setAnswers,
		getAllResponse : getAllResponse,
		getResponseByQuestionId:getResponseByQuestionId,
		resetResponse:resetResponse
	};
});