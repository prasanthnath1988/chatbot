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
var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/1c9d3a1d-e49f-4e3e-b440-871865377161?subscription-key=a99ba473a00545b29e6eddd95b543c77&verbose=true&timezoneOffset=0&spellCheck=true&q=';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({ recognizers: [recognizer] });
var instructions = "Hey, I am Ella, The HDFC Bank HR Chatbot! I am here to help you with HR related queries.";
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

bot.dialog('/', dialog);

dialog.matches('HI', [
    function(session) {
        builder.Prompts.choice(session, "I am Ella, The HDFC Bank HR Chatbot! I am here to help you with the HR related queries. Here are few quick links for your easy reference.", "Know your HR|Find any Branch |Holiday List|SAP Queries|Cnergyis/ZingHR|New Joinee Processes|Probation/Confirmation|Leaves|VBMS|Training|HR Loan|IJW/Transfer|Tell a friend/Karo Sifarish|Exit|Others", { listStyle: builder.ListStyle.button });
    },
    function(session, results) {
        switch(results.response.index) {
            case 0:
				session.endDialog();
                session.beginDialog('/');
              
                break;
            case 1:
				session.endDialog();
                session.beginDialog('/');
                
                break;
            case 2:
				session.endDialog();
                session.beginDialog('/');
                
                break;
            case 3:
				session.endDialog();
                session.beginDialog('/');
                
                break;
            case 4:
				session.endDialog();
                session.beginDialog('/');
                
                break;
            case 5:
				session.endDialog();
                session.beginDialog('/');
                
                break;
            case 6:
				session.endDialog();
                session.beginDialog('/');
				
                
                break;
            case 7:
				session.endDialog();
                session.beginDialog('/');
				
                break;
            case 8:
				session.endDialog();
                session.beginDialog('/VBMS');
                
                break;
            case 9:
				session.endDialog();
                session.beginDialog('/');
                
                break;
            case 10:
				session.endDialog();
                session.beginDialog('/');
                
                break;
            case 11:
				session.endDialog();
                session.beginDialog('/');
               
                break;
            case 12:
				session.endDialog();
                session.beginDialog('/TAFKS');
                
                break;
            case 13:
				session.endDialog();
                session.beginDialog('/');
                
                break;
            case 14:
				session.endDialog();
                session.beginDialog('/OTHERS');
                
                break;
            default:
                //session.beginDialog('/EXIT');
                session.endDialog();
                break;
        }
    },
]);
/*Handle all cases here TODO- move it to new file- STARTS*/

bot.dialog('/VBMS', [
    function(session) {
        session.send("Please Login to SAP to know more");
      
    }
]);


bot.dialog('/TAFKS', [
    function(session) {
        session.send("Please Login to SAP to know more");
       
    }
]);

bot.dialog('/OTHERS', [
    function(session) {
        session.send("Others");
       
    }
]);
/*Handle all cases here TODO- move it to new file- ENDS*/
dialog.matches('KYHR', builder.DialogAction.send("Here are your HR details: Name: Preeti Contact No: 9902933922 Extention: 334 Mail ID: preeti@hdfcbank.com"));
dialog.matches('FAB', builder.DialogAction.send("Enter the name of the branch, after entering name BOT will fetch name from branch list. IN PROGRESS. Awaiting branch details sheeet from HDFC"));
dialog.matches('HOLIDAY', builder.DialogAction.send("Please login to SAP to see the holidays list."));
dialog.matches('SAP', builder.DialogAction.send("Please refer this link to SAP: - https://hcm650.tcsprocesscloud.in "));
dialog.matches('CNER', builder.DialogAction.send("To know more about ZingHR please vist this link https://www.zinghr.com "));
dialog.matches('NJP', builder.DialogAction.send("Please Login to SAP to know the New Joinee Process"));

