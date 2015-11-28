exports.config = {
  framework: 'mocha',
  capabilities: {
    'browserName': 'phantomjs',
    'phantomjs.binary.path': require('phantomjs').path
  },
  baseUrl: 'http://localhost:5001',
  specs: [
    'e2e/**/*.spec.js'
  ],
  mochaOpts: {
    reporter: "spec",
    timeout: 6000,
    slow: 3000
  }
};
