quizApp = angular.module('quizApp', ['ngRoute']);


quizApp.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'quiztemplate.html',
		link: function(scope, elem, attrs) {
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.getQuestion();
			};
 
			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
				scope.LastSelectedIndex =0;
				quizFactory.resetResponse();
			}
 
			scope.getQuestion = function() {
				var q = quizFactory.getQuestion(scope.id);
				if(q) {
					scope.quesId= q.questionId;
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.answerMode = true;
				} else {
					scope.quizOver = true;
					scope.Result();
				}
			};
 
			scope.nextQuestion = function() {
				scope.saveAnswer();
				scope.id++;
				scope.getQuestion();
				scope.setSelectedOption();
			}
			
			scope.saveAnswer = function(){
				if(!$('input[name=answer]:checked').length) return;
				var ans = $('input[name=answer]:checked').val();
				quizFactory.setAnswers(scope.quesId,ans);
			}
			scope.previousQuestion= function(){
				scope.saveAnswer();
				scope.id--;
				scope.getQuestion();
				scope.setSelectedOption();
			}
			
			scope.setSelectedOption = function(){
				var lastQuesAns = quizFactory.getResponseByQuestionId(scope.quesId);
				if(lastQuesAns!=undefined && lastQuesAns!=null){
				if(lastQuesAns.Qans>0){
				scope.LastSelectedIndex=lastQuesAns.Qans;
				}else{
					scope.LastSelectedIndex =0;
				}
				}else{
					scope.LastSelectedIndex =0;
				}
			}
			
			scope.Result = function(){
				scope.AllResponse= quizFactory.getAllResponse();
			}
 
			scope.reset();
		}
	}
});

quizApp.controller('indexCtrl', function($scope, $rootScope, $route) {
	$scope.Heading = "Quiz program";
	
	/*$scope.setPreviChoosenOpt = function(){

		for(var i=0; i<$('input[name=answer]').length;i++){
			if($('input[name=answer]')[i].value == $rootScope.lastQuesAns.Qans  ){
				$('input[name=answer]')[i].checked = true;
			}
		}
		
	}*/
	
});






var app = {
    initialize: function() {
        this.bindEvents();
    },
    
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    onDeviceReady: function() {
    	//alert("Device ready");
    	angular.element(document).ready(function() {
		    angular.bootstrap(document, ['quizApp']);
		});
    },
    
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();