dialog.matches('JOKE', builder.DialogAction.send("I’m afraid you won’t get my sense of humour."));
dialog.matches('LIKE', builder.DialogAction.send("Thank You. Happy to help!"));
dialog.matches('HATE', builder.DialogAction.send("Oops! Is there anything I can do to change your mind?"));
dialog.matches('OLD', builder.DialogAction.send("Old enough to be answering your questions."));
dialog.matches('LOOK', builder.DialogAction.send("Happy and bright!. That’s why I am named as a synonym to Light!"));
dialog.matches('THANKS', builder.DialogAction.send("Pleasure is all mine. Happy to help!"));
dialog.matches('BAD', builder.DialogAction.send("Well, that’s an opinion!"));
dialog.matches('MADE', builder.DialogAction.send("A bunch of really smart chaps!"));
dialog.matches('FAVORITE', builder.DialogAction.send("Well..its too personal"));
dialog.matches('BORING', builder.DialogAction.send("I am here to assist and not entertain!"));
dialog.matches('PATHETIC', builder.DialogAction.send("I can see that you are upset. If my answers were not helpful, please connect with your HR."));
dialog.matches('BEAUTIFULL', builder.DialogAction.send("It is in the eye of the beholder."));
dialog.matches('MARRIED', builder.DialogAction.send("No, I am available."));
dialog.matches('TIME', builder.DialogAction.send("It’s the time to disco!"));
dialog.matches('WRUD', builder.DialogAction.send("Oh nothing much! I’m just putting the final touches on my plan to conquer the world."));
dialog.matches('WRU', builder.DialogAction.send("I am Ella, The HDFC Bank HR Chatbot! How can I help you?"));
dialog.matches('WCID', builder.DialogAction.send("You can ask questions about the bank's leave and travel policy"));
dialog.matches('WCUD', builder.DialogAction.send("I can help you answer questions about the bank's leave and travel policy"));
dialog.matches('BY', builder.DialogAction.send("It was nice talking to you. Have a good day! \n\nCome back soon if you have more queries!"));
dialog.matches('ILU', builder.DialogAction.send("Me Too!"));

