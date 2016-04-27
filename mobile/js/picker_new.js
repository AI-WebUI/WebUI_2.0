;
(function($, mui) {
	$.fn.AINewPicker = function(options) {
		return new AIPicker(options);
	}
	var AIPicker = function(options) {
		this.init(options);
	}
	AIPicker.prototype = {
		init: function(options) {
			var self = this;
			self.options = options;
			self.opts = $.extend({}, {
				fields:[],
				buttons:["取消","确定"],
				callback:function(){}
			}, options);
			var picker = new mui.PopPicker(self.opts);
			picker.setData(self.opts.fields);
			self.picker = picker;
		},
		open: function() {
			var self = this;
			self.picker.show(function(items) {
				self.obj = items[0];
				//console.log(self.obj);
				self.picker.dispose();
			});
		},
		getValue: function() {
			var self = this;
			return self.obj.value;
		},
		getText:function(){
			return this.obj.text;
		}
	}
})(jQuery, mui)