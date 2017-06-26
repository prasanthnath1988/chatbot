

var restify = require('restify');
var builder = require('botbuilder');
//=========================================================
// Bot Setup
//=========================================================
// Setup Restify Server
var server = restify.createServer();
console.log(server);
//server.listen(process.env.port || process.env.PORT || 3978, function () {
server.listen(process.env.port || process.env.PORT || 446, function() {
    console.log('%s listening to %s', server.name, server.url);
});



// Create chat bot -- Production
var connector = new builder.ChatConnector({
    appId: '33ee796b-9cdb-4e1b-ae81-113b1265e92e',
    appPassword: 'SNoYa2zdQ1hu7pdidQ1kuMd'
});

// Create bot and bind to console
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());


// Create LUIS recognizer that points at our model and add it as the root '/' dialog for our Cortana Bot.
var model = 'https://api.projectoxford.ai/luis/v2.0/apps/b6f2d018-6c67-4036-b6f9-3db80bab8fd5?subscription-key=4611be38cc184e1b9888a10d218322c0&verbose=true';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', dialog);

dialog.matches('zing', builder.DialogAction.send("We are ZingHR group of Cnergyis.\n\nZingHR empowers people and businesses with Enterprise Cloud Application Solutions for Human Capital Management"));
dialog.matches('hp', builder.DialogAction.send("What's wrong? If you ask for help in the form of a question, I might be able to solve your problem."));
dialog.matches('pin', builder.DialogAction.send('Hello!!!\n\n How can i help you?'));
dialog.matches('ys', builder.DialogAction.send('Do i need to help you with anything more?'));
dialog.matches('n', builder.DialogAction.send('Okey!!'));
dialog.matches('bb', builder.DialogAction.send('It was a great pleasure talking to you.\n\n have nice day'));

