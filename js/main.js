/* 
Moskotcho Password Generator 
Developed by: Walid Amriou
www.walidamriou.com
----------------------------------------------------
Moskotcho Password Generator is licensed under the :
GNU Affero General Public License v3.0
https://www.gnu.org/licenses/agpl-3.0.en.html

----------------------------------------------------
Github:
https://github.com/walidamriou/Moskotcho_Password_Generator
----------------------------------------------------
Last update: May 2020

*/

// Generate a random integer n with equal chance in  min <= n < max.
function RandomVar_core(min, max) {
    let range = max - min;
    if (range <= 0) {
        throw new Exception('max must be larger than min');
    }
    let requestBytes = Math.ceil(Math.log2(range) / 8);
    if (!requestBytes) { // No randomness required
        return min;
    }
    let maxNum = Math.pow(256, requestBytes);
    let ar = new Uint8Array(requestBytes);

    while (true) {
        window.crypto.getRandomValues(ar);

        let val = 0;
        for (let i = 0; i < requestBytes; i++) {
            val = (val << 8) + ar[i];
        }

        if (val < maxNum - maxNum % range) {
            return min + (val % range);
        }
    }
}

/* copyToClipboard function*/
var password_display_flag = 0;

/*The number of passwords in the session */
var password_number_session=0;

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}

/* Layer 1 */
function getRandomType() {
    return (Math.floor(Math.random() * 4));
}

/* Layer 2*/

function getRandomVar() {
    let RandomVar;
    switch (getRandomType()) {
        //Lower
        case 0:
            RandomVar = String.fromCharCode(RandomVar_core(97, 122));
            break;
            //Upper
        case 1:
            RandomVar = String.fromCharCode(RandomVar_core(65, 90));
            break;
            //Number
        case 2:
            RandomVar = String.fromCharCode(RandomVar_core(48, 57));
            break;
            //symbols
        case 3:
            let symbols = '!@#$%^&*(){}[]=<>/,.'
            let symbols_length = symbols.length;
            RandomVar = symbols[RandomVar_core(0, symbols_length - 1)];
            break;
    }
    return RandomVar;

}

/* Layer 3 */
var passwordstore;

function getpassword() {
    password_length = document.getElementById("passl").value;

    if (password_length >= 8) {
        //Create passwordarray[password_length] with all element is =1
        let passwordarray = Array(password_length).fill(1);
        //charge the passwordarray[password_length] by RandomVar
        for (let index = 0; index < password_length; index++) {
            passwordarray[index] = getRandomVar();
        }
        //make passwordarray one element call password
        let password = passwordarray.join("");
        //print password in the console for test
        console.log("your password is: " + password);
        password_number_session+=1;
        console.log("password_number_session: ",password_number_session);
        alerticon = document.getElementById('password_number_session_badge');
        alerticon.setAttribute('data-badge', password_number_session);

        password_display_flag = 1;
        return password;

    } else if (password_length == "") {
        $("p").empty();
        $("p").text("You should put a length!");
    } else {
        $("p").empty();
        $("p").text("The length of the password should greater or equal 8");
        //alert("The length of a password should greater or equal 8");
        console.log("The length of a password should greater or equal 8");
    }

}