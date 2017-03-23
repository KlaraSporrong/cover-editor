angular.module('text', [])
.directive('textEditor', function($state, canvasService) {
  return {
    restrict: 'E',
    templateUrl: 'cover-editor/text/text.html',
    controller: 'textCtrl as tc',
    link: function(scope, elem, attr, ctrl) {
      canvasService.createCanvas(elem, attr.canvasId, 640, 640).then(function(canvasObject){
        scope.canvases.push(resultObject);
      }).catch(function(err) {
        console.log('could not create canvas')
      })

      ctrl.text_color = 'white';
      ctrl.text_string = '';
      scope.updateText = function(text_string) {
        ctrl.text_string = text_string;
        canvasService.drawText(scope.canvases, attr.canvasId, ctrl.text_string, ctrl.text_color)
      }
      scope.changeTextColor = function(color_string) {
        ctrl.text_color = color_string;
        canvasService.drawText(scope.canvases, attr.canvasId, ctrl.text_string, ctrl.text_color)
      }
    }
  }
})
.controller('textCtrl', function(){

});