dialog.matches('hru',[
    function (session) {
		
        session.send("I'm cool like a fish in the pool");    //Very well, thanks.
		builder.Prompts.text(session, "what about you?");
		
		
	},
	
	 function (session, results) {
		 session.send("That's good.");
        //dialog.matches('fn', builder.DialogAction.send("That's good."));
		//dialog.matches('notgd', builder.DialogAction.send("Keep Calm and Everything Will be Fine"));
		//didialog.onDefault(builder.DialogAction.send//("Keep Calm and Everything Will be Fine"));		
   },
]);
dialog.matches('wiun', builder.DialogAction.send('My name is ZingHR'));
dialog.matches('fn', builder.DialogAction.send("That's good."));
dialog.matches('lv',[
    function (session) {
		
        session.send("Thank you!!\n\nFor appreciating our Product");
		builder.Prompts.text(session, "Want to share more with us?");
		
	},
	function (session, results) {
		
        session.send("Ok...", results.response);
		builder.Prompts.text(session,"Tell me about yourself???");
   },
   function (session, results) {
        session.send("Sounds Good... ", results.response);
		session.send("you can talk to me whenever you want");
		
   },	
]);
dialog.matches('wt', builder.DialogAction.send("I'm talking to you."));
dialog.matches('ht', builder.DialogAction.send("After all i've done for you"));
dialog.matches('fk', builder.DialogAction.send("\n\nI'm Sorry!\n\nI do not deserve this"));
dialog.matches('lgn', builder.DialogAction.send('What issue are you facing with login?\n\n Disable?\n\n Expired?\n\nForgot password? / Locked?'));
dialog.matches('loginExp', builder.DialogAction.send(' Your Login seems to have been blocked for security reasons, since you may not have logged-in to the system for over 60 days. To gain access to your account we would recommend you to contact your internal HR team to reset your password. visit link- http://support.zinghr.com/solution/articles/1000111224-has-your-account-login-expired-'));
dialog.matches('loginDis', builder.DialogAction.send('Your account has been disabled because you may have exceeded the number of incorrect login attempts. Please click on the "Forgot Password" link (just below on Login Button) to receive your password on the registered Email address. Alternatively you may contact your internal HR team to reset your password.'));
//dialog.matches('loginRe', builder.DialogAction.send('No need to worry......\n\nPlease click on the "Forgot Password" link (just below on Login Button) to receive your password on the registered Email address. Alternatively you may contact your internal HR team to reset your password. visit link- http://support.zinghr.com/solution/articles/1000105734-how-do-i-retrieve-my-password-'));
dialog.matches('loginRe',[
    function (session) {
		
        session.send("No need to worry......");
		session.send('Please click on the "Forgot Password" link (just below on Login Button) to receive your password on the registered Email address. Alternatively you may contact your internal HR team to reset your password. visit link- http://support.zinghr.com/solution/articles/1000105734-how-do-i-retrieve-my-password-');
		
	},
	
]);
dialog.matches('loginIn', builder.DialogAction.send('It seems you are entering the wrong credentials while trying to login. This could be either because of Invalid Companay Code OR Employee ID OR password. Due to security concerns, we cannot reveal the exact error. '));
dialog.matches('cod',builder.DialogAction.send("We are not authorized to share any confidential information of the company it will be requested to contat your internal HR team to check the same."));
dialog.matches('pn', builder.DialogAction.send("What issue you are facing ?\n\n Location not enabled?\n\n Punch in not mapped"));
//dialog.matches('pulo', builder.DialogAction.send("For mobile app:- Please check that location is enabled in your mobile and try again. For web :- Your web browser is not set to allow permission to capture location. Please enable the location permission and reload the page before trying to login.."));
dialog.matches('pulo',[
function (session, args) {
			session.send("For mobile app:- Please check that location is enabled in your mobile and try again. For web :- Your web browser is not set to allow permission to capture location. Please enable the location permission and reload the page before trying to login..");
        builder.Prompts.choice(session, "Are you still having problem?, To Raise a ticket", " Yes|No", { listStyle: builder.ListStyle.button });
    },
    function (session, results) {
       switch (results.response.index) {
            case 0:
            //builder.Prompts.text(session, "What is your name?");
            session.beginDialog('/ensureProfile', session.userData.profile);
                //session.endDialog();
                break;
            case 1:
              session.endDialog();
                break; 
            default:
                session.endDialog();
                break;
        }
    },
   function (session, results) {
        session.userData.profile = results.response;
        session.send('Hello %(name)s! I am working %(company)s! I am facing %(description)s!', session.userData.profile);
        //session.send(session.userData.profile.name);// I am working %(company)s! I am facing %(description)s!', session.userData.profile);
        //createTicket API call
        var http = require('http');

        var data = JSON.stringify({
           "helpdesk_ticket": {
              "description":session.userData.profile.description,
              "subject":session.userData.profile.description,
              "email":session.userData.profile.emailId,
              "priority":1,
              "status":2
          },
          "cc_emails":"rccabhay@gmail.com"
        });

        var options = {
          host: 'support.zinghr.com',
          port: '80',
          path: '/helpdesk/tickets.json',
          method: 'POST',
          headers: {
            "authorization": "Basic c3VwcG9ydEB6aW5naHIuY29tOktSVEAxMDA=",
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': data.length
          }
        };

        var req = http.request(options, function(res) {
          var msg = '';
          res.setEncoding('utf8');
          res.on('data', function(chunk) {
            msg += chunk;
          });
          res.on('end', function() {
            //session.send(JSON.stringify(msg));
            //session.send(utf8.decode(msg.helpdesk_ticket));
            var data = msg.replace(/\\n/g, "");
            data = data.replace(/\\n/g, "");
            data = JSON.parse(data);
            //session.send(data.helpdesk_ticket.display_id);
            session.send('Hello %(name)s!, Your ticket has been raised successfully, Please make note of your ticket Id for reference '+data.helpdesk_ticket.display_id, session.userData.profile );
          });
        });

        req.write(data);
        req.end();

    }
]);
dialog.matches('puma', builder.DialogAction.send("Your employee ID is not configured to be allowed to use the Punch-In functionality of the application. If you think you should be allowed, please contact your internal HR team to get the functionality enabled.."));
dialog.matches('geo', builder.DialogAction.send("You Organisational policy may be restricting you to punch-in only from specific locations. Please try to punch-in from the locations that you are allowed to punch-in from. We recommend you to seek help from your internal HR team to understand which locations you are allowed to punch in from. visit link - http://support.zinghr.com/solution/articles/11000017719-is-your-company-geo-fenced-"));
dialog.matches('lev', builder.DialogAction.send("What issue you are facing with Leave?\n\nHow to apply for leave?\n\nCan I plan/apply for half day leave?\n\nHow do I cancel my applied leave?\n\n How to Regularize My Attendance?"));
dialog.matches('levap', builder.DialogAction.send("To apply leave Just  login to ZING HR. Select month and then go on the date you want to take leave and click on it, so that date will have a tick mark and then select type of leave you want."));
dialog.matches('levhf', builder.DialogAction.send(" For half day Just  login to ZING HR. Select month and then go on the date you want to take half day and click on it, so that date will have a tick mark and then select type of leave you want."));
dialog.matches('levcl', builder.DialogAction.send("You want to cancel leave which is applied and approved for any selected date.Cilck on “My Transaction History. Click on “Approved” tab. You can search the leave you want to cancel & simply click on “View” for which leave you need to cancel leave."));
dialog.matches('levreg', builder.DialogAction.send("1.Select the dates you want to apply regularization for\n\n2.Click on the “Regularize“ option on your 'My Time And Attendance' screen\n\n3.After clicking on regularize, the dates will automatically come in the regularization application screen as shown below and now you can click on “Apply Now”.\n\n4.Your regularization will be submitted successfully."));
dialog.onDefault(builder.DialogAction.send("I'm sorry I didn't understand what you said.\n\n I can help you with login, punch in and leave related issues?"));

