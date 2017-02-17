module.exports = function(grunt) {
	// measures the time each task
	require('time-grunt')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			sass: {
				files: ['sass/**/*.{scss,sass}'],
				tasks: ['sass:dev']
			},
			scripts: {
				files: ['js/src/*.{js}'],
				tasks: ['concat', 'uglify']
			},
			livereload: {
				files: ['*.html', 'js/**/*.{js,json}', 'css/*.css', 'img/**/*.{png,jpg,jpeg,gif,webp,svg}'],
				options: {
					livereload: true
				}
			}
		},
		sass: {
			dev: {
				options: {
					sourceMap: true,
					outputStyle: 'expanded'
				},
				files: {
					'css/styles.css': 'sass/styles.scss'
				}
			},
			dist: {
				options: {
					sourceMap: false,
					outputStyle: 'compressed'
				},
				files: {
					'css/styles.css': 'sass/styles.scss'
				}
			}
		},
		postcss: {
			options: {
				processors: [
					require('autoprefixer')(),
					require('cssnext')(),
					require('precss')()
				]
			},
			dist: {
				src: 'css/styles.css',
				dest: 'css/styles.css'
			}
		},
		concat: {
			options: {
				stripBanners: true,
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
					'<%= grunt.template.today("yyyy-mm-dd") %> */',
			},
			dist: {
				src: ['node_modules/jquery/dist/jquery.js', 'node_modules/jquery-parallax.js/parallax.js', 'js/src/*.js', '!js/src/behave.js', 'js/src/behave.js'],
				dest: 'js/dist/build.js',
			}
		},
		uglify: {
			dist: {
				files: {
					'js/dist/build.min.js': ['js/dist/build.js']
				}
			}
		}
	});
	grunt.registerTask('default', ['sass:dev', 'watch']);
	grunt.registerTask('dist', ['sass:dist', 'postcss:dist']);
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
};
