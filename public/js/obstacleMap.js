(function() {
  angular
    .module('app')
    .directive('obstacleMap', function() {
      return {
        restrict: 'E',
        template: '<div class="obstacle-map-container"></div>',
        replace: true,
        link: function(scope, elem, attrs) {
          renderObstacleMap('.obstacle-map-container');
        }
      };
    });
})();
