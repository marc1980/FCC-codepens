var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var genTimer;

var GameOfLife = function (_React$Component) {
  _inherits(GameOfLife, _React$Component);

  function GameOfLife(props) {
    _classCallCheck(this, GameOfLife);

    var _this = _possibleConstructorReturn(this, (GameOfLife.__proto__ || Object.getPrototypeOf(GameOfLife)).call(this, props));

    _this.state = {
      board: [],
      isRunning: false,
      generation: 0
    };
    return _this;
  }

  _createClass(GameOfLife, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log("componentDidMount");
      var width = 50;
      var height = 30;
      var boardSize = width * height;
      var board = [];
      for (var i = 0; i < boardSize; i++) {
        var random = Math.random() >= 0.5;
        board.push(random);
      }
      this.setState({ board: board });
      this.handleStartPause();
    }
  }, {
    key: "handleGenerationUpdate",
    value: function handleGenerationUpdate() {
      console.log("handleGenerationUpdate " + this.state.generation);
      // conway's rules
      var nextGen = this.state.generation += 1;
      var nextGenBoard = this.state.board.map(function (cell, index, board) {
        var trueCount = 0;
        if (board[index - 51] === true) {
          trueCount += 1;
        }
        if (board[index - 50] === true) {
          trueCount += 1;
        }
        if (board[index - 49] === true) {
          trueCount += 1;
        }
        if (board[index - 1] === true) {
          trueCount += 1;
        }
        if (board[index + 1] === true) {
          trueCount += 1;
        }
        if (board[index + 51] === true) {
          trueCount += 1;
        }
        if (board[index + 50] === true) {
          trueCount += 1;
        }
        if (board[index + 49] === true) {
          trueCount += 1;
        }

        // live cell, keeps alive with 2 or 3 living neighbours
        if (cell === true && (trueCount === 2 || trueCount === 3)) return true;
        // dead cell, lives with 3 living neighbours 
        else if (cell === false && trueCount === 3) return true;else return false;
      });
      // update board and generation number in state
      this.setState({ board: nextGenBoard, generation: nextGen });
    }
  }, {
    key: "handleStartPause",
    value: function handleStartPause() {
      var _this2 = this;

      if (this.state.isRunning === false) {
        this.setState({ isRunning: true });
        genTimer = setInterval(function () {
          return _this2.handleGenerationUpdate();
        }, 200);
      } else {
        this.setState({ isRunning: false });
        clearInterval(genTimer);
      }
    }
  }, {
    key: "handleReset",
    value: function handleReset() {
      this.setState({ isRunning: false, generation: 0 });
      // setup board, 50 * 30 fixed for now
      var width = 50;
      var height = 30;
      var boardSize = width * height;
      var board = [];
      for (var i = 0; i < boardSize; i++) {
        board.push(false);
      }
      this.setState({ board: board });
    }
  }, {
    key: "handleCellClick",
    value: function handleCellClick(id) {
      console.log("handleClick " + id);
      var board = this.state.board;
      board[id] = true;
      this.setState({ board: board });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return React.createElement(
        "div",
        { className: "frame" },
        React.createElement(
          "div",
          { className: "controlsContainer" },
          React.createElement(
            "button",
            { className: "btn btn-primary", onClick: function onClick() {
                return _this3.handleStartPause();
              } },
            this.state.isRunning ? "Pause" : "Start"
          ),
          React.createElement(
            "button",
            { className: "btn btn-primary", onClick: function onClick() {
                return _this3.handleReset();
              } },
            "Reset"
          ),
          React.createElement(
            "button",
            { className: "btn btn-primary", onClick: function onClick() {
                return _this3.handleGenerationUpdate();
              } },
            "Step"
          ),
          React.createElement(
            "h3",
            null,
            "Generation: ",
            this.state.generation
          )
        ),
        React.createElement(
          "div",
          { className: "container" },
          this.state.board.map(function (cell, index) {
            return React.createElement("div", { className: cell ? "cell alive" : "cell dead",
              key: index
              //     id={index} 
              //     status={cell} 
              , onClick: function onClick() {
                return _this3.handleCellClick(index);
              }
            });
          })
        )
      );
    }
  }]);

  return GameOfLife;
}(React.Component);

ReactDOM.render(React.createElement(GameOfLife, null), document.getElementById('content'));