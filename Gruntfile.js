module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');

    // As example is used "11" template, Classic
    // For other templates, see "templates" section in package.json
    var templateNumber = '11';

    grunt.initConfig({
        less: {
            mainCss: {
                options: {
                    javascriptEnabled: true,
                    compress: true,
                },
                files: {
                    'dist/main.css': '../assets/' + templateNumber + '/css/main.less'
                }
            },
            projectCss: {
                options: {
                    javascriptEnabled: true,
                    compress: true,
                },
                files: {
                    'dist/project.css': '../assets/' + templateNumber + '/css/project.less'
                }
            },
            font: {
                options: {
                    compress: true,
                    modifyVars: {
                        fontPath: './',
                    }
                },
                files: {
                    'dist/font-shoptet.css': '../assets/' + templateNumber + '/css/font-shoptet.less',
                }
            },
            print: {
                options: {
                    compress: true,
                },
                files: {
                    'dist/print.css': '../assets/' + templateNumber + '/css/print.less',
                }
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: pkg.javascripts,
                dest: 'dist/build.js',
            },
        },
        uglify: {
            options: {
                mangle: false,
            },
            dist: {
                files: {
                    'dist/build.min.js': ['dist/build.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['compile-css', 'concat-js', 'uglify-js']);
    grunt.registerTask('compile-css', ['less:mainCss', 'less:projectCss', 'less:font', 'less:print']);
    grunt.registerTask('compile-screen-css', ['less:mainCss', 'less:projectCss']);
    grunt.registerTask('compile-print-css', ['less:print']);
    grunt.registerTask('compile-font-css', ['less:font']);
    grunt.registerTask('concat-js', ['concat:dist']);
    grunt.registerTask('uglify-js', ['uglify:dist']);

};
