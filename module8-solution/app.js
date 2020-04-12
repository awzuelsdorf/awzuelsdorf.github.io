(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.factory('ShoppingListFactory', ShoppingListFactory)
.directive('shoppingList', ShoppingListDirective);


function ShoppingListDirective() {
  var ddo = {
    templateUrl: 'shoppingList.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: NarrowItDownDirectiveController,
    controllerAs: 'list',
    bindToController: true,
  };

  return ddo;
}

function NarrowItDownDirectiveController() {
  var list = this;

  list.isEmptySearchResult = function () {
    var name = list.items == null || list.items.length == 0;
  };
}

NarrowItDownController.$inject = ['ShoppingListFactory'];
function NarrowItDownController(ShoppingListFactory) {
  var viewList = this;

  var shoppingList = ShoppingListFactory();

  viewList.items = shoppingList.getItems();

  viewList.searchTerm = "";

  viewList.searchItems = function () {
    var newItems = shoppingList.getMatchedMenuItems(viewList.searchTerm);

    viewList.items.splice(0, viewList.items.length);

    for (var i = 0; i < newItems.length; ++i) {
      viewList.items.push(newItems[i]);
    }
  };

  viewList.removeItem = function (itemIndex) {
    shoppingList.removeItem(itemIndex);
  };
}

function ShoppingListService($http) {
  var service = this;

  var items = [];

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({method: "GET", url: "https://davids-restaurant.herokuapp.com/menu_items.json"}).then(function (result) {
      var foundItems = [];
      items.splice(0, items.length);

      if (searchTerm == null || searchTerm.trim().length == 0) {
        return [];
      }

      var allItems = result["data"]["menu_items"];

      var foundItems = [];

      for (var i = 0; i < allItems.length; ++i) {
        if (allItems[i]["description"].indexOf(searchTerm) !== -1) {
          items.push({description: allItems[i]["description"], name: allItems[i]["name"], shortName: allItems[i]["short_name"]});
          foundItems.push({description: allItems[i]["description"], name: allItems[i]["name"], shortName: allItems[i]["short_name"]});
        }
      }

      return foundItems;
    });
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}

ShoppingListFactory.$inject = ["$http"];
function ShoppingListFactory($http) {
  var factory = function () {
    return new ShoppingListService($http);
  };

  return factory;
}

})();
