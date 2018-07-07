/*==================================================================================================*/
var nieWychodzZInputa=function(input){
    input.onblur=function(){
        this.focus();
    }
    input.addEventListener("keydown",function(e){
		if(e.which==9||e.key=="Tab"){
            e.preventDefault()
        }
	},false);
};
/*==================================================================================================*/
var dodajDoStringa = function (index, string, nowaWartosc) {
    return string.slice(0, index) + nowaWartosc +string.slice(index+1,string.length)
}
var capsLockWcisniety = true;
var bierzacaWartoscInputa = undefined;
var dzialanieKursora = function (input, span) {
    input.addEventListener('keydown', function (e) {
        console.log(event.which)
        if (input.value == " ") {
            input.value = "";
        }
        if (event.which == 13) {
            catchById("kursor").innerHTML = "";
            bierzacaWartoscInputa = undefined
        }
        if (event.which == 20) {
            capsLockWcisniety = !capsLockWcisniety;
        }
        if (event.which != 37 && event.which != 39 && event.which != 8 && event.which != 46 && event.which != 32 && event.which != 20&&event.which != 13) {
            if (catchById("kursor").innerHTML == "") {
                var wartosc;
                setTimeout(function () { wartosc = input.value }, 0.1);
                setTimeout(function () {
                    if (capsLockWcisniety) {
                        input.value = wartosc.slice(0,wartosc.length-1)+wartosc[wartosc.length-1].toUpperCase();
                        span.innerHTML = input.value;
                        console.log(input.value);
                        bierzacaWartoscInputa = input.value;
                    }
                    else {
                        input.value = wartosc.slice(0, wartosc.length - 1) + wartosc[wartosc.length - 1].toLowerCase();
                        span.innerHTML = input.value;
                        console.log(input.value);
                        bierzacaWartoscInputa = input.value;
                    }
                }, 0.2);
            }
            else if (event.which != 32 && event.which != 38 && event.which != 40 && event.which != 9 && event.which != 20) {
                var wcisciety = String.fromCharCode(e.which)
                var zaznaczona = catchById("kursor").innerHTML;
                if (zaznaczona == zaznaczona.toLowerCase()) {
                    wcisciety = wcisciety.toLowerCase();
                }
                var poczatek = span.innerHTML + wcisciety;
                var koniec = bierzacaWartoscInputa.slice(poczatek.length, bierzacaWartoscInputa.length);
                setTimeout(function () {
                    input.value = span.innerHTML +" " + koniec;
                    bierzacaWartoscInputa = poczatek+koniec;
                }, 0.1);
                catchById("kursor").innerHTML = wcisciety;
            }
        }
        if (event.which == 32) {
            setTimeout(function () {
                input.value = input.value.slice(0, input.value.length - 1);
            }, 0.1)
        }
        var zaznaczonaLiterka;
        var aktualizujKursor = function () {
            if (zaznaczonaLiterka) {
                catchById("kursor").innerHTML = zaznaczonaLiterka;
            }
            else {
                catchById("kursor").innerHTML = "";
            }
        }
        if (event.which == 37) {
            var obWartoscSpan = span.innerHTML;
            var nowaWartoscSpan = obWartoscSpan.slice(0, obWartoscSpan.length - 1);
            span.innerHTML = nowaWartoscSpan;
            zaznaczonaLiterka = bierzacaWartoscInputa[nowaWartoscSpan.length];
            if (zaznaczonaLiterka) {
                aktualizujKursor();
            }
            var qq = bierzacaWartoscInputa;
            qq = dodajDoStringa(nowaWartoscSpan.length, qq, " ");
            input.value = qq;
            aktualizujKursor();
        }
        if (event.which == 39) {
            var nowaWartosc = bierzacaWartoscInputa.slice(0, span.innerHTML.length+1);
            if (nowaWartosc.length <= bierzacaWartoscInputa.length) {
                var qq = bierzacaWartoscInputa;
                span.innerHTML = nowaWartosc;
                zaznaczonaLiterka = bierzacaWartoscInputa[nowaWartosc.length];
                qq = dodajDoStringa(nowaWartosc.length, qq, " ");
                input.value = qq;
                aktualizujKursor();
            }
        }

        if (event.which == 8) {
            setTimeout(function () {
                if (catchById("kursor").innerHTML == "") {
                    span.innerHTML = span.innerHTML.slice(0, span.innerHTML.length - 1);
                    console.log(span.innerHTML);
                    setTimeout(function () {
                        bierzacaWartoscInputa = span.innerHTML;
                        input.value = span.innerHTML;
                    }, 0.1)
                }
                else {
                    var poczatek = span.innerHTML.slice(0, span.innerHTML.length - 1);
                    zaznaczonaLiterka = span.innerHTML[span.innerHTML.length-1];
                    console.log(zaznaczonaLiterka);
                    var koniec = bierzacaWartoscInputa.slice(poczatek.length+1, bierzacaWartoscInputa.length);
                    setTimeout(function () {
                        input.value = poczatek + koniec;
                        span.innerHTML = span.innerHTML.slice(0, span.innerHTML.length - 1);
                        bierzacaWartoscInputa = poczatek + koniec;
                        var obWartoscSpan = span.innerHTML;
                        var nowaWartoscSpan = obWartoscSpan.slice(0, obWartoscSpan.length);
                        span.innerHTML = nowaWartoscSpan;
                        zaznaczonaLiterka = bierzacaWartoscInputa[nowaWartoscSpan.length];
                        if (zaznaczonaLiterka) {
                            aktualizujKursor();
                        }
                        var qq = bierzacaWartoscInputa;
                        qq = dodajDoStringa(nowaWartoscSpan.length, qq, " ");
                        input.value = qq;
                        aktualizujKursor();
                    }, 0.1);
                }
                
            }, 0.1)
        }

        if (event.which == 46) {
            var poczatek = span.innerHTML + catchById("kursor").innerHTML;
            zaznaczonaLiterka = catchById("kursor").innerHTML;
            var koniec = bierzacaWartoscInputa.slice(poczatek.length+1, bierzacaWartoscInputa.length);
            console.log(poczatek + ";" + koniec);
            setTimeout(function () {
                input.value = poczatek + koniec;
                span.innerHTML = span.innerHTML.slice(0, poczatek.length);
                bierzacaWartoscInputa = poczatek + koniec;
                var nowaWartosc = bierzacaWartoscInputa.slice(0, span.innerHTML.length);
                if (nowaWartosc.length <= bierzacaWartoscInputa.length) {
                    var qq = bierzacaWartoscInputa;
                    span.innerHTML = nowaWartosc;
                    zaznaczonaLiterka = bierzacaWartoscInputa[nowaWartosc.length];
                    qq = dodajDoStringa(nowaWartosc.length, qq, " ");
                    input.value = qq;
                    aktualizujKursor();
                }
            }, 0.1);
        }

    }, false)
    input.addEventListener('change', function() {
        span.innerHTML = input.value
    }, false)
}
/*==================================================================================================*/
var wJakimKierunkuIde="";
var przejdzWWybranymKierunku=function(kierunek){
    //SPRAWDZAM CZY MOŻNA IŚĆ W DANYM KIERUNKU
    var gdzieMoznaIscZObecnejLokalizacji=mapa[postac.lokalizacja.x][postac.lokalizacja.y].wKtorymKierunkuMogeIsc
    gdzieMoznaIscZObecnejLokalizacji = gdzieMoznaIscZObecnejLokalizacji.split(" ");
            
    var czyMogeTamIsc=false;
    for(i=0;i<gdzieMoznaIscZObecnejLokalizacji.length;i++){
        if(gdzieMoznaIscZObecnejLokalizacji[i]==kierunek){
            czyMogeTamIsc=true;
            break;
        }
    }
    
    //SPRAWDZAM CZY POSTAĆ CHCE PRZEJŚĆ DO KRULA BEZ BUCIKÓW
    var czyChcialesPrzejscBezButow=false;
    if(
        postac.lokalizacja.x==1&&
        postac.lokalizacja.y==3&&
        kierunek=="W"&&
        postac.czyMaBuciki==false
    ){
        czyMogeTamIsc=false;
        czyChcialesPrzejscBezButow=true;
        wyswietlKomunikat(["You can't go that way...","The dragon sleeps in a cave!"],2000)
    }
    
    //I JEŻELI MOGE TO IDE
    if(czyMogeTamIsc){
        switch (kierunek){
            case "N":
                wJakimKierunkuIde="north";
                postac.lokalizacja.y--;
                break;
            case "S":
                wJakimKierunkuIde="south";
                postac.lokalizacja.y++;
                break;
            case "E":
                wJakimKierunkuIde="east";
                postac.lokalizacja.x++;
                break;
            case "W":
                wJakimKierunkuIde="west";
                postac.lokalizacja.x--;
                break;
        }
        aktualizowanieInformacjiNaEkranie();
    }
    
    else if(!czyChcialesPrzejscBezButow){
        wyswietlKomunikat("You can't go that way");
    }
}
/*==================================================================================================*/
var zabierzPrzedmiot=function(nazwaPrzdmiotu){
    var tablicaPrzedmiotowNaLokalizacji=mapa[postac.lokalizacja.x][postac.lokalizacja.y].dostepnePrzedmioty
    
    //SPRAWDZAM CZY JEST TAKI PRZEDMIOT NA TEJ LOKALIZACJI
    var czyJestTakiPrzedmiot=false;
    var indexPrzedmiotu;
    for(i=0;i<tablicaPrzedmiotowNaLokalizacji.length;i++){
        if(nazwaPrzdmiotu==tablicaPrzedmiotowNaLokalizacji[i].nazwaPrzedmiotu){
            czyJestTakiPrzedmiot=true;
            indexPrzedmiotu=i;
            break;
        }
    }
    if(czyJestTakiPrzedmiot==false){
        wyswietlKomunikat("There isn't anything like that here", 2000);
    }
    
    //SPRAWDZAM CZY FLAGA PRZEDMIOTO NIE JEST CZASEM RÓWNA 0
    var czyMogePodniescPrzedmiot=true;
    if(czyJestTakiPrzedmiot&&tablicaPrzedmiotowNaLokalizacji[indexPrzedmiotu].flaga=="0"){
        czyMogePodniescPrzedmiot=false;
        wyswietlKomunikat("You can't carry it", 2000)
    }
    
    //SPRAWDZAM CZY NIE PRZEKROCZE TEGO ILE POSTAC MOŻE NIEŚĆ
    if(
        czyJestTakiPrzedmiot&&
        czyMogePodniescPrzedmiot&&
        postac.posiadanePrzedmioty.length==postac.maxPosiadanychPrzedmiotow
    )
    {
        wyswietlKomunikat("You are carrying something", 2000);
        czyMogePodniescPrzedmiot=false;
    }
    
    //JEZELI WSZYSTKO JEST OK ZABIERAM ZE SOBA
    if(czyJestTakiPrzedmiot&&czyMogePodniescPrzedmiot){
        //DODAJE GO DO EKWIPUKU POSTACI
        postac.posiadanePrzedmioty.push(tablicaPrzedmiotowNaLokalizacji[indexPrzedmiotu])
        
        //USUWAM Z LOKALIZACJI
        tablicaPrzedmiotowNaLokalizacji.splice(indexPrzedmiotu, 1);
        
        //AKTUALIZUJE CO WIDZE I CO MAM ZE SOBA
        var iOstatnioDodany=postac.posiadanePrzedmioty.length-1;
        var coZabralemZeSoba="You are taking "+postac.posiadanePrzedmioty[iOstatnioDodany].przedmiotWOdmianie
        wyswietlKomunikat(coZabralemZeSoba, 2000)
        coWidzeICoMamZeSoba()
    }
}
/*==================================================================================================*/
var upuscPrzedmiot=function(przedmiot){
    //SPRAWDZAM CZY MOJA POSTAĆ MA COŚ W RĘKACH
    var czyPostacMaCosWRekach=true;
    if(postac.posiadanePrzedmioty.length==0){
        czyPostacMaCosWRekach=false;
        wyswietlKomunikat("You are not carrying anything", 2000);
    }
    
    //SPRAWDAM CZY ILOŚĆ PRZEDMIOTÓW Z FLAGA 1 NA LOKALIZACJI NIE PRZEKRACZA 3
    var czyIloscPrzedmiotowNaLokalizacjiNiePrzekracza3=true;
    var iloscPrzedmiotowZFlaga1=0;
    for(i=0;i<mapa[postac.lokalizacja.x][postac.lokalizacja.y].dostepnePrzedmioty.length;i++){
        if(mapa[postac.lokalizacja.x][postac.lokalizacja.y].dostepnePrzedmioty[i].flaga=="1"){
            iloscPrzedmiotowZFlaga1++;
        }
    }
    if(czyPostacMaCosWRekach&&iloscPrzedmiotowZFlaga1==3){
        czyIloscPrzedmiotowNaLokalizacjiNiePrzekracza3=false;
        wyswietlKomunikat("You can't store any more here", 2000)
    }
    
    //SPRAWDZAM CZY POSTAĆ MA TAKI PRZEDMIOT
    var czyPostacMaTakiPrzedmiot=false;
    var indeks;
    for(i=0;i<postac.posiadanePrzedmioty.length;i++){
        if(postac.posiadanePrzedmioty[i].nazwaPrzedmiotu==przedmiot){
            czyPostacMaTakiPrzedmiot=true;
            indeks=i;
            break;
        }
    }
    if(czyPostacMaCosWRekach&&!czyPostacMaTakiPrzedmiot){
        wyswietlKomunikat("You are not carrying it", 2000)
    }
    
    //JEŻELI WSZYZSTKO JEST OK ODKŁADAM PRZEDMIOT NA LOKALIZACJI
    if(czyPostacMaCosWRekach&&czyIloscPrzedmiotowNaLokalizacjiNiePrzekracza3&&czyPostacMaTakiPrzedmiot){
        //DODAJE PRZEDMIOT NA LOKALIZACJE
        mapa[postac.lokalizacja.x][postac.lokalizacja.y].dostepnePrzedmioty.push(postac.posiadanePrzedmioty[indeks])
        
        var upuszczanyPrzedmiot=postac.posiadanePrzedmioty[indeks].przedmiotWOdmianie
        
        //USUWAM GO Z POSIADAMYCH PRZEDMIOTOW POSTACI
        postac.posiadanePrzedmioty.splice(indeks,1);
        
        //WYŚWIETLAM KOMUNIKAT
        wyswietlKomunikat("You are about to drop "+upuszczanyPrzedmiot, 2000)
        
        //ODŚWIEŻAM INFORMACJE
        coWidzeICoMamZeSoba();
    }
}
/*==================================================================================================*/
var uzyjPrzedmiotu=function(jakiPrzedmiotChceUzyc){
    //CZY POSIADAMY JAKIKOLWIEK PRZEDMIOT
    var czyCosMamy=true;
    if(postac.posiadanePrzedmioty.length==0){
        czyCosMamy=false;
        wyswietlKomunikat("You are carrying nothing", 2000)
    }
    
    //CZY MAMY PRZEDMIOT KTORY CHCEMU UZYC
    var czyPosiadamyTakiPrzedmiot=false;
    var indeks=0;
    if(czyCosMamy){
        for(i=0;i<postac.posiadanePrzedmioty.length;i++){
            if(postac.posiadanePrzedmioty[i].nazwaPrzedmiotu==jakiPrzedmiotChceUzyc){
                czyPosiadamyTakiPrzedmiot=true;
                indeks=i;
                break;
            }
        }
    }
    if(czyCosMamy&&!czyPosiadamyTakiPrzedmiot){
        wyswietlKomunikat("You aren't carrying anything like that", 2000)
    }
    
    //SPRAWDZAM CZY UZYWAM PRZEDMIOTU WE WLASCIWEJ LOKALIZACJI
    var czyWlasciwaLokalizacja=true;
    if(
        czyCosMamy&&
        czyPosiadamyTakiPrzedmiot&&
        zaleznosci[postac.posiadanePrzedmioty[indeks].idPrzedmiotu].lokacja.x!=postac.lokalizacja.x||
        zaleznosci[postac.posiadanePrzedmioty[indeks].idPrzedmiotu].lokacja.y!=postac.lokalizacja.y
      )
        {
            czyWlasciwaLokalizacja=false;
            wyswietlKomunikat("Nothing happend", 2000)
        }
    
    //JEŻELI WSZYSTKO JEST OK UZYWAM PRZEDMIOTU
    if(czyCosMamy&&czyPosiadamyTakiPrzedmiot&&czyWlasciwaLokalizacja){
        
        var wynikUzycia=zaleznosci[postac.posiadanePrzedmioty[indeks].idPrzedmiotu].wynikUzycia
        //SPRAWDZAM CZY ZABILEM SMOKA
        if(wynikUzycia==30){
            postac.czyZabilSmoka=true;
            mapa[postac.lokalizacja.x][postac.lokalizacja.y].zrodloZdjecia="url(img/martwy.bmp)";
            aktualizujObrazek();
        }
        if(wynikUzycia!=34||wynikUzycia==34&&postac.czyZabilSmoka){
            //WYŚWIETLIC KOMUNIKAT ODPOWIEDNI
            var komunikatDoWyswietlenia=zaleznosci[postac.posiadanePrzedmioty[indeks].idPrzedmiotu].komunikat
            komunikatDoWyswietlenia=komunikatDoWyswietlenia.split(";")
            wyswietlKomunikat(komunikatDoWyswietlenia,2000);

            //NOWY PRZEDMIOT TRAFIA DO REKI
            postac.posiadanePrzedmioty.push(spisPrzedmiotow[wynikUzycia])

            //UZYTY PRZEDMIOT ZNIKA Z RAK
            postac.posiadanePrzedmioty.splice(indeks, 1);

            //JEŻELI OTRZYMAŁEM PRZEDMIOT Z FLAGA 0 ZOSTAWIAM GO NA LOKACJI
            var rozmiar=postac.posiadanePrzedmioty.length-1;
            if(postac.posiadanePrzedmioty[rozmiar].flaga=="0"){
                mapa[postac.lokalizacja.x][postac.lokalizacja.y].dostepnePrzedmioty.push(postac.posiadanePrzedmioty[rozmiar])
                postac.posiadanePrzedmioty.splice(rozmiar,1);
            }
        }
        else{wyswietlKomunikat("Nothing happend")}
        
        //JEŻELI KONIEC GRY
        if(wynikUzycia==36){
            setTimeout(function() {
                catchById("wygrales").style.display="block"   
            }, 2100);
        }
        //ODBLOKOWUJE PRZEJŚCIE PO ZROBIENIU BUTOW
        if(wynikUzycia==35){
            postac.czyMaBuciki=true;
        }
        if(!(postac.czyZebranoWszystkieCzesciOwcy)){
            //SPRAWDZAM CZY NA LOKACJI SA WSZYSTKIE CZESCI OWCY
            var iloscPrzedmiotowZFlaga0=0;
            for(i=0;i<mapa[postac.lokalizacja.x][postac.lokalizacja.y].dostepnePrzedmioty.length;i++){
                if(mapa[postac.lokalizacja.x][postac.lokalizacja.y].dostepnePrzedmioty[i].flaga=="0"){
                    iloscPrzedmiotowZFlaga0++;
                }
            }

            //JEŻELI WSZYSTKO CO POTRZEBA DO OWCY JEST GOTOWE
            if(iloscPrzedmiotowZFlaga0==6){
                //USUWAM WSZYSKTKIE PRZEDMIOTY NA TEJ LOKALIZACJI Z FLAGA 0
                for(i=mapa[postac.lokalizacja.x][postac.lokalizacja.y].dostepnePrzedmioty.length-1;i>=0;i--){
                    if(mapa[postac.lokalizacja.x][postac.lokalizacja.y].dostepnePrzedmioty[i].flaga=="0"){
                        mapa[postac.lokalizacja.x][postac.lokalizacja.y].dostepnePrzedmioty.splice(i, 1);
                    }
                }

                //POSTAĆ OTRZYMUJE OWCE
                postac.posiadanePrzedmioty.push(spisPrzedmiotow[37])
                setTimeout(function() { 
                    wyswietlKomunikat("Your fake sheep is full of poison and ready to be eaten by the dragon", 2000)
                }, 2050);
                postac.czyZebranoWszystkieCzesciOwcy=true;
            }
        }
        //ODŚWIEŻAM INFORMACJE
        coWidzeICoMamZeSoba();
    }
}
/*==================================================================================================*/
var czyInputZablokowany=false;
var czytajWartoscInputa=function(input){
    input.addEventListener("keydown",function(e){
        if((e.which==13||e.key=="Enter")&&!czyInputZablokowany){
            var polecenie = bierzacaWartoscInputa;
            var polecenieDuzeLitery=polecenie.toUpperCase();
            
            //PRZEMIESZCZANIE PO MAPIE
            if(
                polecenieDuzeLitery=="N"|| polecenieDuzeLitery=="NORTH"||
                polecenieDuzeLitery=="S"||polecenieDuzeLitery=="SOUTH"||
                polecenieDuzeLitery=="E"||polecenieDuzeLitery=="EASR"||
                polecenieDuzeLitery=="W"||polecenieDuzeLitery=="WEST"
            )
            {
                przejdzWWybranymKierunku(polecenieDuzeLitery[0]);
            }
            
            //WEŹ PRZEDMIOT
            else if(polecenieDuzeLitery.slice(0,4)=="TAKE"){zabierzPrzedmiot(polecenie.slice(5,polecenie.length))}
            
            //UPUŚĆ PRZEDMIOT
            else if(polecenieDuzeLitery.slice(0,4)=="DROP"){upuscPrzedmiot(polecenie.slice(5,polecenie.length))}
            
            //UPUŚĆ PRZEDMIOT
            else if(polecenieDuzeLitery.slice(0,3)=="USE"){uzyjPrzedmiotu(polecenie.slice(4,polecenie.length))}
            
            //VOLABULARY
            else if (polecenieDuzeLitery == "V" || polecenieDuzeLitery == "VOCABULARY") {
                wyswietlDuzyKomunikat(vocabulary)
            }
            
            //GOSSIPS
            else if (polecenieDuzeLitery == "G" || polecenieDuzeLitery == "GOSSIPS") {
                wyswietlDuzyKomunikat(gossips)
            }
            
            //NIE ZNALEZIONO POLECENIA
            else(wyswietlKomunikat("Try another word or V for vocabulary",2000))
        }
        
    },false);
};
/*==================================================================================================*/