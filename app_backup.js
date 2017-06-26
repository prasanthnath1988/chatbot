var restify = require('restify');
var builder = require('botbuilder');
//=========================================================
// Bot Setup
//=========================================================
// Setup Restify Server
var server = restify.createServer();
console.log(server);

//

//server.listen(process.env.port || process.env.PORT || 3978, function () {
server.listen(process.env.port || process.env.PORT || 443, function() {
    console.log('%s listening to %s', server.name, server.url);
});



// Create chat bot -- Production
var connector = new builder.ChatConnector({
    appId: '4490c8ed-3c86-469f-a1f7-fc747d8fe30a',
    appPassword: '31Kc2fdWncfuXvPU4xO07G6'
});

// Create bot and bind to console
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());


// Create LUIS recognizer that points at our model and add it as the root '/' dialog for our Cortana Bot.
var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/192c4407-699f-47b6-82c7-c33e340fbc0f?subscription-key=e1f9afcba8cd4bd49fd2f4884d61a563&timezoneOffset=0.0&verbose=true&q=';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
var instructions = 'Welcome to the HDFC Bot. you can ask about our Policy';




bot.on('conversationUpdate', function (activity) {
    // when user joins conversation, send instructions
    if (activity.membersAdded) {
        activity.membersAdded.forEach(function (identity) {
            if (identity.id === activity.address.bot.id) {
                var reply = new builder.Message()
                    .address(activity.address)
                    .text(instructions);
                bot.send(reply);
            }
        });
    }
});



bot.dialog('/', dialog);


dialog.matches('HDFCBANK ', builder.DialogAction.send("Welcome to HDFC Bank. The Bank believes in providing the highest quality of service to its customers. As a part of the HDFC Bank team your contribution towards achieving this objective is essential. The Terms of Service applies to all employees on the rolls of HDFC Bank excluding those on contract. Employees are expected to be thoroughly familiar with the HR policies of the Bank. Policies and practices may be changed from time to time at the Bank's discretion. All the employees shall, on acceptance of their appointment, deemed to have agreed to these Rules"));

dialog.matches('INDUCTION ',[
    function (session) {
		
        session.send("To help the new employee get inducted into the Bank and get familiar with its culture, history, business, products and people, the employee’s immediate superior would devote enough time and provide him with all the relevant manuals / information which will help him to get acquainted as soon as possible.");
		session.send('However, a formal induction program would also be organized from time to time and would attempt to include all employees who have joined during that period');
		
	},
	
]);
dialog.matches('PROBATION',[
    function (session) {
		
        session.send("Freshmen from graduate/ post-graduate schools would be recruited as Trainees, Executive Trainees (ET) or Management Trainees (MT) depending on the educational Institution / Business School they hail from. The initial training duration would be one year for these categories of employees. On satisfactory completion of training, recorded duly in the Probationary Period Review Form, the trainee shall be confirmed in the services of the Bank.");
		session.send('Management Trainees from Tier1 institutes shall normally be confirmed in Band E3.');
		session.send('Executive Trainees from Tier II institutes shall normally be confirmed in Band E2.');
		session.send('All other employees will be on probation for a period of six months from the date of employment. On satisfactory completion of the same, as recorded in the Probationary Period Review Form they will be confirmed in the services of the Bank in writing.');
		session.send('Confirmation would be subject to submission of all academic / regulatory certifications to Human Resources Operations team.');

	},
	
]);

dialog.matches('HOURSWORK ',[
    function (session) {
		
        session.send("The hours of work for Bank Offices would normally be the following –");
		session.send('Monday to Friday 9.30 am to 5.30 pm');
		session.send('Lunch Break Half an hour Saturday 9.30 am to 1.30 pm');
		session.send('The employees will however abide by the split timings for Branches as per customer convenience, and shift timings for other units based on business requirements.');
		
	},
	
]);
// dialog.matches('WORKHOURS', builder.DialogAction.send("I'm talking to you."));


dialog.matches('AGREEMENT', builder.DialogAction.send("On confirmation, every employee would be deemed to have been covered by the Employment Agreement (appended with the confirmation letter). This agreement specifies the detailed terms of employment and gives legal clothing to the rights and responsibilities of the Bank and its employees."));


dialog.matches('LATESITTINGS', builder.DialogAction.send("Exigencies of work on certain occasions may necessitate staff to work late. Any employee working  two hours beyond close of working hours on any day, would be reimbursed refreshment expenses not exceeding Rs. 50 /- (Fifty Only) against bills. Any employee working beyond 8 pm may be reimbursed auto / taxi fare to nearest railway station and further from station to home. Where employee has worked beyond 4 hrs of closing time or after 9 pm, taxi fare home would be reimbursed.Approval authority for the above expenses would be Branch Head / Dept. Head. (Refer Authority Delegation Chart).This will not apply to employees working in the late shift covering such time."));

dialog.onDefault(builder.DialogAction.send("HDFC POLICY"));    
//-------------LATESITTINGS TRAVEL ALLOWANCEhghgfhfgfcgf

dialog.matches('TRAVEL ALLOWANCE', builder.DialogAction.send("Leave Travel Allowance will be paid to confirmed employees who have completed one year service with the Bank. The policy covers self, spouse, children and dependent parents. The scheme is available for travel and is subject to Income Tax rules as applicable Tax benefit can only be given on submission of original documents of travel LTA will be payable once a financial year and for tax purposes, may be carried forward only upto two years. To avail of LTA employees must take atleast three days of Privilege leave. LTA may be reimbursed also if the family travels without the employee himself travelling The amount of LTA paid will be a percentage of Basic salary as specified across the bands. Employees who leave the services of the bank mid-year will be paid LTA on a prorated basis. The same will be a part of the employee’s full and final settlement."));


















//https://docs.botframework.com/en-us/node/builder/chat/IntentDialog/
