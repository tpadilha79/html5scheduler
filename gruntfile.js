//Grunt configuration
module.exports = function(grunt) {
    grunt.inintConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            dev: {
                src: ['dev/app.conf.json'], 
                dest: ['www/app.conf.json']
            },
            dist: {
                src: ['dist/app.conf.json'], 
                dest: ['www/app.conf.json']
            }
        },
        uglify: {
            dist: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                    mangle: {
                        except: ['angular']
                    },
                    beautify: false,
                    compress: {
                        global_defs:{
                            'DEBUG': false
                        }
                    }
                },
                dynamic_mappings: {
                    files: [
                        {
                            expand: true,
                            cwd: 'js/',
                            src: ['<%= concat.dist.dest %>'],
                            dest: 'www/js/',
                            ext: '.js'
                        }
                    ],
                }
            },
            dev: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                    mangle: {
                        except: ['angular']
                    },
                    beautify: {
                        width: 80,
                        beautify: true
                    },
                    compress: {
                        global_defs:{
                            'DEBUG': true
                        }
                    }
                },
                dynamic_mappings: {
                    files: [
                        {
                            expand: true,
                            cwd: 'js/',
                            src: ['<%= concat.dev.dest %>'],
                            dest: 'www/js/',
                            ext: '.js'
                        }
                    ],
                }
            }
        },
        concat: {
            dist: {
                src: ['js/**.js', 'phone/js/**.js', 'desktop/js/**.js', 'tablet/js/**.js'], 
                dest: 'js/app.js'
            },
            dev: {
                src: ['js/**.js', 'phone/js/**.js', 'desktop/js/**.js', 'tablet/js/**.js'], 
                dest: 'js/app.js'
            }
        },
        clean: {
            src: ['www/**/*'],
            filter: function(filepath) {
                return (grunt.file.isDir(filepath) || grunt.file.exists(filepath));
            }
        }
    });

    // Load NPM Tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    
};