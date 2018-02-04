var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FccLeaderBoard = function (_React$Component) {
  _inherits(FccLeaderBoard, _React$Component);

  function FccLeaderBoard(props) {
    _classCallCheck(this, FccLeaderBoard);

    var _this = _possibleConstructorReturn(this, (FccLeaderBoard.__proto__ || Object.getPrototypeOf(FccLeaderBoard)).call(this, props));

    _this.state = {
      users: []
    };
    return _this;
  }

  _createClass(FccLeaderBoard, [{
    key: 'getFccUsers',
    value: function getFccUsers() {
      var _this2 = this;

      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://fcctop100.herokuapp.com/api/fccusers/top/recent');
      xhr.send(null);

      xhr.onreadystatechange = function () {
        var DONE = 4; // readyState 4 means the request is done.
        var OK = 200; // status 200 is a successful return.
        if (xhr.readyState === DONE) {
          if (xhr.status === OK) {
            //console.log(xhr.responseText); // 'This is the returned text.'
            var users = JSON.parse(xhr.responseText);
            _this2.setState({ users: users });
            _this2.sortAlltime();
          }
        } else {
          console.log('Error: ' + xhr.status); // An error occurred during the request.
        }
      };
    }
  }, {
    key: 'sortAlltime',
    value: function sortAlltime() {
      var sortedAlltime = this.state.users.slice();
      sortedAlltime.sort(function (a, b) {
        return b.alltime - a.alltime;
      });
      this.setState({ users: sortedAlltime });
    }
  }, {
    key: 'sortRecent',
    value: function sortRecent() {
      var sortedRecent = this.state.users.slice();
      sortedRecent.sort(function (a, b) {
        return b.recent - a.recent;
      });
      this.setState({ users: sortedRecent });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getFccUsers();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var rows = this.state.users.map(function (user, index) {
        return React.createElement(FccLeaderTableRows, { rank: index + 1, key: user.username, img: user.img, user: user.username, alltime: user.alltime, recent: user.recent });
      });
      return React.createElement(
        'div',
        { className: 'FccLeaderTable' },
        React.createElement(
          'table',
          null,
          React.createElement(
            'thead',
            null,
            React.createElement(FccLeaderTableHeader, {
              users: this.props.users,
              onSortAlltime: function onSortAlltime() {
                return _this3.sortAlltime();
              },
              onSortRecent: function onSortRecent() {
                return _this3.sortRecent();
              }
            })
          ),
          React.createElement(
            'tbody',
            null,
            rows
          )
        )
      );
    }
  }]);

  return FccLeaderBoard;
}(React.Component);

// Tabel header


var FccLeaderTableHeader = function (_React$Component2) {
  _inherits(FccLeaderTableHeader, _React$Component2);

  function FccLeaderTableHeader(props) {
    _classCallCheck(this, FccLeaderTableHeader);

    return _possibleConstructorReturn(this, (FccLeaderTableHeader.__proto__ || Object.getPrototypeOf(FccLeaderTableHeader)).call(this, props));
  }

  _createClass(FccLeaderTableHeader, [{
    key: 'handleSortAlltime',
    value: function handleSortAlltime() {
      this.props.onSortAlltime();
    }
  }, {
    key: 'handleSortRecent',
    value: function handleSortRecent() {
      this.props.onSortRecent();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      return React.createElement(
        'tr',
        null,
        React.createElement(
          'th',
          null,
          'Rank'
        ),
        React.createElement(
          'th',
          null,
          'Username'
        ),
        React.createElement(
          'th',
          { onClick: function onClick() {
              return _this5.handleSortAlltime();
            } },
          'Alltime'
        ),
        React.createElement(
          'th',
          { onClick: function onClick() {
              return _this5.handleSortRecent();
            } },
          'Recent'
        )
      );
    }
  }]);

  return FccLeaderTableHeader;
}(React.Component);

// table row


var FccLeaderTableRows = function (_React$Component3) {
  _inherits(FccLeaderTableRows, _React$Component3);

  function FccLeaderTableRows() {
    _classCallCheck(this, FccLeaderTableRows);

    return _possibleConstructorReturn(this, (FccLeaderTableRows.__proto__ || Object.getPrototypeOf(FccLeaderTableRows)).apply(this, arguments));
  }

  _createClass(FccLeaderTableRows, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'tr',
        null,
        React.createElement(
          'td',
          null,
          this.props.rank
        ),
        React.createElement(
          'td',
          null,
          React.createElement(
            'a',
            { href: "https://www.freecodecamp.com/" + this.props.user, target: '_blank' },
            React.createElement('img', { src: this.props.img, className: 'userImg' }),
            React.createElement(
              'span',
              null,
              this.props.user
            )
          )
        ),
        React.createElement(
          'td',
          null,
          this.props.alltime
        ),
        React.createElement(
          'td',
          null,
          this.props.recent
        )
      );
    }
  }]);

  return FccLeaderTableRows;
}(React.Component);

ReactDOM.render(React.createElement(FccLeaderBoard, null), document.getElementById('content'));