const express = require('express');
const cors = require('cors');
const path = require("path");
const app = express();

const port = 3000;





app.use(cors({
    origin: ["http://192.168.1.1"]
}));
app.use(express.json());// Middleware to parse JSON bodies

app.use(express.urlencoded({ extended: true }));// Middleware to parse URL-encoded bodies (for form submissions)

app.use(express.static("loginpages")); //piglia dalla cartella pages e manda al client
app.use(express.static(path.join(__dirname, "loginpages")));  // Serve loginpages as static
app.use(express.static(path.join(__dirname, "leaderboardpages")));  // Serve loginpages as static
app.use(express.static(path.join(__dirname, "slot1")));       
app.use(express.static(path.join(__dirname, "slot2")));      
app.use(express.static(path.join(__dirname, "coinflip3")));      


var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "utentislot"
  });

app.post("/leaderboardmoney",(req,res) => {
     let updateSql = "SELECT username, money FROM utenti ORDER BY money DESC LIMIT 10";
        con.query(updateSql, function (err, result) {
            if (err) {
                console.error("Query error:", err);
                return;
            }

            
           

            res.json({ tabella: result }); // Send JSON response
        });



});

app.post("/coinflip", (req, res) => {
    const userId = req.body.id;
    const userbetsizee = Number(req.body.userbetsize);
    

    console.log("Coin Flip");
    console.log("User ID: "+ userId);
    console.log("User Betsize: "+ userbetsizee);

    num1coinflip = Math.floor(Math.random() * 2) + 1;
    usermoneywin = 0;
    if(num1coinflip == 1){
        usermoneywin = userbetsizee * 2 ;
        
    }


        let sql = "SELECT * FROM utenti WHERE ID = ?";
    con.query(sql, [userId], function (err, result) {
        if (err) {
            console.error("Query error:", err);
            return;
        }
        else if (result[0].money < userbetsizee){
            console.error("No soldi coin flip");
            return;
        }
    
        var userDBmoney = result[0].money;
        if(usermoneywin > 0){
            userDBmoneyupdate = userDBmoney + userbetsizee;
      
        }
        else{
            userDBmoneyupdate = userDBmoney - userbetsizee;
            usermoneywin = -(userbetsizee)
        }

        // UPDATE query
        let updateSql = "UPDATE utenti SET money = ? WHERE ID = ?";
        con.query(updateSql, [userDBmoneyupdate, userId], function (err, result) {
            if (err) {
                console.error("Query error:", err);
                return;
            }

                           /*let spinlog = num1+":"+num2+":"+num3;
                            let updateSql = "INSERT logspin (slottype, logspin, userbetsize, userbalance, userwin,usernewbalance, id_user) VALUES (?,?,?,?,?,?,?)";
                            con.query(updateSql, [slottype, spinlog, userbetsizee,userDBmoney,usermoneywin,userDBmoneyupdate,userId], function (err) {
                                if (err) {
                                    console.error("Query error:", err);
                                    return;
                                }
                                console.log("Log Spin Added");
                                
                            
                            });*/
            
            console.log("New Bal: ", userDBmoneyupdate);

            res.json({ first:num1coinflip, moneywin: userDBmoneyupdate }); // Send JSON response
        });
    });


});


