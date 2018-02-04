var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ReactBootstrap = ReactBootstrap,
    Button = _ReactBootstrap.Button,
    ListGroup = _ReactBootstrap.ListGroup,
    ListGroupItem = _ReactBootstrap.ListGroupItem,
    Modal = _ReactBootstrap.Modal,
    ModalHeader = _ReactBootstrap.ModalHeader,
    ModalTitle = _ReactBootstrap.ModalTitle,
    ModalBody = _ReactBootstrap.ModalBody,
    ModalFooter = _ReactBootstrap.ModalFooter,
    FormGroup = _ReactBootstrap.FormGroup,
    FormControl = _ReactBootstrap.FormControl,
    ControlLabel = _ReactBootstrap.ControlLabel,
    Accordion = _ReactBootstrap.Accordion,
    Panel = _ReactBootstrap.Panel;

var RecipeBox = function (_React$Component) {
  _inherits(RecipeBox, _React$Component);

  function RecipeBox(props) {
    _classCallCheck(this, RecipeBox);

    var _this = _possibleConstructorReturn(this, (RecipeBox.__proto__ || Object.getPrototypeOf(RecipeBox)).call(this, props));

    _this.state = {
      showModal: false,
      currentRecipeId: null,
      recipe: "",
      ingredients: "",
      recipes: []
    };
    _this.openModal = _this.openModal.bind(_this);
    _this.handleCloseModal = _this.handleCloseModal.bind(_this);
    _this.handleChangeRecipeInput = _this.handleChangeRecipeInput.bind(_this);
    _this.handleChangeIngredientsInput = _this.handleChangeIngredientsInput.bind(_this);
    _this.handleSaveRecipe = _this.handleSaveRecipe.bind(_this);
    _this.handleEditRecipe = _this.handleEditRecipe.bind(_this);
    _this.handleDeleteRecipe = _this.handleDeleteRecipe.bind(_this);
    return _this;
  }

  _createClass(RecipeBox, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var recipebook = [];
      console.log(recipebook);
      recipebook = JSON.parse(localStorage.getItem("recipebook"));
      if (!recipebook) {
        recipebook = [{ "recipename": "pasta", "ingredients": ["sliertjes", "saus", "groenten"] }, { "recipename": "pizza", "ingredients": ["bodem", "saus", "groenten"] }];
        localStorage.setItem("recipebook", JSON.stringify(recipebook));
      }
      console.log(recipebook);
      this.setState({ recipes: recipebook });
    }
  }, {
    key: "openModal",
    value: function openModal() {
      this.setState({ showModal: true });
    }
  }, {
    key: "handleCloseModal",
    value: function handleCloseModal() {
      this.setState({ showModal: false, currentRecipeId: null, recipe: "", ingredients: "" });
    }
  }, {
    key: "handleChangeRecipeInput",
    value: function handleChangeRecipeInput(recipeInput) {
      this.setState({ recipe: recipeInput });
    }
  }, {
    key: "handleChangeIngredientsInput",
    value: function handleChangeIngredientsInput(ingredientsInput) {
      this.setState({ ingredients: ingredientsInput });
    }
  }, {
    key: "handleSaveRecipe",
    value: function handleSaveRecipe() {
      var recipes = [];
      recipes = this.state.recipes;
      if (this.state.currentRecipeId === null) {
        recipes.push({ "recipename": this.state.recipe, "ingredients": this.state.ingredients.split(',') });
      } else {
        recipes[this.state.currentRecipeId].recipename = this.state.recipe;
        recipes[this.state.currentRecipeId].ingredients = this.state.ingredients.split(',');
      }
      this.setState({ showModal: false, currentRecipeId: null, recipe: "", ingredients: "", recipes: recipes });
      localStorage.setItem("recipebook", JSON.stringify(this.state.recipes));
    }
  }, {
    key: "handleEditRecipe",
    value: function handleEditRecipe(id) {
      this.setState({ showModal: true,
        currentRecipeId: id,
        recipe: this.state.recipes[id].recipename,
        ingredients: this.state.recipes[id].ingredients.join(', ') });
    }
  }, {
    key: "handleDeleteRecipe",
    value: function handleDeleteRecipe(id) {
      var recipes = this.state.recipes.filter(function (recipe, index) {
        return index !== id;
      });
      localStorage.setItem("recipebook", JSON.stringify(recipes));
      this.setState({ recipes: recipes });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "RecipeBox" },
        React.createElement(
          "h1",
          null,
          "Recipe Box"
        ),
        React.createElement(RecipeList, {
          recipes: this.state.recipes,
          onClickDelete: this.handleDeleteRecipe,
          onClickEdit: this.handleEditRecipe
        }),
        React.createElement(
          Button,
          { bsStyle: "primary", bsSize: "large", onClick: this.openModal },
          "Add Recipe"
        ),
        React.createElement(RecipeModal, {
          recipe: this.state.recipe,
          ingredients: this.state.ingredients,
          handleChangeRecipe: this.handleChangeRecipeInput,
          handleChangeIngredients: this.handleChangeIngredientsInput,
          showModal: this.state.showModal,
          onCloseModal: this.handleCloseModal,
          onSaveRecipe: this.handleSaveRecipe
        })
      );
    }
  }]);

  return RecipeBox;
}(React.Component);

