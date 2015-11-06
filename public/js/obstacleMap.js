(function() {
  angular
    .module('app')
    .directive('obstacleMap', function() {
      return {
        restrict: 'E',
        template: '<div class="obstacle-map-container"></div>',
        replace: true,
        link: function(scope, elem, attrs) {
          var w = elem[0].offsetWidth;
          var h = elem[0].offsetHeight;

          renderObstacleMap('.' + elem.attr('class'), w, h);
        }
      };
    });
})();
