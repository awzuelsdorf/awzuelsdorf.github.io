(function () {
'use strict';

angular.module('MenuApp')
.service('ShoppingListService', ShoppingListService);


ShoppingListService.$inject = ['$q', '$timeout', '$http']
function ShoppingListService($q, $timeout, $http) {
  var service = this;

  service.getItemsForCategory = function (category) {
    return $http({method: "GET", url: " https://davids-restaurant.herokuapp.com/menu_items.json?category=" + category}).then(function (result) {

      if (!result.data || !result.data["menu_items"]) {
        return [];
      }

      var menuItems = result.data["menu_items"];

      var foundItems = [];

      for (var i = 0; i < menuItems.length; ++i) {
        foundItems.push({name: menuItems[i]["name"], description: menuItems[i]["description"]});
      }

      return foundItems;
    });
  };

  service.getItems = function () {
    return $http({method: "GET", url: "https://davids-restaurant.herokuapp.com/categories.json"}).then(function (result) {

      if (!result.data) {
        return [];
      }

      var foundItems = [];

      for (var i = 0; i < result.data.length; ++i) {
        foundItems.push({categoryName: result.data[i]["name"], categoryShortName: result.data[i]["short_name"], items: service.getItemsForCategory(result.data[i]["short_name"])});
      }

      return foundItems;
    });
  };
}

})();
