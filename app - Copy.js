var restify = require('restify'); //4.5.2017
var builder = require('botbuilder');
//=========================================================
// Bot Setup
//=========================================================
// Setup Restify Server
var server = restify.createServer();
console.log(server);
//var count=0;
//var fnam='';
//server.listen(process.env.port || process.env.PORT || 3978, function () {
server.listen(process.env.port || process.env.PORT || 446, function() {
    console.log('%s listening to %s', server.name, server.url);
});
// Create chat bot -- Production
var connector = new builder.ChatConnector({
    appId: 'a283db0b-953f-4764-969f-55054f4703e6',
    appPassword: 'fTx53JgsrjfhPUtmh0d5JEK'
});
// Create bot and bind to console
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());
// Create LUIS recognizer that points at our model and add it as the root '/' dialog for our Cortana Bot.
var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/b5d92fe2-aba4-4d7b-8283-43b403c2e4e8?subscription-key=e1f9afcba8cd4bd49fd2f4884d61a563&timezoneOffset=0.0&verbose=true&spellCheck=true&q=';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
var instructions = 'Welcome to Zingo.I can help you with ZingHR related queries. \n\n Login issues\n\nPunch in\n\nLeave related issues';
bot.on('conversationUpdate', function(activity) {
    // when user joins conversation, send instructions
    if(activity.membersAdded) {
        activity.membersAdded.forEach(function(identity) {
            if(identity.id === activity.address.bot.id) {
                var reply = new builder.Message().address(activity.address).text(instructions);
                bot.send(reply);
            }
        });
    }
});
if('1cc1049c042d4bee804e7bca51e51c08' === 'true') {
    bot.use({
        botbuilder: function(session, next) {
            spellService.getCorrectedText(session.message.text).then(function(text) {
                session.message.text = text;
                next();
            }).catch(function(error) {
                console.error(error);
                next();
            });
        }
    });
}
bot.dialog('/', dialog);
dialog.matches('zing', builder.DialogAction.send("We are ZingHR group of Cnergyis.\n\nZingHR empowers people and businesses with Enterprise Cloud Application Solutions for Human Capital Management"));
dialog.matches('hp', [
    function(session) {
        session.send(User);
        session.send("What's wrong?");
        session.send('If you ask for help in the form of a question, I might be able to solve your problem.');
    },
]);
//http://www.clipartbay.com/cliparts/disney-donald-duck-cartoon-characters-v19jvdv.jpg
//dialog.matches('pin', builder.DialogAction.send('Hello!!!\n\n How can i help you?'));
dialog.matches('pin', [
	

    function(session) {
		var UserName = session.message.address.user.name;
		var re = UserName.slice(3);
        session.send("Hello "+ re +"\n\nHow can I help you?");
        builder.Prompts.choice(session, "", " Punchin issues|Login issues|Apply Leave|Leave Balance|Holiday List", { listStyle: builder.ListStyle.button });
    },
    function(session, results) {
        switch(results.response.index) {
            case 0:
                session.beginDialog('/puloo');
                session.endDialog();
                break;
            case 1:
                session.beginDialog('/');
				session.endDialog();
                break;
            case 2:
                session.beginDialog('/lev');
				session.endDialog();
                break;
            case 3:
               // session.send("If you wish to cancel this generation process, type 'cancel' anytime");
                session.beginDialog('/aplylev');
				session.endDialog();
                break;
				case 4:
               // session.send("If you wish to cancel this generation process, type 'cancel' anytime");
                session.beginDialog('/holiday');
				session.endDialog();
                break;
            default:
                session.endDialog();
                break;
        }
    },
]);
dialog.matches('pol', [
    function(session) {
        session.send("No need to ask people here and there for HR policies, click on HR Hand book , it’s a tab that enables you to know the HR rules better.");
        session.send('1.Click on HR Hand book to view HR rules on dashboard');
        session.send("2.Click on the category that you want to know the policy - like HR related.");
        session.send('3.You can even download HR hand book.');
        var pic2 = new builder.Message(session).attachments([{
            contentType: "image/jpeg",
            contentUrl: "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/1013815694/original/Untitled.png?1419578105"
        }]);
        session.endDialog(pic2);
    },
]);
dialog.matches('bb', [
    function(session) {
        session.send("It was a great talking to you .\n\nHave a nice day");
    },
]);
dialog.matches('pslip', builder.DialogAction.send('We are not authorized to share any confidential information of the company it will be requested to contact your internal HR team to check the same.'));
dialog.matches('ys', builder.DialogAction.send('What can I do for you today?'));
dialog.matches('n', builder.DialogAction.send('Ok'));
dialog.matches('Sorry', builder.DialogAction.send("It's okay."));
dialog.matches('Thank', builder.DialogAction.send("Welcome!"));
dialog.matches('Zingo', builder.DialogAction.send("Zingo is a project of ZingHR"));
//dialog.matches('bb', builder.DialogAction.send("It was a great talking to you " + fnam + ".\n\nHave a nice day"));
//dialog.matches('inv', builder.DialogAction.send("Abhay Choudhary  from ZingHR"));
dialog.matches('hrr', builder.DialogAction.send("We don't have the information of your internal HR"));
dialog.matches('num', builder.DialogAction.send("022 61475400 / 412 / 413"));
dialog.matches('ad', builder.DialogAction.send("Office Address : 12th Floor, Quantum tower, Chincholi Bunder Road, Malad (West). Mumbai - 400 064. India"));
dialog.matches('br', builder.DialogAction.send("I hope you get bored of being bored, because being bored is so boring!"));
dialog.matches('cl', [
    function(session) {
        session.send("of course");
        session.send('you can call me on weekdays from(9am to 7pm)');
    },
]);
dialog.matches('hap', builder.DialogAction.send("you seem to be happy"));
dialog.matches('hru', [
    function(session) {
      //TOKEN HACKED
       session.send("==========="+JSON.stringify(session.message.address));
       session.send("==========="+session.message.address.user.token);
       var UserName = session.message.address.user.name;
       var Token = session.message.address.user.token;
       var TokenValue = session.message.address.user.tokenValue;
       var empCode = session.message.address.user.empCode;
       var empPswd =  session.message.address.user.empPswd;
        //console.log(session.userData.address.user);
        session.send("I'm cool like a fish in the pool"); //Very well, thanks.
        session.send("what about you ?");

    },
]);
dialog.matches('decl', builder.DialogAction.send("Tax Declaration"));
dialog.matches('QUESTION', builder.DialogAction.send("I was born ready.\n\njust go on.."));
dialog.matches('wiun', builder.DialogAction.send('My name is ZingHR'));
dialog.matches('fn', builder.DialogAction.send("That's good."));
dialog.matches('lv', [
    function(session) {
        session.send("==========="+session.userData);
        session.send("Thank you !!\n\nFor appreciating our Product");
        builder.Prompts.text(session, "Want to share more with us?");
    },
    function(session, results) {
        console.log(session.User);
        session.send("Ok...%s", results.response);
        console.log("Ok.." + results.response);
        builder.Prompts.text(session, "Tell me about yourself???");
    },
    function(session, results) {
        session.send("Sounds Good... ", results.response);
        session.send("you can talk to me whenever you want");
    },
]);
//dialog.matches('tm', builder.DialogAction.send("%s"));
dialog.matches('wt', builder.DialogAction.send("I'm talking to you."));
dialog.matches('wttk', builder.DialogAction.send("A ticket (also known as an incident ticket or trouble ticket) is an email / chat, usually contained within a issue tracking system which contains information about support interventions made by customer support staff "));
dialog.matches('ht', builder.DialogAction.send("After all i've done for you"));
dialog.matches('fk', builder.DialogAction.send("I'm Sorry!\n\nThat’s not a nice thing to say"));
dialog.matches('lgn', [
    function(session) {
        session.send("Ok, No need to worry..");
        session.send('What is the issue that are you facing-\n\nYour login got disabled?\n\nYour login expired?\n\nYou forget your password?\n\nYour account got locked?');
    },
]);
// builder.DialogAction.send('What issue are you facing with login?\n\n Disable?\n\n Expired?\n\nForgot password? / Locked?'));
dialog.matches('loginExp', builder.DialogAction.send(' Your Login seems to have been blocked for security reasons, since you may not have logged-in to the system for over 60 days. To gain access to your account we would recommend you to contact your internal HR team to reset your password. visit link- http://support.zinghr.com/solution/articles/1000111224-has-your-account-login-expired-'));
dialog.matches('loginDis', builder.DialogAction.send('Your account has been disabled because you may have exceeded the number of incorrect login attempts. Please click on the "Forgot Password" link (just below on Login Button) to receive your password on the registered Email address. Alternatively you may contact your internal HR team to reset your password.'));
//dialog.matches('loginRe', builder.DialogAction.send('No need to worry......\n\nPlease click on the "Forgot Password" link (just below on Login Button) to receive your password on the registered Email address. Alternatively you may contact your internal HR team to reset your password. visit link- http://support.zinghr.com/solution/articles/1000105734-how-do-i-retrieve-my-password-'));
dialog.matches('loginRe', [
    function(session) {
        session.send("No need to worry......");
        session.send('Please click on the "Forgot Password" link (just below on Login Button) to receive your password on the registered Email address. Alternatively you may contact your internal HR team to reset your password. visit link- http://support.zinghr.com/solution/articles/1000105734-how-do-i-retrieve-my-password-');
    },
]);
dialog.matches('loginIn', builder.DialogAction.send('It seems you are entering the wrong credentials while trying to login. This could be either because of Invalid Companay Code OR Employee ID OR password. Due to security concerns, we cannot reveal the exact error. '));
dialog.matches('cod', builder.DialogAction.send("We are not authorized to share any confidential information of the company it will be requested to contact your internal HR team to check the same."));
dialog.matches('pn', [
    function(session) {
        session.send("Ok, No need to worry..");
        session.send('What is the issue that are you facing-\n\nIs your browser location enabled?\n\nIs punchin mapped to you?');
    },
]);
//dialog.matches('pulo', builder.DialogAction.send("For mobile app:- Please check that location is enabled in your mobile and try again. For web :- Your web browser is not set to allow permission to capture location. Please enable the location permission and reload the page before trying to login.."));
dialog.matches('pulo', [
    function(session) {
        session.beginDialog('/puloo');
    },
]);
bot.dialog('/puloo', [
    function(session) {
        session.send("For mobile app- Please verify if your GPS is enabled in high accuracy mode and try again.");
     	 session.send("For web- Please check if you have enabled browser location sharing. If not please enable browser location sharing, reload page and try again");
    },
]);

