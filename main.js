/*##################################################################*/
/*#================================================================#*/
/*#           Program na podstawie kursu JS Mirosław Zelent        #*/
/*#================================================================#*/
/*#                    >>>>>> Autor główny <<<<<<                  #*/
/*#                          Mirosław Zelent                       #*/
/*#                                                                #*/
/*#                    >>> Autor modyfikacji <<<                   #*/
/*#                              R3IC0P                            #*/
/*#                                                                #*/
/*#================================================================#*/
/*#                         ~~~~ Zmiany ~~~~                       #*/
/*#               1. Dodana możliwośc wyboru kategorii             #*/
/*#                    2. Lara Croft na końcu ;)                   #*/
/*#                                                                #*/
/*#================================================================#*/
/*#           HANGMAN v1.3 bez licencji chyba czy cos xd           #*/
/*#================================================================#*/
/*##################################################################*/


// kategorie do wyboru
let category = new Array(4);
category[0] = "Pojazdy";
category[1] = "Jedzenie";
category[2] = "Literatura";
category[3] = "Zwierzęta";

//===========categories===========
let pojazdy = new Array(4);
pojazdy[0] = "samochód";
pojazdy[1] = "ciężarówka";
pojazdy[2] = "samolot";
pojazdy[3] = "statek";

let jedzenie = new Array(4);
jedzenie[0] = "jabłko";
jedzenie[1] = "marchewka";
jedzenie[2] = "rosół";
jedzenie[3] = "sernik";

let literatura = new Array(4);
literatura[0] = "pan tadeusz";
literatura[1] = "dzieci z placu broni";
literatura[2] = "potop";
literatura[3] = "dżuma";

let zwierzeta = new Array(4);
zwierzeta[0] = "biedronka";
zwierzeta[1] = "koń";
zwierzeta[2] = "stonoga";
zwierzeta[3] = "delfin";
//================================

let haslo = "";
let hasloHidden = "";
let dlugoscHasla;
let kategoria = "";

// MUSIC
let bgSong = new Audio("audio/background.wav");
if(typeof bgSong.loop=='boolean'){
    bgSong.loop = true;
}
else{
    bgSong.addEventListener('ended', function(){
        this.currentTime = 0;
        this.play();
    }, false)
};

let inplaySong = new Audio("audio/inplay.mp3");
if(typeof inplaySong.loop=='boolean'){
    inplaySong.loop = true;
}
else{
    inplaySong.addEventListener('ended', function(){
        this.currentTime = 0;
        this.play();
    }, false)
};

let startSong = new Audio("audio/start.wav");
let selectSong = new Audio("audio/select.wav");
let winSong = new Audio("audio/win.wav");
let loseSong = new Audio("audio/lose.wav");

bgSong.volume = .25;
inplaySong.volume = .4;
startSong.volume = .4;
selectSong.volume = .4;
winSong.volume = .4;
loseSong.volume = .3;

function playSelSong(){
    selectSong.pause();
    selectSong.load();
    selectSong.play();
};

// zmiana kolorków
function randomRGB(){
    let x = Math.floor(Math.random() * 254 + 1);
    return x;
};

// pokazanie kategorii do wyboru
function drawCategories(){
    let divCat = '<div id="select">Wybierz kategorię</div></br>';

    for(i=0;i<4;i++){
        divCat = divCat + '<div id="cat' + i + '" class="category" onclick="categories(' + i + ')"><p>' + category[i] + '</p></div>';
    };
    document.getElementById("alfabet").innerHTML = divCat;

    setInterval(function(){
        for(i=0;i<5;i++){
            document.getElementById("cat" + i).style.borderColor = 'rgb(' + randomRGB() + ',' + randomRGB() + ',' + randomRGB() + ')';
        };
    }, 1000);

    bgSong.play();
};

// losowanie hasla po wybraniu kategorii
function categories(lp){
    playSelSong();

    switch (lp) {
        case 0:
            haslo = pojazdy[Math.floor(Math.random()*4)];
            kategoria = "Pojazdy";
            break;
        case 1:
            haslo = jedzenie[Math.floor(Math.random()*4)];
            kategoria = "Jedzenie";
            break;
        case 2:
            haslo = literatura[Math.floor(Math.random()*4)];
            kategoria = "Literatura";
            break;
        case 3:
            haslo = zwierzeta[Math.floor(Math.random()*4)];
            kategoria = "Zwierzęta";
            break;
        default:
            drawCategories();
            break;
    }

    dlugoscHasla = haslo.length;
    haslo = haslo.toUpperCase();

// ukrywanie hasla
    for(i=0;i<dlugoscHasla;i++){
        if(haslo.charAt(i)==" "){
            hasloHidden = hasloHidden + " ";
        }
        else{
            hasloHidden = hasloHidden + "-";
        };
    };

    //=========DEBUG=========
    console.log(dlugoscHasla);
    console.log(haslo);
    console.log(hasloHidden);
    //=======================

    bgSong.pause();

    start();
    showPassword();
};

