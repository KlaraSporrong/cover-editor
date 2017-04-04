angular.module('CoverEditor', [
    'Menu',
	'Start',
	'Background',
	'Text',
	'Preview'
])
.config(['$urlRouterProvider', '$locationProvider', function ($urlRouterProvider, $locationProvider) {
	// Remove hashbang from URL
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
	$urlRouterProvider.otherwise('/');
}])
.directive('coverEditor', function() {
    return {
        restrict: 'E',
        templateUrl: 'CoverEditor/CoverEditor.html'
    }
});