dialog.matches('NO', builder.DialogAction.send('Ok'));
dialog.matches('YES', builder.DialogAction.send('What can I do for you today?'));
dialog.matches('HDFCBANK ', builder.DialogAction.send("Welcome to HDFC Bank. The Bank believes in providing the highest quality of service to its customers. As a part of the HDFC Bank team your contribution towards achieving this objective is essential. The Terms of Service applies to all employees on the rolls of HDFC Bank excluding those on contract. Employees are expected to be thoroughly familiar with the HR policies of the Bank. Policies and practices may be changed from time to time at the Bank's discretion. All the employees shall, on acceptance of their appointment, deemed to have agreed to these Rules"));
dialog.matches('INDUCTION ', [
    function(session) {
        session.send("To help the new employee get inducted into the Bank and get familiar with its culture, history, business, products and people, the employee’s immediate superior would devote enough time and provide him with all the relevant manuals / information which will help him to get acquainted as soon as possible.");
        session.send('However, a formal induction program would also be organized from time to time and would attempt to include all employees who have joined during that period');
    },
]);
dialog.matches('PROBATION', [
    function(session) {
        session.send("Freshmen from graduate/ post-graduate schools would be recruited as Trainees, Executive Trainees (ET) or Management Trainees (MT) depending on the educational Institution / Business School they hail from. The initial training duration would be one year for these categories of employees. On satisfactory completion of training, recorded duly in the Probationary Period Review Form, the trainee shall be confirmed in the services of the Bank.");
        session.send('Management Trainees from Tier1 institutes shall normally be confirmed in Band E3.');
        session.send('Executive Trainees from Tier II institutes shall normally be confirmed in Band E2.');
        session.send('All other employees will be on probation for a period of six months from the date of employment. On satisfactory completion of the same, as recorded in the Probationary Period Review Form they will be confirmed in the services of the Bank in writing.');
        session.send('Confirmation would be subject to submission of all academic / regulatory certifications to Human Resources Operations team.');
    },
]);
dialog.matches('HOURSWORK ', [
    function(session) {
        session.send("The hours of work for Bank Offices would normally be the following –");
        session.send('Monday to Friday 9.30 am to 5.30 pm');
        session.send('Lunch Break Half an hour Saturday 9.30 am to 1.30 pm');
        session.send('The employees will however abide by the split timings for Branches as per customer convenience, and shift timings for other units based on business requirements.');
    },
]);
dialog.matches('LATESITTINGS', [
    function(session) {
        session.send("Exigencies of work on certain occasions may necessitate staff to work late. Any employee working  two hours beyond close of working hours on any day, would be reimbursed refreshment expenses not exceeding Rs. 50 /- (Fifty Only) against bills.");
        session.send('Any employee working beyond 8 pm may be reimbursed auto / taxi fare to nearest railway station and further from station to home. Where employee has worked beyond 4 hrs of closing time or after 9 pm, taxi fare home would be reimbursed');
        session.send('Approval authority for the above expenses would be Branch Head / Dept. Head. (Refer Authority Delegation Chart)');
        session.send('This will not apply to employees working in the late shift covering such time.');
    },
]);
dialog.matches('ATTENDANCE', [
    function(session) {
        session.send("Employees are expected to arrive on time and adhere to the working hours prescribed and mark the attendance in the muster. If due to unforeseen circumstances an employee is unable to report to work, he/she must inform his/her immediate superior of the reasons for not being able to report for work, as well as obtain written approval of leave. Employees who have availed of leave are expected to report for duty on completion of sanctioned leave.");
        session.send('In case of unauthorized absence the Bank reserves the right to take disciplinary action.');
    },
]);
dialog.matches('RESIGNATION', [
    function(session) {
        session.send("Every resigning employee will undergo an Exit Interview with the Business Head or Superior independent of that function or a HR representative. ");
        session.send('All confirmed employees resigning from the services of the Bank are required to give three months notice. The Notice period for Employees on probation would be one month. All employees however, must attend office for at least one month of the notice period. The respective Group Head/ Head – Human Resources may at Management’s discretion waive off serving this notice period. This is subject to payment of salary equivalent to number of days of notice period not served by the employee. (The notice pay would be calculated on the individual’s Base and Allowances per month). ');
        session.send('All outstanding loans / other advances must be cleared before severing connection with the Bank. The individual shall also be responsible for handing over all keys, documents, papers pertaining to or connected with the Bank. Identity card and such other things are liable to be returned to the Bank, before leaving the services of the Bank.');
        session.send('HR will circulate an Exit Checklist, and after a sign-off has been obtained from the immediate Superior, Personnel Administration Department, Information Technology, Finance and Administration and Credit Cards the relieving letter will be issued. ');
        session.send("Post resignation, the Bank may withhold the employee's salary at its discretion.");
    },
]);
dialog.matches('TERMINATION', [
    function(session) {
        session.send("Notwithstanding anything contained in these rules, the services of an employee of the Bank may be terminated by the Bank at any time without assigning any reasons therefor.");
        session.send('Such termination will be effected by a notice in writing of 3 (three) months by the Head - HR to the officer or by payment of 3 (three) month’s salary in lieu thereof. In cases where the terms of appointment provide otherwise, such provision shall prevail');
        session.send('If an employee continues to be absent from work without the prior sanction of leave by the superior, his / her services may be terminated by the Bank. The decision in this matter will be solely at the Bank’s discretion. ');
        session.send('If an employee is found guilty of moral turpitude or gross insubordination or is found to be involved in any criminal activity, his services are liable to be terminated forthwith at the discretion of the Bank. In all termination cases, a relieving letter will not be issued by the bank.');
    },
]);
dialog.matches('RETIREMENT', [
    function(session) {
        session.send("Retirement age for all employees shall be 60 years. An employee’s retirement age would be in the calendar month in which he / she complete 60 years.");
        session.send('Salary in context of this chapter shall include both base and allowance.');
    },
]);
dialog.matches('CODEOFCONDUCT', [
    function(session) {
        session.send("Utmost importance shall be given to legality and ethical values in conduct of business in commercial and regulatory terms.");
        session.send('Breach of law / regulations are not justifiable on the plea of pursuit of profit.');
        session.send('A frank and co-operative attitude shall be adopted with regulators and auditors and they shall be kept fully and promptly informed of matters, which should reasonably be disclosed to them. Great care must be exercised in maintaining confidentiality of information pertaining to customers. ');
        session.send('Each employee shall maintain the highest standard of business ethics and conduct and behave at all times in a manner, which will reflect well on the Bank and self');
        session.send('Any conflict of interest or activity that may interfere or jeopardize the Bank’s operations shall be strictly avoided.');
        session.send('A conflict of interest may arise when an employee is/or becomes involved in any outside business interest – which is a competitor, customer or a supplier that may adversely affect the employee’s judgment in acting on behalf of the company which may come in the way of the employee devoting full time and attention to his job that may adversely affect the Bank, either directly or indirectly. The cases of conflict of interest listed above are not exhaustive, but lay down the general principles therefore. Employees are expected to wear `Formal Corporate wear’ through Monday to Friday and `Smart Casuals’ on Saturday. Office attire should be suitable for conducting business on behalf of the Bank at all times. Please refer to the detailed policy on Grooming Standards for more information. Failure to comply with the above code of conduct shall render the individual liable for disciplinary action.');
    },
]);
dialog.matches('PENALTIES', [
    function(session) {
        session.send("An employee may be liable for one or more of the following penalties:\n\nDismissal from service ; \n\nReduction to lower grade ; \n\nReduction in Salary or withdrawal of any perquisites or benefits ;\n\nAny other punishment consistent with the gravity of the misconduct or misdemeanor.");
        session.send('An employee may be liable for any one or more of the above penalties if: \n\nHe commits any violation or breach of any rules or any orders, directions, internal procedures or regulations of the Bank. \n\nHe is guilty of fraud or dishonesty in his dealings ; \n\nHis performance is not upto the expectations of the Bank. \n\nHe is guilty of misconduct in performance of his duties vis-à-vis the Bank or its customers ; \n\nHe commits any act which in the opinion of the Bank warrants disciplinary action.');
        session.send('In any of the cases specified above, the Bank shall serve on the concerned officer a show-cause notice requiring him to show-cause why disciplinary action should not be taken against him. ');
        session.send('On receipt of a show-cause notice, the concerned employee shall submit his reply thereto. After consideration of the reply of the Officer, a competent authority as decided by the Bank shall afford a personal hearing to the Officer. Thereafter he would give his recommendation to an independent person,');
        session.send('The Independent person in consultation with Head, Audit and Compliance and the concerned Group Head, if he deems fit, initiate appropriate action or levy the appropriate penalty.');
        session.send('If no reply is filed by the employee within the stipulated period, a competent authority may initiate appropriate action or levy the appropriate penalty, as he may deem fit, without giving personal hearing to the Officer.');
        session.send('The Managing Director may as required designate any other Competent Authority for the purposes of initiating disciplinary action.');
        session.send('In case of such a dismissal, terminal benefits of the employee in terms of salary in lieu of Notice period etc. may be withheld at the Bank’s discretion.');
    },
]);
dialog.matches('ALTERNATE', builder.DialogAction.send("Employees are restricted from accepting any other employment, while engaged by HDFC Bank Ltd., irrespective of whether the same is for monetary benefits or otherwise. Exceptions maybe made with the approval of the Group Head of the respective Function and Head - HR."));
dialog.matches('GIFTS', [
    function(session) {
        session.send("Employees shall refrain from accepting from, or offering to, an existing or prospective customer, counterpart, supplier or contractor of the Bank, any favour, gift, entertainment or other benefit, the quantum or frequency of which exceeds normal business contact.");
        session.send('Employees may accept (but not solicit) non-monetary gifts of insignificant value (Rs.2500/- maximum).');
        session.send('Employees shall not accept any benefit from the estate of a trust created by a customer, or from an estate or trust of which the bank or its business unit is an executor, administrator or trustee without the prior written permission of the Group Head.');
    },
]);
dialog.matches('SECURITIESTRANSACTIONS', [
    function(session) {
        session.send("Employees shall not engage in insider trading in Securities, i.e., they shall not deal or advise or arrange for anyone else to deal, in any shares or other securities listed or traded on a recognized Stock Exchange, if they have information which they have reason to believe is non-public price sensitive information relating to those securities or companies concerned. This is applicable for information received through work or from any other source. Information is considered to be price sensitive, if disclosure of such information is likely to affect the price of the securities.");
        session.send('All HDFC Bank Ltd. staff is required to comply in every respect with the Personal Account Dealing Rules, given in detail in the Ethical Standards and Compliance Manual. The employee should be thorough with the manual which forms part of the Joining Kit on getting a Lotus Notes ID.');
        session.send("OTHER CONDITIONS\n\nDisclosure on relative's business with the Bank\n\nIf any member of employee's immediate family has either a direct or indirect interest in any transaction or proposed transaction involving HDFC Bank or enters into any business contract with the Bank; the employee is expected to disclose the nature of the relationship and the transaction/business to avoid any possible conflict of interest.");
        session.send("Data usage and Confidentiality\n\nThe employee will not, for whatever reason, divulge without an express written authority from the Management, any data or information relating to the Bank as received in the course of and after cessation of the employment with the Bank.");
    },
]);
dialog.matches('SECURITY AND SAFETY ', [
    function(session) {
        session.send("There shall be a security guard on each floor occupied by the Bank, who shall also be responsible for the keys to the concerned floor. At any given time there should be a minimum of two Bank employees at the Bank premises. Any exception will require the approval of the Business / Head. ");
        session.send('Employees shall be provided with identity cards, which may have to be produced on demand on entering the office. Identity cards have to be carried while visiting other offices of the Bank also.');
        session.send('Employees are expected to report immediately to the designated officer / Security Guards/ higher authority present, if any person is found loitering suspiciously in the premises of the Bank. ');
        session.send('The Bank will not permit salesmen to canvass business from staff members in the premises unless without express sanction of relevant group Head. \n\nAll working areas are non-smoking zones.');
    },
]);
dialog.matches('HARD FURNISHING', [
    function(session) {
        session.send("HARD FURNISHING \n\nTo provide assistance to the employees to acquire hard furnishing items for their residence, the following hard furnishing scheme is extended to all employees in Band D1 and above: ");
        session.send('SCHEME DETAILS – \n\nEmployees entitled to and availing Hard Furnishing / White Goods would at the end of 4 years be allowed to purchase the same at a nominal value of 1% of original cost. \n\nOn completion of 4 years from the purchase of each item under the hard furnishing scheme, the depreciated value of every item that completes the four-year cycle will be calculated and the same post depreciation will be made available to the employee. \n\nIn case of imported goods, reimbursement will be done only on receipt of original bill and original customs duty paid receipt \n\nIf the employee wants to opt for Cash Allowance in lieu of Hard Furnishing he will be required to buy back all the goods he has availed at a written down value. This one time buy back is possible on April 1 in the following years. \n\nThe above hard furnishing scheme or cash allowance in lieu of hard furnishing is taxable. Taxes as applicable will be payable by employee.');
        session.send('PROCEDURE - \n\nThe Declaration for buying / buy back of the white goods in the prescribed form along with the Performa invoice / bill of purchase has to be forwarded to Human Resources by the eligible employee. \n\nHR will then send the same to PAD, who will either credit the employees’ account, accordingly or issue a cheque for payment to vendor. \n\nA copy of the delivery challan for the goods received would have to be forwarded to PAD within a month of employee getting the facility of Hard Furnishing \n\nEmployees, who have not availed of the Hard Furnishing entitlement in full, will not be entitled to proportionate cash allowance. \n\nEmployees on leaving the services of the Bank will have to buy back the items at a written down value. \n\nHard Furnishing perquisite will deemed to have commenced from the date of payment.');
        session.send('Enlisted below is the list of appliances under the hard furnishing program:\n\nAny appliance that is above Rs. 5000/- at point of sale and can be capitalised in the Books of the Bank would form part of Hard Furnishings. An indicative list of the appliances which shall be considered are:\n\nAir Conditioner\n\nWashing Machine\n\nCooking Range \n\nDish Washer \n\nMicrowave Oven\n\nVacuum Cleaner\n\nRefrigerator \n\nPersonal Computer\n\nCellular Phone Instrument\n\nT.V\n\nVCR/DVD \n\nMusic System(including car music system)\n\nVideo Camera\n\nWater purifier(Aqua Guard)\n\nFurniture( Consolidated claim of over Rs. 20000/- only)\n\nElectric Chimney\n\nPrinter\n\nDigital Camera\n\nHome Theatre System\n\nModem\n\nMusical instruments \n\nNote - All items have to be purchased from a Registered Sales Tax Dealer.');
    },
]);




