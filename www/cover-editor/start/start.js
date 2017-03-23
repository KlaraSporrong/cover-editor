angular.module('start', [])
.directive('startEditor', function($state, canvasService) {
  return {
    restrict: 'E',
    templateUrl: 'cover-editor/start/start.html',
    link: function(scope, elem, attr, ctrl) {
    }
  }
});