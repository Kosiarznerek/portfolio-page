var szerokoscObrazka = 600;
var obecnyObrazekDoUkladania = "url('grafiki/1.jpg')"
window.onload = function () {

    /*=======================================================================================================*/
    /*=======================================================================================================*/
    //GENERUJE POJEMNIK
    var pojemnik = document.createElement("div")
    pojemnik.id = "pojemnik";
    document.body.appendChild(pojemnik);
    /*=======================================================================================================*/
    //WSTAWIAM NAPIS H1
    var h1 = document.createElement("h1");
    h1.innerHTML = "Click&Slide";
    pojemnik.appendChild(h1);
    /*=======================================================================================================*/
    //WSTAWIAM SLIDER
    var miniaturka = document.createElement("div");
    miniaturka.id = "miniaturka";
    var zaq1 = document.createElement("div");
    zaq1.style.backgroundImage = "url('grafiki/6.jpg')";
    miniaturka.appendChild(zaq1);
    for (var i = 0; i < 6; i++) {
        var div = document.createElement("div");
        div.style.backgroundImage = "url('grafiki/" + (i + 1) + ".jpg')";
        miniaturka.appendChild(div);
    }
    var zaq2 = document.createElement("div");
    zaq2.style.backgroundImage = "url('grafiki/1.jpg')";
    miniaturka.appendChild(zaq2);
    pojemnik.appendChild(miniaturka);
    var holderNaSlider = document.createElement("div");
    holderNaSlider.appendChild(miniaturka);
    holderNaSlider.id = "slider-holder"
    //PRZYCISK W LEWO
    var sliderWlewo = document.createElement("div");
    sliderWlewo.onclick = function () {
        sterowanieSliderem("lewo");
    }
    sliderWlewo.id = "slider-w-lewo";
    pojemnik.appendChild(sliderWlewo);
    pojemnik.appendChild(holderNaSlider);
    //PRZYCISK W PRAWO
    var sliderWprawo = document.createElement("div");
    sliderWprawo.id = "slider-w-prawo";
    sliderWprawo.onclick = function () {
        sterowanieSliderem("prawo");
    }
    pojemnik.appendChild(sliderWprawo);
    /*=======================================================================================================*/
    //TABELA REKORDOW
    var tabliczka
    var tabela = document.createElement("div");
    tabela.id = "tabela-rekordow";
    var bUruchomTabele = document.createElement("button");
    bUruchomTabele.id = "b-uruchom-tabele";
    bUruchomTabele.innerHTML = "Pokaż tabelę wyników";
    bUruchomTabele.onclick = function () {
        tabela.style.display = "block";
        tabela.innerHTML = "";

        var h1 = document.createElement("h1");
        h1.innerHTML = "Tabela wyników";
        tabela.appendChild(h1);

        //PRZYCISK ZAMYKAJĄCY TABELE REKORDÓW
        var zamykanieTabeli = document.createElement("div");
        zamykanieTabeli.id = "zamykanie-tabeli";
        zamykanieTabeli.onclick = function () {
            tabela.style.display = "none";
        }
        zamykanieTabeli.innerHTML = "X";
        tabela.appendChild(zamykanieTabeli);

        //PRZYCISKI DO GENEROWANIA TABEL REKORDOW Z COOKIES
        for (var i = 3; i <= 6; i++) {
            var przycisk = document.createElement("button");
            przycisk.innerHTML = i + "x" + i;
            przycisk.onclick = function () {
                wyswietlanieTabeliWynikow(this.innerHTML[0]);
            }
            tabela.appendChild(przycisk);
        }

        //TABLICA Z WYNIKAMI
        tabliczka = document.createElement("table");
        tabela.appendChild(tabliczka);
    }
    pojemnik.appendChild(bUruchomTabele);

    pojemnik.appendChild(tabela);
    /*=======================================================================================================*/
    //PRZYCISKI
    var div = document.createElement("div");
    div.id = "przyciski";
    pojemnik.appendChild(div);
    /*=======================================================================================================*/
    //ZEGAR
    var zegar = document.createElement("div");
    zegar.id = "zegar";
    pojemnik.appendChild(zegar);
    /*=======================================================================================================*/
    //WSTAWIAM DIV GDZIE BĘDZIE POCIETY OBRAZEK
    var planszaDoGry = document.createElement("div")
    planszaDoGry.id = "plansza";
    planszaDoGry.style.backgroundImage = obecnyObrazekDoUkladania;
    pojemnik.appendChild(planszaDoGry);
    /*=======================================================================================================*/
    //WSTAWIAM DIV Z KOMUNIKATEM-RESETEM
    var komunikat = document.createElement("div");
    komunikat.id = "komunikat"
    var spkomunikat = document.createElement("span");
    //spkomunikat.innerHTML="Brawo, udało Ci się!";
    komunikat.appendChild(spkomunikat);
    pojemnik.appendChild(komunikat);
    var resetPrzycisk = document.createElement("button");
    resetPrzycisk.innerHTML = "OK"
    resetPrzycisk.onclick = function () {
        document.getElementById("komunikat").style.display = "none";
        planszaDoGry.innerHTML = "";
        zegar("stworz");
        komunikat4.style.display = "block";
    }
    /*=======================================================================================================*/
    //WSTAWIAM DIV Z KOMUNIKATEM-INFORMACJA BEZ RESETA STRONY
    var komunikat2 = document.createElement("div");
    komunikat2.id = "komunikat2"
    var spkomunikat2 = document.createElement("span");
    spkomunikat2.innerHTML = "Poczekaj, trwa losowanie ...";
    komunikat2.appendChild(spkomunikat2);
    pojemnik.appendChild(komunikat2);
    var closePrzycisk = document.createElement("button");
    closePrzycisk.innerHTML = "OK"
    closePrzycisk.onclick = function () {
        document.getElementById("komunikat2").style.display = "none";
    }
    spkomunikat2.appendChild(closePrzycisk);
    /*=======================================================================================================*/
    /*=======================================================================================================*/


    /*=======================================================================================================*/
    var ktoryTerazObrazek = 1;

    var sterowanieSliderem = function (kierunek) {
        switch (kierunek) {
            case "prawo":
                ktoryTerazObrazek++;
                sliderWlewo.style.pointerEvents = 'none';
                sliderWprawo.style.pointerEvents = 'none';

                var obcecnaWartosc = miniaturka.style.marginLeft
                if (obcecnaWartosc == null || obcecnaWartosc == "") {
                    obcecnaWartosc = "-80px";
                }

                if (ktoryTerazObrazek == 7) {
                    planszaDoGry.style.backgroundImage = "url('grafiki/1.jpg')";
                }
                else {
                    planszaDoGry.style.backgroundImage = "url('grafiki/" + ktoryTerazObrazek + ".jpg')";
                }

                var przesun = 0;
                interval = setInterval(function () {
                    miniaturka.style.marginLeft = "calc(" + obcecnaWartosc + " - " + przesun + "px)";
                    if (++przesun == 81) {
                        sliderWlewo.style.pointerEvents = 'auto';
                        sliderWprawo.style.pointerEvents = 'auto';
                        if (ktoryTerazObrazek == 7) {
                            miniaturka.style.marginLeft = "-80px"
                            ktoryTerazObrazek = 1;
                        }
                        obecnyObrazekDoUkladania = "url('grafiki/" + ktoryTerazObrazek + ".jpg')"
                        clearInterval(interval)
                    }
                }, 10)

                break;

            case "lewo":

                ktoryTerazObrazek--;
                sliderWlewo.style.pointerEvents = 'none';
                sliderWprawo.style.pointerEvents = 'none';

                var obcecnaWartosc = miniaturka.style.marginLeft
                if (obcecnaWartosc == null || obcecnaWartosc == "") {
                    obcecnaWartosc = "-80px";
                }

                if (ktoryTerazObrazek == 0) {
                    planszaDoGry.style.backgroundImage = "url('grafiki/6.jpg')";
                }
                else {
                    planszaDoGry.style.backgroundImage = "url('grafiki/" + ktoryTerazObrazek + ".jpg')";
                }

                var przesun = 0;
                interval = setInterval(function () {
                    miniaturka.style.marginLeft = "calc(" + obcecnaWartosc + " + " + przesun + "px)";
                    if (++przesun == 81) {
                        sliderWlewo.style.pointerEvents = 'auto';
                        sliderWprawo.style.pointerEvents = 'auto';
                        if (ktoryTerazObrazek == 0) {
                            miniaturka.style.marginLeft = "-480px"
                            ktoryTerazObrazek = 6;
                        }
                        obecnyObrazekDoUkladania = "url('grafiki/" + ktoryTerazObrazek + ".jpg')"
                        clearInterval(interval)
                    }
                }, 10)

                break;
        }
    }
    /*=======================================================================================================*/
    var wyswietlanieTabeliWynikow = function (jakieWyniki) {
        if (document.cookie == "" || (JSON.parse(document.cookie.split("=")[1]))[jakieWyniki - 3].length == 0) {
            //WSTAWIAM DIV Z KOMUNIKATEM-INFORMACJA BEZ RESETA STRONY
            var komunikat3 = document.createElement("div");
            komunikat3.id = "komunikat3"
            var spkomunikat3 = document.createElement("span");
            spkomunikat3.innerHTML = "Brak rekordów";
            komunikat3.appendChild(spkomunikat3);
            pojemnik.appendChild(komunikat3);
            var closePrzycisk = document.createElement("button");
            closePrzycisk.innerHTML = "OK"
            closePrzycisk.onclick = function () {
                komunikat3.style.display = "none";
            }
            spkomunikat3.appendChild(closePrzycisk);
            komunikat3.style.display = "block";
        }
        else {
            var wyswietlWyniki = JSON.parse(document.cookie.split("=")[1])[jakieWyniki - 3]
            tabliczka.innerHTML = "";

            for (var i = 0; i < wyswietlWyniki.length; i++) {
                var tr = document.createElement("tr")
                var tdpozycja = document.createElement("td")
                var tdimie = document.createElement("td")
                var tdwynik = document.createElement("td")
                tdpozycja.innerHTML = (i + 1);
                tdimie.innerHTML = decodeURIComponent(wyswietlWyniki[i].imie);
                tdwynik.innerHTML = wyswietlWyniki[i].wynikDoWyswietlenia;
                tr.appendChild(tdpozycja)
                tr.appendChild(tdimie)
                tr.appendChild(tdwynik)
                tabliczka.appendChild(tr)
                if (i == 9) {
                    break;
                }
            }
        }
    }
    /*=======================================================================================================*/
    var sortowanieWynikow = function (tablica) {
        var czyBylaZmiana, pom;
        do {
            czyBylaZmiana = false;
            for (var i = 0; i < tablica.length - 1; i++) {
                if (tablica[i + 1].wynikDoSortowania < tablica[i].wynikDoSortowania) {
                    pom = tablica[i];
                    tablica[i] = tablica[i + 1];
                    tablica[i + 1] = pom;
                    czyBylaZmiana = true;
                }
            }
        } while (czyBylaZmiana);
    }
    /*=======================================================================================================*/
    var komunikat4
    var zapisTop10 = function () {
        //WSTAWIAM DIV Z KOMUNIKATEM O PODANIE IMIENIA
        komunikat4 = document.createElement("div");
        komunikat4.id = "komunikat4"
        var spkomunikat4 = document.createElement("span");
        spkomunikat4.innerHTML = "Podaj imie";
        komunikat4.appendChild(spkomunikat4);
        pojemnik.appendChild(komunikat4);
        var closePrzycisk = document.createElement("button");
        closePrzycisk.innerHTML = "OK"
        closePrzycisk.onclick = function () {
            if (input.value != "") {
                var imie = encodeURIComponent(input.value);
                komunikat4.style.display = "none";

                var tablicaWynikow3x3 = [];
                var tablicaWynikow4x4 = [];
                var tablicaWynikow5x5 = [];
                var tablicaWynikow6x6 = [];
                var tablicaWszystkichPlansz = [];
                tablicaWszystkichPlansz[0] = tablicaWynikow3x3;
                tablicaWszystkichPlansz[1] = tablicaWynikow4x4;
                tablicaWszystkichPlansz[2] = tablicaWynikow5x5;
                tablicaWszystkichPlansz[3] = tablicaWynikow6x6;

                if (document.cookie != "") {
                    tablicaWszystkichPlansz = JSON.parse(document.cookie.split("=")[1])
                }

                //TWORZE NOWY WYNIK
                var nowyWynik = {
                    imie: imie,
                    wynikDoWyswietlenia: zegar("podajczas"),
                    wynikDoSortowania: zegar("czasSortuj")
                }

                var gdzieWstawicWynik = parseInt(aktualnyRozmiarPlanszy - 3);

                //I DODAJE GO DO TABELI WYNIKÓW
                tablicaWszystkichPlansz[gdzieWstawicWynik][tablicaWszystkichPlansz[gdzieWstawicWynik].length] = nowyWynik

                //SORTUJE TABLICE WYNIKOW
                sortowanieWynikow(tablicaWszystkichPlansz[gdzieWstawicWynik])

                //DODANE AKTUALNA TABLICE WYNIKOW DO CIASTECZEK
                var cvalue = JSON.stringify(tablicaWszystkichPlansz)
                var czasTrwaniaCiasteczek = 30;
                var cname = "wyniki";
                var d = new Date();
                d.setTime(d.getTime() + (czasTrwaniaCiasteczek * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
            }
        }
        var input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", "np. Damian Bąbka");
        input.setAttribute("maxlength", "15")
        spkomunikat4.appendChild(input)

        spkomunikat4.appendChild(closePrzycisk);
    }
    /*=======================================================================================================*/
    var timerMilisekundy001, timerMilisekundy010, timerMilisekundy100, timerSekundy, timerMinuty, timerGodziny
    var milisekundy001 = 0, milisekundy010 = 0, milisekundy100 = 0, sekundy = 0, minuty = 0, godziny = 0;
    var aktualnyCzas;
    var aktualnyCzasSortuj

    var stworzZegar = function () {
        milisekundy = 0;
        sekundy = 0;
        minuty = 0;
        godziny = 0;

        for (var i = 0; i < 12; i++) {
            var div2 = document.createElement("div");
            div2.style.display = "inline-block";
            div2.className = "elemnty-zegara";
            div2.id = "zegar" + i;
            document.getElementById("zegar").appendChild(div2);
        }

        var div2 = document.createElement("div");
        div2.style.display = "inline-block";
        div2.style.width = "100%";
        document.getElementById("zegar").appendChild(div2);

        //GODZINY
        document.getElementById("zegar0").style.backgroundImage = "url('cyferki/0.png')";
        document.getElementById("zegar1").style.backgroundImage = "url('cyferki/0.png')";
        document.getElementById("zegar2").style.backgroundImage = "url('cyferki/dwukropek.png')";
        //MINUTY
        document.getElementById("zegar3").style.backgroundImage = "url('cyferki/0.png')";
        document.getElementById("zegar4").style.backgroundImage = "url('cyferki/0.png')";
        document.getElementById("zegar5").style.backgroundImage = "url('cyferki/dwukropek.png')";
        //SEKUNDY
        document.getElementById("zegar6").style.backgroundImage = "url('cyferki/0.png')";
        document.getElementById("zegar7").style.backgroundImage = "url('cyferki/0.png')";
        document.getElementById("zegar8").style.backgroundImage = "url('cyferki/kropka.png')";
        //MILISEKUNDY
        document.getElementById("zegar9").style.backgroundImage = "url('cyferki/0.png')";
        document.getElementById("zegar10").style.backgroundImage = "url('cyferki/0.png')";
        document.getElementById("zegar11").style.backgroundImage = "url('cyferki/0.png')";
    }

    var zapiszStanZegara = function () {
        aktualnyCzas = "g:" + godziny + "m:" + minuty + "s:" + sekundy + "." + milisekundy100 + milisekundy010 + milisekundy001;

        var godz = godziny;
        var min = minuty;
        var sek = sekundy;
        var ms100 = milisekundy100;
        var ms010 = milisekundy010;
        var ms001 = milisekundy001;

        if (godz <= 9) {
            godz = "0" + godz;
        }
        if (min <= 9) {
            min = "0" + min
        }
        if (sek <= 9) {
            sek = "0" + sek;
        }

        aktualnyCzasSortuj = godz.toString() + min.toString() + sek.toString() + "." + ms100.toString() + ms010.toString() + ms001.toString();

        if (godziny != 0) {
            aktualnyCzas = godziny + "godz. " + minuty + "min " + sekundy + "." + milisekundy100 + milisekundy010 + milisekundy001 + "sek.";
        }
        else if (minuty != 0) {
            aktualnyCzas = minuty + "min " + sekundy + "." + milisekundy100 + milisekundy010 + milisekundy001 + "sek.";
        }
        else if (sekundy != 0) {
            aktualnyCzas = sekundy + "." + milisekundy100 + milisekundy010 + milisekundy001 + "sek.";
        }
        else {
            aktualnyCzas = milisekundy100 + milisekundy010 + milisekundy001 + "ms."
        }
    }

    var zegar = function (polecenie) {
        switch (polecenie) {
            case "start":
                timerMilisekundy001 = setInterval(function () {
                    milisekundy001++;
                    if (milisekundy001 > 9) {
                        milisekundy001 = 0
                    }
                    ;
                    var sMilisekundy = milisekundy001.toString();
                    document.getElementById("zegar11").style.backgroundImage = "url('cyferki/" + sMilisekundy[0] + ".png')";
                }, 1);
                timerMilisekundy010 = setInterval(function () {
                    milisekundy010++;
                    if (milisekundy010 > 9) {
                        milisekundy010 = 0
                    }
                    ;
                    var sMilisekundy = milisekundy010.toString();
                    document.getElementById("zegar10").style.backgroundImage = "url('cyferki/" + sMilisekundy[0] + ".png')";
                }, 10);
                timerMilisekundy100 = setInterval(function () {
                    milisekundy100++;
                    if (milisekundy100 > 9) {
                        milisekundy100 = 0
                    }
                    ;
                    var sMilisekundy = milisekundy100.toString();
                    document.getElementById("zegar9").style.backgroundImage = "url('cyferki/" + sMilisekundy[0] + ".png')";
                }, 100);
                timerSekundy = setInterval(function () {
                    sekundy++;
                    if (sekundy > 59) {
                        sekundy = 0
                    }
                    ;
                    var sSekundy = sekundy.toString()
                    //ZAMIENIAM NA FORMAT 00
                    if (sSekundy.length < 2) {
                        sSekundy = "0" + sSekundy;
                    }
                    //AKTUALIZUJE
                    document.getElementById("zegar6").style.backgroundImage = "url('cyferki/" + sSekundy[0] + ".png')";
                    document.getElementById("zegar7").style.backgroundImage = "url('cyferki/" + sSekundy[1] + ".png')";
                }, 1000);
                timerMinuty = setInterval(function () {
                    minuty++;
                    if (minuty > 59) {
                        minuty = 0
                    }
                    ;
                    var sMinuty = minuty.toString()
                    //ZAMIENIAM NA FORMAT 00
                    if (sMinuty.length < 2) {
                        sMinuty = "0" + sMinuty;
                    }
                    //AKTUALIZUJE
                    document.getElementById("zegar3").style.backgroundImage = "url('cyferki/" + sMinuty[0] + ".png')";
                    document.getElementById("zegar4").style.backgroundImage = "url('cyferki/" + sMinuty[1] + ".png')";
                }, 60000);
                timerGodziny = setInterval(function () {
                    godziny++;
                    if (godziny > 99) {
                        zegar("stop")
                    }
                    ;
                    var sGodziny = godziny.toString()
                    //ZAMIENIAM NA FORMAT 00
                    if (sGodziny.length < 2) {
                        sGodziny = "0" + sGodziny;
                    }
                    //AKTUALIZUJE
                    document.getElementById("zegar0").style.backgroundImage = "url('cyferki/" + sGodziny[0] + ".png')";
                    document.getElementById("zegar1").style.backgroundImage = "url('cyferki/" + sGodziny[1] + ".png')";
                }, 3600000);
                break;

            case "stop":
                clearInterval(timerMilisekundy001);
                clearInterval(timerMilisekundy010);
                clearInterval(timerMilisekundy100);
                clearInterval(timerSekundy);
                clearInterval(timerMinuty);
                clearInterval(timerGodziny);
                break;

            case "stworz":
                stworzZegar();
                break;

            case "zapiszStanZegara":
                zapiszStanZegara();
                break;

            case "podajczas":
                return aktualnyCzas;

            case "czasSortuj":
                var qq = aktualnyCzasSortuj;
                qq = parseFloat(qq)
                return qq;
        }
    }

    /*=======================================================================================================*/
    var przesuwanieElementow = function (x, y, tablica) {
        var ostatni = tablica.length
        ostatni = ostatni * ostatni - 1

        var czyMoznaZamienic = false;
        var jakZamienic;

        x = parseInt(x);
        y = parseInt(y);

        //SPRAWDZAM DO GÓRY
        if (x > 0 && tablica[x - 1][y].getAttribute("poprawnakolejnosc") == ostatni) {
            czyMoznaZamienic = true;
            jakZamienic = "gora";
        }
        //SPRAWDZAM NA DÓŁ
        else if (x < tablica.length - 1 && tablica[x + 1][y].getAttribute("poprawnakolejnosc") == ostatni) {
            czyMoznaZamienic = true;
            jakZamienic = "dol";
        }
        //SPRAWDZAM W LEWO
        else if (y > 0 && tablica[x][y - 1].getAttribute("poprawnakolejnosc") == ostatni) {
            czyMoznaZamienic = true;
            jakZamienic = "lewo";
        }
        //SPRAWDZAM W PRAWO
        else if (y < tablica.length - 1 && tablica[x][y + 1].getAttribute("poprawnakolejnosc") == ostatni) {
            czyMoznaZamienic = true;
            jakZamienic = "prawo";
        }

        //ZAMIENIAM JEZELI MOZNA
        if (czyMoznaZamienic) {
            switch (jakZamienic) {
                case "gora":
                    tablica[x][y].setAttribute("x", (x - 1));
                    tablica[x - 1][y].setAttribute("x", x);
                    var pom = tablica[x][y];
                    tablica[x][y] = tablica[x - 1][y];
                    tablica[x - 1][y] = pom;
                    break;
                case "dol":
                    tablica[x][y].setAttribute("x", (x + 1));
                    tablica[x + 1][y].setAttribute("x", x);
                    var pom = tablica[x][y];
                    tablica[x][y] = tablica[x + 1][y];
                    tablica[x + 1][y] = pom;
                    break;
                case "lewo":
                    tablica[x][y].setAttribute("y", (y - 1));
                    tablica[x][y - 1].setAttribute("y", y);
                    var pom = tablica[x][y];
                    tablica[x][y] = tablica[x][y - 1];
                    tablica[x][y - 1] = pom;
                    break;
                case "prawo":
                    tablica[x][y].setAttribute("y", (y + 1));
                    tablica[x][y + 1].setAttribute("y", y);
                    var pom = tablica[x][y];
                    tablica[x][y] = tablica[x][y + 1];
                    tablica[x][y + 1] = pom;
                    break;
            }
            wyslietlanieElementow(tablica);
            if (sprawdzanieKolejnosci(tablica)) {
                wygraj();
            }
            ;
        }
    }

    window.wygraj = function () {
        zegar("stop");
        setTimeout(function () {
            komunikat.style.display = "block";
            zegar("zapiszStanZegara");
            zapisTop10();
            spkomunikat.innerHTML = "Brawo, udało ci się!<br/>W czasie: " + aktualnyCzas;
            spkomunikat.appendChild(resetPrzycisk);
        }, 100)
    }


    /*=======================================================================================================*/
    var sprawdzanieKolejnosci = function (tablica) {
        var czyKolejnoscJestDobra = true;
        var licznik = 0;

        for (var i = 0; i < tablica.length; i++) {
            for (var j = 0; j < tablica.length; j++) {
                if (tablica[i][j].getAttribute("poprawnakolejnosc") != licznik) {
                    czyKolejnoscJestDobra = false;
                    break;
                }
                licznik++;
            }
        }
        return (czyKolejnoscJestDobra);
    }
    /*=======================================================================================================*/
    var wyslietlanieElementow = function (tablica) {
        planszaDoGry.innerHTML = "";
        for (var i = 0; i < tablica.length; i++) {
            for (var j = 0; j < tablica.length; j++) {
                tablica[i][j].setAttribute("x", i);
                tablica[i][j].setAttribute("y", j);
                planszaDoGry.appendChild(tablica[i][j])
            }
        }
        //console.log(sprawdzanieKolejnosci(tablica));
    }
    /*=======================================================================================================*/
    var czyJuzSieWymieszalo = true;
    var mieszanieElementow = function (tablica) {
        czyJuzSieWymieszalo = false;
        var xBialy = parseInt(tablica.length - 1);
        var yBialy = xBialy;

        var xpop = xBialy;
        var ypop = yBialy;

        var licznik = 0,
            interval = setInterval(function () {

                var x1 = xBialy;
                var y1 = yBialy;

                var doKturejWspolrzednejDodajemy = Math.floor((Math.random() * 2) + 1) //1-X, 2-Y;
                if (doKturejWspolrzednejDodajemy == "1" && x1 + 1 == xpop || x1 - 1 == xpop) {
                    doKturejWspolrzednejDodajemy = 2;
                }
                if (doKturejWspolrzednejDodajemy == "2" && y1 + 1 == ypop || y1 - 1 == ypop) {
                    doKturejWspolrzednejDodajemy = 1;
                }

                if (doKturejWspolrzednejDodajemy == "1") {
                    var czyPoprawnaWartosc = false;
                    while (czyPoprawnaWartosc == false) {
                        var przesuniecie = Math.floor((Math.random() * 2) + 1);
                        if (przesuniecie == "1") {
                            przesuniecie = -1
                        }
                        else {
                            przesuniecie = 1
                        }
                        if (x1 + przesuniecie < tablica.length && x1 + przesuniecie >= 0) {
                            czyPoprawnaWartosc = true;
                        }
                    }
                    x1 += przesuniecie;
                }
                else {
                    var czyPoprawnaWartosc = false;
                    while (czyPoprawnaWartosc == false) {
                        var przesuniecie = Math.floor((Math.random() * 2) + 1);
                        if (przesuniecie == "1") {
                            przesuniecie = -1
                        }
                        else {
                            przesuniecie = 1
                        }
                        if (y1 + przesuniecie < tablica.length && y1 + przesuniecie >= 0 && y1 + przesuniecie != ypop) {
                            czyPoprawnaWartosc = true;
                        }
                    }
                    y1 += przesuniecie;
                }

                xpop = xBialy;
                ypop = yBialy;

                var pom = tablica[x1][y1];
                tablica[x1][y1] = tablica[xBialy][yBialy];
                tablica[xBialy][yBialy] = pom;

                xBialy = x1;
                yBialy = y1;

                wyslietlanieElementow(tablica);

                //SPRAWDZAM CZY JUŻ SIĘ WYMIESZAŁO
                if (++licznik == tablica.length * tablica.length * 10) {
                    czyJuzSieWymieszalo = true;
                    zegar("start");
                    clearInterval(interval);
                }
            }, 40) //TU MOŻNA ZMIENIAĆ PRĘDKOŚĆ ROZKŁADANIA
    }
    /*=======================================================================================================*/
    var tnijObrazy = function (ile) {

        var tablica = new Array(ile)
        tablica[0] = new Array(ile)

        //WYPEŁNIAM TABLICE ZERAMI
        for (i = 0; i < ile; i++) {
            tablica[i] = []
            for (j = 0; j < ile; j++) tablica[i][j] = 0;
        }

        var licznik = 0;
        for (var i = 0; i < ile; i++) {
            for (var j = 0; j < ile; j++) {
                var div2 = document.createElement("div");
                div2.className = "bloczki";
                if (i == ile - 1 && j == ile - 1) {
                    div2.style.backgroundColor = "white";
                }
                else {
                    div2.style.backgroundImage = obecnyObrazekDoUkladania;
                    div2.style.backgroundPosition = (parseInt(-1 * j * szerokoscObrazka / ile) + "px " + parseInt(-1 * i * szerokoscObrazka / ile) + "px");
                }
                div2.style.width = (szerokoscObrazka / ile) + "px"
                div2.style.height = (szerokoscObrazka / ile) + "px"
                div2.setAttribute("poprawnakolejnosc", licznik);
                licznik++;
                tablica[i][j] = div2;

                div2.onclick = function () {
                    var x = this.getAttribute("x");
                    var y = this.getAttribute("y");
                    przesuwanieElementow(x, y, tablica);
                }
            }
        }

        mieszanieElementow(tablica);
    }
    /*=======================================================================================================*/
    var aktualnyRozmiarPlanszy;

    var generowaniePrzyciskow = function () {
        for (var i = 3; i <= 6; i++) {
            var przycisk = document.createElement("button");
            przycisk.innerHTML = i + "x" + i;
            przycisk.onclick = function () {
                if (czyJuzSieWymieszalo) {
                    tnijObrazy(this.innerHTML[0]);
                    zegar("stop");
                    zegar("stworz");
                    aktualnyRozmiarPlanszy = this.innerHTML[0];
                }
                else {
                    komunikat2.style.display = "block";
                }
            }

            div.appendChild(przycisk);
        }
    }
    /*=======================================================================================================*/
    generowaniePrzyciskow();
    zegar("stworz");
    /*=======================================================================================================*/
}