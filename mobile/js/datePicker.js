;
(function($, mui) {
	$.fn.AIDatePicker = function(options) {
		return new AIDatePicker(options);
	}
	var AIDatePicker = function(options) {
		this.init(options);
	}
	AIDatePicker.prototype = {
		init: function(options) {
			var self = this;
			self.options = options;
			self.opts = $.extend({}, {
				type: "date",
				beginYear: 2010,
				endYear: 2020,
				buttons:["取消","确定"],
				callback: function() {
					
				}
			}, options);
			var picker = new mui.DtPicker(self.opts);
			self.picker = picker;
		},
		open: function() {
			var self = this;
			self.picker.show(function(rs) {
				self.value = rs.value;
				self.picker.dispose();
			});
		},
		getValue: function() {
			return this.value;
		},
		setValue:function(str){
			var self = this;
			self.picker.setSelectedValue(str);
		}
	}
})(jQuery, mui)
