'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var blogGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    console.log(this)
    this.pkg = require('../package.json');
    this.on('end', function() {
      if (!this.options['skip-install']) {
        this.installDependencies()
      }
    })
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the amazing' + chalk.red('Blog') + ' generator!'
    ));

    var prompts = [{
      type: "input",
      name: 'blogName',
      message: 'What would you want to call your blog ?',
      default: 'shirlyBlog'
    }];

    this.prompt(prompts, function (props) {
      this.blogName = props.blogName;
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.mkdir('posts')
      // 将模板_index.md复制到posts/index.md，同时以当前context为上下文环境按照underscore的语法解析index.md模板，新的file system api将所有的文件操作定义在fs上，比如此处的template用新的方式应该写成
      /*
      this.fs.copyTpl(
        this.templatePath('_index.md'),
        this.destinationPath('posts/index.md')) */
      this.template( 
        this.templatePath('_index.md'),
        this.destinationPath('posts/index.md')
      );
      this.template( 
        this.templatePath('Gruntfile.js'),
        this.destinationPath('Gruntfile.js')
      );
      this.template(
        this.templatePath('index.html'),
        this.destinationPath('index.html')
      );
      this.template(
        this.templatePath('_config.json'),
        this.destinationPath('config.json')
      );
      this.template(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.template(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
      this.template(
        this.templatePath('wordmap.json'),
        this.destinationPath('wordmap.json')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copy(
        this.templatePath('bowerrc'),
        this.destinationPath('.bowerrc')
      );
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
module.exports = blogGenerator
