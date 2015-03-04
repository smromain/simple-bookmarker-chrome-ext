var app = angular.module('app', [])
	
	.controller('Main', function($scope, BookmarkFactory){
		chrome.storage.local.get('bookmark', function(data){
			$scope.bookmarks = data.bookmark;
			$scope.$apply();
		});

		$scope.bookmarkInteraction = function(action){
			if (action === 'add'){
				BookmarkFactory.addBookmark();
			}
			else if (action === 'remove') {
				BookmarkFactory.removeAllBookmarks();
			}
		};
	})

	.factory('BookmarkFactory', function(){
		function addToStorage (){
			chrome.storage.local.get(function(data){
				if (data){
					var currBookmarks = data.bookmark;
				}
				chrome.tabs.query({active:true,currentWindow:true},function(tabArray){
					var markArr = [];
					if (currBookmarks){
						currBookmarks.forEach(function(item){
							markArr.push(item)
						})
					}
					markArr.push(tabArray[0].url)
			    	chrome.storage.local.set({bookmark: markArr});
				});
			})
		};

		return {
			addBookmark: function(){
				return addToStorage();
			},
			removeAllBookmarks: function(){
				return chrome.storage.local.clear();
			}
		}

	})