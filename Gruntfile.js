module.exports = grunt => {

  const isDev = process.env.NODE_ENV !== 'production'
    ? true
    : false

  const files = {
    css: [
      [ 'client/css/*.css' ],
      'client/_build/bundle.css'
    ],
    elm: [
      [ 'client/elm/**/*.elm' ],
      'client/_build/elm.js'
    ],
    js: [
      [ 'client/js/**/*.js' ],
      'client/_build/bundle.js'
    ]
  }

  grunt.initConfig({
    watch: {
      css: {
        files: files.css[0],
        tasks: ['postcss']
      },
      elm: {
        files: files.elm[0],
        tasks: ['elm']
      },
      js: {
        files: files.js[0],
        tasks: ['babel']
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

    babel: {
      options: { presets: ['babel-preset-es2015'] },
      dist: { files: { [ files.js[1] ]: files.js[0] } }
    }

  })

  grunt.loadNpmTasks('grunt-postcss')
  grunt.loadNpmTasks('grunt-elm')
  grunt.loadNpmTasks('grunt-babel')
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['postcss', 'elm', 'babel', 'watch'])
  grunt.registerTask('build', ['postcss', 'elm', 'babel'])
}