dialog.matches('tk',[
function (session, args) {
			
        builder.Prompts.choice(session, "Was your issue not solved ?, To Raise a ticket", " Yes|No", { listStyle: builder.ListStyle.button });
    },
    function (session, results) {
       switch (results.response.index) {
            case 0:
            //builder.Prompts.text(session, "What is your name?");
            session.beginDialog('/ensureProfile', session.userData.profile);
                //session.endDialog();
                break;
            case 1:
              session.endDialog();
                break; 
            default:
                session.endDialog();
                break;
        }
    },
   function (session, results) {
        session.userData.profile = results.response;
        session.send('Hello %(name)s! I am working %(company)s! I am facing %(description)s!', session.userData.profile);
        //session.send(session.userData.profile.name);// I am working %(company)s! I am facing %(description)s!', session.userData.profile);
        //createTicket API call
        var http = require('http');

        var data = JSON.stringify({
           "helpdesk_ticket": {
              "description":session.userData.profile.description,
              "subject":session.userData.profile.description,
              "email":session.userData.profile.emailId,
              "priority":1,
              "status":2
          },
          "cc_emails":"rccabhay@gmail.com"
        });

        var options = {
          host: 'support.zinghr.com',
          port: '80',
          path: '/helpdesk/tickets.json',
          method: 'POST',
          headers: {
            "authorization": "Basic c3VwcG9ydEB6aW5naHIuY29tOktSVEAxMDA=",
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': data.length
          }
        };

        var req = http.request(options, function(res) {
          var msg = '';
          res.setEncoding('utf8');
          res.on('data', function(chunk) {
            msg += chunk;
          });
          res.on('end', function() {
            //session.send(JSON.stringify(msg));
            //session.send(utf8.decode(msg.helpdesk_ticket));
            var data = msg.replace(/\\n/g, "");
            data = data.replace(/\\n/g, "");
            data = JSON.parse(data);
            //session.send(data.helpdesk_ticket.display_id);
            session.send('Hello %(name)s!, Your ticket has been raised successfully, Please make note of your ticket Id for reference '+data.helpdesk_ticket.display_id, session.userData.profile );
          });
        });

        req.write(data);
        req.end();

    }
]);


//-------------------------------------------------------------------------------------------------------------------------
bot.dialog('/ensureProfile', [
    function (session, args, next) {
        session.dialogData.profile = args || {};
        if (!session.dialogData.profile.name) {
            builder.Prompts.text(session, "What's your name?");
        } else {
            next();
        }
    },
    function (session, results, next) {
        if (results.response) {
            session.dialogData.profile.name = results.response;
        }
        if (!session.dialogData.profile.company) {
            builder.Prompts.text(session, "What company do you work for?");
        } else {
            next();
        }
    },
    function (session, results, next) {
        if (results.response) {
            session.dialogData.profile.company = results.response;
        }
        if (!session.dialogData.profile.emailId) {
            builder.Prompts.text(session, "What is your email Id ?");
        } else {
            next();
        }
    },
    function (session, results, next) {
        if (results.response) {
            session.dialogData.profile.emailId = results.response;
        }
        builder.Prompts.text(session, "Please describe your issue ?");
        /*if (!session.dialogData.profile.description) {
            builder.Prompts.text(session, "Please describe your issue ?");
        } else {
            next();
        }*/
    },
    function (session, results) {
        if (results.response) {
            session.dialogData.profile.description = results.response;
        }
        session.endDialogWithResult({ response: session.dialogData.profile });
    }
]); 









//https://docs.botframework.com/en-us/node/builder/chat/IntentDialog/
