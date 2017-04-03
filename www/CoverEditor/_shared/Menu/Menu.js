angular.module('Menu', [])
.config(['$urlRouterProvider', '$locationProvider', function ($urlRouterProvider, $locationProvider) {
	// Remove hashbang from URL
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
	$urlRouterProvider.otherwise('/');
}])
.directive('menu', ['$state', function($state) {
  return {
  	restrict: 'E',
    templateUrl: 'CoverEditor/Menu/Menu.html',
    link: function(scope, elem, attr, ctrl) {
        scope.$on('$stateChangeSuccess', function(e, toState) {
			console.log(e)
        });
    }
  }
}]);