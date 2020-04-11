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
      myTitle: '@title',
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
  viewList.title = "";

  viewList.searchTerm = "";

  viewList.searchItems = function () {
    var newItems = shoppingList.getMatchedMenuItems(viewList.searchTerm);

    console.log("new items: ", newItems);

    viewList.items.splice(0, viewList.items.length);

    for (var i = 0; i < newItems.length; ++i) {
      viewList.items.push(newItems[i]);
    }

    console.log("hi");
    console.log(viewList.items);
    viewList.updateTitle();
  };

  viewList.updateTitle = function () {
    if (viewList.items == null || viewList.items.length == 0) {
      viewList.title = "Nothing found";
    } else {
      viewList.title = "";
    }
  };

  viewList.removeItem = function (itemIndex) {
    console.log("'this' is: ", this);
    shoppingList.removeItem(itemIndex);
    viewList.updateTitle();
  };
}

function ShoppingListService($http) {
  var service = this;

  // List of shopping items
  var items = [];

  var warning

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
          console.log(allItems[i]["description"].indexOf(searchTerm));
          console.log(allItems[i]["description"]);
          console.log(searchTerm);
          items.push({name: allItems[i]["description"]});
          foundItems.push({name: allItems[i]["description"]});
        }
      }

      return foundItems;
    });

    //var menuResponse = {"menu_items":[{"id":877,"short_name":"A1","name":"Won Ton Soup with Chicken","description":"chicken broth with white meat chicken pieces","price_small":2.55,"price_large":5.0,"small_portion_name":"pint","large_portion_name":"quart"},{"id":878,"short_name":"A2","name":"Egg Drop Soup","description":"chicken broth with egg drop","price_small":2.25,"price_large":4.5,"small_portion_name":"pint","large_portion_name":"quart"},{"id":879,"short_name":"A3","name":"Chicken Corn Soup","description":"clear chicken broth with creamy corn and egg drop","price_small":2.75,"price_large":5.5,"small_portion_name":"pint","large_portion_name":"quart"},{"id":880,"short_name":"A4","name":"Hot and Sour Soup","description":"tofu, chicken, mushroom, bamboo shoot, and egg","price_small":2.55,"price_large":5.0,"small_portion_name":"pint","large_portion_name":"quart"}]};
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
