
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        gjslint: {
            options: {
                flags: [
                    '--nojsdoc',
                    '-e "node_modules,public"',
                    '-r .'
                ],
                reporter: {
                    name: 'console'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-gjslint');

    grunt.registerTask('default', ['gjslint']);
};