// liczba prób
let trials = 0;

//==========ALFABET===========
let letters = new Array(35);
letters[0] = "A";
letters[1] = "Ą";
letters[2] = "B";
letters[3] = "C";
letters[4] = "Ć";
letters[5] = "D";
letters[6] = "E";
letters[7] = "Ę";
letters[8] = "F";
letters[9] = "G";
letters[10] = "H";
letters[11] = "I";
letters[12] = "J";
letters[13] = "K";
letters[14] = "L";
letters[15] = "Ł";
letters[16] = "M";
letters[17] = "N";
letters[18] = "Ń";
letters[19] = "O";
letters[20] = "Ó";
letters[21] = "P";
letters[22] = "Q";
letters[23] = "R";
letters[24] = "S";
letters[25] = "Ś";
letters[26] = "T";
letters[27] = "U";
letters[28] = "V";
letters[29] = "W";
letters[30] = "X";
letters[31] = "Y";
letters[32] = "Z";
letters[33] = "Ź";
letters[34] = "Ż";
//============================

function showPassword(){
    document.getElementById("plansza").innerHTML = hasloHidden;
};

window.onload = function(){
    drawCategories();
};

// tworzenie liter w div'ach
function start(){
    startSong.play();
    inplaySong.play();

    let divValue = "";
    
    for(i=0;i<35;i++){
        if(i%7==0){
            divValue = divValue + '<div style="clear:both;"></div>';
        }
        divValue = divValue + '<div class="letter" id="let' + i + '" onclick="checkLetter(' + i + ')">' + letters[i] + '</div>';
    };

    document.getElementById("alfabet").innerHTML = divValue;
    document.getElementById("kategoria").innerHTML = 'Próby: 9' + ' | ' + kategoria + ' | <span id="menu" onclick="location.reload()">MENU</span>';

    setInterval(function(){
        document.getElementById("plansza").style.color = 'rgb(' + randomRGB() + ',' + randomRGB() + ',' + randomRGB() + ')';
    }, 2000);
};

// nowa funkcja pisana po "." np. stary.replaceChar xdd
String.prototype.replaceChar = function(position, char){
    if(position>this.length-1){
        return this.toString();
    }
    else{
        return this.substr(0, position) + char + this.substr(position+1)
    }
};

// sprawdzanie liter i podmiana 
function checkLetter(nr){
    playSelSong();

    let hit = false;
    let element = "let" + nr;

    for(i=0;i<=dlugoscHasla;i++){
        if(letters[nr]==haslo.charAt(i)){
            hasloHidden = hasloHidden.replaceChar(i, letters[nr]);
            hit = true;
        };
    };

    // kolorowanie liter
    if(hit==true){
        document.getElementById(element).style.backgroundColor = "darkgreen";
        document.getElementById(element).style.borderColor = "lightgreen";
        document.getElementById(element).style.color = "lightgreen";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick", ";");
    }
    else{
        trials++;

        // podmiana plików .jpg szubienicy
        document.getElementById("szubienica").innerHTML = '<img src="img/s' + trials + '.jpg" alt="">';

        document.getElementById(element).style.backgroundColor = "darkred";
        document.getElementById(element).style.borderColor = "lightcoral";
        document.getElementById(element).style.color = "lightcoral";
        document.getElementById(element).style.cursor = "default";
        document.getElementById(element).setAttribute("onclick", ";");
    };

    document.getElementById("kategoria").innerHTML = 'Próby: ' + (9-trials) + ' | ' + kategoria + ' | <span id="menu" onclick="location.reload()">MENU</span>';

    // zkończenie przegrana
    if(trials>=9){
        inplaySong.pause();
        loseSong.play();

        document.getElementById("alfabet").innerHTML = '</br><div id="loss">Przegrana</div></br>Prawidłowe hasło: ' + haslo + '</br></br><span id="end" onclick="location.reload(); playSelSong()">Spróbuj jescze </br> raz!</span>';
    };

    // zakończenie wygrana
    if(hasloHidden==haslo){
        inplaySong.pause();
        winSong.play();

        document.getElementById("alfabet").innerHTML = '</br><div id="win">Wygrana!</div></br></br><span id="end" onclick="location.reload()">Jeszce raz?</span>';
    };

    showPassword();
};



















































































