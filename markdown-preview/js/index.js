var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var initialText = '# header H1 size\n## a sub header H2 size\n\n- a list item\n\n> a blockquote\n    \n![an image](https://goo.gl/Umyytc)\n\n__and bolded text__\n \na link [Markdown](https://en.wikipedia.org/wiki/Markdown)\n\n`<p></p>`\n\n    a code block:\n```\nReactDOM.render(<MarkdownPreview />, document.getElementById(\'content\'));\n```\n\n';

var MarkdownPreview = function (_React$Component) {
  _inherits(MarkdownPreview, _React$Component);

  function MarkdownPreview(props) {
    _classCallCheck(this, MarkdownPreview);

    var _this = _possibleConstructorReturn(this, (MarkdownPreview.__proto__ || Object.getPrototypeOf(MarkdownPreview)).call(this, props));

    _this.state = {
      input: initialText
    };
    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(MarkdownPreview, [{
    key: 'handleChange',
    value: function handleChange(event) {
      this.setState({ input: event.target.value });
    }
  }, {
    key: 'getMarkdownText',
    value: function getMarkdownText() {
      var rawMarkup = marked(this.state.input, { sanitize: true });
      return { __html: rawMarkup };
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'reactContainer' },
        React.createElement(
          'div',
          { className: 'input' },
          React.createElement(
            'p',
            null,
            'input'
          ),
          React.createElement(
            'textarea',
            { id: 'editor', rows: '30', cols: '80', value: this.state.input,
              onChange: this.handleChange },
            this.state.input
          )
        ),
        React.createElement(
          'div',
          { className: 'preview' },
          React.createElement(
            'p',
            null,
            'preview'
          ),
          React.createElement('div', { id: 'preview', dangerouslySetInnerHTML: this.getMarkdownText() })
        )
      );
    }
  }]);

  return MarkdownPreview;
}(React.Component);

ReactDOM.render(React.createElement(MarkdownPreview, null), document.getElementById('content'));