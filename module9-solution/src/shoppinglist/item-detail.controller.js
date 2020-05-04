(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemDetailController', ItemDetailController);


ItemDetailController.$inject = ['$stateParams', 'items'];
function ItemDetailController($stateParams, items) {
  var itemDetail = this;
  var item = items[$stateParams.itemId];

  itemDetail.categoryName = item.categoryName;
  itemDetail.categoryShortName = item.categoryShortName;
}

})();
