(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.factory('FoundItemsFactory', FoundItemsFactory)
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
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

NarrowItDownController.$inject = ['FoundItemsFactory'];
function NarrowItDownController(FoundItemsFactory) {
  var viewList = this;

  var foundItemsService = FoundItemsFactory();

  viewList.items = foundItemsService.getItems();

  viewList.searchTerm = "";

  viewList.searchItems = function () {
    var newItems = foundItemsService.getMatchedMenuItems(viewList.searchTerm);

    viewList.items.splice(0, viewList.items.length);

    for (var i = 0; i < newItems.length; ++i) {
      viewList.items.push(newItems[i]);
    }
  };

  viewList.removeItem = function (itemIndex) {
    foundItemsService.removeItem(itemIndex);
  };
}

function FoundItemsService($http) {
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

FoundItemsFactory.$inject = ["$http"];
function FoundItemsFactory($http) {
  var factory = function () {
    return new FoundItemsService($http);
  };

  return factory;
}

})();
