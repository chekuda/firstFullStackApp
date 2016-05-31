var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'veoptimiser'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://localhost/veoptimiser-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'veoptimiser'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://localhost/veoptimiser-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'veoptimiser'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://localhost/veoptimiser-production'
  }
};

module.exports = config[env];
