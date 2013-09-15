module.exports = function(grunt){
	grunt.initConfig({
		clean : {
			init : ['dest/'],
			tidy : [
				'dest/bower_components', 'dest/sass'
			]
		},
		copy : {
			init : {
				expand : true,
				cwd : 'src/',
				src : ['**'],
				dest : 'dest/'
			}
		},
		useminPrepare : {
			html : ['dest/*.html']
		},
		usemin : {
			html : ['dest/*.html']
		},
		hashres : {
			options : {
				fileNameFormat : '${name}.${ext}?${hash}',
				renameFiles : false
			},
			"build-css" : {
				src : ['dest/img/*'],
				dest : 'dest/css/main.css'
			},
			"build-html" : {
				src : ['dest/js/**/*','dest/css/**/*'],
				dest : 'dest/*.html'
			}
		},
		compass : {
			develop : {
				options : {
					sassDir : 'src/sass',
					cssDir : 'src/css',
					imagesDir : 'src/img'
				}
			},
			prod : {
				options : {
					sassDir : 'dest/sass',
					cssDir : 'dest/css',
					imagesDir : 'dest/img',
					outputStyle : 'compressed'
				}
			}
		},
		watch : {
			sass : {
				files : [
					'src/sass/**/*.{sass,scss}',
					'src/img/icon/**/*.{png,jpg,gif}'
				],
				tasks : ['compass:develop'],
				interrupt : true
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-usemin');

	grunt.registerTask('default', ['build']);
	grunt.registerTask('build', ['clean:init', 'copy:init', 'compass:prod', 'useminPrepare', 'concat', 'uglify', 'usemin', 'clean:tidy']);
	grunt.registerTask('develop', ['watch']);
};