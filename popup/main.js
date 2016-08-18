require.config({
	paths:{
		jquery: 'lib/jquery',
		jqueryUI: 'lib/jquery-ui.min'
	}
});

require(['jquery','window'], function($, w) {
	$('#alert').click(function() {
		var win = new w.Window();
		win.alert({
			width: 300,
			height: 150,
			y: 50,
			content: 'welcome',
			title: '提示',
			hasCloseBtn: true,
			isDraggable: true,
			dragHand: '.window_header',
			skinClassName: 'window_skin_a',
			alertBtnText: 'OK',
			handlerCloseBtn: function() { alert('click X');},
			handlerAlertBtn: function() { alert('click 确定按钮');}
		});
		win.on('alert', function() { console.log('i love NBA') }).on('alert', function() { console.log('i love NBA2K') });
	});
});