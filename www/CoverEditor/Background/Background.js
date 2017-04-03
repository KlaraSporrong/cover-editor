angular.module('Background', [
  'BackgroundService',
  'CoverChecker',
  'FileChange'
])
.config(['$stateProvider', function($stateProvider){
  $stateProvider
  .state('background', {
    url: '/background'
  });
}])
.directive('backgroundEditor', ['coverChecker', 'backgroundService', function(coverChecker, backgroundService) {
  return {
    restrict: 'E',
    templateUrl: 'CoverEditor/Background/Background.html',
    controller: 'backgroundCtrl',
    controllerAs: 'bc',
    link: function(scope, elem, attr, ctrl) {
      backgroundService.initCanvas(elem[0].querySelector('canvas#background-canvas'));
      coverChecker.register({canvasObject: backgroundService.canvasObject, isLayerComplete: function(){return backgroundService.isLayerComplete()}});
    }
  }
}])
.controller('backgroundCtrl', ['$scope', 'backgroundService', function($scope, backgroundService){
  var bc = this;
  bc.filter = backgroundService.filter;
  bc.resetFilter = function(){
    backgroundService.resetFilter();
  }
  bc.updateFile = function(e, files){
    backgroundService.updateFile(files)
  }
  bc.isActive = function() {
    return $scope.state.name.includes('background');
  }
  $scope.$watch(function(){
    return bc.filter
  },function(filter){
    backgroundService.updateFilter();
  },true);

}]);