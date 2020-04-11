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
    link: NarrowItDownDirectiveLink
  };

  return ddo;
}


function NarrowItDownDirectiveLink(scope, element, attrs, controller) {
  console.log("Link scope is: ", scope);
  console.log("Controller instance is: ", controller);
  console.log("Element is: ", element);

  scope.$watch('list.cookiesInList()', function (newValue, oldValue) {
    console.log("Old value: ", oldValue);
    console.log("New value: ", newValue);

    if (newValue === true) {
      displayCookieWarning();
    }
    else {
      removeCookieWarning();
    }

  });

  function displayCookieWarning() {
    // Using Angluar jqLite
    // var warningElem = element.find("div");
    // console.log(warningElem);
    // warningElem.css('display', 'block');

    // If jQuery included before Angluar
    var warningElem = element.find("div.error");
    warningElem.slideDown(900);
  }


  function removeCookieWarning() {
    // Using Angluar jqLite
    // var warningElem = element.find("div");
    // warningElem.css('display', 'none');

    // If jQuery included before Angluar
    var warningElem = element.find("div.error");
    warningElem.slideUp(900);
  }
}


function NarrowItDownDirectiveController() {
  var list = this;

  list.cookiesInList = function () {
    for (var i = 0; i < list.items.length; i++) {
      var name = list.items[i].name;
      if (name.toLowerCase().indexOf("cookie") !== -1) {
        return true;
      }
    }

    return false;
  };
}


NarrowItDownController.$inject = ['ShoppingListFactory'];
function NarrowItDownController(ShoppingListFactory) {
  var viewList = this;

  // Use factory to create new shopping list service
  var shoppingList = ShoppingListFactory();

  viewList.items = shoppingList.getItems();
  var origTitle = "Shopping List #1";
  viewList.title = origTitle + " (" + viewList.items.length + " items )";

  viewList.searchTerm = "";

  viewList.searchItems = function () {
    var newItems = shoppingList.getMatchedMenuItems(viewList.searchTerm);

    console.log("new items: ", newItems);

    viewList.items.splice(0, viewList.items.length);

    for (var i = 0; i < newItems.length; ++i) {
      viewList.items.push(newItems[i]);
    }

    console.log(viewList.items);
    viewList.title = origTitle + " (" + viewList.items.length + " items )";
  };

  viewList.removeItem = function (itemIndex) {
    console.log("'this' is: ", this);
    this.lastRemoved = "Last item removed was " + this.items[itemIndex].name;
    shoppingList.removeItem(itemIndex);
    this.title = origTitle + " (" + viewList.items.length + " items )";
  };
}


// If not specified, maxItems assumed unlimited
function ShoppingListService() {
  var service = this;

  // List of shopping items
  var items = [];

  service.getMatchedMenuItems = function (searchTerm) {
    //TODO: Remove this w/ the response from the endpoint
    var menuResponse = {"menu_items":[{"id":877,"short_name":"A1","name":"Won Ton Soup with Chicken","description":"chicken broth with white meat chicken pieces","price_small":2.55,"price_large":5.0,"small_portion_name":"pint","large_portion_name":"quart"},{"id":878,"short_name":"A2","name":"Egg Drop Soup","description":"chicken broth with egg drop","price_small":2.25,"price_large":4.5,"small_portion_name":"pint","large_portion_name":"quart"},{"id":879,"short_name":"A3","name":"Chicken Corn Soup","description":"clear chicken broth with creamy corn and egg drop","price_small":2.75,"price_large":5.5,"small_portion_name":"pint","large_portion_name":"quart"},{"id":880,"short_name":"A4","name":"Hot and Sour Soup","description":"tofu, chicken, mushroom, bamboo shoot, and egg","price_small":2.55,"price_large":5.0,"small_portion_name":"pint","large_portion_name":"quart"}]};

    console.log("hi");

    var allItems = menuResponse["menu_items"];

    items.splice(0, items.length);

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
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}


function ShoppingListFactory() {
  var factory = function (maxItems) {
    return new ShoppingListService(maxItems);
  };

  return factory;
}

})();
