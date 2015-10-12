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
					
					for(var i=0; i < all.length; i++){

						var category = all[i];
						category.next = null;

						var current = category;
						var last = current;
						while (current) {
						  
						  var li = angular.element('<li>').text(current.name)
						  domElement.append( li );

						  var children = current.subcategories;
						  
						  for (var i2 = 0; children && i2 < children.length; i2++) {
						    var ul = angular.element('<ul>');
						    li.append(ul);

						    var child = children[i2];
						    child.next = null;
						    child.domParent = domElement.parent();
						    last.next = child;
						    last = child;
						    domElement = child.domParent;
						    
						  }
						  current = current.next;

						}

					}

				}
				
			}
		}

	}

})();