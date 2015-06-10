$(document).ready(function() {
	//令所有页面img_area_game2元素opacity初始化为0;
	(function(){
		setTimeout(function(){$('#game2_wrapper').css('opacity', '1').addClass('animated').addClass('fadeIn')}, 800);
		setTimeout(function(){$("#game2_wrapper").removeClass('fadeIn')}, 1800);
	}());
	//点击按钮出现遮罩
	(function () {
		var container = document.getElementById('game2_container');
		$('#img_area_game2_4').on('tap', function tap() {
			var mask = document.getElementById('mask3');
			mask3.style.display = "block";
			container.innerHTML += '<img id="share_img" src="img/share.png" style="position:absolute;z-index:1000;width:50%;right:10%;top:30px;" />';
			$('#mask3').on('tap', function() {
				$(this).hide();
				$('#share_img').remove();
				$('#img_area_game2_4').on('tap', tap);
			});
		});
	}());
	//手过一段时间消失
	setTimeout(function(){$('#img_area_game2_8').removeClass('infinite').addClass('slideOutRight');}, 2000);

	//名牌事件处理程序
	var $brand = $('#img_area_game2_7');
	$brand.on('swipeRight', function(){
		$brand.addClass('animated hinge');
		setTimeout(function(){
			location.href = 'giftdemo.html';
		}, 1500);
	});
});