var RecipeList = function RecipeList(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      Accordion,
      null,
      props.recipes.map(function (recipe, index) {
        return React.createElement(
          Panel,
          { header: recipe.recipename, eventKey: recipe.recipename },
          React.createElement(
            Button,
            { onClick: function onClick() {
                return props.onClickEdit(index);
              } },
            "Edit"
          ),
          React.createElement(
            Button,
            { onClick: function onClick() {
                return props.onClickDelete(index);
              } },
            "Delete"
          ),
          React.createElement(IngredientList, { ingredients: recipe.ingredients })
        );
      })
    )
  );
};

var IngredientList = function IngredientList(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      ListGroup,
      null,
      props.ingredients.map(function (ingredient) {
        return React.createElement(
          ListGroupItem,
          { key: ingredient.id },
          ingredient
        );
      })
    )
  );
};

var RecipeModal = function (_React$Component2) {
  _inherits(RecipeModal, _React$Component2);

  function RecipeModal(props) {
    _classCallCheck(this, RecipeModal);

    var _this2 = _possibleConstructorReturn(this, (RecipeModal.__proto__ || Object.getPrototypeOf(RecipeModal)).call(this, props));

    _this2.onChangeRecipe = _this2.onChangeRecipe.bind(_this2);
    _this2.onChangeIngredients = _this2.onChangeIngredients.bind(_this2);
    return _this2;
  }

  _createClass(RecipeModal, [{
    key: "onChangeRecipe",
    value: function onChangeRecipe(event) {
      this.props.handleChangeRecipe(event.target.value);
    }
  }, {
    key: "onChangeIngredients",
    value: function onChangeIngredients(event) {
      this.props.handleChangeIngredients(event.target.value);
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          Modal,
          { show: this.props.showModal },
          React.createElement(
            Modal.Header,
            { closeButton: true },
            React.createElement(
              Modal.Title,
              null,
              "Add / Edit Recipe"
            )
          ),
          React.createElement(
            Modal.Body,
            null,
            React.createElement(
              "form",
              null,
              React.createElement(
                FormGroup,
                null,
                React.createElement(
                  ControlLabel,
                  null,
                  "Recipe name"
                ),
                React.createElement(FormControl, { id: "formRecipeName",
                  type: "text",
                  placeholder: "Enter recipe name",
                  value: this.props.recipe,
                  onChange: this.onChangeRecipe
                })
              ),
              React.createElement(
                FormGroup,
                null,
                React.createElement(
                  ControlLabel,
                  null,
                  "Ingredients (separated with comma)"
                ),
                React.createElement(FormControl, { id: "formIngredients",
                  type: "text",
                  placeholder: "Enter ingredients",
                  value: this.props.ingredients,
                  onChange: this.onChangeIngredients
                })
              )
            )
          ),
          React.createElement(
            Modal.Footer,
            null,
            React.createElement(
              Button,
              { onClick: this.props.onCloseModal },
              "Cancel"
            ),
            React.createElement(
              Button,
              { onClick: this.props.onSaveRecipe },
              "Save"
            )
          )
        )
      );
    }
  }]);

  return RecipeModal;
}(React.Component);

ReactDOM.render(React.createElement(RecipeBox, null), document.getElementById('content'));