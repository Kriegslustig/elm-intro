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
      compil: {
        files: {
          [ files.elm[1] ]: files.elm[0]
        }
      }
    }

  })

  grunt.loadNpmTasks('grunt-postcss')
  grunt.loadNpmTasks('grunt-elm')
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['postcss', 'elm', 'watch'])
  grunt.registerTask('build', ['postcss', 'elm'])
}

