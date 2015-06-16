$(document).ready(function(){
	App.analyse("test", "index");
	//禁用滑动
	$('body').bind("touchmove", function(e) {e.preventDefault();});
	//将图片路径存到数组中
	var bImg = ['/assets/images/game_b1.png','/assets/images/game_b2.png','/assets/images/game_b3.png'];
	var bContainer = document.getElementById('bottle_container');
	//把图片随机放在屏幕的位置
	//1.5秒后图片消失，随机出现在新位置
		bImg.showAndFade = function () {
			var cHeight = bContainer.offsetHeight,
			cWidth  = bContainer.offsetWidth,
			bWidth = Math.floor(Math.random() * (cWidth + 1)),
			bHeight = Math.floor(Math.random() * (cHeight + 1));
			bWidth > 300 ? bWidth = bWidth - 50 : bWidth;
			bHeight > 200 ? bHeight = bHeight - 50 : bHeight;
			var _this = this;
			var imgSrc = _this[Math.floor(Math.random() * bImg.length)];
			var img = '<img src="' + imgSrc + '" alt="" style="width:100px;position:absolute;" class="game_img pulse animated" />';
			bContainer.innerHTML += img;
			var node = bContainer.childNodes[bContainer.childNodes.length -1];
			//随机改变位置
			node.style.left = bWidth + 'px';
			node.style.top = bHeight + 'px';
			//加入点击进入下一页事件(当点击图片时，跳转到相应礼品页)
			$('.game_img').on('tap', function(){
				clearInterval(changeInterval);
				clearInterval(interval);
				$("#game_container").append($(this));
				$('#img_area_game_2').show().addClass('animated wobble');
				setTimeout(function(){
					$("#game_cloud").removeClass();
					$("#game_container").children().addClass('animated fadeOut');
				}, 2000);
			
				setTimeout(function(){location.replace('game2.html' + location.hash);}, 4000);
				
			});

			setTimeout(function () {
				//移除最前面的一个img元素
				bContainer.removeChild(bContainer.childNodes[0]);
			}, 200);

		}
		var changeInterval = setInterval(function(){bImg.showAndFade();}, 200);
	

	//倒计时
	var bar = document.getElementById('game_bar2_b');
	bar.style.width = '73%';
	var interval = setInterval(function(){
		bar.style.width = (parseInt(bar.style.width)-1) + '%';
		if (parseInt(bar.style.width) == 0) {
			clearInterval(interval);
			clearInterval(changeInterval);
			$('#mask2').show();
			var game_container = document.getElementById('game_container');
			$('#lose').show();
			$('#lose').on('tap', function(){
				history.back();
			});
		}
	}, 100);

	// 音乐播放
	function playMusic() {
	    var audio = document.getElementById('audio');
	    audio.play();
	    audio.loop = true;
	}
	playMusic();
});