angular.module('Start', [])
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('start', {
		url: '/start'
	})
}])
.directive('startEditor', ['menuService', function(menuService) {
  return {
    restrict: 'E',
    templateUrl: 'CoverEditor/Start/Start.html',
    controller: 'startCtrl',
    controllerAs: 'sc',
    link: function(scope, elem, attr, ctrl) {
      menuService.register({state: 'start', iconId: 'home'})
    }
  }
}])
.controller('startCtrl', ['$scope', function($scope){
  var sc = this;
  sc.isActive = function() {
    return $scope.state ? $scope.state.name.includes('start') : false;
  }
}]);