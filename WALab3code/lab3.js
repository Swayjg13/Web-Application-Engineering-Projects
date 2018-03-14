//A bidimensional array of prices based on the beverage and beverage size chosen.//
var prices = [[1, 2, 3], [2, 2.5, 3], [4, 5, 6], [8, 9, 10]];

//Allows certain elements to be shown.//
function show(v) {
    v.style.display = "block";
}

//Allows certain elements to be hidden.//
function hide(v) {
    v.style.display = "none";
}

//Displays the Date of Birth confirmation form//
function dobDisplay() {
    var v = document.querySelector("#beverages").value;
    if (v == 'Beer' || v == 'Wine') {
        show(document.querySelector("#revbirth"));
    } else {
        hide(document.querySelector("#revbirth"));
    }
}

//Gets the corresponding beverage from the prices array based on the beverage chosen in the form drop-down list.//
function getBeverage() {
    var b = document.querySelector("#beverages").value;
    if (b == 'Coffee') {
        return 0;
    }
    else if (b == 'Tea') {
        return 1;
    }
    else if (b == 'Beer') {
        return 2;
    }
    else {
        return 3;
    }
}

//Gets the corresponding beverage size from the prices array depending on which radio option was selected.//
function getBevSize() {
    var bs = document.querySelector("input[type=radio]:checked").value;
    if (bs == 'Small') {
        return 0;
    }
    else if (bs == 'Medium') {
        return 1;
    }
    else {
        return 2;
    }
}

//Hides all of the windows on Form Startup//
function onLoad() {
    hide(document.querySelector("#revbirth"));
    hide(document.querySelector("#receipt"));
    hide(document.querySelector("#errord"));
    hide(document.querySelector("#errorq"));
}

//Displays the receipt when the 'Submit Order' button is pressed.//
function showReceipt() {
    //Stores the form input values.//
    var customerName = document.querySelector("#name").value;
    var bevType = document.querySelector("#beverages").value;
    var bevSize = document.querySelector("input[type=radio]:checked").value;
    var bevQuantity = document.querySelector("#quantity").value;
    var bevCost = prices[getBeverage()][getBevSize()];
    var total = bevCost * bevQuantity;

    //Changes or sets the values in the Receipt section of the HTML code to the form input values.//
    document.querySelector("#custName").innerHTML = customerName;
    document.querySelector("#bevType").innerHTML = bevType;
    document.querySelector("#bevSize").innerHTML = bevSize;
    document.querySelector("#bevQuantity").innerHTML = bevQuantity;
    document.querySelector("#bevCost").innerHTML = bevCost;
    document.querySelector("#total").innerHTML = total;
    //Displays Receipt if the proper conditions are met//
    if (bevQuantity <= 0) {
        show(document.querySelector("#errorq"));
        hide(document.querySelector("#receipt"));
    } else {
        hide(document.querySelector("#errorq"));
        calculateBirthdate();
    }
}

function calculateBirthdate() {
    var v = document.querySelector("#beverages").value;
    if (v == 'Beer' || v == 'Wine') {
        var birthDate = document.querySelector("#birthdate").value;
        document.querySelector("#birthdate").innerHTML = birthDate;

        var currentdate = moment();
        var age = moment(document.querySelector("#birthdate").value).add(21, 'years');

        //Case 2: if the Customer attempts to buy an alcoholic beverage and is 21 years of age or older//
        if (age < currentdate) {
            hide(document.querySelector("#errord"));
            show(document.querySelector("#receipt"));
        }
        //Case 3: if the Customer attempts to buy an alcoholic beverage and is under 21 years of age//
        else if (age >= currentdate) {  
            //must be born before//
            var mbbb = currentdate.subtract(21, "years").format('llll');
            document.querySelector("#takeID").innerHTML = mbbb;
            show(document.querySelector("#errord"));
            hide(document.querySelector("#receipt"));

        }
//Case 1: if the Customer does not attempt to buy an alcoholic beverage
    }
    else {
        show(document.querySelector("#receipt"));
        hide(document.querySelector("#errord"));
        hide(document.querySelector("#errorq"));
    }

}