angular.module('MenuService', [])
.service('menuService', [function(){
	this.menuItems = [];
	this.register = function(menuItem) {
		this.menuItems.push(menuItem)
	}
}]);