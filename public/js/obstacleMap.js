(function() {
  angular
    .module('app')
    .directive('obstacleMap', ['$window', function($window) {
      return {
        restrict: 'E',
        template: '<div class="obstacle-map-container"></div>',
        replace: true,
        link: function(scope, elem, attrs) {
          var render = function() {
            var width = elem[0].offsetWidth;
            var height = elem[0].offsetHeight;

            renderObstacleMap('.' + elem.attr('class'), width, height);
          }

          var w = angular.element($window);
          var resizeTimer;

          w.bind('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
              render();
            }, 250);
          });

          render();
        }
      };
    }]);
})();
