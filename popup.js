var app = angular.module('app', [])
	
	.controller('Main', function($scope){
		chrome.storage.local.get('bookmark', function(data){
			$scope.bookmarks = data.bookmark;
			$scope.$apply();
		});

		$scope.addBookmark = function(){
			chrome.storage.local.get(function(data){
				if (data){
					var currBookmarks = data.bookmark;
				}
				chrome.tabs.query({active:true,currentWindow:true},function(tabArray){
					console.log('here')
					var markArr = [];
					if (currBookmarks){
						currBookmarks.forEach(function(item){
							markArr.push(item)
						})
					}
					markArr.push(tabArray[0].url)
			    	chrome.storage.local.set({bookmark: markArr});
			    	$scope.$apply();
				});
			})
		};
		$scope.deleteBookmarks = function(){
			chrome.storage.local.clear();
		}
	});