//                             __          .gp.__/                            
//                        .ssSSSSSs.__    d$P^^^"                             
//                     .sSSSSSSS$$$$$$$p.dP                                   
//                   .SSSSSS$$$$$SSSSSSSS$bs+._                               
//                 .SSSS$$$$$SSSSS$$$$$$$SS$$$$b__                       /"-. 
//                 SSS$$$SSSSS$$$$$$$$SSSS$$$SSSS$b                   _/"-. / 
//                :S$$$SSSSS$$$$$$$SSSSS$$$SSSS$$SSb                 //   /"-.
//                $$SSSSS$$$$$$SSSSS$$$$$$S$$$$S$$$Sb.               ;   /   /
//                SSSSS$$$$$SSSSS$$$$$$$SS'P   SS$$S`^b._.'         /:  :   / 
//                :S$$$$$SSSSS$$$$$$$SSSP      :$SS$b              / ;  +-./  
//                 $$$$SSSS$$$$$$$SSSSSP        S$SS$;            / /  / / ;  
//                d$$SSS$$$$$SSSSSSSSS' ,=._    :S':S$           / /  / / /   
//               :$SSS$$$$SSSSSSSSS^"  '  _ ";  ;   S$          / /  / / /    
//               SSS$$$SSSP.-TSS^"     .="$;   /    S;         / /  / / /     
//              :SS$$$SSS$$ (;            "    \    P         / /  / : :      
//              :S$$$SS$$$$b :                  \ .'         / /  /  :  \     
//               T$$SS$$$$$j`-,    .          ,  \         /"-(  /   ;_-.\    
//                `TSS$$$$P   ;    `.         `.-'        /  /\\/   .'/_ ;;   
//                  TS$$$P    :             _.-;         /  /\\(   / /-" ;;   
//                   SSS'      \           :-t"         : .-\\/ "-/":   //    
//                 .SS$$        `.          `-;  bug    )Y   y   /  ;  J/     
//                :S$$$;          "-.        (          '"; j_.-/-./.-" \_    
//                $S$SS              "j.     :            :/  ':    `-..' \   
//               d$$SS;     :        /  "-._.'             `.  ;       `-./;  
//             _S$$$SP       \      :                        \: :"-.      \;  
//           ,$$$SSSj       , `.    ;                         : ;   "-,   /   
//           S$$SS'"^-...___       : "-.                      ;/      ;  t    
//       __.-`SS'---. `T$$$$$$q._       "-.                  / `.    /   ;    
//   .-""__ `.'      `. `T$$$$$$$$b.       `.               :    "--"   /     
//  /.-""  \/          `. T$$$$$$$$$$p.     .`._            /"-.  _   .'      
// ::      /             \ T$$$$$SS$$$$$b._  `.T$p.        /    "" ;-'        
// ;;     :               \ T$$$S$$$$$$$$$$$p._L$$$$p.    /       ,           
// ;;     ;                \ $$$$$$$$$$$$$$$$$$$SS$$$$$. /                    
// ::     ;                 ;:$$$$$$$$$$$$$$SSSSSSSSS$$$y        '            
//  ;;    :                  "^$$$$$$$$$$$$$$$$$SSSS$$$P        /             
//  ;;     b.                   "^$$$$$$$$$$$$$$$$$S$$'        /              
//  ::     :$$p.  -._              "^$$$$$$$$$$$$$$$'         /               
//   ;;     $$$$$p.                   "^$$$$$$$$$$P          /                
//   ::     :$$$$$$p.                    "^$$$$$$P          ,                 
//    ;;     T$$$$$$$$p.                    "^$$P                             
//    ::      T$$$$$$$P "-.                    "           '                  
//    s;;      $$$$$$P   d$$p._                     /     /                   
//   S$$:      $$$$$t   d$$$$$$$p._          "-.  .'     /                    
//   SS$;;     :P^"\ \.d$$$$$$$$$$$$p._         ""      /                     
//    TS::      \   d$$$$$$$$$$$$$$$$$$$p._            /                      
//     SS.\     .jq$$$$$$$$$$$$$$$$$$^^^^^""-._      .';                      
//    $$$$.tsssj' `T$$$$$$$^^^^^"""            "-._.'  ;                      
//    $$$SSS         \                 /            \ :                       
//    '^SSS_          \               :          :    :                       
//      $$$SS.         \              ;          :    ;                       
//      '$$$SS          \            :           ;   :                        
//        "^S$.          \           ;          :    :                        
//          S$$b.         \                     ;    ;                        
//          S$$$$          ;                   :    :                         
//          'TSS$$$s.      :                   ;    ;                         
//              TS$$Ss_    ;                   ;   :                          
//               `SSS$$$p./                   :    ;                          
//                   TS$$'            ;       ;    :                          
//                    "S              :       ;     ;                         
//                    /                ;      :     :                         
//                   /                 :            :                         
//                  /"-.                          .' ;                        
//                 /    ""--..__          __..--""   :                        
//                              """"""""""

// i co sie patrzysz to tylko Lara xd