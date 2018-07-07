const showMessage = function (message, time) {
    var p = document.createElement("p");
    p.innerHTML = message;
    document.getElementById("messages").innerHTML = "";
    document.getElementById("messages").style.display = "block";
    document.getElementById("messages").appendChild(p);
    var time = setTimeout(function () {
        document.getElementById("messages").style.display = "none";
    }, time * 1000)
}