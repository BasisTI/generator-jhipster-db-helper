'use strict';
var yeoman = require('yeoman-generator');
// makes logs more beautiful
var chalk = require('chalk');
// gives access to the package.json data
var packagejs = require(__dirname + '/../../package.json');

// Stores JHipster variables
var jhipsterVar = {moduleName: 'db-helper'}; //WARN: this is hard-coded

// Stores JHipster functions
var jhipsterFunc = {
  this.log("Just used jhipsterFunc");
};

module.exports = yeoman.Base.extend({

  initializing: {
    compose: function (args) {
      this.composeWith('jhipster:modules',
        {
          options: {
            jhipsterVar: jhipsterVar,
            jhipsterFunc: jhipsterFunc
          }
        },
        this.options.testmode ? {local: require.resolve('generator-jhipster/generators/modules')} : null
      );
    },
    displayLogo: function () {
      // Have Yeoman greet the user.
      this.log(
        chalk.bold('Welcome to the ' + chalk.red(packagejs.name) + ' generator! ' + chalk.yellow('v' + packagejs.version + '\n'))
      );
    }
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'message',
      message: 'Please put something',
      default: 'hello world!'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    writeTemplates : function () {
      this.baseName = jhipsterVar.baseName;
      this.packageName = jhipsterVar.packageName;
      this.angularAppName = jhipsterVar.angularAppName;
      var javaDir = jhipsterVar.javaDir;
      var resourceDir = jhipsterVar.resourceDir;
      var webappDir = jhipsterVar.webappDir;

      this.message = this.props.message;

      this.log('baseName=' + this.baseName);
      this.log('packageName=' + this.packageName);
      this.log('angularAppName=' + this.angularAppName);
      this.log('message=' + this.message);

      this.template('dummy.txt', 'dummy.txt', this, {});
    },

    registering: function () {
      try {
        jhipsterFunc.registerModule("generator-jhipster-db-helper", "entity", "post", "app", "A JHipster module for better interaction with an already existing database.");
      } catch (err) {
        this.log(chalk.red.bold('WARN!') + ' Could not register as a jhipster entity post creation hook...\n');
      }
    }
  },

  install: function () {
    this.installDependencies();
  },

  end: function () {
    this.log('End of db-helper generator');
  }
});
