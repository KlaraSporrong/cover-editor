angular.module('Text', [
  'TextService',
  'CoverChecker'
])
.config(['$stateProvider', function($stateProvider){
  $stateProvider
  .state('text', {
    url: '/text'
  })
}])
.directive('textEditor', ['coverChecker', 'textService','menuService', function(coverChecker, textService, menuService) {
  return {
    restrict: 'E',
    templateUrl: 'CoverEditor/Text/Text.html',
    controller: 'textCtrl',
    controllerAs: 'tc',
    link: function(scope, elem, attr, ctrl) {
      textService.initCanvas(elem[0].querySelector('canvas#text-canvas'));
      coverChecker.register({canvasObject:textService.canvasObject, isLayerComplete: function(){return textService.isLayerComplete()}});
      menuService.register({state: 'text', iconId: 'text_fields'})
    }
  }
}])
.controller('textCtrl', ['$scope', 'textService', 'menuService', function($scope, textService, menuService){
  var tc = this;
  tc.textObj = textService.textObj;
  tc.textColors = textService.textColors;
  tc.state = menuService.state;
  $scope.$watch(function(){
    return tc.textObj
  },function(text_string){
    textService.updateText();
  },true);

  tc.isActive = function() {
    return $scope.state ? $scope.state.name.includes('text') : false;
  }
}]);