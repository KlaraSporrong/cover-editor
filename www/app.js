angular.module('app', [
	'ui.router',
	'firebase',
	'ngRoute',
	'ngMaterial',
	'editor'
])
.directive('baseDirective', function($state) {
  return {
    templateUrl: 'app.html',
    link: function(scope, elem, attr, ctrl) {
    }
  }
})