// gestire i POST
app.post("/spin", (req, res) => {
    const userId = req.body.id;
    const userbetsizee = Number(req.body.userbetsize);
    //var slottype = 1;
    console.log("Slot");
    console.log("User ID: "+ userId);
    console.log("User Betsize: "+ userbetsizee);


      
        num1 = Math.floor(Math.random() * 16) + 1;
        num2 = Math.floor(Math.random() * 16) + 1;
        num3 = Math.floor(Math.random() * 16) + 1;




        if(num1 == num2 || num2 == num3 || num1 == num3){
            num1 = Math.floor(Math.random() * 16) + 1;
            num2 = Math.floor(Math.random() * 16) + 1;
            num3 = Math.floor(Math.random() * 16) + 1;
        }

        numJ = Math.floor(Math.random() * 100) + 1;
        if(numJ == 55){
            num1 = 55;

        }
        numJ = Math.floor(Math.random() * 100) + 1;
        if(numJ == 55){
            num2 = 55;

        }
        numJ = Math.floor(Math.random() * 100) + 1;
        if(numJ == 55){
            num3 = 55;

        }


        
    
    var usermoneywin = 0;
    if(num1 == num2 && num2 == num3){
        if(num1 == 55){
              usermoneywin = userbetsizee * 100000;
        }
        else{    
            usermoneywin = userbetsizee * 1000;
        }
        
    }
    else if(num1 == num2 || num1 == num3 || num2 == num3){
        if(num1 == 55 && num2 == 55 || num1 == 55 && num3 == 55 || num2 == 55 && num3 == 55){
            usermoneywin = userbetsizee * 5000;
        }
        else{
            usermoneywin = userbetsizee * 25;
        }
    }


    let sql = "SELECT * FROM utenti WHERE ID = ?";
    con.query(sql, [userId], function (err, result) {
        if (err) {
            console.error("Query error:", err);
            return;
        }
        else if (result[0].money < userbetsizee){

            return;
        }
    
        var userDBmoney = result[0].money;
        if(usermoneywin > 0){
            userDBmoneyupdate = userDBmoney + usermoneywin;
        }
        else{
            userDBmoneyupdate = userDBmoney - userbetsizee;
            usermoneywin = -(userbetsizee)
        }

        // UPDATE query
        let updateSql = "UPDATE utenti SET money = ? WHERE ID = ?";
        con.query(updateSql, [userDBmoneyupdate, userId], function (err, result) {
            if (err) {
                console.error("Query error:", err);
                return;
            }

                           /*let spinlog = num1+":"+num2+":"+num3;
                            let updateSql = "INSERT logspin (slottype, logspin, userbetsize, userbalance, userwin,usernewbalance, id_user) VALUES (?,?,?,?,?,?,?)";
                            con.query(updateSql, [slottype, spinlog, userbetsizee,userDBmoney,usermoneywin,userDBmoneyupdate,userId], function (err) {
                                if (err) {
                                    console.error("Query error:", err);
                                    return;
                                }
                                console.log("Log Spin Added");
                                
                            
                            });*/
            
            console.log("New Bal: ", userDBmoneyupdate);

            res.json({ first:num1, second:num2, third:num3, moneywin: userDBmoneyupdate }); // Send JSON response
        });
    });
    

   
});


app.post("/regist", (req, res) =>{
    userrnick = "";
    userrpass = "";

    userrnick = req.body.usernick;
    userrpass = req.body.userpass;


    let sql = "SELECT * FROM utenti WHERE username = ?";
    con.query(sql, [userrnick], function (err, result) {
        if (err) {
            console.error("Query error:", err);
            return;
        }
    
        if(result.length > 0){
            res.json({respond:"ID:"+0+ ":User Already Used"})
            return;

        }


        let updateSql = "INSERT utenti (username, userpassword, money) VALUES (?,?,?)";
        con.query(updateSql, [userrnick, userrpass, 100], function (err, result) {
            if (err) {
                console.error("Query error:", err);
                return;
            }

            let last_id = result.insertId;
            
            console.log("User added.");
            res.json({respond:"ID:"+last_id});
           
        });
    });


});


//login POST
app.post("/login", (req, res) =>{
    userrnick = "";
    userrpass = "";

    userrnick = req.body.usernick;
    userrpass = req.body.userpass;


    let sql = "SELECT * FROM utenti WHERE username = ? AND userpassword = ?";
    con.query(sql, [userrnick,userrpass], function (err, result) {
        if (err) {
            console.error("Query error:", err);
            return;
        }
    
        if(result.length > 0){
            console.log(result[0].ID)
            res.json({respond:"ID:"+result[0].ID + ":money:"+result[0].money});
            return;

        }else{
            res.json({respond: "ID:0"});
            return;
        }

        
        
    });


});





//slot data POST
app.post("/slotdata", (req, res) =>{


    const userrid = req.body.userid;



    let sql = "SELECT * FROM utenti WHERE ID = ?";
    con.query(sql, [userrid], function (err, result) {
        if (err) {
            console.error("Query error:", err);
            return;
        }
    
        if(result.length > 0){
            console.log(result[0].money)
            res.json({usermoney:result[0].money});
            return;

        }else{
            res.json({usermoney:"error"});
            return;  
        }

        
        
    });


});


//slot redirect POST
app.post("/slotredirect", (req, res) =>{
    const page = req.body.pagesel;
    res.json({ redirect: page });


});

app.listen(port, () => {
    console.log(`Real: ${port}`);
});
