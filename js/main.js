$(document).ready(function(){

	//为按钮增加事件处理程序
	(function(){
		$('#rule').on('tap', function(){
    		var container = document.getElementById('container');
    		var panel = document.createElement('div');
    		$('#mask').show();
    		panel.id = 'panel';
    		panel.style.zIndex = 1000;
    		panel.style.position = 'absolute';
    		panel.style.width = '100%'
    		panel.style.height = '100%';
    		container.appendChild(panel);
    		panel.innerHTML = '<img src="img/panel.png" style="width:320px;height:467px;position:absolute;top:50%;left:50%;margin-left:-160px;margin-top:-233px;"/><div id="panel_button" style="width:90px;height:45px;position:absolute;top:50%;left:50%;margin-left:-40px;margin-top:120px;"></div>';
    		var button = document.getElementById('panel_button');
    		var $button = $(button);
    		$button.on('tap',function(){
    			container.removeChild(panel);
    			$('#mask').hide();
    		});
		});

		$('#start').on('tap', function(){
			location.href = 'game.html';
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
});