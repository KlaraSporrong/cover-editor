angular.module('Menu', [
	'MenuService'
])
.directive('menu', ['$state','menuService', function($state, menuService) {
	return {
	  	restrict: 'E',
	    templateUrl: 'CoverEditor/Menu/Menu.html',
	    controller: 'MenuCtrl',
	    controllerAs: 'mc'
	}
}])
.controller('MenuCtrl', ['$scope', '$state', 'menuService', function($scope, $state, menuService){
	var mc = this;
	mc.menuItems = menuService.menuItems;
	function initState() {
    	$state.go(mc.menuItems[0].state)
    	$scope.state = $state.current;
    }
    initState();
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		$scope.state = toState;
    });
}]);