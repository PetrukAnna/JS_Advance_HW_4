window.addEventListener("load", init, false);

var expression = {
	value_1: "none",
	value_2: "none",
	operator: "none",
	result: "none",
}

function init() {
	var buttonArray = document.getElementsByClassName("button");
	var textArea = document.getElementById("text");
	var textStatement = document.getElementById("statement");

	var patternDigits = /[0-9.]/;


	for(var i = 0; i < buttonArray.length; i++) {
		buttonArray[i].addEventListener("click", function() {
			if(patternDigits.test(this.value) == true) {
				if(expression.result != "none") {
					if(textArea.value == expression.result) {
						textArea.value = "";
						statement.value = "";
					}
					expression.value_1 = "none";
					expression.value_2 = "none";
					expression.operator = "none";
					expression.result = "none";

					textArea.value += this.value;

				} else if(expression.value_1 != "none" && expression.operator != "none") {
					if(textArea.value == expression.value_1) {
						textArea.value = "";
					}
					textArea.value += this.value;
				} else {
					textArea.value += this.value;
				}
			} else if(this.value == "=") {
				if(expression.value_1 != "none") {
					expression.value_2 = textArea.value;
					textArea.value = calc();
					textStatement.value += expression.value_2 + " = " + calc();
					expression.result = calc();
				}	
			} else if(this.value == "←") {
				var str1 = textArea.value.substring(0, textArea.value.length - 1);
				textArea.value = str1;

				var str2 = statement.value.substring(0, statement.value.length - 1);
				statement.value = str2;

			} else if(this.value == "C") {
				textArea.value = "";
				statement.value = "";

				expression.value_1 = "none";
				expression.value_2 = "none";
				expression.operator = "none";
				expression.result = "none";

			} else if(this.value == "+" || "-" || "*" || "/") {
				if(expression.value_1 == "none" && textArea.value != "") {
					expression.value_1 = textArea.value;
					expression.operator = this.value;
					textStatement.value = textArea.value + " " + this.value + " ";
					//alert(expression.value_1);
				} else if(expression.result != "none") {
					expression.value_1 = textArea.value;
					expression.value_2 = "none";
					expression.result = "none";
					expression.operator = this.value;
					textStatement.value = textArea.value + " " + this.value + " ";
				}
			} 
		}, false);
	}
}

function calc() {
	var res = 0;

	switch(expression.operator) {
		case '+':  
			res = parseFloat(expression.value_1) + parseFloat(expression.value_2);
			break;
		case '-':  
			res = parseFloat(expression.value_1) - parseFloat(expression.value_2);
			break;
		case '*':  
			res = parseFloat(expression.value_1) * parseFloat(expression.value_2);
			break;
		case '/':  
			res = parseFloat(expression.value_1) / parseFloat(expression.value_2);
			break;
	}

	return res;
}