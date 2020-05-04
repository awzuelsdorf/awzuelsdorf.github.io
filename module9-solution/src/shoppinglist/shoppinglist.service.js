(function () {
'use strict';

angular.module('MenuApp')
.service('ShoppingListService', ShoppingListService);


ShoppingListService.$inject = ['$q', '$timeout']
function ShoppingListService($q, $timeout) {
  var service = this;

  // List of shopping items
  var items = [];

  // Pre-populate a no cookie list
  items.push({
    categoryName: "Sugar",
    categoryShortName: "2 bags",
  });
  items.push({
    categoryName: "flour",
    categoryShortName: "1 bags"
  });
  items.push({
    categoryName: "Chocolate Chips",
    categoryShortName: "3 bags"
  });

  // Simulates call to server
  // Returns a promise, NOT items array directly
  service.getItems = function () {
    var deferred = $q.defer();

    // Wait 2 seconds before returning
    $timeout(function () {
      // deferred.reject(items);
      deferred.resolve(items);
    }, 800);

    return deferred.promise;
  };
}

})();
