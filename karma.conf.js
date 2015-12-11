module.exports = function(config) {
  config.set({

    basePath: '',

    // frameworks to use
    frameworks: ['browserify', 'mocha', 'chai'],

    // list of files / patterns to load in the browser
    files: [
      'public/lib/angular.min.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'public/lib/d3.v3.min.js',
      'public/lib/visualization-lib.js',
      'public/dist/js/*.js',
      'public/specs/**/*.js',
      'public/index.html'
    ],

    reporters: ['progress'],

    port: 9876,

    colors: true,

    autoWatch: true,

    singleRun: false,

    browsers: ['Chrome'],

    logLevel: config.LOG_INFO,

    preprocessors: {
      'public/specs/**/*.spec.js': ['browserify'],
    },

    plugins: [
      'karma-browserify',
      'karma-mocha',
      'karma-chai',
      'karma-sinon',
      'karma-sinon-chai',
      'karma-chrome-launcher'
    ]
  });
};
