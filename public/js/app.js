(function() {

  var randomX = function() { return parseInt(Math.random() * 3000); },
      randomY = function() { return parseInt(Math.random() * 3000); },
      randomR = function() { return parseInt(Math.random() * 50); }

  function range(n) {
    return Array.apply(null, Array(n)).map(function (_, i) { return i; });
  }

  angular
    .module("app", [])
    .controller("AppController", ['$scope', function($scope) {

      $scope.obstacleMap = {
        data: range(50).map(function() {
          return [
            randomX(),
            randomY()
          ];
        }),
        options: {
          proximityRadius: 150
        }
      }

    }]);
})();
