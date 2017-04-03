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
.directive('previewEditor', ['previewService', function(previewService) {
  return {
    restrict: 'E',
    templateUrl: 'CoverEditor/Preview/Preview.html',
    controller: 'previewCtrl',
    controllerAs: 'pc',
    link: function(scope, elem, attr, ctrl) {
      previewService.initCanvas(elem[0].querySelector('canvas#layer-canvas'));
    }
  }
}])
.controller('previewCtrl', ['$scope', 'coverChecker', 'previewService', function($scope, coverChecker, previewService){
  var pc = this;
  pc.download = function() {
    previewService.mergeLayers(coverChecker.checkCover());
  }
  pc.isActive = function() {
    return $scope.state.name.includes('preview');
  }
}]);