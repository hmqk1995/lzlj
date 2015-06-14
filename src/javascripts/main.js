$(document).ready(function(){

	//为按钮增加事件处理程序
	(function(){
		function showMask(){
    		var container = document.getElementById('container');
    		var panel = document.createElement('div');
    		$('#mask').show();
    		panel.id = 'panel';
    		panel.style.zIndex = 1000;
    		panel.style.position = 'absolute';
    		panel.style.width = '100%'
    		panel.style.height = '100%';
    		container.appendChild(panel);
    		panel.innerHTML = '<div id="panel_list" style="background:url(\'/assets/images/panel2.png\');background-size: 100%;width:320px;height:467px;position:absolute;top:50%;left:50%;margin-left:-160px;margin-top:-233px;"></div>';
    		panel.innerHTML += '<div id="panel_button" style="width:90px;height:45px;position:absolute;top:50%;left:50%;margin-left:-40px;margin-top:120px;"></div>';
		}

		function addButtonListener (callback) {
			$('#panel_button').on('tap',function(){
	    			$('#panel').remove();
	    			$('#mask').hide();
	    		});
			if (callback != undefined) {
				callback();
			}
		}
		//规则按钮
		$('#rule').on('tap', function(){
			showMask();
			var imgSrc = '<img src="/assets/images/txt1.png" alt="" style="width:160px;position:absolute;top:60%;left:50%;margin-left:-75px;margin-top:-120px;"/>';
			$('#panel_list')[0].innerHTML += imgSrc;
			addButtonListener();
		});
		//产品介绍按钮
		$('#desc').on('tap', function(){
			showMask();
			var imgSrc = '<img id="desc_img" src="/assets/images/txt2.png" alt="" style="width:160px;position:absolute;top:55%;left:50%;margin-left:-75px;margin-top:-120px;" />';
			var buttonL = '<img id="button_l" src="/assets/images/button_l.png" alt="" style="width:30px;position:absolute;bottom:25%;left:28%;margin-top:-120px;" />';
			var buttonR = '<img id="button_r" src="/assets/images/button_r.png" alt="" style="width:30px;position:absolute;bottom:25%;right:25%;margin-top:-120px;" />';
			$('#panel_list')[0].innerHTML += imgSrc;
			$('#panel_list')[0].innerHTML += buttonL;
			$('#panel_list')[0].innerHTML += buttonR;
			addButtonListener(function(){iPage = 2;});

			$('#button_l').hide();
			//追踪页面按钮
			var iPage = 2; //页面数目
			function isPage() {
				switch (iPage) {
					case 2:
						$('#button_l').hide();
						$('#button_r').show();
						break;
					case 3:
						$('#button_l').show();
						$('#button_r').show();
						break;
					case 4:
						$('#button_l').show();
						$('#button_r').hide();
						break;
				}
			}
			//翻页效果
			$('#button_l').live('click',function tapLeft(){
				iPage -= 1;
				isPage();
				$('#desc_img').remove();
				imgSrc = '<img id="desc_img" src="/assets/images/txt'+ iPage +'.png" alt="" style="width:160px;position:absolute;top:55%;left:50%;margin-left:-75px;margin-top:-120px;" />';
				$('#panel_list')[0].innerHTML += imgSrc;
			});
			$('#button_r').live('click',function tapRight(){
				iPage += 1;
				isPage();
				$('#desc_img').remove();
				imgSrc = '<img id="desc_img" src="/assets/images/txt'+ iPage +'.png" alt="" style="width:160px;position:absolute;top:55%;left:50%;margin-left:-75px;margin-top:-120px;" />';
				$('#panel_list')[0].innerHTML += imgSrc;
			});
			
		});
		//战绩按钮
		$('#score').on('tap', function(){
			showMask();
			addButtonListener();
			var imgSrc = '<img src="/assets/images/togetpride.png" alt="" style="width:160px;position:absolute;top:60%;left:50%;margin-left:-75px;margin-top:-120px;"/>';
			$('#panel_list')[0].innerHTML += imgSrc;
		});
		//开始按钮
		$('#start').on('tap', function(){
			location.replace('game.html');
		});
	}());

	//令所有页面img_area元素opacity初始化为0;
	(function(){
		var tagStore = [], item, name;
		for(var i = 0; i < 6; i++) {
			name = 'img_area_' + (i + 1);
			item = document.getElementById(name);
			tagStore[i] = item;
		}
		for(var i = 0,len = tagStore.length; i < len; i++) {
			tagStore[i].style.opacity = 0;
		}
	}());
	//初始化结束
	function start() {
		$('#img_area_1').css('opacity',1);
		$('#img_area_1').addClass('animated zoomInDown');

		setTimeout(function(){
			$('#img_area_2').css('opacity',1);
			$('#img_area_2').addClass('animated fadeInLeft');},
			100);

		setTimeout(function(){
			$('#img_area_3').css('opacity',1);
			$('#img_area_3').addClass('animated bounceInDown');},
			600);

		setTimeout(function(){
			$('#img_area_4').css('opacity',1);
			$('#img_area_4').addClass('animated bounceInUp');
			$('#img_area_5').css('opacity',1);
			$('#img_area_5').addClass('animated fadeIn');
			$('#img_area_6').css('opacity',1);
			$('#img_area_6').addClass('animated fadeIn');},
			1100);
	}
	//加载完成，显示页面
	setTimeout(function(){
		$("#loading_img").remove();
		start();
		playMusic();
	}, 4000);

	// 音乐播放
	function playMusic() {
	    var audio = document.getElementById('audio');
	    audio.play();
	    audio.loop = true;
	}
});