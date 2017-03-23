angular.module('background', [])
.directive('backgroundEditor', function($state, canvasService) {
  return {
    restrict: 'E',
    templateUrl: 'cover-editor/background/background.html',
    controller: 'backgroundCtrl as bc',
    link: function(scope, elem, attr, ctrl) {
      scope.filter = {
        contrast: 100,
        brightness: 100,
        saturate: 100
      }
      canvasService.createCanvas(elem, attr.canvasId, 640, 640).then(function(canvasObject){
        scope.canvases.push(resultObject);
      }).catch(function(err) {
        console.log('could not create canvas')
      })
      scope.$watch('filter', function(filter){
        if(scope.dataURL) {
          canvasService.drawImage(scope.canvases, attr.canvasId, scope.dataURL, {filter: scope.filter})
        }
      }, true);
      scope.resetFilter = function() {
        scope.filter = {
          contrast: 100,
          brightness: 100,
          saturate: 100
        }
      }
    }
  }
})
.controller('backgroundCtrl', function(){});