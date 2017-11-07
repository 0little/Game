var socket = io("ws://localhost:3000");

var local = new Local(socket);
var remote = new Remote(socket);

socket.on("waiting", function (str) {
    document.getElementById("waiting").innerHTML = str;
});

socket.on("disConnect", function () {
    var resultDiv = document.getElementById("result");
    //将结果显示出来
    resultDiv.style.display = "block";
    resultDiv.getElementsByTagName("h1")[0].innerHTML =
        document.getElementById("anotherScore").innerHTML;

});