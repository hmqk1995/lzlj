$(document).ready(function() {
	App.analyse("test", "game2");
	//解决安卓的swipe失效问题
	$('body').bind("touchmove", function(e) {e.preventDefault();});
	var hashId = window.location.hash;
	if (hashId.length === 0) {window.location.href='index.html';} //如果没有hashId自动跳转到首页
	//读取单个cookie
	var lzlj_id = Cookie.get('lzlj_id');
	if (lzlj_id == '' || lzlj_id == undefined || lzlj_id != hashId) {
		// 创建share对象
		var share = new Share(hashId);
		//显示 帮别人撕的页面
		//文字 “帮他撕”
			$("#img_area_game2_10").show();
		//按钮 “我也要撕”
			$('#img_area_game2_9').show();
			//名牌事件处理程序
			$('#img_area_game2_7').one('swipeRight', function toHelp(){
				// 撕并返回是否成功
				var helpSucceed = share.help();
				if (helpSucceed == true) {
					$('#img_area_game2_7').addClass('animated hinge');
					setTimeout(function(){
						window.location.replace('giftdemo.html');
					}, 1500);
				} else {
					$('#img_area_game2_7').one('swipeRight', toHelp);
				}
				//返回帮助数量	
					// switch (share.helper) {
					// 	case share.helper >= 2 :
					// 		//背景图片为获得奖品
					// 		//跳转链接
					// 		break;
					// 	case 1 :
					// 		//还有一位
					// 		break;
					// 	case 0 :
					// 		//还有两位
					// 		break;
					// }
			});}
	//} else {
		// 创建share对象
		// var share = new Share(lzlj_id);
		//显示 自己的页面

		//按钮 “让朋友一起撕”
			$('#img_area_game2_4').show();
	// }

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
			container.innerHTML += '<img id="share_img" src="/assets/images/share.png" style="position:absolute;z-index:1000;width:50%;right:10%;top:30px;" />';
			$('#mask3').on('tap', function() {
				$(this).hide();
				$('#share_img').remove();
				$('#img_area_game2_4').on('tap', tap);
			});
		});
	}());
	//手过一段时间消失
	setTimeout(function(){$('#img_area_game2_8').removeClass('infinite').addClass('slideOutRight');}, 2000);

	// 音乐播放
	function playMusic() {
	    var audio = document.getElementById('audio');
	    // audio.play();
	    audio.loop = true;
	}
	playMusic();
});