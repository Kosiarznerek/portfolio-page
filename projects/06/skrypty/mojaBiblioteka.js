/*====================================================================*/
var catchById=function(id){
    var element=document.getElementById(id);
    return element;
}
/*====================================================================*/
var make2dArray=function(liczbaKolumn, liczbaWierszy){
    var tablica=new Array(liczbaKolumn);
    for(var i=0;i<tablica.length;i++){
        tablica[i]=new Array(liczbaWierszy)
    };
    return tablica;
}
/*====================================================================*/