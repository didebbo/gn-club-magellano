// Convert Decimal to Binary
function convertToBinary (number) {
    let decimal = number;
    let binary = (decimal % 2).toString();
    while (decimal > 1) {
        decimal = parseInt(decimal / 2);
        binary =  (decimal % 2) + (binary);
    }
    console.log("Binary of " + number + " is " + binary);
    convertToDecimal(binary);
}

// Convert Binary to Decimal 
function convertToDecimal (binary) {
    let invertedBinary = binary.toString().split("").reverse().join("");
    console.log("Inverted Binary is " + invertedBinary);
    console.log("Decimal of "+ invertedBinary + " is " + parseInt(invertedBinary,2));
}

// Starting Point 
function run () {
    convertToBinary(13);
}

run();