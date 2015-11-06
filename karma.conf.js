module.exports = function(config) {
  config.set({

    basePath: '',

    // frameworks to use
    frameworks: ['browserify', 'mocha', 'chai'],

    // list of files / patterns to load in the browser
    files: [
      'public/lib/angular.min.js',
      'public/lib/visualization-lib.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'public/dist/js/*.js',
      'public/specs/**/*.js',
      'public/index.html'
    ],

    reporters: ['progress'],

    port: 9876,

    colors: true,

    autoWatch: true,

    singleRun: false,

    browsers: ['PhantomJS'],

    logLevel: config.LOG_INFO,

    preprocessors: {
      'public/specs/**/*.spec.js': ['browserify'],
    },

    plugins: [
      'karma-browserify',
      'karma-chai',
      'karma-sinon',
      'karma-sinon-chai',
      'karma-mocha',
      'karma-phantomjs-launcher'
    ]
  });
};
