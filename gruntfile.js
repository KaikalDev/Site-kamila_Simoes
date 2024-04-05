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
                        },
                        {
                            match: 'LOGO',
                            replacement: '/dev/image/logo.PNG'
                        },
                        {
                            match: 'LOGO_MARRON',
                            replacement: '/dev/image/logo-marron.PNG'
                        },
                        {
                            match: 'LOGO_COMPLETA',
                            replacement: '/dev/image/logo-completa.PNG'
                        },
                        {
                            match: 'IMAGEM_SOBRE',
                            replacement: '/dev/image/foto-sobre.jpeg'
                        },
                        {
                            match: 'IMAGEM_CONTATO',
                            replacement: '/dev/image/foto-contato.jpeg'
                        },
                        {
                            match: 'PROJETO_QUARTO',
                            replacement: '/dev/image/quarto.jpeg'
                        },
                        {
                            match: 'PROJETO_SALA',
                            replacement: '/dev/image/sala.jpeg'
                        },
                        {
                            match: 'PROJETO_GURMET',
                            replacement: '/dev/image/gurmet.jpeg'
                        },
                        {
                            match: 'PROJETO_COMERCIAL',
                            replacement: '/dev/image/comercial.jpeg'
                        },
                        {
                            match: 'PROJETO_COZINHA',
                            replacement: '/dev/image/cozinha.jpeg'
                        },
                        {
                            match: 'PROJETO_BANHEIRO',
                            replacement: '/dev/image/banheiro.JPEG'
                        },
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
                        },
                        {
                            match: 'LOGO',
                            replacement: '/dist/image/logo.PNG'
                        },
                        {
                            match: 'LOGO_MARRON',
                            replacement: '/dist/image/logo-marron.PNG'
                        },
                        {
                            match: 'LOGO_COMPLETA',
                            replacement: '/dist/image/logo-completa.PNG'
                        },
                        {
                            match: 'IMAGEM_SOBRE',
                            replacement: '/dist/image/foto-sobre.jpeg'
                        },
                        {
                            match: 'IMAGEM_CONTATO',
                            replacement: '/dist/image/foto-contato.jpeg'
                        },
                        {
                            match: 'PROJETO_QUARTO',
                            replacement: '/dist/image/quarto.jpeg'
                        },
                        {
                            match: 'PROJETO_SALA',
                            replacement: '/dist/image/sala.jpeg'
                        },
                        {
                            match: 'PROJETO_GURMET',
                            replacement: '/dist/image/gurmet.jpeg'
                        },
                        {
                            match: 'PROJETO_COMERCIAL',
                            replacement: '/dist/image/comercial.jpeg'
                        },
                        {
                            match: 'PROJETO_COZINHA',
                            replacement: '/dist/image/cozinha.jpeg'
                        },
                        {
                            match: 'PROJETO_BANHEIRO',
                            replacement: '/dist/image/banheiro.JPEG'
                        },
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
        imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: '**/*.{JPEG,jpeg,PNG}',
					dest: 'dist/',
					dest: 'dev/'
				}]
			},
			rename: {
				files: {
					'dist/image/*.JPEG': 'src/image/*.JPEG',
					'dist/image/*.jpeg': 'src/image/*.jpeg',
					'dist/image/*.PNG': 'src/image/*.PNG',
                    'dev/image/*.JPEG': 'src/image/*.JPEG',
					'dev/image/*.jpeg': 'src/image/*.jpeg',
					'dev/image/*.PNG': 'src/image/*.PNG'
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
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('default',['watch'])
    grunt.registerTask('build',['less:production','htmlmin:dist', 'replace:dist','clean', 'uglify','imagemin'])
}