dialog.matches('Greetings', [
    function(session) {
        session.send("Greetings");
        session.endDialog();
    },
]);

dialog.matches('ShowLeaves', [
    function(session, args, next) {
        // try extracting entities
        var LeaveTypeEntity = builder.EntityRecognizer.findEntity(args.entities, 'Leavetype');
        if(LeaveTypeEntity.entity == "paternity")
        {
            paternityLeave(session);
        }else if(LeaveTypeEntity.entity == "maternity"){
            maternityLeave(session);
        }
        //session.endDialog();
    },
]);



dialog.onDefault(builder.DialogAction.send("Sometimes, I may not have the information you need. I am just a virtual assistant who can help you with HR related queries."));


function paternityLeave(session){
    session.sendTyping();
    setTimeout(function () {
        session.send("The Bank is pleased to introduce Paternity Leave. \n\nEmployees who become fathers during the course of employment would be eligible for 7 days of Paternity Leave (inclusive of weekends and five working days). \n\nPaternity Leave needs to be availed at a stretch and within three months of the birth of the child. Employees can avail this leave only twice during the course of their employment with the Bank.");
        session.send('GENERAL NOTE : \n\nFor computation of all leave the financial year will be considered. \n\nNo category of leave will be encashed. \n\nThe Bank reserves the right to treat leave taken without prior permission as unpaid leave. The employee is expected to promptly intimate his/her higher authority of his/her inability to attend office for any reason whatsoever. \n\nHolidays / Sundays falling before or after leave dates will not be included in the leave days. However, holidays / weekly offs falling within the same will be calculated as leave days. \n\nAn employee compulsorily must spend two consecutive weeks away from his desk every year. These two weeks may be inclusive of prefix and suffix holidays / weekly offs, and therefore actual privilege leave availed may be lesser. \n\nRequests for extension of leave due to unforeseen circumstances should be conveyed to the concerned leave sanctioning authority promptly and approval obtained.');
    }, 3000);
    
}

