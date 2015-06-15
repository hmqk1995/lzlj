var share,lzlj_id,hashId;
$(document).ready(function() {
	App.analyse("test", "game2");
	//解决安卓的swipe失效问题
	$('body').bind("touchmove", function(e) {e.preventDefault();});
	hashId = location.hash;
	hashId = hashId.slice(1);
	if (hashId.length === 0) {location.href='index.html';} //如果没有hashId自动跳转到首页

	//返回帮助数量	
	function returnHelper () {
		var img = document.getElementById('img_area_game2_5');
		switch (share.helper) {
			case share.helper >= 2 :
				//背景图片为获得奖品
				//跳转链接
				img.setAttribute('src', '/assets/images/game2_over.png');
				break;
			case 1 :
				//还有一位
				img.setAttribute('src', '/assets/images/game2_1f.png');
				break;
			case 0 :
				//还有两位
				img.setAttribute('src', '/assets/images/game2_2f.png');
				break;
		}
	}

	//读取单个cookie
	lzlj_id = Cookie.read('lzlj_id');
	if (lzlj_id == '' || lzlj_id == undefined || lzlj_id != hashId) {
		// 创建share对象
		share = new Share(hashId);
		//显示 帮别人撕的页面
		//文字 “帮他撕”
			$("#img_area_game2_10").show();
		//按钮 “我也要撕”
			$('#img_area_game2_9').show();
			$('#img_area_game2_9').on('tap', function(){
				location.href = 'index.html';
			});
			//名牌事件处理程序
			$('#img_area_game2_7').one('swipeRight', function toHelp(){
				// 撕并返回是否成功
				var helpSucceed = share.help();
				if (helpSucceed == true) {
					$('#img_area_game2_7').addClass('animated hinge');
					returnHelper();
					alert('成功帮Ta撕下了一个名牌！快去告诉Ta吧！');
				} else {
					$('#img_area_game2_7').one('swipeRight', toHelp);
				}
				
			});
	} else {
		// 创建share对象
		share = new Share(lzlj_id);
		function swipeRight(){
			var hasGame = Cookie.read('hasGame');
			var hasTicket = Cookie.read('hasTicket');
			if (hasTicket == 'true') {
				alert('你已经领过奖品啦！返回战绩栏查看哦！');
				location.replace('index.html');
				return;
			}
			$('#img_area_game2_7').addClass('animated hinge');
			if (hasGame == 'true') {
				var fNumber = share.helper;
				returnHelper();
				if (fNumber < 2) {
					alert('已经有'+ fNumber +'位朋友帮你撕过名牌。总共两位朋友帮你撕了名牌你就能获得奖品！');
					$('#img_area_game2_7').addClass('animated hinge');
					setTimeout(function(){$('#img_area_game2_7').hide();$('#img_area_game2_8').hide();}, 1000);
					return;
				}
				if (fNumber >= 2) {
					alert('恭喜！已经有两位好友帮你撕了名牌！你现在可以获得奖品！');
					$('#img_area_game2_7').addClass('animated hinge');
					setTimeout(function(){$('#img_area_game2_7').hide();$('#img_area_game2_8').hide();}, 1000);
					location.replace('giftdemo.html' + '\#' +lzlj_id);
					return;
				}
			}
			alert('你撕下了一张名牌，还需要两位朋友帮忙就能获得大礼！分享到朋友圈让他们来帮忙！');
			Cookie.set('hasGame', 'true');
		}
		//显示 自己的页面
		$('#img_area_game2_7').bind('swipeRight', swipeRight);
		//按钮 “让朋友一起撕”
			$('#img_area_game2_4').show();
	}

	//令所有页面img_area_game2元素opacity初始化为0;
	(function(){
		setTimeout(function(){$('#game2_wrapper').css('opacity', '1').addClass('animated').addClass('fadeIn')}, 800);
		setTimeout(function(){$("#game2_wrapper").removeClass('fadeIn')}, 1800);
	}());
	//点击按钮出现遮罩
	var container = document.getElementById('game2_container');
	$('#img_area_game2_4').on('tap', function tap() {
		var mask = document.getElementById('mask3');
		mask3.style.display = "block";
		container.innerHTML += '<img id="share_img" src="/assets/images/share.png" style="position:absolute;z-index:1000;width:50%;right:10%;top:30px;" />';
		$('#mask3').on('tap', function() {
			$(this).hide();
			$('#share_img').remove();
			$('#img_area_game2_4').on('tap', tap);
			$('#img_area_game2_7').bind('swipeRight', swipeRight);
		});
	});
	//手过一段时间消失
	setTimeout(function(){$('#img_area_game2_8').removeClass('infinite').addClass('slideOutRight');}, 2000);

	// 音乐播放
	function playMusic() {
	    var audio = document.getElementById('audio');
	    audio.play();
	    audio.loop = true;
	}
	playMusic();
});