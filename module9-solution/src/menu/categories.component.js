(function () {
'use strict';

angular.module('MenuApp')
.component('shoppingList', {
  templateUrl: 'src/menu/templates/shoppinglist.template.html',
  bindings: {
    items: '<'
  }
});

})();
