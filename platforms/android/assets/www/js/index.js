quizApp = angular.module('quizApp', ['ngRoute','ngTouch']);


quizApp.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'quiztemplate.html',
		link: function(scope, elem, attrs) {
			scope.start = function() {
				scope.searchIndex = 1;
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.getQuestion();
			};
 
			scope.reset = function() {
				scope.inProgress = false;
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
					
					if(q.type == "r"){
						scope.typeRadio = true;
					}else if(q.type == "c"){
						scope.typeRadio = false;
					}
				} else {
					scope.quizOver = true;
					scope.Result();
				}
			};
			
			scope.goToQuestionNumber = function(){
				scope.saveAnswer();
				scope.id = scope.searchIndex-1;
				scope.getQuestion();
			}
 
			scope.nextQuestion = function() {
				if(scope.validateMandatoryQues() ){
					return;
				}
				scope.saveAnswer();
				scope.id++;
				scope.getQuestion();
			}
			
			scope.previousQuestion= function(){
				if(scope.validateMandatoryQues() ){
					return;
				}
				scope.saveAnswer();
				scope.id--;
				scope.getQuestion();
			}
			
			scope.saveAnswer = function(){
				if(scope.typeRadio){
				var ansOptionsLength=$('input[name=answerRadio]:checked').length;
				if(!ansOptionsLength) return;
				
				var ans="";
				if(ansOptionsLength == 1){
					ans = $('input[name=answerRadio]:checked').val();
				}else{
					for(var i=0;i<ansOptionsLength;i++){
						ans=ans+$('input[name=answerRadio]:checked')[i].value;
							if(ansOptionsLength != (i+1))
							{
								ans=ans+",";
							}
						}
					}
				}
				else{
					var ansOptionsLength=$('input[name=answerCheckbox]:checked').length;
					if(!ansOptionsLength) return;
					var ans="";
					if(ansOptionsLength == 1){
						ans = $('input[name=answerCheckbox]:checked').val();
					}else{
						for(var i=0;i<ansOptionsLength;i++){
							ans=ans+$('input[name=answerCheckbox]:checked')[i].value;
							if(ansOptionsLength != (i+1))
							{
								ans=ans+",";
							}
						}
					}
					
				}
				
				quizFactory.setAnswers(scope.quesId,ans);
			}
			
			
			scope.validateMandatoryQues = function(){
				if(scope.typeRadio){
					var ansOptionsLength=$('input[name=answerRadio]:checked').length;
					if(!ansOptionsLength) return true;
				}else{
					var ansOptionsLength=$('input[name=answerCheckbox]:checked').length;
					if(!ansOptionsLength) return true;
				}
				return false;
			}
			
			
			scope.validateSearchIndex = function(){
				if(scope.searchIndex  == null){
					return true;
				}
			}
			
			
			scope.OptionClicked= function(){   // on checked change of radio or checkbox, update validateOneFlag to enable -disable botton
				scope.validateOneFlag=scope.validateMandatoryQues();
			}
			scope.validateOneOptionChecked = function(){   //exp to enable-disable button
				return scope.validateOneFlag;
			}
			
			scope.checkChecked = function(index){
				var lastQuesAns = quizFactory.getResponseByQuestionId(scope.quesId);
				if(lastQuesAns!=undefined && lastQuesAns!=null){
				if(lastQuesAns.Qans!=""){
					var optionsArray = lastQuesAns.Qans.split(',');
					
					for(var i = 0 ; i<optionsArray.length ;i++ ){
						if(index == optionsArray[i])
							{
							return true;
							}
					}
				}else{
					return false;
				}
				}else{
					return false;
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
});






var app = {
    initialize: function() {
        this.bindEvents();
    },
    
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    onDeviceReady: function() {
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