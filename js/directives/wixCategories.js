(function(){
	
	'use strict';

	angular
		.module('categories')
		.directive('wixCategories', WixCategories);

	function WixCategories(){
		return {
			restrict: 'A',
			scope: {
				all: '=wixCategories'
			},
			link: function(scope, element, attrs){

				//in order to handle the async population we need to watch the collection!
				var kill = scope.$watchCollection('all', dataChanged);
				scope.$on('$destroy', kill);

				//some research over iteration strategy: http://codereview.stackexchange.com/questions/47932/recursion-vs-iteration-of-tree-structure
				function dataChanged(newVal, oldVal){
					if(!newVal.length) return;

					var all = newVal;
					var domElement = element;
					domElement.empty();
					
					for(var i=0; i < all.length; i++){

						var category = all[i];
						category.next = null;

						var current = category;
						var last = current;

						var container = domElement;

						while (current) {
						  
						  var li = angular.element('<li>').text(current.name)
						  container.append( li );

						  var children = current.subcategories;
						  
						  for (var i2 = 0; children && i2 < children.length; i2++) {
						    var ul = angular.element('<ul>');
						    li.append(ul);
						    container = ul;

						    var child = children[i2];
						    child.next = null;
						    last.next = child;
						    last = child;
						    
						  }
						  current = current.next;

						}

					}

				}
				
			}
		}

	}

})();