window.onload=function(){

    var makeEl=function(co,id,klasa){
        var element = document.createElement(co);
        if(id){element.id=id};
        if(klasa){element.setAttribute("class", klasa)}
        return element;
    };
    
    //POJEMNIK NA WSZYSTKIE ELEMENTY
    var pojemnik = makeEl("div", "pojemnik");
    document.body.appendChild(pojemnik);
    
    //NAPIS GDZIE JESTEM
    var gdzieJestem = makeEl("h1", "obcenaLokacjaNapis");
    gdzieJestem.innerHTML = "You are in"
    pojemnik.appendChild(gdzieJestem);
    
    //OBRAZEK Z OBECNĄ LOKACJĄ
    var pojemnikZObrazek=makeEl("div","obcenaLokacjaPojemnik")
    var obecnaLokalizacjaObraz=makeEl("div","obcenaLokacjaObraz");
    var nowaObecnaLokalizacjaObraz=makeEl("div","nowaObecnaLokalizacjaObraz");
    pojemnikZObrazek.appendChild(obecnaLokalizacjaObraz);
    pojemnikZObrazek.appendChild(nowaObecnaLokalizacjaObraz);
    pojemnik.appendChild(pojemnikZObrazek);
    
    //OBRAZEK Z KOMPASEM
    var div=makeEl("div","kompas");
    var h1=makeEl("h1","kompasN","literkaKompasu"); div.appendChild(h1);
    var h1=makeEl("h1","kompasS","literkaKompasu"); div.appendChild(h1);
    var h1=makeEl("h1","kompasE","literkaKompasu"); div.appendChild(h1);
    var h1=makeEl("h1","kompasW","literkaKompasu"); div.appendChild(h1);
    pojemnik.appendChild(div);
    
    //NAPIS W KTÓRYM KIERUNKU MOGĘ IŚĆ
    var wKtorymKierunkuMogeIsc = makeEl("h1", "wKtorymKierunkuMogeIsc", "napisyInformacyjne");
    wKtorymKierunkuMogeIsc.innerHTML = "You can go";
    pojemnik.appendChild(wKtorymKierunkuMogeIsc);
    
    //NAPIS CO WIDZĘ
    var h1 = makeEl("h1", "coWidze", "napisyInformacyjne");
    h1.innerHTML = "You can see"
    pojemnik.appendChild(h1);
    
    //NAPIS CO MAM ZE SOBĄ
    var h1 = makeEl("h1", "coMamZeSoba", "napisyInformacyjne");
    h1.innerHTML="You are carring"
    pojemnik.appendChild(h1);
    
    //NAPIS CO TERAZ?
    var h1 = makeEl("h1", "coTerazNapis");
    h1.innerHTML="What now?"
    pojemnik.appendChild(h1);
    
    //INPUT CO TERAZ?
    var inputRozmiar=makeEl("span","inputRozmiar");
    var input = makeEl("input", "coTerazInput");
    input.setAttribute("maxlength", "15");
    input.setAttribute("type", "text");
    input.autofocus = true;
    nieWychodzZInputa(input);
    czytajWartoscInputa(input);
    inputRozmiar.appendChild(input)
    pojemnik.appendChild(inputRozmiar);
    var duplikat=makeEl("span","duplikuj");
    inputRozmiar.appendChild(duplikat);
    dzialanieKursora(input,duplikat);
    
    //KURSOR
    var kursor=makeEl("div","kursor");
    pojemnik.appendChild(kursor);
    
    //CZOŁÓWKA
    var czolowkaTlo = makeEl("div", "czolowkaTlo");
    pojemnik.appendChild(czolowkaTlo);
    var czolowkaImg = makeEl("div", "czolowkaImg");
    pojemnik.appendChild(czolowkaImg);
    
    //GRAFIKA PO WYGRANEJ
    var grafikaPoWygranej=makeEl("div","wygrales")
    grafikaPoWygranej.onclick=function(){
        location.reload();
    }
    pojemnik.appendChild(grafikaPoWygranej);
    
    //ZAMYKA NAM DUŻE KOMUNIKATY
    zamknijDuzyKomunikat(document.body);
    
    //WCZYTUJE WSZYSTKIE INFORMACJE
    aktualizowanieInformacjiNaEkranie();

    //URUCHAMIAM CZOŁÓWKE
    poczatekGry();
    
}