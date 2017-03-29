angular.module('background', [
  'background-service',
  'cover-checker',
  'canvas-scaler'
])
.config(function($stateProvider){
  $stateProvider
  .state('background', {
    url: '/background'
  });
})
.directive('backgroundEditor', ['coverChecker', 'canvasScaler', 'backgroundService', function(coverChecker, canvasScaler, backgroundService) {
  return {
    restrict: 'E',
    templateUrl: 'cover-editor/background/background.html',
    controller: 'backgroundCtrl',
    controllerAs: 'bc',
    link: function(scope, elem, attr, ctrl) {
      
      // Get canvas object
      ctrl.canvasObject = canvasScaler.scaleCanvas(elem[0].querySelector('#background-canvas'), 640, 1280);

      // Listen to file change
      angular.element(elem[0].querySelector('#background-file-upload')).on('change', function(e){
        ctrl.file = e.target.files[0];
        backgroundService.drawImage(ctrl.canvasObject, ctrl.file, ctrl.filter);
      })

      // Watch filter
      scope.$watch(function(){
        return ctrl.filter
      },function(filter){
        if(!ctrl.file) {
          return;
        }
        backgroundService.drawImage(ctrl.canvasObject, ctrl.file, ctrl.filter);
      },true);

      // Register canvas
      coverChecker.register({canvasObject:ctrl.canvasObject, isLayerComplete: function(){return backgroundService.isLayerComplete(ctrl)}});
    }
  }
}])
.controller('backgroundCtrl', function(){
  var bc = this;
  bc.filter = {
    contrast: 100,
    brightness: 100,
    saturate: 100
  }
  bc.resetFilter = function() {
    bc.filter = {
      contrast: 100,
      brightness: 100,
      saturate: 100
    }
  }
})