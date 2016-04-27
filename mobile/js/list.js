/** 
 * 一款列表导航插件，提供默认列表，图标列表，图片列表的三种形式
 * 
 * @fileOverview 
 * @version 1.0
 * @author  qijc
 * @description 
 * 
 */
;(function($) {

	/**
	 * 列表导航插件
	 *
	 * @constructor AIList
	 * @desc 提供默认列表，图标列表，图片列表的三种形式
	 * @memberOf jQuery
	 * @name AIList
	 * @param {Object} option 参数对象
	 * 
	 * @property {Number} type [1:文字|2:图标|3:图片] 列表类型
	 * @property {Object} data 数据源
	 * @property {Boolean} isInit 是否初始化
	 * @return {Object} 返回AIList对象的一个实例
	 * 
	 * @example
	 * var list = $('#demo').AIList({
	 *     type:0,
	 *     data:jsonList,
	 *     isInit:true
	 * });
	 *
	 * //删除
	 * list.removeRow(0);
	 * 
	 */
	$.fn.AIList = function(option) {
		return new AIList(this, option);
	}

	//默认模版
	var _listTpl='<ul class="ui-list">'+
		'<% for (var i = 0; i < lists.length; i++) { %>' +
		'<% var post = lists[i]; %>' +
		'<% if (post.type == "list" || post.type == "1") { %>' +
		'<li class="ui-list-item">'+
		'	<a class="icon-navigate-right" href="<%=post.link%>" data-id="<%=post.id%>"><%=post.title%></a>'+
		'</li>'+
		'<% } else if(post.type == "iconList" || post.type == "2"){ %>' +
		'<li class="ui-list-item ui-media">'+
		'    <a class="icon-navigate-right" href="<%=post.link%>" data-id="<%=post.id%>">'+
		'        <span class="ui-media-object fn-left ui-icon <%=post.icon%>"></span>'+
		'        <div class="ui-media-body"><%=post.title%></div>'+
		'    </a>'+
		'</li>' +
		'<% } else if(post.type == "mediaList" || post.type == "3"){ %>' +
		'<li class="ui-list-item ui-media">'+
		'    <a class="icon-navigate-right" href="<%=post.link%>" data-id="<%=post.id%>">'+
		'        <img class="ui-media-object fn-left" src="<%=post.pic%>">                '+
		'        <div class="ui-media-body">'+
		'            <h4><%=post.title%></h4>'+
		'            <p><%=post.desc%></p>'+
		'        </div>'+
		'    </a>'+
		'</li>' +
		'<% } %>' +
		'<% } %>' +
		'</ul>';


	//默认
	var defaults={
		data:'',
		isFromTpl:'',
		isInit:false
	}

	//构造方法
	var AIList = function (el,option) {
		var self=this;
		this.element=$(el);
		this.option=$.extend(defaults,option);
		if(this.option.isInit){
			this.init();
		}
		
	}
	/**
     * AIList 名字空间
     * @namespace 
     * @memberOf jQuery
	 * @name AIList
     */
	AIList.prototype=
	/**
     * @lends jQuery.AIList
     */ 
	{

		/**
         * 初始化，拼装数据和模版加载到容器
         */
		init:function(){
			var opt = this.option;
			var tpl = opt.isFromTpl != "" ? opt.isFromTpl : _listTpl;
			//this.element.html($.tpl(tpl,opt.data));
			
			Rose.ajax.loadTemp(this.element, tpl, opt.data);
		},
		/**
         * 添加一条数据
         * 
         * @param {Object} data 数据
         */
		addRow:function(data){
			this.option.data.lists.push(data);
			this.init();	
		},
		/**
         * 删除某条数据
         * 
         * @param {Number} index 删除行的索引值
         */
		removeRow:function(index){
			this.option.data.lists.splice(index,1);
			this.init();	
		},
		/**
         * 获取某行数据
         * 
         * @param {Number} index 获取行的索引值
         * @return {Object} JSON数据
         */
		getDataRow:function(index){
			alert(JSON.stringify(this.option.data.lists[index]));		
			return this.option.data.lists[index];		
		}
	}
	
})(jQuery);
(function($) {
	var _private = {};
	_private.cache = {};
	$.tpl = function (str, data, env) {
		// 判断str参数，如str为script标签的id，则取该标签的innerHTML，再递归调用自身
		// 如str为HTML文本，则分析文本并构造渲染函数
		var fn = !/[^\w\-\.:]/.test(str)
			? _private.cache[str] = _private.cache[str] || this.get(document.getElementById(str).innerHTML)
			: function (data, env) {
			var i, variable = [], value = []; // variable数组存放变量名，对应data结构的成员变量；value数组存放各变量的值
			for (i in data) {
				variable.push(i);
				value.push(data[i]);
			}
			return (new Function(variable, fn.code))
				.apply(env || data, value); // 此处的new Function是由下面fn.code产生的渲染函数；执行后即返回渲染结果HTML
		};

		fn.code = fn.code || "var $parts=[]; $parts.push('"
			+ str
			.replace(/\\/g, '\\\\') // 处理模板中的\转义
			.replace(/[\r\t\n]/g, " ") // 去掉换行符和tab符，将模板合并为一行
			.split("<%").join("\t") // 将模板左标签<%替换为tab，起到分割作用
			.replace(/(^|%>)[^\t]*/g, function(str) { return str.replace(/'/g, "\\'"); }) // 将模板中文本部分的单引号替换为\'
			.replace(/\t=(.*?)%>/g, "',$1,'") // 将模板中<%= %>的直接数据引用（无逻辑代码）与两侧的文本用'和,隔开，同时去掉了左标签产生的tab符
			.split("\t").join("');") // 将tab符（上面替换左标签产生）替换为'); 由于上一步已经把<%=产生的tab符去掉，因此这里实际替换的只有逻辑代码的左标签
			.split("%>").join("$parts.push('") // 把剩下的右标签%>（逻辑代码的）替换为"$parts.push('"
			+ "'); return $parts.join('');"; // 最后得到的就是一段JS代码，保留模板中的逻辑，并依次把模板中的常量和变量压入$parts数组

		return data ? fn(data, env) : fn; // 如果传入了数据，则直接返回渲染结果HTML文本，否则返回一个渲染函数
	};
})(jQuery)