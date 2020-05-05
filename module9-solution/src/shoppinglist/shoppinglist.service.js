(function () {
'use strict';

angular.module('MenuApp')
.service('ShoppingListService', ShoppingListService);


ShoppingListService.$inject = ['$q', '$timeout', '$http']
function ShoppingListService($q, $timeout, $http) {
  var service = this;

  service.getItems = function () {
    return $http({method: "GET", url: "https://davids-restaurant.herokuapp.com/categories.json"}).then(function (result) {

      if (!result.data) {
        return [];
      }

      var foundItems = [];

      for (var i = 0; i < result.data.length; ++i) {
        foundItems.push({categoryName: result.data[i]["name"], categoryShortName: result.data[i]["short_name"]});
      }

      return foundItems;
    });
  };
}

})();
