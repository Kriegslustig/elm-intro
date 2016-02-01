module.exports = grunt => {

  const isDev = process.env.NODE_ENV !== 'production'
    ? true
    : false

  const files = {
    css: [
      [ 'client/css/*.css' ],
      'client/_build/bundle.css',
      [ 'client/css/**/*.css' ]
    ],
    elm: [
      [ 'client/elm/*.elm' ],
      'client/_build/elm.js',
      [ 'client/elm/**/*.elm' ]
    ],
    js: [
      [ 'client/js/*.js' ],
      'client/_build/bundle.js',
      [ 'client/js/**/*.js' ]
    ]
  }

  grunt.initConfig({
    watch: {
      css: {
        files: files.css[2],
        tasks: ['postcss']
      },
      elm: {
        files: files.elm[2],
        tasks: ['elm']
      },
      js: {
        files: files.js[2],
        tasks: ['browserify']
      }
    },
    pkg: grunt.file.readJSON('package.json'),

    postcss: {
      options: {
        map: isDev,
        processors: [
          require('level4')(),
          require('postcss-import')(),
          require('autoprefixer')(),
          require('cssnano')()
        ]
      },
      dist: { dest: files.css[1], src: files.css[0] }
    },

    elm: {
      compile: {
        files: {
          [ files.elm[1] ]: files.elm[0]
        }
      }
    },

    browserify: {
      options: {
        transform: [
          [ 'babelify', { presets: 'es2015' } ],
        ],
        browserifyOptions: {
          debug: isDev
        }
      },
      dist: { files: { [ files.js[1] ]: files.js[0] } }
    },

  })

  grunt.loadNpmTasks('grunt-postcss')
  grunt.loadNpmTasks('grunt-elm')
  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['postcss', 'elm', 'browserify', 'watch'])
  grunt.registerTask('build', ['postcss', 'elm', 'browserify'])
}

