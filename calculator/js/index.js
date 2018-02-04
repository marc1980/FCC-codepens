$(document).ready(function () {

  var result = 0.0;
  var input = [];
  var operation = "";
  var nextOperation = "";

  function findDecimals(input) {
    return input.find(".") > 0;
  }
  // 0-9 .
  $(".btn-primary").click(function () {
    var currentInput = $(this).val();
    // multiple 0s
    if (currentInput === "0" && input.length === 1 && input[0] === "0") {
      console.log(" multiple zeroes!");
    }
    //multiple .s
    else if (currentInput === "." && input.indexOf(".") > 0) {
        console.log(" multiple decimals!");
      } else {
        input.push(currentInput);
        // update display
        $(".well").html(input.join(""));
      }
  });

  // + x div - =
  $(".btn-info").click(function () {
    console.log("info: " + $(this).val());

    nextOperation = $(this).val();
    console.log("Next operation: " + nextOperation);
    if (input.length > 0) {
      console.log("input: " + input);

      switch (operation) {
        case '':
          console.log('empty');
          result = parseFloat(input.join(""));
          break;
        case 'div':
          console.log('DIV');
          result /= parseFloat(input.join(""));
          break;
        case 'x':
          console.log('X');
          result *= parseFloat(input.join(""));
          break;
        case '+':
          console.log('+');
          result += parseFloat(input.join(""));
          break;
        case '-':
          console.log('-');
          result -= parseFloat(input.join(""));
          break;
        case '=':
          console.log('=');
          break;

      }
      input = [];
    }
    operation = nextOperation;
    console.log("operation: " + operation);
    //display result
    console.log("result: " + result);
    $(".well").html(result);
  });

  //AC, CE
  $(".btn-danger").click(function () {
    console.log("danger: " + $(this).val());
    //For now AC and CE both clear the current input and result
    result = 0;
    input = [];
    operation = "";
    // update display
    $(".well").html("0");
  });
});