dialog.matches('puma', builder.DialogAction.send("Your employee ID is not configured to be allowed to use the Punch-In functionality of the application. If you think you should be allowed, please contact your internal HR team to get the functionality enabled."));
dialog.matches('geo', builder.DialogAction.send("You Organisational policy may be restricting you to punch-in only from specific locations. Please try to punch-in from the locations that you are allowed to punch-in from. We recommend you to seek help from your internal HR team to understand which locations you are allowed to punch in from. visit link - http://support.zinghr.com/solution/articles/11000017719-is-your-company-geo-fenced-"));
dialog.matches('lev', builder.DialogAction.send("What issue you are facing with Leave?\n\nHow to apply for leave?\n\nCan I plan/apply for half day leave?\n\nHow do I cancel my applied leave?\n\n How to Regularize My Attendance?"));
//dialog.matches('levap', builder.DialogAction.send("To apply for leave, login to ZingHR and select date for which you wish to apply leave for. click on it, so that date will have a tick mark and then select type of leave you want."));
dialog.matches('levhf', builder.DialogAction.send(" For half day Just  login to ZING HR. Select month and then go on the date you want to take half day and click on it, so that date will have a tick mark and then select type of leave you want."));
dialog.matches('levcl', builder.DialogAction.send("You want to cancel leave which is applied and approved for any selected date.Cilck on “My Transaction History. Click on “Approved” tab. You can search the leave you want to cancel & simply click on “View” for which leave you need to cancel leave."));
dialog.matches('levtb', builder.DialogAction.send("your leave group is not correctly map, We request you to please contact your Internal HR Team to help you out"));
dialog.matches('levreg', builder.DialogAction.send("1.Select the dates you want to apply regularization for\n\n2.Click on the “Regularize“ option on your 'My Time And Attendance' screen\n\n3.After clicking on regularize, the dates will automatically come in the regularization application screen as shown below and now you can click on “Apply Now”.\n\n4.Your regularization will be submitted successfully."));
dialog.matches('ema', builder.DialogAction.send("support@zinghr.com"));
//dialog.onDefault(builder.DialogAction.send("I'm sorry I didn't understand what you said.\n\n I can help you with login, punch in and leave related issues?"));
dialog.onDefault((session) => {
    session.send('Sorry, I did not understand \'%s\'. Type \'help\' if you need assistance.\n\n I can help you with login, punch in and leave related issues', session.message.text);
    session.send("I can help you to raise a ticket");
});
//dialog.matches('shlev', builder.DialogAction.send("If you want to know  your remaining leave balance. please login"));
dialog.matches('tk', [
    function(session) {
        var msg = new builder.Message(session).attachments([{
            contentType: "image/jpeg",
            contentUrl: "https://api.zinglifedocs.com/res/chatbot/notification_icon.png"
        }]);
        session.endDialog(msg);
        session.beginDialog('/ticket');
        // builder.Prompts.choice(session, 'Was your issue solved ?, To Raise a ticket', " Yes|No", { listStyle: builder.ListStyle.button });
    }, //builder.Prompts.choice(session, "Please Choose issue type:", 'Unable to login|Unable to Punchin|Quit');
    //builder.Prompts.choice(session, 'Was your issue solved ?, To Raise a ticket', " Yes|No", { listStyle: builder.ListStyle.button });
]);
bot.dialog('/ticket', [
    function(session) {
        builder.Prompts.choice(session, 'Was your issue resolved? Do you wish to raise a ticket?', " Yes|No", { listStyle: builder.ListStyle.button });
    },
    function(session, results) {
        switch(results.response.index) {
            case 0:
                session.send("If you wish to cancel ticket generation process, type 'cancel' anytime");
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
    function(session, results) {
        session.userData.profile = results.response;
        var uppercaseFirstLetter = session.userData.profile.name.charAt(0).toUpperCase();
        var stringWithoutFirstLetter = session.userData.profile.name.slice(1).toLowerCase();
        var fullname = uppercaseFirstLetter + stringWithoutFirstLetter;
        session.send("Hello " + fullname + "!");
        session.send('Company %(company)s!\n\n I am facing "%(description)s!"', session.userData.profile);
        //session.send(session.userData.profile.name);// I am working %(company)s! I am facing %(description)s!', session.userData.profile);
        //createTicket API call
        var http = require('http');
        var data = JSON.stringify({
            "helpdesk_ticket": {
                "description": session.userData.profile.description,
                "subject": session.userData.profile.description,
                "email": session.userData.profile.emailId,
                "priority": 1,
                "status": 2
            },
            "cc_emails": "support@zinghr.com"
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
                //session.send(""+uppercaseFirstLetter+""+stringWithoutFirstLetter+"!");
                session.send("" + fullname + "! Your ticket has been raised successfully, Please make note of your ticket Id for reference \n\n" + data.helpdesk_ticket.display_id, session.userData.profile);
                session.endDialog();
                //delete session.userData.profile;
                session.endDialog();
            });
        });
        req.write(data);
        req.end();
    }
]).cancelAction('Ticket', "Ticket canceled", {
    matches: /^cancel/i,
    confirmPrompt: "Are you sure?"
});
//-------------------------------------------------------------------------------------------------------------------------
bot.dialog('/ensureProfile', [
    function(session, args, next) {
        session.dialogData.profile = args || {};
        if(!session.dialogData.profile.name) {
            builder.Prompts.text(session, "What's your name?");
        } else {
            next();
        }
    },
    function(session, results, next) {
        if(results.response) {
            session.dialogData.profile.name = results.response;
        }
        if(!session.dialogData.profile.company) {
            builder.Prompts.text(session, "What company do you work for?");
        } else {
            next();
        }
    },
    function(session, results, next) {
        if(results.response) {
            session.dialogData.profile.company = results.response;
        }
        if(!session.dialogData.profile.emailId) {
            builder.Prompts.text(session, "What is your email id ?");
        } else {
            next();
        }
    },
    function(session, results, next) {
        if(results.response) {
            session.dialogData.profile.emailId = results.response;
        }
        builder.Prompts.text(session, "Please describe your issue ?");
        /*if (!session.dialogData.profile.description) {
            builder.Prompts.text(session, "Please describe your issue ?");
        } else {
            next();
        }*/
    },
    function(session, results) {
        if(results.response) {
            session.dialogData.profile.description = results.response;
        }
        session.endDialogWithResult({ response: session.dialogData.profile });
    }
])
dialog.matches('clm', [
    function(session) {
        session.send("It is now easy to apply claims. There is no need to fill paper forms, keeps a track of the same with technology. ZING HR  ux allows applying your claims in a smooth way");
        session.send("Step 1 : Click on “Apply Claim” ");
        session.send("Step 2 : Fill the Bill Date, Bill No, Bill Amount, Claim Amount and Month Details.");
        session.send("Step 3 : Click on “Save as Draft” or “Apply Now” to apply claims.");
        var msg3 = new builder.Message(session).attachments([{
            contentType: "image/jpeg",
            contentUrl: "https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/1013814386/original/Untitled.png?1419572289"
        }]);
        session.endDialog(msg3);
    }
]);
dialog.matches('own', [
    function(session) {
        session.send("ZingHR");
        // Ask the user to select an item from a carousel.
        var msg = new builder.Message(session).attachmentLayout(builder.AttachmentLayout.carousel).attachments([
            new builder.HeroCard(session).title("Prasad Rajappan").subtitle("Founder & MD Prasad Rajappan is an innovator with an entrepreneurial spirit. He brings over 25 years of experience in conceptualising ideas before their time and building on them successfully. He founded Cnergyis and has held leading positions at reputed companies like Reliance Industries, Ernst & Young, and Mahindra & Mahindra.").images([
                builder.CardImage.create(session, "https://pbs.twimg.com/profile_images/724846767511068673/zQKZCRY4.jpg").tap(builder.CardAction.showImage(session, "https://pbs.twimg.com/profile_images/724846767511068673/zQKZCRY4.jpg")),
            ]),
            new builder.HeroCard(session).title("Vivek S Tikoo").subtitle("Director – Strategy & Business Viveek Tikoo is a strategist and analyst leading Marketing at ZingHR.\n\nHe brings 22 years of experience in cross-functional management leadership across domains.").images([
                builder.CardImage.create(session, "http://pictures.wayn.com/photos/180c/059324210_420526068.jpg").tap(builder.CardAction.showImage(session, "http://pictures.wayn.com/photos/180c/059324210_420526068.jpg")),
            ]),
            new builder.HeroCard(session).title("Ravi Bajaj").subtitle("Director Technology & Delivery Ravi Bajaj is a Trainer and an IT Content expert with over 20 years of entrepreneurial enthusiasm. He has initiated Design and Development of Software Applications. He has a rich experience in leading positions with corporates like Enron and BITS. He has also founded CREST Computer Education, before co-founding Cnergyis.").images([
                builder.CardImage.create(session, "https://pbs.twimg.com/profile_images/648772671900155904/i88L-5Cu.jpg").tap(builder.CardAction.showImage(session, "https://pbs.twimg.com/profile_images/648772671900155904/i88L-5Cu.jpg"))
            ]),
            new builder.HeroCard(session).title("Venkat Balan").subtitle("Director – Process Quality & HR Venkat Balan has over 20 years of experience and immense technical and functional knowledge. His admirable commitment and passion towards his work has made him an inspiring leader across companies. He has helped organizations streamline their Process Quality and HR operations for companies such as Godrej, Birla, Patni and Quinnox.").images([
                builder.CardImage.create(session, "https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/7/000/1c9/0a0/1238d2e.jpg").tap(builder.CardAction.showImage(session, "https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/7/000/1c9/0a0/1238d2e.jpg"))
            ])
        ]);
        session.endDialog(msg);
        // session.send(session, msg, "select:100|select:101|select:102|select:103");
    }
]);
dialog.matches('cnf', builder.DialogAction.send("According to our organization policy you will get confirmed after 6 months from the date of joining.\n\n The confirmation letter will be handed over to you by the HR Team and the mail for the same will be send on your registered email id."));
dialog.matches('wrk', builder.DialogAction.send('According to our organization policy, work from home option is available as per the work requirment and approval of your respective reporting manager'));
dialog.matches('shft', builder.DialogAction.send('The detailed information about your shift will be provided by your internal HR Team'));
dialog.matches('sys', builder.DialogAction.send("Please visit Tech Link for more info. If you want I can raise a ticket for the same."));
dialog.matches('jk', [
    function(session) {
        session.send("How can you tell the difference between a chemist and a plumber?");
        session.send('Ask them to pronounce “unionized.”');
    },
]);
dialog.matches('shlev',[
function(session) {
        session.beginDialog('/aplylev');
    },
		
]);
bot.dialog('/aplylev',[
function (session) {
	
	var UserName = session.message.address.user.name;
       var Token = session.message.address.user.token;
       var TokenValue = session.message.address.user.tokenValue;
       var empCode = session.message.address.user.empCode;
       var empPswd =  session.message.address.user.empPswd;
	   
	
	
		var http = require("https");
		//var cookies = require("cookies");
		
		
  

var options = {
  "method": "POST",
  "hostname": "dev.zinghr.com",
  "port": null,
  "path": "/mobile/route/Auth/Login",
  "headers": {
    "content-type": "application/json",
    "cache-control": "no-cache",
    "postman-token": "339064b9-3332-844f-2af6-e3c8f7e8554f"
  }
};
		var data = JSON.stringify(
{ "SubscriptionName":TokenValue,
  "Empcode": empCode,
  "Password": empPswd,
  "Latitude": 1.1,
  "Longitude": 1.1,
  "formattedAddress": "not_required",
  "DeviceID":" ",
  "applicationVersion": "65" });

var req = http.request(options, function (res) {
  var chunks = [];
  
											var setcookie = res.headers["set-cookie"];

											 if ( setcookie ) {
											  setcookie.forEach(
												function ( cookiestr ) {
													
												  //console.log( "COOKIE::::::::::::::" + cookiestr );
												 	}
											  );
											}
											
										//console.log( "COOKIE::::::::::::::" + setcookie);
										//session.send( "COOKIE::::::::::::::" + setcookie );
										
										var cook=setcookie.toString();
										//data = data.replace(/\\n/g, "");
										//cook=cook.replace(/path=/g, "");
										var re = cook.slice(18,42);
										//console.log( "COOKIE:dfgd:::::::::::::" + re);
										//session.send(res);
										
											
											
											//ASP.NET_SessionId=odfwjzd4efbjapqjvzuecx2s;
											
											
											
											
											
											
											
											//session.send(""+setcookie);
											//session.send(""+setcookie);
									//	var cook=session.userData.setcookie;
										//session.send(""+cook);
										
		/*var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;*/
			
										
										
										
										
										
										
										
										
  res.on("data", function (chunk) {
    chunks.push(chunk);
  });
res.on("end", function () {
    var body = Buffer.concat(chunks).toString();
	
	var contact = JSON.parse(body);
	
	//res.cookie(body);
	var msg=contact.Message;

	
	
	var codeval=parseInt(contact.Code);
	
	 
	
	

 {
       if (codeval==0) 
		{
	   
						  session.send(msg);
						  
						  delete session.userData.prof;
						  session.beginDialog('/ens');
			
		}
		else if(codeval==1)
		{
						//---------------------parse table3-------------------------
							var Table3=JSON.parse(contact.Table3);
							var fname=(Table3.FirstName);
							var lname=(Table3.LastName);
							session.userData.fname;
						
						
						//---------------------parse table6-------------------------------
							
							var Table6=JSON.parse(contact.Table6);
							var  token=Table6[0].Token;
						
			
						session.send(""+fname+" your leave balance");
						//session.send(token);
						//session.send(""+codeval);
						
						//session.send(token);
						
						var http = require("https");

						var options = {
						  "method": "POST",
						  "hostname": "dev.zinghr.com",
						  "port": null,
						  "path": "/mobile/route/Home/GetAttendanceByEmpCodeAndDate",
						  "headers": {
							"cookie":"ASP.NET_SessionId="+re+"; AuthToken="+token+";",
							"content-type": "application/json",
							"cache-control": "no-cache",
							"postman-token": "509ae217-edb2-e544-89fb-e8f7aabb090c"
						  }
						};

								var req = http.request(options, function (res) {
								  var chunks = [];

								  res.on("data", function (chunk) {
									chunks.push(chunk);
								  });

								  res.on("end", function () {
									var body = Buffer.concat(chunks);
									var body = Buffer.concat(chunks).toString();
	
									var contact = JSON.parse(body);
									var b=contact.DO.Response;
									var c=b[1];
									//var d=c[0];
									session.send("All Purpose Leaves\n\n"+c[0].Option1);
									session.send("Paternity Leaves\n\n"+c[1].Option1);
									session.send("Short Leave\n\n"+c[2].Option1);
									session.send("CompOff Leaves\n\n"+c[3].Option1);
									delete session.userData.prof;
									session.endDialog();
									
									
									
								  });
								});

								req.write(JSON.stringify({ FromDate: '2016-03-01', TokenValue: 'Product' }));
								req.end();
						
						
 
						

						

				  
		}
		
		else if(codeval==2)
		{
						//session.send(""+codeval);
						  session.send(msg);
						  delete session.userData.prof;
						  session.beginDialog('/ens');
		}
		
 }
   
	



	
  });
  
  
 
  
  
});


  req.write(data);
req.end();
			
		},
		
		
		
	
		
])

