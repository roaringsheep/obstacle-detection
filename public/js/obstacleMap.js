(function() {
  angular
    .module('app')
    .directive('obstacleMap', ['$window', '$timeout', function($window, $timeout) {
      return {
        restrict: 'E',
        template: '<div class="obstacle-map-container"></div>',
        replace: true,
        link: function(scope, elem, attrs) {
          var render = function() {
            var width = elem[0].offsetWidth;
            var height = elem[0].offsetHeight;

            renderObstacleMap(elem[0], width, height);
          }

          var w = angular.element($window);
          var resizeTimer;

          w.bind('resize', function () {
            $timeout.clear(resizeTimer);
            resizeTimer = $timeout(function() {
              render();
            }, 250);
          });

          render();
        }
      };
    }]);
})();
