angular.module('preview', [])
.directive('previewEditor', function($state, canvasService) {
  return {
    restrict: 'E',
    templateUrl: 'cover-editor/preview/preview.html',
    link: function(scope, elem, attr, ctrl) {
      scope.merge = function() {
        canvasService.mergeLayers(scope.canvases);
      }
    }
  }
});