.cancelAction('shlev', "leave balance canceled", { 
    matches: /^cancel/i,
    confirmPrompt: "Are you sure?"

});
//---------------------------------------------------------------
/////////////////
/*var restify = require('restify');
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
    appId: 'ed03374b-9add-4039-a037-30d47d27d0cf',
    appPassword: 'NZHwW9vB9PdojhvGBQpha6d'
});

// Create bot and bind to console

*/
/////////
//-------------------------------------------------------
bot.dialog('/ensure', [
        function(session, args, next) {
            session.dialogData.prof = args || {};
            if(!session.dialogData.prof.company) {
                builder.Prompts.text(session, "Company?");
            } else {
                next();
            }
        },
        function(session, results, next) {
            if(results.response) {
                session.dialogData.prof.company = results.response;
            }
            if(!session.dialogData.prof.empcode) {
                builder.Prompts.text(session, "EMPCODE");
            } else {
                next();
            }
        },
        function(session, results, next) {
            if(results.response) {
                session.dialogData.prof.empcode = results.response;
            }
            if(!session.dialogData.prof.pass) {
                builder.Prompts.text(session, "password");
            } else {
                next();
            }
        },
        function(session, results) {
            if(results.response) {
                session.dialogData.prof.pass = results.response;
            }
            session.endDialogWithResult({ response: session.dialogData.prof });
        }
    ])
    //https://docs.botframework.com/en-us/node/builder/chat/IntentDialog/

	
	
	
	
	
	
	
	
	
	
	
	
	//------------------------------------------------------------------
