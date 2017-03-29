angular.module('start', [])
.config(function($stateProvider){
	$stateProvider
	.state('start', {
		url: '/start'
	})
})
.directive('startEditor', function() {
  return {
    restrict: 'E',
    templateUrl: 'cover-editor/start/start.html'
  }
});