/*==================================================================================================*/
var vocabulary="NORTH or N, SOUTH or S<br/>"+
		"WEST or W, EAST or E<br/>"+
		"TAKE (object) or T (object)<br/>"+
		"DROP (object) or D (object)<br/>"+
		"USE (object) or U (object)<br/>"+
		"GOSSIPS or G, VOCABULARY or V<br/>"+
		"Press any key";

var gossips="<p>The  woodcutter lost  his home key..."+
		" The butcher likes fruit... The cooper"+
		" is greedy... Dratewka plans to make a"+
		" poisoned  bait for the dragon...  The"+
		" tavern owner is buying food  from the"+
		" pickers... Making a rag from a bag...</p><br/>"+
		"Press any key"
/*==================================================================================================*/
var zamknijDuzyKomunikat=function(elementBody){
    elementBody.addEventListener("keydown",function(e){   
        if(czyDuzyKomunikatWyswietlony){
            czyDuzyKomunikatWyswietlony=false;
            czyInputZablokowany=false;
            catchById("wKtorymKierunkuMogeIsc").style.display="block";
            catchById("coWidze").style.display="block";
            catchById("coMamZeSoba").style.display="block";
            catchById("coTerazNapis").style.width="auto";
            catchById("coTerazInput").style.display="inline-block";
            catchById("coTerazInput").value="";
            catchById("coTerazNapis").innerHTML="What now?";
            catchById("inputRozmiar").style.display="";
            catchById("duplikuj").innerHTML="";
            catchById("kursor").style.display="inline-block";
            catchById("coTerazInput").focus();
        }

    },false);
}
/*==================================================================================================*/
var czyDuzyKomunikatWyswietlony=false;
var wyswietlDuzyKomunikat=function(tresc){
    czyInputZablokowany=true;
    //czyDuzyKomunikatWyswietlony=true
    setTimeout(function(){ czyDuzyKomunikatWyswietlony=true; }, 1);
    
    //USUWAM TYMCZASOWO ELEMENTY
    catchById("wKtorymKierunkuMogeIsc").style.display="none";
    catchById("coWidze").style.display="none";
    catchById("coMamZeSoba").style.display="none";
    catchById("coTerazInput").style.display="none";
    catchById("inputRozmiar").style.display="none";
    catchById("kursor").style.display="none";
    
    //WYŚWIETLAM
    catchById("coTerazNapis").style.width="100%";
    catchById("coTerazNapis").innerHTML=tresc;
    
}
/*==================================================================================================*/
var wyswietlKomunikat=function(tresc, czasWyswietlania){
    if(!czasWyswietlania){czasWyswietlania=1000}
    
    czyInputZablokowany=true;
    catchById("coTerazInput").style.display="none";
    catchById("kursor").style.display="none";
    catchById("coTerazInput").value="";
    
    if(Array.isArray(tresc)){
        var licznik = 0;
        catchById("coTerazNapis").innerHTML=tresc[licznik];
        interval = setInterval(function () {
            catchById("coTerazNapis").innerHTML=tresc[licznik+1];
            if (++licznik == tresc.length){
                catchById("coTerazNapis").innerHTML="What now?";
                catchById("coTerazInput").style.display="inline-block";
                catchById("kursor").style.display="inline-block";
                catchById("duplikuj").innerHTML = "";
                catchById("coTerazInput").value = "";
                catchById("coTerazInput").focus();
                czyInputZablokowany=false;
                clearInterval(interval)
            }
        }, czasWyswietlania)
    }
    
    else{
        catchById("coTerazNapis").innerHTML=tresc
        
        var licznik = 0;
        interval = setInterval(function () {

            if (++licznik == 1){
                catchById("coTerazNapis").innerHTML="What now?";
                catchById("coTerazInput").style.display="inline-block";
                catchById("duplikuj").innerHTML = "";
                catchById("coTerazInput").value = "";
                catchById("kursor").style.display="inline-block";
                catchById("coTerazInput").focus();
                czyInputZablokowany=false;
                clearInterval(interval)
            }
        }, czasWyswietlania)
    }
}
/*==================================================================================================*/
var licznik=0;
var aktualizujObrazek=function(){
    //OBRAZEK Z OBECNĄ LOKACJĄ
    var obecna=["obcenaLokacjaObraz","nowaObecnaLokalizacjaObraz"];
    var poprzednia=["nowaObecnaLokalizacjaObraz","obcenaLokacjaObraz"];
    catchById(poprzednia[licznik]).style.backgroundImage=mapa[postac.lokalizacja.x][postac.lokalizacja.y].zrodloZdjecia;
    catchById(poprzednia[licznik]).style.backgroundColor=mapa[postac.lokalizacja.x][postac.lokalizacja.y].tloZdjecia;
    catchById(poprzednia[licznik]).style.height=0+"px";
    catchById(obecna[licznik]).style.zIndex="0";
    catchById(poprzednia[licznik]).style.zIndex="1";
    
    var wysun = 0;
    czyInputZablokowany=true;
    irr = setInterval(function () {
        catchById(obecna[licznik]).style.height=wysun+"px";
        if (++wysun == 198){
            czyInputZablokowany=false;
            clearInterval(irr)
        }
    }, 10)
    
    licznik++;if(licznik==2){licznik=0;}
}
/*==================================================================================================*/
var coWidzeICoMamZeSoba=function(){

    //NAPIS CO WIDZE - PRZEDMIOTY NA LOKALIZACJI
    var coWidze="You see ";
    if(mapa[postac.lokalizacja.x][postac.lokalizacja.y].dostepnePrzedmioty.length>0){
        var tablicaPrzedmiotow=mapa[postac.lokalizacja.x][postac.lokalizacja.y].dostepnePrzedmioty
        for(var i=0;i<tablicaPrzedmiotow.length;i++){
            coWidze+=tablicaPrzedmiotow[i].przedmiotWOdmianie
            if(i<tablicaPrzedmiotow.length-1){coWidze+=", "}
        }
    }
    else{coWidze+="nothing"}
    catchById("coWidze").innerHTML=coWidze;
        
    //NAPIS CO MAM ZE SOBĄ
    var coMamZeSoba="You are carring "
    if(postac.posiadanePrzedmioty.length!=0){
        for(i=0;i<postac.posiadanePrzedmioty.length;i++){
            coMamZeSoba += postac.posiadanePrzedmioty[i].przedmiotWOdmianie;
            if(i<postac.posiadanePrzedmioty.length-1){coMamZeSoba+=", "}
        }
        //coMamZeSoba+=postac.posiadanePrzedmioty[0].przedmiotWOdmianie
    }
    else{coMamZeSoba+="nothing"}
    catchById("coMamZeSoba").innerHTML=coMamZeSoba;
}
/*==================================================================================================*/
var aktualizowanieInformacjiNaEkranie=function(){
    
    //UKRYWAM KURSOR
    catchById("kursor").style.display="none";
    
    //CZYSZCZĘ INPUTA
    catchById("coTerazInput").value="";
    
    //UKRYWAM CHWILOWO INPUTA;
    catchById("coTerazInput").style.display="none";
    
    //WYŚWIETLAM KOMUNIKAT ŻE IDE W JAKIMŚ KIERUNKU;
    catchById("coTerazNapis").innerHTML="You are going " + wJakimKierunkuIde + "..."
    
    //OBRAZEK Z OBECNĄ LOKACJĄ
    var obecna=["obcenaLokacjaObraz","nowaObecnaLokalizacjaObraz"];
    var poprzednia=["nowaObecnaLokalizacjaObraz","obcenaLokacjaObraz"];
    catchById(poprzednia[licznik]).style.backgroundImage=mapa[postac.lokalizacja.x][postac.lokalizacja.y].zrodloZdjecia;
    catchById(poprzednia[licznik]).style.backgroundColor=mapa[postac.lokalizacja.x][postac.lokalizacja.y].tloZdjecia;
    catchById(poprzednia[licznik]).style.height=0+"px";
    catchById(obecna[licznik]).style.zIndex="0";
    catchById(poprzednia[licznik]).style.zIndex="1";
    
    var wysun = 0;
    czyInputZablokowany=true;
    interval = setInterval(function () {
        catchById(obecna[licznik]).style.height=wysun+"px";
        if (++wysun == 198){
            
            //NAPIS GDZIE JESTEM
            catchById("obcenaLokacjaNapis").innerHTML=mapa[postac.lokalizacja.x][postac.lokalizacja.y].gdzieJestem;

            //WSPÓŁRZEDNE NA KOMPASIE
            var mozliweKierunki=mapa[postac.lokalizacja.x][postac.lokalizacja.y].wKtorymKierunkuMogeIsc
            mozliweKierunki = mozliweKierunki.split(" ");
            var N="",S="",E="",W="";
            for(i=0;i<mozliweKierunki.length;i++){
                if(mozliweKierunki[i]=="N"){N="N";}
                else if(mozliweKierunki[i]=="S"){S="S";}
                else if(mozliweKierunki[i]=="E"){E="E";}
                else if(mozliweKierunki[i]=="W"){W="W";}
            }
            catchById("kompasN").innerHTML=N;
            catchById("kompasS").innerHTML=S;
            catchById("kompasE").innerHTML=E;
            catchById("kompasW").innerHTML=W;
            
            //NAPIS CO WIDZE I CO MAM ZE SOBĄ
            coWidzeICoMamZeSoba();
            
            //NAPIS W KTÓRYM KIERUNKU MOGĘ IŚĆ
            var gdzieMogeIsc="You can go "
            for(i=0;i<mozliweKierunki.length;i++){
                var kierunek;
                if(mozliweKierunki[i]=="N"){kierunek="NORTH";}
                else if(mozliweKierunki[i]=="S"){kierunek="SOUTH";}
                else if(mozliweKierunki[i]=="E"){kierunek="EAST";}
                else if(mozliweKierunki[i]=="W"){kierunek="WEST";}
                gdzieMogeIsc+=kierunek
                if(i<mozliweKierunki.length-1){gdzieMogeIsc+=", "}
            }
            catchById("wKtorymKierunkuMogeIsc").innerHTML=gdzieMogeIsc;
            
            //POKAZUJE INPUTA I PYTAM CO TERAZ
            catchById("coTerazNapis").innerHTML="What now?";
            catchById("coTerazInput").style.display="inline-block";
            catchById("duplikuj").innerHTML = "";
            catchById("coTerazInput").value = "";
            catchById("kursor").style.display="inline-block";
            catchById("coTerazInput").focus();
            
            czyInputZablokowany=false;
            clearInterval(interval)
        }
    }, 10)
    
    licznik++;if(licznik==2){licznik=0;}
}
/*==================================================================================================*/