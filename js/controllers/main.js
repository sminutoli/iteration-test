(function(){
	
	'use strict';

	angular
		.module('categories')
		.controller('Main', Main);

	function Main(Categories){
		var vm = this;

		//exposed members first
		vm.categories = [];
		vm.newCategory = {};
		vm.selectedCategory = null;
		vm.nested = false;
		vm.save = save;

		Categories
			.getAll()
			.then(populate);

		function populate(data){
			angular.copy(data, vm.categories);
		}

		function save(){
			var collection = vm.categories;
			if(vm.selectedCategory){
				vm.selectedCategory.subcategories = vm.selectedCategory.subcategories || [];
				collection = vm.selectedCategory.subcategories;
				vm.selectedCategory = null;
			}
			collection.push(vm.newCategory);
			vm.newCategory = {};
		}
	}

})();