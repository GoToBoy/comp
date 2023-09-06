import ace from 'ace-builds/src-noconflict/ace'; // 导入 Ace 编辑器的库

// mode-freemarker.js
ace.define('ace/mode/freemarker_highlight_rules', [], function (require, exports, module) {
  var oop = require('ace/lib/oop');
  var TextHighlightRules = require('ace/mode/text_highlight_rules').TextHighlightRules;

  var FreeMarkerHighlightRules = function () {
    this.$rules = {
      start: [
        {
          token: 'comment',
          regex: '<#--',
          next: 'comment',
        },
        {
          token: 'string',
          regex: '"[^"]*?"',
        },
        {
          token: 'keyword',
          regex: '\\b(?:if|else|elseif|foreach|list|assign)\\b',
        },
        {
          token: 'variable',
          regex: '\\$[a-zA-Z_][a-zA-Z0-9_]*',
        },
        {
          token: 'variable',
          regex: '\\${[^}]+}',
        },
        {
          token: 'text',
          regex: '\\s+',
        },
      ],
      comment: [
        {
          token: 'comment',
          regex: '-->',
          next: 'start',
        },
        {
          defaultToken: 'comment',
        },
      ],
    };
  };

  oop.inherits(FreeMarkerHighlightRules, TextHighlightRules);

  exports.FreeMarkerHighlightRules = FreeMarkerHighlightRules;
});

ace.define('ace/mode/freemarker', [], function (require, exports, module) {
  var oop = require('ace/lib/oop');
  var TextMode = require('ace/mode/text').Mode;
  var FreeMarkerHighlightRules =
    require('ace/mode/freemarker_highlight_rules').FreeMarkerHighlightRules;

  var Mode = function () {
    this.HighlightRules = FreeMarkerHighlightRules;
  };
  oop.inherits(Mode, TextMode);

  (function () {
    // 这里可以添加额外的配置
  }).call(Mode.prototype);

  exports.Mode = Mode;
});