dialog.matches('levap', [
    function(session) {
        builder.Prompts.choice(session, 'which type of leave you want to apply', " Short Leave|Paternity Leave|CompOff Leave|All Purpose Leave", { listStyle: builder.ListStyle.button });
    }, 
	function(session, results) {
        switch(results.response.index) {
            case 0:
                session.beginDialog('/lev');
                //session.endDialog();
                break;
            case 1:
                session.beginDialog('/');
                break;
            case 2:
                session.beginDialog('/');
                break;
            case 3:
               // session.send("If you wish to cancel this generation process, type 'cancel' anytime");
                session.beginDialog('/');
                break;
            default:
                session.endDialog();
                break;
        }
    },//builder.Prompts.choice(session, "Please Choose issue type:", 'Unable to login|Unable to Punchin|Quit');
    //builder.Prompts.choice(session, 'Was your issue solved ?, To Raise a ticket', " Yes|No", { listStyle: builder.ListStyle.button });
]);	
bot.dialog('/lev', [
function(session) {
	delete session.userData.pr;
 session.beginDialog('/levens', session.userData.pr);    },
   function (session, results) {
	
	session.userData.pr = results.response;
	var UserName = session.message.address.user.name;
       var Token = session.message.address.user.token;
       var TokenValue = session.message.address.user.tokenValue;
       var empCode = session.message.address.user.empCode;
       var empPswd =  session.message.address.user.empPswd;
	   
		var http = require("https");
		//var cookies = require("cookies");
		//session.send(session.userData.pr.dat);
		//session.send(session.userData.pr.leav);
		
		
		
  

var options = {
  "method": "POST",
  "hostname": "dev.zinghr.com",
  "port": null,
  "path": "/mobile/route/Auth/Login",
  "headers": {
    "content-type": "application/json",
    "cache-control": "no-cache",
    "postman-token": "339064b9-3332-844f-2af6-e3c8f7e8554f"
  }
};
		var data = JSON.stringify(
{ "SubscriptionName":TokenValue,
  "Empcode": empCode,
  "Password": empPswd,
  "Latitude": 1.1,
  "Longitude": 1.1,
  "formattedAddress": "not_required",
  "DeviceID":" ",
  "applicationVersion": "65" });

var req = http.request(options, function (res) {
  var chunks = [];
  
											var setcookie = res.headers["set-cookie"];

											 if ( setcookie ) {
											  setcookie.forEach(
												function ( cookiestr ) {
													
												  //console.log( "COOKIE::::::::::::::" + cookiestr );
												 	}
											  );
											}
											
										//console.log( "COOKIE::::::::::::::" + setcookie);
										//session.send( "COOKIE::::::::::::::" + setcookie );
										
										var cook=setcookie.toString();
										//data = data.replace(/\\n/g, "");
										//cook=cook.replace(/path=/g, "");
										var re = cook.slice(18,42);
										//console.log( "COOKIE:dfgd:::::::::::::" + re);
										//session.send(res);
										
											
											
											//ASP.NET_SessionId=odfwjzd4efbjapqjvzuecx2s;
											
											
											
											
											
											
											
											//session.send(""+setcookie);
											//session.send(""+setcookie);
									//	var cook=session.userData.setcookie;
										//session.send(""+cook);
										
		/*var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;*/
			
										
										
										
										
										
										
										
										
  res.on("data", function (chunk) {
    chunks.push(chunk);
  });
res.on("end", function () {
    var body = Buffer.concat(chunks).toString();
	
	var contact = JSON.parse(body);
	
	//res.cookie(body);
	var msg=contact.Message;

	
	
	var codeval=parseInt(contact.Code);
	
	 
	
	

 {
       if (codeval==0) 
		{
	   
						  session.send(msg);
						  
						  delete session.userData.pr;
						  session.beginDialog('/levens');
			
		}
		else if(codeval==1)
		{
						//---------------------parse table3-------------------------
							var Table3=JSON.parse(contact.Table3);
							var fname=(Table3.FirstName);
							var lname=(Table3.LastName);
						
						
						//---------------------parse table6-------------------------------
							
							var Table6=JSON.parse(contact.Table6);
							var  token=Table6[0].Token;
						
			
						session.send('Hey ' +fname);
						session.send("Leave applied successfully "+session.userData.pr.leav+" for "+session.userData.pr.dat);
						delete session.userData.pr;
						//session.send(token);
						//session.send(""+codeval);
						
						//session.send(token);
						

						

						  
						

						

						
						
 
						

						

			  
		}
		
		else if(codeval==2)
		{
						//session.send(""+codeval);
						  session.send(msg);
						  delete session.userData.pr;
						  session.beginDialog('/levens');
		}
		
 }
   
	



	
  });
  
  
 
  
  
});


  req.write(data);
req.end();
			
		},
		
		
		
	
		
])
.cancelAction('shlev', "leave balance canceled", { 
    matches: /^cancel/i,
    confirmPrompt: "Are you sure?"

});
		
		
//--------------------------------------------------------------
bot.dialog('/levens', [
    function(session, args, next) {
        session.dialogData.pr = args || {};
        if(!session.dialogData.pr.dat) {
            builder.Prompts.text(session, "Please enter leave date(dd/mm/yyyy)");
        } else {
            next();
        }
    },
    function(session, results, next) {
        if(results.response) {
            session.dialogData.pr.dat = results.response;
        }
        if(!session.dialogData.pr.leav) {
            builder.Prompts.text(session, "Leave Type");
        } else {
            next();
        }
    },
    
    function(session, results) {
        if(results.response) {
            session.dialogData.pr.leav = results.response;
        }
        session.endDialogWithResult({ response: session.dialogData.pr });
    }
])