function maternityLeave(session){
    session.sendTyping();
    setTimeout(function () {
        session.send("The objective of maternity leave and benefit is to provide for health and welfare of the mother and child during the critical phase of pregnancy and post delivery period.\n\nThe Bank has decided to grant the employee who is an expectant mother a total of six months as Maternity Leave.");
        session.send("GENERAL NOTE : \n\nAll women employees of the Bank, irrespective of their tenure shall be eligible for Maternity Leave.\n\nThe Bank shall allow four months of paid Maternity leave to its women employees. \n\nThe Bank shall additionally provide for leave for further two months on recommendation of the concerned Business /Function Head and approval of Head – Human Resources. \n\nIn case the employee has Privilege Leave to her credit, these two months of leave may be adjusted during this period.  In other cases, the additional leave shall be treated as Leave without Pay.\n\nNo further extension of leave beyond six months as specified above shall be allowed.\n\nAll leaves under maternity benefit should be informed in advance to the supervisor.  In particular, if the leaves are taken at a stretch of more than 30 days, leaves should be applied for at-least 15 days in advance. \n\nIn case of adoption, the employee shall be entitled to leave with pay for a period of three months immediately following the day of adoption.\n\nThe employee shall be also eligible for leave with pay for a period of 45 days in the unfortunate event of a miscarriage.\n\nNo other leave shall be accruable to the employee in this regard.");
     }, 3000);
}
//https://docs.botframework.com/en-us/node/builder/chat/IntentDialog/
