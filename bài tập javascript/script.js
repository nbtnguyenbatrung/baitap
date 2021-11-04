// bài tập 1 tính toán cơ bản 
var calculator = {

 add: function add(a,b){
    return a+b;
},
Subtraction: function Subtraction(a,b){
    return a-b;
},
multiplication: function multiplication(a,b){
    return a*b;
},
divide: function divide(a,b){
    if(b===0){
        return " không thể chia được cho số 0"
    }
    return a/b;
},
square: function square(a){
    return a*a;
},
absolute: function absolute(a) {
    return Math.abs(a);
},
sqrt: function sqrt(a) {
    if(a < 0){
        return "không thể tính được căn bậc 2 ";
    }
    return Math.sqrt(a);
}
}

console.log("Tính tổng hai số " + calculator.add(3,5) );
console.log("Tính hiệu hai số " + calculator.Subtraction(2,9));
console.log("tính tích hai số " + calculator.multiplication(3,4));
console.log("Tính thương hai số " + calculator.divide(3,0));
console.log("Tính bình phương một số " + calculator.square(4));
console.log("Tính trị tuyệt đối " + calculator.absolute(-3));
console.log("Tính căn bậc 2 cuae 1 số " + calculator.sqrt(-1));

// bài 2 

var  Fibonacci = function Fibonacci(n) {
    if(n<= 0 ){
        return " Không thể thực hiện  ";
    }
    if (n == 1 || n == 2)
        return 1;
    return Fibonacci(n - 1) + Fibonacci(n - 2);
}

console.log("giá trị của fibonacci là  " + Fibonacci(4) );

// bài 3 
var year = function year(n) {
    if( (n % 400 == 0) || (year % 4 == 0 && year % 100 != 0) )
        return " năm " + ` ${n} `+" là năm nhuận " ;

        return " năm " + ` ${n} `+" không là năm nhuận " ;
}

console.log(year(2000));

// bài 4 

var removeFromArray = function removeFromArray(Array = [],n) {
    Array.splice(n,1)
    console.log("Mảng sau khi remove phần tử thứ " + `${n} `+ " : " + Array );
}

var Array = [1,2,3,4,5];
removeFromArray(Array,2);

// bài 5

var reverse = function reverse(string) {
    var reversestring = "" ;
    for(var i = string.length-1 ; i>=0 ; i--){
        reversestring += string[i];
    }
    console.log( " Đảo ngược của chuỗi " + `${string}` + " là : " + reversestring );
}

reverse("12345");

// bài 6 

function js_style(params) {
    var style = document.getElementById("text");
    style.style.color = "red";
    style.style.fontSize = "30px";
}

// bài 7 

 function deleteArray(Array=[]) {
     
    console.log("Mảng trước khi xóa các phần tử không là duy nhất : " + Array);

    Array.sort(function (a,b) {
        return a - b
    })
    var ArrayEdit = [];
    for(var i = 0 ; i<Array.length-1 ; i++){
        
        if(Array[i] === Array[i+1]){
            if(ArrayEdit.indexOf(Array[i]) < 0)
                ArrayEdit.push(Array[i]);
        }
    }

    var index = 0;
    do{
        for(var i = 0 ; i<ArrayEdit.length ; i++){
            if(Array[index] == ArrayEdit[i]){
                Array.splice(index, 1);
                index = -1;
            }
        }
        index++;
    }
    while(index <= Array.length);

    console.log("Mảng sau khi xóa các phần tử không là duy nhất : " + Array);
}
var Array = [1,1,2,2,5,5,5,7,7,8,9,10];
deleteArray(Array);

