
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        gjslint: {
            options: {
                flags: [
                    '--nojsdoc',
                    '--max_line_length 100',
                    '-e "node_modules,public"',
                    '-r .'
                ],
                reporter: {
                    name: 'console'
                }
            },
            main: {
                src: ['*.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-gjslint');

    grunt.registerTask('default', ['gjslint']);
};