bot.dialog('/holiday', [
function(session) {
	
	var UserName = session.message.address.user.name;
       var Token = session.message.address.user.token;
       var TokenValue = session.message.address.user.tokenValue;
       var empCode = session.message.address.user.empCode;
       var empPswd =  session.message.address.user.empPswd;
	
	var http = require("https");

			var options = {
			  "method": "POST",
			  "hostname": "dev.zinghr.com",
			  "port": null,
			  "path": "/mobile/route/Auth/Login",
			  "headers": {
				"content-type": "application/json",
				"cache-control": "no-cache",
				"postman-token": "174cb39a-a72d-e0da-cb7c-270d88534c9f"
			  }
			};
			req.write(JSON.stringify({ SubscriptionName: TokenValue,
			  Empcode: empCode,
			  Password: empPswd,
			  Latitude: 1.1,
			  Longitude: 1.1,
			  formattedAddress: 'not_required',
			  DeviceID: null,
			  applicationVersion: '65' }));
			req.end();

			var req = http.request(options, function (res) {
			  var chunks = [];
			  
			  var setcookie = res.headers["set-cookie"];

											 if ( setcookie ) {
											  setcookie.forEach(
												function ( cookiestr ) {
													
												  //console.log( "COOKIE::::::::::::::" + cookiestr );
												 	}
											  );
											}
											
										//console.log( "COOKIE::::::::::::::" + setcookie);
										//session.send( "COOKIE::::::::::::::" + setcookie );
										
										var cook=setcookie.toString();
										//data = data.replace(/\\n/g, "");
										//cook=cook.replace(/path=/g, "");
										var re = cook.slice(18,42);

			  res.on("data", function (chunk) {
				chunks.push(chunk);
			  });

			  res.on("end", function () {
				var body = Buffer.concat(chunks);
				console.log(body.toString());
				
				//---------------------------
				var http = require("https");

					var options = {
					  "method": "POST",
					  "hostname": "dev.zinghr.com",
					  "port": null,
					  "path": "/mobile/route/Home/HolidayDetails",
					  "headers": {
						"content-type": "application/json",
						"cookie": "ASP.NET_SessionId="+re+"; AuthToken="+token+";",
						"cache-control": "no-cache",
						"postman-token": "e31d31e0-460b-d4b8-ffdd-cdcbdfe53e94"
					  }
					};

					var req = http.request(options, function (res) {
					  var chunks = [];

					  res.on("data", function (chunk) {
						chunks.push(chunk);
					  });

					  res.on("end", function () {
						var body = Buffer.concat(chunks);
						session.send(body.toString());
					  });
					});

					req.write(JSON.stringify({ LeaveYear: '2017',
					  applicationVersion: '67',
					  MobileAppVersion: '67' }));
					req.end();
				
				
				
				
				
				
				
			  });
			});

			
},
])


       

	
	
	