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
			"build-html" : {
				src : ['dest/js/*.js','dest/css/*.css'], //Should only need to hash the files in the root of the directory
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
			clean : {
				options : {
					sassDir : 'dest/sass',
					cssDir : 'dest/css',
					imagesDir : 'dest/img',
					clean : true
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
		modernizr : {
			devFile : "src/bower_components/modernizr/modernizr.js",
			outputFile : "dest/bower_components/modernizr/modernizr.js",
			files : ["dest/css/**/*.css", "dest/{js,lib}/**/*.js"]
		},
		watch : {
			sass : {
				files : [
					'src/sass/**/*.{sass,scss}',
					'src/img/icon/**/*.{png,jpg,gif}'
				],
				tasks : ['compass:develop'],
				interrupt : true
			},
			livereload : {
				options : {
					livereload: 8001
				},
				files : 'src/**/*'
			}
		},
		connect : {
			develop : {
				options : {
					base : 'src/',
					livereload: 8001
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-hashres');
	grunt.loadNpmTasks("grunt-modernizr");

	grunt.registerTask('default', ['build']);
	grunt.registerTask('build', ['clean:init', 'copy:init', 'compass:clean', 'compass:prod', 'modernizr', 'useminPrepare', 'concat', 'uglify', 'usemin', 'hashres', 'clean:tidy']);
	grunt.registerTask('develop', ['connect', 'watch']);
};