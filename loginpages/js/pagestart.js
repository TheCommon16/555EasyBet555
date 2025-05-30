function pagestart(){

    var useridjs = localStorage.getItem("userid");

    document.getElementById("userbalance").innerHTML = "Login";
    document.getElementById("balancediv").addEventListener("click",loginpopup);

    console.log(useridjs);
    if(useridjs != 0){
        $.ajax({
            url: "http://192.168.1.1:3000/slotdata",
            data: {userid: useridjs},
            type: "POST",
            success:function(result){
                if(result.usermoney != "error"){
                    console.log(result.usermoney);

                    document.getElementById("userbalance").innerText = result.usermoney;

                    document.getElementById("balancediv").removeEventListener("click",loginpopup);
                }
            }


        });
       //localStorage.setItem("userid", 0);
    }
    //else{
      //  window.location.href = "/index.html";
      //  localStorage.setItem("userid", 0);
   // }*/



}

function disconetti(){

    localStorage.setItem("userid", 0);
   document.getElementById("userbalance").innerHTML = "Login";
    document.getElementById("balancediv").addEventListener("click",loginpopup);
}


function loginpopup(){
    document.getElementById("pupregister").style.display = "none";
    document.getElementById("puplogin").style.display = "inline";

    let loginbuttons = document.getElementsByClassName("login");
    for(i = 0; i < loginbuttons.length; i++){
        loginbuttons[i].style.width = "40%";
        loginbuttons[i].style.height = "15%"
        loginbuttons[i].style.left = "30%";
        loginbuttons[i].style.top = "70%";
    }

 
    let registerbutton = document.getElementsByClassName("register");
    for(i = 0; i < registerbutton.length; i++){
        registerbutton[i].style.width = "15%";
        registerbutton[i].style.height = "10%"
        registerbutton[i].style.left = "42.5%";
        registerbutton[i].style.top = "90%";
    }


 
}


function registpopup(){
    document.getElementById("puplogin").style.display = "none";
    document.getElementById("pupregister").style.display = "inline";


    let registerbutton = document.getElementsByClassName("register");
    for(i = 0; i < registerbutton.length; i++){
        registerbutton[i].style.width = "40%";
        registerbutton[i].style.height = "15%"
        registerbutton[i].style.left = "30%";
        registerbutton[i].style.top = "70%";
    }



    let loginbuttons = document.getElementsByClassName("login");
    for(i = 0; i < loginbuttons.length; i++){
        loginbuttons[i].style.width = "15%";
        loginbuttons[i].style.height = "10%"
        loginbuttons[i].style.left = "42.5%";
        loginbuttons[i].style.top = "90%";
    }

}


function popupclose(){
    document.getElementById("puplogin").style.display = "none";
    document.getElementById("pupregister").style.display = "none";
}



function userlogin(){
 console.log($("#FormAccessLogin").serialize());
            
 useralldata =   $("#FormAccessLogin").serialize().split("&");

 nickname = useralldata[0].split("="); 
 nick = nickname[1];

 password = useralldata[1].split("=");
 pass = password[1];


 $.ajax(
     {
         url: "http://192.168.1.1:3000/login",
         data: {usernick: nick, userpass:pass },
         type:"POST",
         success:function(result)
         {
             localStorage.setItem("userid", 0);
             localStorage.setItem("usermoney", 0);
             //console.log(result);//devi gestire questo 
             resultt = result.respond.split(":");
             if(resultt[1] != 0){
                 localStorage.setItem("userid", resultt[1]);
                 localStorage.setItem("usermoney", resultt[3]);
                 
                 document.getElementById("userbalance").innerHTML = Number(resultt[3]);

                 document.getElementById("balancediv").removeEventListener("click",loginpopup);
                 
                 
                 popupclose();

                 
             }
             //salva l'id nel session storage cosi lo puoi mettere dopo nella pagina della slot
             

             
         }




     });


}

function userregister(){
    console.log($("#FormAccessRegist").serialize().split("&"));
    useralldata =   $("#FormAccessRegist").serialize().split("&");

    nickname = useralldata[0].split("="); 
    nick = nickname[1];

    password = useralldata[1].split("=");
    pass = password[1];

    $.ajax(
        {
            url: "http://192.168.1.1:3000/regist",
            data: {usernick: nick, userpass:pass },
            type:"POST",
            success:function(result)
            {

                localStorage.setItem("userid", 0);
                //console.log(result);
                resulttt = result.respond.split(":");
                if(resulttt[1] != 0){
                    localStorage.setItem("userid", resulttt[1]);
                    document.getElementById("balancediv").removeEventListener("click",loginpopup);
                    popupclose();
                }
            }




        });
}





function slotclick(element){
    console.log(element.getAttribute("name"));
    pageselected = element.getAttribute("name")
    if(localStorage.getItem("userid") != 0){
        $.ajax(
            {
                url: "http://192.168.1.1:3000/slotredirect",
                type:"POST",
                data: {pagesel: pageselected},
                success:function(result)
                {
                    if (result.redirect) {
                        window.location.href = result.redirect;  // Redirect the browser
                    }
                }




            });
    }
    else{
        loginpopup();
    }

}