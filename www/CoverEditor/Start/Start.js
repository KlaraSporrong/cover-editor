angular.module('Start', [])
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('start', {
		url: '/start'
	})
}])
.directive('startEditor', function() {
  return {
    restrict: 'E',
    templateUrl: 'CoverEditor/Start/Start.html',
    controller: 'startCtrl',
    controllerAs: 'sc'
  }
})
.controller('startCtrl', ['$scope', function($scope){
  var sc = this;
  sc.isActive = function() {
    return $scope.state.name.includes('start');
  }
}]);