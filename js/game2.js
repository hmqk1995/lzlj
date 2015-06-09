$(document).ready(function() {
	//令所有页面img_area_game2元素opacity初始化为0;
	// (function(){
	// 	var tagStore = [], item, name;
	// 	for(var i = 0; i < 8; i++) {
	// 		name = 'img_area_game2_' + (i + 1);
	// 		item = document.getElementById(name);
	// 		tagStore[i] = item;
	// 	}
	// 	for(var i = 0,len = tagStore.length; i < len; i++) {
	// 		tagStore[i].style.opacity = 0;
	// 	}
	// }());

	(function (){
		var button = document.getElementById('img_area_game2_4');
		$(button).on('tap', function() {
			var mask = document.getElementById('mask3');
			mask3.style.display = "block";
			$(mask).on('tap', function() {
				$(this).hide();
			});
		});
	}());
	//手指滑动
	setTimeout(function(){

	}, 1000);
});