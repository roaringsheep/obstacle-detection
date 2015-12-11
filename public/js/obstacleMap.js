(function() {

  angular
    .module('app')
    .directive('obstacleMap', ['$window', '$timeout', function($window, $timeout) {
      return {
        restrict: 'E',
        template: '<div class="obstacle-map-container"></div>',
        replace: true,
        scope: {
          data: "=omData",
          options: "=omOptions"
        },
        link: function(scope, elem, attrs) {

          var render = function() {
            var data = scope.data || {},
                opts = scope.options || {};

            // keep width and height in sync
            opts.width = elem[0].offsetWidth;
            opts.height = elem[0].offsetHeight;

            renderObstacleMap(elem[0], scope.data, opts);
          }

          var w = angular.element($window);
          var resizeTimer;

          w.bind('resize', function () {
            $timeout.cancel(resizeTimer);
            resizeTimer = $timeout(function() {
              render();
            }, 250);
          });

          render();
        }
      };
    }]);
})();
