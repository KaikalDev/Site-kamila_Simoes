module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            development: {
                files: {
                    'dev/styles/main.css' : 'src/styles/main.less',
                    'dev/styles/main-galeria.css' : 'src/styles/main-galeria.less'
                }
            },
            production: {
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css' : 'src/styles/main.less',
                    'dist/styles/main-galeria.min.css' : 'src/styles/main-galeria.less'
                }
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development']
            },
            html: {
                files: ['src/*.html'],
                tasks: ['replace:dev']
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS_INDEX',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_CSS_GALERIA',
                            replacement: './styles/main-galeria.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/galeria.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS_INDEX',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_CSS_GALERIA',
                            replacement: './styles/main-galeria.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './scripts/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/galeria.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files:{
                    'prebuild/index.html': 'src/index.html',
                    'prebuild/galeria.html': 'src/galeria.html'
                }
            }
        },
        clean: ['prebuild'],
        uglify: {
            traget: {
                files: {
                    'dist/scripts/main.min.js':'src/scripts/main.js'
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default',['watch'])
    grunt.registerTask('build',['less:production','htmlmin:dist', 'replace:dist','clean', 'uglify'])
}