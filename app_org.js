var restify = require('restify');
var builder = require('botbuilder');



//=========================================================
// Bot Setup
//=========================================================
// Setup Restify Server
var server = restify.createServer();
console.log(server);
//server.listen(process.env.port || process.env.PORT || 3978, function () {
server.listen(process.env.port || process.env.PORT || 443, function() {
    console.log('%s listening to %s', server.name, server.url);
});



// Create chat bot -- Production
var connector = new builder.ChatConnector({
    appId: 'ecbc7d01-e2d0-4200-b8ee-62bd8876b57f',
    appPassword: 'V4Vjpp6od8ygJSfhQOs91Qs'
});


// Create chat bot -- DEV
/*var connector = new builder.ChatConnector({
    appId: '4309fd49-6adb-45ec-b983-1aaa6a3f2762',
    appPassword: 'NQcf0BDHqVOnzrL53RBcOkN'
});
*/


var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());
//=========================================================
// Bots Dialogs
//=========================================================
bot.dialog('/', [
    function(session) {
        session.send("Hello, I'm ZingHR support chatbot. Currently I support login and punchin related queries. We are in process of improvising and will support more modules in near future. Happy Botting.");
        session.beginDialog('/menu');
    },
    function(session, results) {
        session.endConversation("Goodbye until next time");
    }
]);

bot.dialog('/menu', [
    function(session) {
        builder.Prompts.choice(session, "Please Choose issue type:", 'Unable to login|Unable to Punchin|Quit');
    },
    function(session, results) {
        switch(results.response.index) {
            case 0:
                session.beginDialog('/loginIssue');
                break;
            case 1:
                session.beginDialog('/punchInIssue');
                break;
            default:
            session.endDialog();
                break;
        }
    },
    function(session) {
        // Reload menu
        session.replaceDialog('/menu');
    }
]).reloadAction('showMenu', null, { matches: /^(menu|back)/i });

/*Dialog Handler for loginIssue*/
bot.dialog('/loginIssue', [
    function(session, args) {
        builder.Prompts.choice(session, "Please choose the message you are getting.", "Login Expired. Please Contact Your System Administrator.|Login Disabled. Please Contact Your System Administrator.|How to Reset my password|Invalid credentials|Internal server error|Is you company Geofenced|Back");
    },
    function(session, results) {
        switch(results.response.index) {
            case 0:
                session.send("Your Login seems to have been blocked for security reasons, since you may not have logged-in to the system for over 60 days. To gain access to your account we would recommend you to contact your internal HR team to reset your password. visit link- http://support.zinghr.com/solution/articles/1000111224-has-your-account-login-expired-");
                break;
            case 1:
                session.send("Your account has been disabled because you may have exceeded the number of incorrect login attempts. Please click on the 'Forgot Password' link (just below on Login Button) to receive your password on the registered Email address. Alternatively you may contact your internal HR team to reset your password.");
                break;
            case 2:
                session.send("Please click on the 'Forgot Password' link (just below on Login Button) to receive your password on the registered Email address. Alternatively you may contact your internal HR team to reset your password. visit link- http://support.zinghr.com/solution/articles/1000105734-how-do-i-retrieve-my-password-");
                break;
            case 3:
                session.beginDialog('/InvalidCredentials');
                break;
            case 4:
                session.send("It seems like the server is not reachable at the moment, Please try after sometime");
                break;    
            case 5:
                session.send("You Organisational policy may be restricting you to punch-in only from specific locations. Please try to punch-in from the locations that you are allowed to punch-in from. We recommend you to seek help from your internal HR team to understand which locations you are allowed to punch in from.");
                break;
            case 6:
                session.beginDialog('/menu');
                break;          
            default:
                session.endDialog();
                break;
        }
    }
]);


bot.dialog('/InvalidCredentials', [
    function (session, args) {
        builder.Prompts.choice(session, "It seems you are entering the wrong credentials while trying to login. This could be either because of Invalid Companay Code OR Employee ID OR password. Due to security concerns, we cannot reveal the exact error. ", " In case you do not know your Company Code, please take it from your HR or email us on support@zinghr.com.|In case you do not know your Employee Code, you will have to take it from your HR only.|If you are entering both of them correctly then your password is wrong or expired. Please click on 'Forgot Password' Option (which is mentioned below on Login Button) to receive the Reset Password Link on your registered Email id. Alternatively you may also contact your internal HR team to reset your password.", { listStyle: builder.ListStyle.button });
    },
    function (session, results) {
       switch (results.response.index) {
            case 0:
                session.endDialog();
                //session.send("Make sure that you are entering the correct company code. Company codes do not contain spaces. You may seek help from your colleagues or connect with your internal HR team to know the correct company code to use.");
                break;
            case 1:
              session.endDialog();
              // session.send("Make sure the employee code you are entering is correct. Employee Code is the Numeric/Alphanumeric code with which you have been registered on the ZingHR portal. Please seek assistance from your internal HR team to get the correct employee code to use for login.");
                break;
            case 2:
                session.endDialog();
                //session.send("Passwords are case sensistive. Please check if your Caps-lock is on. If you have already tried to login more than 3 times, Please click on the 'Forgot Password' link (just below on Login Button) to receive your password on the registered Email address. Alternatively you may contact your internal HR team to reset your password.");
                break;

            /*case 3:
                session.beginDialog('/menu');
                break; */      
            default:
                session.endDialog();
                break;
        }
    }
]);

