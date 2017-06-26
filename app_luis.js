var restify = require('restify');
var builder = require('botbuilder');
//=========================================================
// Bot Setup
//=========================================================
// Setup Restify Server
var server = restify.createServer();
console.log(server);
//server.listen(process.env.port || process.env.PORT || 3978, function () {
server.listen(process.env.port || process.env.PORT || 444, function() {
    console.log('%s listening to %s', server.name, server.url);
});



// Create chat bot -- Production
var connector = new builder.ChatConnector({
    appId: '022f1ba9-3e5a-43e1-89a1-b7e4b43f74f8',
    appPassword: '2GmAzcajHWd14cqV5joYcEH'
});

// Create bot and bind to console
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());


// Create LUIS recognizer that points at our model and add it as the root '/' dialog for our Cortana Bot.
var model = 'https://api.projectoxford.ai/luis/v2.0/apps/9180d89a-8315-4813-a8b5-ceaa243467bf?subscription-key=4611be38cc184e1b9888a10d218322c0&verbose=true';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', dialog);
dialog.matches('ha', builder.DialogAction.send('Somebody is laughing... let me guess you are Male...'));
dialog.matches('hee', builder.DialogAction.send('Somebody is laughing... let me guess you are female...'));
dialog.matches('pin', builder.DialogAction.send('Hello!!!<br><br><br><br><br><br><br><br>How can i help you?'));
dialog.matches('Lgn', builder.DialogAction.send('What issue you are facing?<br><br><br><br>Is it login Disable?<br><br><br><br>Is it Login Expired?<br><br><br><br>Is it login Locked?'));
dialog.matches('LoginExp', builder.DialogAction.send(' Your Login seems to have been blocked for security reasons, since you may not have logged-in to the system for over 60 days. To gain access to your account we would recommend you to contact your internal HR team to reset your password. visit link- http://support.zinghr.com/solution/articles/1000111224-has-your-account-login-expired-'));
dialog.matches('LoginDis', builder.DialogAction.send('Your account has been disabled because you may have exceeded the number of incorrect login attempts. Please click on the "Forgot Password" link (just below on Login Button) to receive your password on the registered Email address. Alternatively you may contact your internal HR team to reset your password.'));
dialog.matches('LoginRe', builder.DialogAction.send('<br><br><br><br>No need to worry......<br><br>Please click on the "Forgot Password" link (just below on Login Button) to receive your password on the registered Email address. Alternatively you may contact your internal HR team to reset your password. visit link- http://support.zinghr.com/solution/articles/1000105734-how-do-i-retrieve-my-password-'));
dialog.matches('LoginIn', builder.DialogAction.send('It seems you are entering the wrong credentials while trying to login. This could be either because of Invalid Companay Code OR Employee ID OR password. Due to security concerns, we cannot reveal the exact error. '));
dialog.matches('lv',[
    function (session) {
		
        session.send("Thank you!!<br><br><br><br>For appreciating our Product");
		builder.Prompts.text(session, "What did you say?");
		
	},
	function (session, results) {
		
        session.send("Really... %s", results.response);
		builder.Prompts.text(session,"Tell me about yourself???");
   },
   function (session, results) {
        session.send("Sounds Good... ", results.response);
		builder.Prompts.text(session,"you can talk to me whenever you want");
		
   },
   function (session, results) {
        session.send(" %s   ........... huuuum", results.response);
		session.send("we are good friend");
		
   },
   
	
]);

/*intents.matches('AddTask', [
    function (session, args, next) {
        var task = builder.EntityRecognizer.findEntity(args.entities, 'TaskTitle');
        if (!task) {
            builder.Prompts.text(session, "What would you like to call the task?");
        } else {
            next({ response: task.entity });
        }
    },
    function (session, results) {
        if (results.response) {
            // ... save task
            session.send("Ok... Added the '%s' task.", results.response);
        } else {
            session.send("Ok");
        }
    }
]);*/
dialog.matches('kkk', builder.DialogAction.send('Do i need to help you with anything more?'));
dialog.matches('n', builder.DialogAction.send('Okey!!'));
//dialog.matches('lv', builder.DialogAction.send('Thank you!!<br><br><br><br>For appreciating our Product'));
dialog.matches('fk', builder.DialogAction.send("<br><br><br><br>I'm Sorry!<br><br><br><br>I do not deserve this"));
dialog.matches('bbb', builder.DialogAction.send('It was a great pleasure talking to you.<br><br><br><br> have nice day'));
dialog.matches('wt', builder.DialogAction.send("I'm talking to you."));
dialog.matches('fn', builder.DialogAction.send("That's good."));
dialog.matches('wh', builder.DialogAction.send('My name is ZingHR'));
dialog.matches('hlp', builder.DialogAction.send("What's wrong? If you ask for help in the form of a question, I might be able to solve your problem."));
dialog.matches('zin', builder.DialogAction.send("We are ZingHR group of Cnergyis.<br><br><br><br>ZingHR empowers people and businesses with Enterprise Cloud Application Solutions for Human Capital Management"));
dialog.matches('pn', builder.DialogAction.send("What issue you are facing?<br><br><br><br>Is it Location not enabled?<br><br><br><br>Is it Punch in not mapped"));
dialog.matches('pnlo', builder.DialogAction.send("For mobile app:- Please check that location is enabled in your mobile and try again. For web :- Your web browser is not set to allow permission to capture location. Please enable the location permission and reload the page before trying to login.."));
dialog.matches('pnma', builder.DialogAction.send("Your employee ID is not configured to be allowed to use the Punch-In functionality of the application. If you think you should be allowed, please contact your internal HR team to get the functionality enabled.."));
dialog.matches('cod', builder.DialogAction.send("We are not authorized to share any confidential information of the company it will be requested to contat your internal HR team to check the same."));
dialog.onDefault(builder.DialogAction.send("I'm sorry I didn't understand. I can only Resolve login queries.<br><br><br><br>For further queries call Toll Free 1800 233 6504"));
dialog.matches('aplylv', builder.DialogAction.send(" apply leave Just  login to ZING HR. Select month and then go on the date you want to take leave and click on it, so that date will have a tick mark and then select type of leave you want."));
dialog.matches('halfdy', builder.DialogAction.send("  half day Just  login to ZING HR. Select month and then go on the date you want to take half day and click on it, so that date will have a tick mark and then select type of leave you want."));
dialog.matches('cnleave', builder.DialogAction.send("You want to cancel leave which is applied and approved for any selected date.Cilck on “My Transaction History. Click on “Approved” tab. You can search the leave you want to cancel & simply click on “View” for which leave you need to cancel leave."));
dialog.matches('lev', builder.DialogAction.send("What kind of leave issue you are facing?<br><br><br><br>How to apply for leave?<br><br><br><br>Can I plan/apply for half day leave?<br><br><br><br>How do I cancel my applied leave?"));
         

//https://docs.botframework.com/en-us/node/builder/chat/IntentDialog/
