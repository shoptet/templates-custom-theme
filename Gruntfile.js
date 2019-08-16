module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');
    var cfg = grunt.file.exists('userConfig.json') ? grunt.file.readJSON('userConfig.json') : {};
    pkg = {...pkg, ...cfg};

    grunt.initConfig({
        less: {
            css: {
                options: pkg.css.options,
                files: pkg.css.files
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
    grunt.registerTask('compile-css', ['less:css']);
    grunt.registerTask('concat-js', ['concat:dist']);
    grunt.registerTask('uglify-js', ['uglify:dist']);

};
