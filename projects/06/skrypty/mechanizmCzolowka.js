var poczatekGry = function () {

    var fadeIn = function (element, czas) {
        var licznik = 0;
        if (!czas) {
            czas = 15;
        }
        if (!ustawienia.fadeInOrFadeOut) {
            ustawienia.fadeInOrFadeOut = true;
            var inter = setInterval(function () {
                element.style.opacity = licznik;
                licznik += 0.01;
                if (licznik >= 1.01) {
                    clearInterval(inter);
                    ustawienia.fadeInOrFadeOut = false;
                }
            }, czas)
        }
        
    }

    var fadeOut = function (element, czas) {
        var licznik = 1;
        if (!czas) {
            czas = 15;
        }
        if (!ustawienia.fadeInOrFadeOut) {
            ustawienia.fadeInOrFadeOut = true;
            var inter2 = setInterval(function () {
                element.style.opacity = licznik;
                licznik -= 0.01;
                if (licznik <= 0) {
                    clearInterval(inter2);
                    ustawienia.fadeInOrFadeOut = false;
                }
            }, czas)
        }
        
    }

    document.addEventListener("keydown", function () {
        var keyCode = event.which;
        if (keyCode == 13) {
            if (!ustawienia.fadeInOrFadeOut) {
                if (ustawienia.stanKolejnosci == 0) { ustawienia.hejnal.pause(); }
                fadeOut(catchById("czolowkaImg"));
                setTimeout(function () {
                    ustawienia.stanKolejnosci++;
                    czolowka(ustawienia.kolejnosc[ustawienia.stanKolejnosci]);
                }, 1501);
            }
        }
    }, false);

    var ustawienia = {
        hejnal: new Audio('music/hejnal.mp3'),
        dlugoscHejnalu: 27000,
        kolejnosc: ["uruchom", "opisA", "opisB", "wylacz"],
        stanKolejnosci: undefined,
        fadeInOrFadeOut: false
    }

    var czolowka = function (polecenie) {
        switch (polecenie) {
            case "uruchom":
                var time = 0;
                var timer = setInterval(function () {
                    time+=10;
                    if (time == ustawienia.dlugoscHejnalu) {
                        fadeOut(catchById("czolowkaImg"));
                        console.log("zmiana");
                        ustawienia.stanKolejnosci = 1;
                        ustawienia.hejnal.pause();
                        setTimeout(function () {
                            czolowka(ustawienia.kolejnosc[ustawienia.stanKolejnosci]);
                        }, 1501)
                        clearInterval(timer);
                    }
                }, 10);
                ustawienia.stanKolejnosci = 0;
                catchById("czolowkaImg").style.display = "block";
                catchById("czolowkaTlo").style.display = "block";
                fadeIn(catchById("czolowkaImg"));
                catchById("czolowkaImg").style.backgroundImage = "url(img/czolowka/main.jpg)";
                ustawienia.hejnal.play();
                break;

            case "opisA":
                fadeIn(catchById("czolowkaImg"));
                catchById("czolowkaImg").style.backgroundImage = "url(img/czolowka/opisA.jpg)";
                break;

            case "opisB":
                fadeIn(catchById("czolowkaImg"));
                catchById("czolowkaImg").style.backgroundImage = "url(img/czolowka/opisB.jpg)";
                break;

            case "wylacz":
                catchById("czolowkaImg").style.display = "none";
                catchById("czolowkaTlo").style.display = "none";
                czyInputZablokowany = false;
                catchById("coTerazInput").value = "";
                break;
        }

    }

    czolowka("uruchom");
    czyInputZablokowany = true;
}