/*Dialog Handler for punchInIssue*/
bot.dialog('/punchInIssue', [
    function(session, args) {
        builder.Prompts.choice(session, "Please choose punch-in issue type.", "Location not enabled|Punch in not mapped|Invalid credentials|Internal server error|Is you company Geofenced|Back");
    },
    function(session, results) {
        switch(results.response.index) {
            case 0:
                session.send("For mobile app:- Please check that location is enabled in your mobile and try again. For web :- Your web browser is not set to allow permission to capture location. Please enable the location permission and reload the page before trying to login. ");
                break;
            case 1:
                session.send("Your employee ID is not configured to be allowed to use the Punch-In functionality of the application. If you think you should be allowed, please contact your internal HR team to get the functionality enabled.");
                break;
            case 2:
                session.beginDialog('/InvalidCredentials');
                break;
            case 3:
                session.send("It seems like the server is not reachable at the moment, Please try after sometime");
                break;
            case 4:
                session.send('You Organisational policy may be restricting you to punch-in only from specific locations. Please try to punch-in from the locations that you are allowed to punch-in from. We recommend you to seek help from your internal HR team to understand which locations you are allowed to punch in from. visit link - http://support.zinghr.com/solution/articles/11000017719-is-your-company-geo-fenced-');
                break;    
            case 5:
                session.beginDialog('/menu');
                break;      
            default:
                session.endDialog();
                break;
        }
    }
]);

bot.dialog('/rollDice', [
    function(session, args) {
        builder.Prompts.number(session, "How many dice should I roll?");
    },
    function(session, results) {
        if(results.response > 0) {
            var msg = "I rolled:";
            for(var i = 0; i < results.response; i++) {
                var roll = Math.floor(Math.random() * 6) + 1;
                msg += ' ' + roll.toString();
            }
            session.endDialog(msg);
        } else {
            session.endDialog("Ummm... Ok... I rolled air.");
        }
    }
]);
bot.dialog('/magicBall', [
    function(session, args) {
        builder.Prompts.text(session, "What is your question?");
    },
    function(session, results) {
        // Use the SDK's built-in ability to pick a response at random.
        session.endDialog(magicAnswers);
    }
]);
var magicAnswers = ["It is certain", "It is decidedly so", "Without a doubt", "Yes, definitely", "You may rely on it", "As I see it, yes", "Most likely", "Outlook good", "Yes", "Signs point to yes", "Reply hazy try again", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again", "Don't count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"];


/*Commented Code*/
/*bot.dialog('/LoginExpired', [
    function (session, args) {
        //builder.Prompts.choice(session, "Please Choose Issue type.", "Login is expired|Login id is disabled", { listStyle: builder.ListStyle.none })
        builder.Prompts.choice(session, "Please Choose Issue type.", "Login is expired|Login id is disabled");
    },
    function (session, results) {
       switch (results.response.index) {
            case 0:
                session.endDialog("Your Login has been expired, Please Contact HR");
                break;
            case 1:
               session.endDialog("Your Login has been disabled, Please Contact HR");
                break;
            case 2:
                session.beginDialog('/magicBall');
                break;
            default:
                session.endDialog();
                break;
        }
    }
]);*/


/*bot.dialog('/LoginDisabled', [
    function (session, args) {
        //builder.Prompts.choice(session, "Please Choose Issue type.", "Login is expired|Login id is disabled", { listStyle: builder.ListStyle.none })
        builder.Prompts.choice(session, "Please Choose Issue type.", "Login is expired|Login id is disabled");
    },
    function (session, results) {
       switch (results.response.index) {
            case 0:
                session.endDialog("Your Login has been expired, Please Contact HR");
                break;
            case 1:
               session.endDialog("Your Login has been disabled, Please Contact HR");
                break;
            case 2:
                session.beginDialog('/magicBall');
                break;
            default:
                session.endDialog();
                break;
        }
    }

]);*/


/*bot.dialog('/', new builder.IntentDialog()
    .matches(/^(hello|hi)/i, function (session) {
        session.send("Hello, I'm ZingHR support chatbot.");
        session.beginDialog('/menu');
    })
    .onDefault(function (session) {
        session.send("I didn't understand. Say hello to me!");
    }));*/

