angular.module('preview', [
  'preview-service',
  'cover-checker'
])
.config(function($stateProvider){
	$stateProvider
	.state('preview', {
		url: '/preview'
	})
})
.directive('previewEditor', [function() {
  return {
    restrict: 'E',
    templateUrl: 'cover-editor/preview/preview.html',
    controller: 'previewCtrl',
    controllerAs: 'pc'
  }
}])
.controller('previewCtrl', ['coverChecker', 'canvasScaler', 'previewService', function(coverChecker, canvasScaler, previewService){
  var lc = this;
  lc.canvasObject = canvasScaler.scaleCanvas(document.querySelector('#layer-canvas'), 640, 1280);
  lc.merge = function() {
    var cover = coverChecker.checkCover();
    if (cover.complete) {
      previewService.mergeLayers(lc.canvasObject, cover.canvases)
    } else {
      alert('canvas is not complete!')
    }
  }
}]);