angular.module('text', [
  'text-service',
  'cover-checker',
  'canvas-scaler'
])
.config(function($stateProvider){
  $stateProvider
  .state('text', {
    url: '/text'
  })
})
.directive('textEditor', ['coverChecker', 'canvasScaler', 'textService', function(coverChecker, canvasScaler, textService) {
  return {
    restrict: 'E',
    templateUrl: 'cover-editor/text/text.html',
    controller: 'textCtrl',
    controllerAs: 'tc',
    link: function(scope, elem, attr, ctrl) {
      // Get canvas object
      ctrl.canvasObject = canvasScaler.scaleCanvas(elem[0].querySelector('#text-canvas'), 640, 1280);
      // Watch text string
      scope.$watch(function(){
        return ctrl.text_string
      },function(text_string){
        textService.drawText(ctrl.canvasObject, ctrl.text_string, ctrl.text_color);
      });
      // Watch text color
      scope.$watch(function(){
        return ctrl.text_color
      }, function(text_color){
        textService.drawText(ctrl.canvasObject, ctrl.text_string, ctrl.text_color);
      })

      // Register canvas
      coverChecker.register({canvasObject:ctrl.canvasObject, isLayerComplete: function(){return textService.isLayerComplete(ctrl)}});
    }

  }
}])
.controller('textCtrl', function(){
  var tc = this;
  tc.text_color = '#FFF';
});