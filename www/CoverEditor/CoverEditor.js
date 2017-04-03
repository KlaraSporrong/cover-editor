angular.module('CoverEditor', [
    'Menu',
	'Start',
	'Background',
	'Text',
	'Preview'
])
.config(['$urlRouterProvider', '$locationProvider', '$stateProvider', function ($urlRouterProvider, $locationProvider, $stateProvider) {
	// Remove hashbang from URL
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
	$urlRouterProvider.otherwise('/');
}])
.directive('coverEditor', ['$state', function($state) {
  return {
  	restrict: 'E',
    templateUrl: 'CoverEditor/CoverEditor.html',
    link: function(scope, elem, attr, ctrl) {
		// window.onbeforeunload = function(e) {
		// 	console.log(e)
		// 	return '';
		// }
		$state.go('start')
    	scope.state = $state.current;
        scope.$on('$stateChangeSuccess', function(e, toState) {
        	var fromState = scope.state;
            scope.state = toState;
            setActiveLink(fromState.name, toState.name);
        });

        function setActiveLink(prev_id, curr_id) {
        	angular.element(document.getElementById(prev_id)).removeClass('active');
        	angular.element(document.getElementById(curr_id)).addClass('active');
        }
    }
  }
}]);