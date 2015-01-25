'use strict';
var yeoman = require('yeoman-generator');

var PostGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.log('You called the Blog subgenerator with the argument ' + this.name + '.');

    this.argument('name', {
      required: true,
      type: String,
      desc: 'The subgenerator name'
    });
  },

  writing: function () {
    var today = new Date();
    var prefix = today.getUTCMonth() + 1;
    prefix += '-'+today.getDate();
    prefix += '-'+today.getFullYear();
    var filename = prefix+'-'+this._.slugify(this.name)+'.md';
    this.write('posts/'+filename,'# '+this.name);
  }
});
module.exports = PostGenerator