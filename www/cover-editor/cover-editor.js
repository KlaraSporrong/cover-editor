angular.module('editor', [
	'start',
	'background',
	'text',
	'preview'
])
.config(function ($urlRouterProvider, $locationProvider, $stateProvider) {

	// Remove hashbang from URL
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});

	$urlRouterProvider.otherwise('/');
})
.directive('coverEditor', function($state, $rootScope) {
  return {
  	restrict: 'E',
    templateUrl: 'cover-editor/cover-editor.html',
    link: function(scope, elem, attr, ctrl) {
		// window.onbeforeunload = function(e) {
		// 	console.log(e)
		// 	return '';
		// }
		$state.go('start')
    	scope.state = $state.current;

        $rootScope.$on('$stateChangeSuccess', function(e, toState) {
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
});