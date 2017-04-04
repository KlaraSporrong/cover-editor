angular.module('Preview', [
  'PreviewService',
  'CoverChecker'
])
.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('preview', {
		url: '/preview'
	})
}])
.directive('previewEditor', ['previewService','menuService', function(previewService, menuService) {
  return {
    restrict: 'E',
    templateUrl: 'CoverEditor/Preview/Preview.html',
    controller: 'previewCtrl',
    controllerAs: 'pc',
    link: function(scope, elem, attr, ctrl) {
      previewService.initCanvas(elem[0].querySelector('canvas'));
      menuService.register({state: 'preview', iconId: 'remove_red_eye'})
    }
  }
}])
.controller('previewCtrl', ['$scope', 'coverChecker', 'previewService', function($scope, coverChecker, previewService){
  var pc = this;
  pc.download = function() {
    var layers = coverChecker.checkCover();
    if(layers.complete) {
      previewService.mergeLayers(layers.canvases);
    }
  }
  pc.isActive = function() {
    return $scope.state ? $scope.state.name.includes('preview') : false;
  }
}]);