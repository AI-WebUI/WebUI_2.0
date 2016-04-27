module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			build: {
				src: ["mobile/js/drag.js", "mobile/js/core.js", "mobile/js/btn-bak.js", "mobile/js/grid.js", "mobile/js/input.js", "mobile/js/list.js", "mobile/js/operate-load.js", "mobile/js/picker.js", "mobile/js/progress-top.js", "mobile/js/select.js", "mobile/js/tab.js", "mobile/js/tips.js", "mobile/js/loader.js", "mobile/js/loader-new.js", "mobile/js/load.js", "mobile/js/showMore.js", "mobile/js/collapse.js", "mobile/js/shade.js", "mobile/js/selList.js"],
				dest: "webui/2.0.0/phone/js/<%= pkg.name %>.js"
			},
			
			cssbuild: {
				src: ["mobile/css320/base.css", "mobile/css320/btn.css", "mobile/css320/drag.css", "mobile/css320/category.css", "mobile/css320/grid.css", "mobile/css320/input.css", "mobile/css320/list.css", "mobile/css320/operate-load.css", "mobile/css320/page.css", "mobile/css320/picker.css", "mobile/css320/progress-top.css", "mobile/css320/select.css", "mobile/css320/select.css", "mobile/css320/tips.css", "mobile/css320/uiload.css", "mobile/css320/load.css", "mobile/css320/collapse.css", "mobile/css320/shade.css", "mobile/css320/selList.css", "mobile/css320/tab.css", "mobile/css320/list_new.css", "mobile/css320/datePicker.css"],
				dest: "webui/2.0.0/phone/css/<%= pkg.name %>.css"
			}
			
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			bulid: {
				// 动态文件映射，
				// 当任务运行时会自动在 "lib/" 目录下查找 "**/*.js" 并构建文件映射，
				// 添加或删除文件时不需要更新 Gruntfile。
				files: [{
					"webui/2.0.0/phone/js/<%= pkg.name %>.min.js": ['<%= concat.build.dest %>']
				}]
			}
		},
		/*csslint: {
			options: {
				csslintrc: '.csslintrc'
			},
			dist: [
				'mobile/css320/*.css'
			]
		},*/
		cssmin: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				beautify: {
					ascii_only: true
				}
			},
			build: {
				files: [{
					"webui/2.0.0/phone/css/<%= pkg.name %>.min.css": ['<%= concat.cssbuild.dest %>']
				}]
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
//	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
//	grunt.registerTask('default', ['csslint', 'concat', 'uglify', 'cssmin']);
	grunt.registerTask('default', [ 'concat', 'uglify', 'cssmin']);
}