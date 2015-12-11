(function() {

  var randomX = function() { return parseInt(Math.random() * 3000); },
      randomY = function() { return parseInt(Math.random() * 3000); },
      randomR = function() { return parseInt(Math.random() * 50); }

  function range(n) {
    return Array.apply(null, Array(n)).map(function (_, i) { return i; });
  }

  angular
    .module('app')
    .directive('obstacleMap', ['$window', '$timeout', function($window, $timeout) {
      return {
        restrict: 'E',
        template: '<div class="obstacle-map-container"></div>',
        replace: true,
        link: function(scope, elem, attrs) {

          var data = range(50).map(function() {
            return [
              randomX(),
              randomY()
            ];
          });

          var render = function() {
            var width = elem[0].offsetWidth;
            var height = elem[0].offsetHeight;

            renderObstacleMap(elem[0], data, {width: width, height: height});
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
