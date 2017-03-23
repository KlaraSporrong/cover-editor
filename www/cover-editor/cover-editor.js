angular.module('editor', [
	'start',
	'background',
	'text',
	'preview',
	'canvas-service',
	'canvas-file-upload'
])
.run(function($state){
	$state.go('start')
})
.config(function ($urlRouterProvider, $locationProvider, $stateProvider) {

	// Remove hashbang from URL
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
	$stateProvider
	.state('start', {
		url: '/start'
	})
	.state('background', {
		url: '/background'
	})
	.state('text', {
		url: '/text'
	})
	.state('preview', {
		url: '/preview'
	})
	$urlRouterProvider.otherwise('/');
})
.directive('coverEditor', function($state, $rootScope) {
  return {
  	restrict: 'E',
    templateUrl: 'cover-editor/cover-editor.html',
    link: function(scope, elem, attr, ctrl) {
		window.onbeforeunload = function(e) {
			console.log(e)
			return '';
		}

    	scope.state = $state.current;
    	scope.canvases = [];
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