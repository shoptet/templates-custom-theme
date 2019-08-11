module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');
    var cfg = grunt.file.exists('userConfig.json') ? grunt.file.readJSON('userConfig.json') : {};
    pkg = {...pkg, ...cfg};

    grunt.initConfig({
        less: {
            mainCss: {
                options: pkg.mainCss.options,
                files: pkg.mainCss.files
            },
            projectCss: {
                options: pkg.projectCss.options,
                files: pkg.projectCss.files
            },
            fontCss: {
                options: pkg.fontCss.options,
                files: pkg.fontCss.files
            },
            printCss: {
                options: pkg.printCss.options,
                files: pkg.printCss.files
            }
        },
        concat: {
            options: pkg.concatJS.options,
            dist: {
                src: pkg.concatJS.src,
                dest: pkg.concatJS.dest,
            },
        },
        uglify: {
            options: pkg.uglifyJS.options,
            dist: {
                files: pkg.uglifyJS.files
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['compile-css', 'concat-js', 'uglify-js']);
    grunt.registerTask('compile-css', ['less:mainCss', 'less:projectCss', 'less:fontCss', 'less:printCss']);
    grunt.registerTask('compile-screen-css', ['less:mainCss', 'less:projectCss']);
    grunt.registerTask('compile-print-css', ['less:printCss']);
    grunt.registerTask('compile-font-css', ['less:fontCss']);
    grunt.registerTask('concat-js', ['concat:dist']);
    grunt.registerTask('uglify-js', ['uglify:dist']);

};
