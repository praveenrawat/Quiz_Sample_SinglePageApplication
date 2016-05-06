quizApp.config(function($routeProvider) {
	$routeProvider

	.when('/index', {
		templateUrl : 'index.html',
		controller  : 'indexCtrl'
	})
});