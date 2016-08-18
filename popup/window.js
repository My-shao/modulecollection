define(['widget', 'jquery', 'jqueryUI'], function(widget, $, $UI) {
	function Window() {
		this.config = {
			height: 300,
			width: 500,
			content: '',
			title: '提示',
			hasMask: true,
			hasCloseBtn: false,
			isDraggable: true,
			dragHand: null,
			skinClassName: '',
			alertBtnText: '确定',
			handlerCloseBtn: null,
			handlerAlertBtn: null
		};
		this.handlers = {};
	};

	Window.prototype = $.extend({}, new widget.Widget(), {

		renderUI: function() {
			this.boundingBox = $('<div class="window_boundingBox">' 
				+ '<div class="window_header">' + this.CONFIG.title + '</div>'
				+ '<div class="window_body">' + this.CONFIG.content + '</div>'
				+ '<div class="window_footer"><input type="button" value="' + this.CONFIG.alertBtnText + '"></div></div>' 
			);
			this._mask = $('<div class="window_mask"></div>');
			this.CONFIG.hasMask ? this._mask.appendTo('body'): this._mask=null;
			if(this.CONFIG.hasCloseBtn) {
				var closebtn = $('<span class="window_closeBtn"> X </span>');
				closebtn.appendTo(this.boundingBox);
			};
			this.boundingBox.appendTo(document.body);
		},

		bindUI: function() {
			var that = this;
			this.boundingBox.delegate('.window_footer input', 'click', function() {
				that.fire('alert');
				that.destory();
			}).delegate('.window_closeBtn', 'click', function() {
				that.fire('close');
				that.destory();
			});
			this.CONFIG.handlerCloseBtn ? this.on('close', this.CONFIG.handlerCloseBtn) : '';
			this.CONFIG.handlerAlertBtn ? this.on('alert', this.CONFIG.handlerAlertBtn) : '';
		},

		syncUI: function() {
			this.boundingBox.css({
				width: this.CONFIG.width + 'px',
				height: this.CONFIG.height + 'px',
				left: (this.CONFIG.x || (window.innerWidth - this.CONFIG.width)/2) + 'px',
				top: (this.CONFIG.y || (window.innweHeight - this.CONFIG.height)/2) + 'px'
			});

			this.CONFIG.skinClassName ? this.boundingBox.addClass(this.CONFIG.skinClassName) : '';
			this.CONFIG.isDraggable?(this.CONFIG.isDraggable?this.boundingBox.draggable({handle:this.CONFIG.dragHand}):this.boundingBox.draggable()):'';
		},

		destructor: function() {
			this._mask && this._mask.remove();
		},
		
		alert: function(config) {
			this.CONFIG = $.extend(this.config, config);
			this.render();
			return this;
			
		},
		confirm: function() {},
		prompt: function() {}
	});

	return {
		Window : Window
	}
})