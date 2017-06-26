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
var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/192c4407-699f-47b6-82c7-c33e340fbc0f?subscription-key=e1f9afcba8cd4bd49fd2f4884d61a563&timezoneOffset=0&verbose=true&q=';
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
    if(activity.membersAdded) {
        activity.membersAdded.forEach((identity) => {
            if(identity.id === activity.address.bot.id) {
                bot.send(new builder.Message().address(activity.address).textFormat(builder.TextFormat.xml).attachments([
                    new builder.HeroCard().title("Do you read bank's online library?").images([
                        builder.CardImage.create(activity.address, "https://hdfcbankcnergyis.azurewebsites.net/Recruitment/imgs/May.jpg")
                    ]),
                    new builder.HeroCard().title("Hey, I am Ella, The HDFC Bank HR Chatbot! I am here to help you with HR related queries.")
                    //.subtitle("I am written in node.js!")
                    .text("Say Hi to get started")
                ]));
            }
        });
    }
});


/*USER Specific Data*/
var UserName;
var empCode;
var empPswd;
var empGender;
var empLocationCity;
var empLocationState;
var empHrName;
var empHrLandLine;
var empHrMobile;
var empHrEmailId;
/*USER Specific Data*/



dialog.matches('HI', [
    function(session) {
        UserName = session.message.address.user.empName ? session.message.address.user.empName : "Jim";
        empCode = session.message.address.user.empCode ? session.message.address.user.empCode : "";
        empGender = session.message.address.user.empGender ? session.message.address.user.empGender : "";
        empLocationCity = session.message.address.user.empLocationCity ? session.message.address.user.empLocationCity : "Mumbai";
        empLocationState = session.message.address.user.empLocationState ? session.message.address.user.empLocationState : "Maharashtra";
        empHrName = session.message.address.user.empHrName ? session.message.address.user.empHrName : "Pree";
        empHrLandLine = session.message.address.user.empHrLandLine ? session.message.address.user.empHrLandLine : "";
        empHrMobile = session.message.address.user.empHrMobile ? session.message.address.user.empHrMobile : "";
        empHrEmailId = session.message.address.user.empHrEmailId ? session.message.address.user.empHrEmailId : "";

        var greeting_text = '';
        var tm = new Date();
        var hours = tm.getUTCHours() * 60;
        var minutes = tm.getUTCMinutes();
        var total = (hours + minutes) + 330;
        //var utc= tm.getTimezoneOffset();   
        var total = parseInt(total);
        //morning - 240-720
        if(total >= 240 && total < 720) {
            //session.send("Good Morning, **Jim**");
            greeting_text = "Good Morning, **"+UserName+"**";
        }
        //afternoon - 720-960
        if(total >= 720 && total < 960) {
            //session.send("Good Afernoon, **Jim**");
            greeting_text = "Good Afternoon, **"+UserName+"**";
        }
        //evening- 960-1439
        if(total >= 960 && total < 1439) {
            //session.send("Good Evening, **Jim**");
            greeting_text = "Good Evening, **"+UserName+"**";
        }
        //overnight- 0000-240
        if(total >= 330 && total < 570) {
            //session.send("Hey Night Owl. Are you still up **Jim** ?   ");
        }
        //session.send("time"+hour);
        delete session.minutes;
        delete session.total;
        delete session.tm;
        builder.Prompts.choice(session, greeting_text + "\n\n Here are few quick links for your easy reference.", "Know your HR|Find any Branch |Holiday List|Leave Details|Tell a friend/Karo Sifarish", { listStyle: builder.ListStyle.button });
        session.endDialog();
    }
]);
bot.dialog('/', dialog);

/*Handle all cases here TODO- move it to new file- STARTS*/
dialog.matches('ReferFriend', [
    function(session, args, next) {
        //var LeaveTypeEntity = builder.EntityRecognizer.findEntity(args.entities, 'Leavetype');
        if(args.entities[0] != null && args.entities[0].entity != null) {
            if(args.entities[0].type == "refer policy") {
                session.beginDialog('/ReferPolicy');
            } else if(args.entities[0].type == "refer rewards") {
                session.beginDialog('/ReferRewards');
            } else if(args.entities[0].type == "refer process") {
                session.beginDialog('/ReferProcess');
            } else if(args.entities[0].type == "refer terms & conditions") {
                session.beginDialog('/ReferTermsConditions');
            }
        } else {
            builder.Prompts.choice(session, "Please choose from below", "Policy|Rewards|Refer Process|Terms and Condition", { listStyle: builder.ListStyle.button });
        }
    },
    function(session, results) {
        switch(results.response.index) {
            case 0:
                //session.endDialog();
                session.beginDialog('/ReferPolicy');
                break;
            case 1:
                //session.endDialog();
                session.beginDialog('/ReferRewards');
                break;
            case 2:
                //session.endDialog();
                session.beginDialog('/ReferProcess');
                break;
            case 3:
                //session.endDialog();
                session.beginDialog('/ReferTermsConditions');
                break;
            default:
                //session.beginDialog('/EXIT');
                session.endDialog();
                break;
        }
    },
]);
//Refer friend dialogs
bot.dialog('/ReferPolicy', [
    function(session) {
        session.send('Tell a Friend is an internal referral program which encourages employees to refer their friends to pursue a career with HDFC Bank. It is an opportunity for the employees to contribute in creating the best team of qualified and efficient people, working for the success of the Bank. \n\n * This policy applies to all employees upto Band D2. \n\n * It invites referrals for positions from the Band of E1 (Asst. Mgr) to D1 (Asst Vice President). \n\n * Tell a Friend rewards will not be applicable to references for PB-WD / Teller candidates. \n\n * The reward shall be paid upon confirmation of the referred candidate. \n\n * The referee & the referred employee has to be a regular employee on the rolls of the Bank at the time of disbursement of the referral amount. Resigned employees will not be eligible for this payment');
        session.endDialog();
    }
]);
bot.dialog('/ReferProcess', [
    function(session) {
        session.send('To Refer a suitable candidate, please follow below steps:\n\n**Step 1**: Log into SAP HR Portal\n\n**Step 2**: Click on Tell A Friend link on the employee portal which will take you to the SAP “Job Search” page\n\n**Step 3**: Search suitable job in Job Search Page & click on “Tell a Friend”\n\n**Step 4**: Type in correct first Name, last name & email ID of your friend who is to be referred in the recipient’s field \n\n**Step 5**: Type in your first name along with your Personal Number (e.g. 20017644) & your last name in the Sender fields.\n\n**Step 6**: While referring, please ensure that the candidate profile matches the requirement\n\n**Step 7**: In case the candidate is interested in the job you have shared, please ensure the candidate creates his profile on HDFC Bank Careers page & updates his source correctly as “Employee referral” & provides your complete name & Personal number in his application.\n\n **Note: For the referral amount to be processed, selected candidate needs to produce the mail received by him via SAP when the job was referred to him.**');
        session.endDialog();
    }
]);
bot.dialog('/ReferRewards', [
    function(session) {
        var msg3 = new builder.Message(session).attachments([{
            contentType: "image/jpeg",
            contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/referer.png"
        }]);
        session.endDialog(msg3);
    }
]);
bot.dialog('/ReferTermsConditions', [
    function(session) {
        session.send('* The scheme is applicable to all positions announced from time to time on the Career website.\n\n* Prior to sending a referral you must ensure that the candidate is interested in the vacancy. Please note that the Tell a Friend program is not a lead generation program.\n\n* Please ensure that the candidate profile matches the requirement specified in the posting.\n\n*    Employees referring candidates through Tell a Friend must ensure that the details are submitted in Tell a Friend portal prior to the candidate being interviewed by the Bank.\n\n* The validity of the resume sent will be for a period of 90 days. In case, the candidate profile is already available in the database & is active in the last 1 Year, no reward will be given for the referral\n\n* The Management reserves the right to review, modify or withdraw this scheme without notice\n\n* Decisions taken by Management with respect to the scheme and its applicability will be final and binding on all.');
        session.endDialog();
    }
]);
//Refer friend End
bot.dialog('/faq', [
    function(session) {
        builder.Prompts.choice(session, "", "In case of Mandatory Leave whether Bank Holidays, Saturday (2nd & 4th) and Sunday would be calculated or not?|How many days of PL will be credited to the Newjoinee and when?|How can I apply for leaves availed for more than 2 days if I don’t have PL Balance?|Are the employees allowed for leaves during Notice Period?I am allowed for leaves during Notice Period?|Are the employees allowed for leaves during Probation Period?I am allowed for leaves during Probation Period?|How to apply for leaves if an employee’s CL is exhausted?How to apply for leaves as my CL/Casual Leave is exhausted?|My Current year SL balance showing NIL?|How to update Comp Off in SAP?|My manager/Supervisor is unable to cancel my approved leaves, please help|I am unable to cancel my subordinate’s approved leaves, please help|I want to take Marriage LeaveHow to update marriage leave|I want to take Medical LeaveHow to update medical leave|I want to take Sabbatical/ What is Sabbatical Policy etc…", { listStyle: builder.ListStyle.button });
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
                session.beginDialog('/');
                break;
            case 13:
                session.endDialog();
                session.beginDialog('/');
                break;
            default:
                //session.beginDialog('/EXIT');
                session.endDialog();
                break;
        }
    },
]);
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

dialog.matches('KYHR', [
        function(session) {
            UserName = session.message.address.user.empName ? session.message.address.user.empName : "Jim";
            empCode = session.message.address.user.empCode ? session.message.address.user.empCode : "";
            empGender = session.message.address.user.empGender ? session.message.address.user.empGender : "Male";
            empLocationCity = session.message.address.user.empLocationCity ? session.message.address.user.empLocationCity : "Mumbai";
            empLocationState = session.message.address.user.empLocationState ? session.message.address.user.empLocationState : "Maharashtra";
            empHrName = session.message.address.user.empHrName ? session.message.address.user.empHrName : "Pree";
            empHrLandLine = session.message.address.user.empHrLandLine ? session.message.address.user.empHrLandLine : "";
            empHrMobile = session.message.address.user.empHrMobile ? session.message.address.user.empHrMobile : "";
            empHrEmailId = session.message.address.user.empHrEmailId ? session.message.address.user.empHrEmailId : "";

            session.send("Here are your HR details:- \n\n  Name: "+empHrName+" \n\n  Contact No: "+empHrMobile+" \n\n  LandLine: "+empHrLandLine+" \n\n  EMail ID: "+empHrEmailId+" ");
            session.endDialog();
        }
    ]);

//dialog.matches('FAB', builder.DialogAction.send("Enter the name of the branch, after entering name BOT will fetch name from branch list. IN PROGRESS. Awaiting branch details sheeet from HDFC"));
dialog.matches('FAB', [
    function(session) {
        builder.Prompts.text(session, "Please provide the name of the branch");
    },
    function(session, results) {
        var location = results.response;
        location = location.replace(/[, ]+/g, "+").trim();
        // session.send(location);
        var http = require("https");
        var options = {
            "method": "GET",
            "hostname": "maps.googleapis.com",
            "port": null,
            "path": "/maps/api/place/textsearch/json?type=bank&query=hdfc%20" + location + "&key=AIzaSyCq9X746g-jB19DO4JA-ShWgN28QmAkQFo",
            "headers": {
                "cache-control": "no-cache",
                "postman-token": "b9ad7574-3d10-371b-6752-55bddc4b6dbf"
            }
        };
        var req = http.request(options, function(res) {
            var chunks = [];
            res.on("data", function(chunk) {
                chunks.push(chunk);
            });
            res.on("end", function() {
                var body = Buffer.concat(chunks).toString();
                //session.send(body.toString());
                var contact = JSON.parse(body);
                //console.log(body);
                var contact = contact.results;
                //var contact=contact[0].formatted_address;
                //console.log(contact);
                /*if((contact[0].name).indexOf("ATM") < 0)
                {

                }*/
                for(var i = 0; i < contact.length; i++) {
                    if((contact[i].name).indexOf("ATM") < 0) {
                        session.send("Branch Name : " + contact[i].name + "\n\nAddress : " + contact[i].formatted_address);
                    }
                }
                //.send("Branch Name : "+contact[0].name+"\n\nAddress : "+contact[0].formatted_address);
                //session.send("Branch Name : "+contact[1].name+"\n\nAddress : "+contact[1].formatted_address);
                //session.endDialog();
                //builder.Prompts.choice(session, "Have you found the Branch","Policy|Leaves", { listStyle: builder.ListStyle.button });
                session.beginDialog('/serch');
            });
        });
        //session.endDialog();
        req.end();
    },
]);
bot.dialog('/serch', [
        function(session) {
            builder.Prompts.choice(session, "Did you find your branch information or you wish to search again?", "Search branch|No, thanks", { listStyle: builder.ListStyle.button });
            session.endDialog();
        }
    ]);
    //dialog.matches('HOLIDAY', builder.DialogAction.send("Please login to SAP to see the holidays list."));
dialog.matches('SAP', builder.DialogAction.send("Please refer this link to SAP: - https://hcm650.tcsprocesscloud.in "));
dialog.matches('CNER', builder.DialogAction.send("To know more about ZingHR please visit this link https://www.zinghr.com "));
dialog.matches('NJP', builder.DialogAction.send("Please Login to SAP to know the New Joinee Process"));
dialog.matches('JOKE', builder.DialogAction.send("I’m afraid you won’t get my sense of humour."));
dialog.matches('LIKE', builder.DialogAction.send("Thank You. Happy to help!"));

dialog.matches('OLD', builder.DialogAction.send("Old enough to be answering your questions."));
dialog.matches('LOOK', builder.DialogAction.send("Happy and bright!. That’s why I am named as a synonym to Light!"));
dialog.matches('THANKS', builder.DialogAction.send("Pleasure is all mine. Happy to help!"));
dialog.matches('BAD', builder.DialogAction.send("Well, that’s an opinion!"));
dialog.matches('MADE', builder.DialogAction.send("A bunch of really smart chaps!"));
dialog.matches('FAVORITE', builder.DialogAction.send("Well..its too personal"));
dialog.matches('BORING', builder.DialogAction.send("I am here to assist you!"));
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
// dialog.matches('ILU',[
//     function (session) {
//         session.send("Me Too!");
//    //builder.Prompts.text(session, "Want to share more with us?");
//  },
//  function (session, results) {
//         session.send("Ok...", results.response);
//    },
// ]);
//dialog.matches('HATE', builder.DialogAction.send("After all i've done for you"));
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



/*OLD--LEAVE POLICY DIALOG HANDLE START*/
dialog.matches('LEAVE POLICY', [
    function(session) {
        builder.Prompts.choice(session, "", "Privilege Leave|Sick/Casual Leave|Maternity Leave|Adoption Leave|Paternity Leave|Leave Without Pay|Advance Leave|Mandatory Leave", { listStyle: builder.ListStyle.button });
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
            default:
                //session.beginDialog('/EXIT');
                session.endDialog();
                break;
        }
    },
])
dialog.matches('PRIVILEGE LEAVE', [
    function(session) {
        session.send("* Privilege Leave of 30 days DOES NOT get credited after confirmation but ONLY after completion on 1 year. After that it will be credited to an employee’s account on April 1 every year on pro-rata basis.\n* A minimum of 9 days privilege leave must be taken at a stretch each year by each employee and a minimum of 12 days for employees in sensitive roles ( as part of mandatory leave)\n* Minimum 3 days PL should be availed at a time..) \n* There will be no accumulation of PL starting 1st April 2018 and all leaves of last financial year will lapse.\n* No Privilege Leave will be encashed. The same may however be set off against the employee’s notice pay, on his / her resignation, at the Bank’s discretion.");
    },
])
dialog.matches('SLCL', [
    function(session) {
        session.send('* Casual leave can be availed up to a maximum of 12 days per year.\n* Casual Leave of the last financial year gets converted to sick leave on every 1st April and new 12 Casual leaves gets credited to the account.\n* Sick Leave can be accumulated up to 30 days\n* Casual leave can be availed up to maximum two days at a time. Applications for sick leave exceeding two days should be supported by a medical certificate, which has to be produced at the time of reporting back to duty.\n* Sick leave availed beyond 9 days will be debited to Privilege leave, other than in cases of major illness / hospitalization.');
    },
]);
dialog.matches('MATERNITY LEAVE', [
    function(session) {
        session.send('* An expectant mother is eligible for a Maternity Leave of 6 months. \n\n* All women employees of the Bank, irrespective of their tenure shall be eligible for Maternity Leave.\n\n* Any extension on the same will be on approval of the concerned Business /Function Head and approval of Head – Human Resources.\n\n* Employees can avail this leave only twice during the course of their employment with the Bank. \n\n* An expectant mother is eligible for a Maternity Leave of 6 months.\n\n* Any extension on the same will be on approval of the concerned Business /Function Head and approval of Head – Human Resources.\n\n* Employees can avail this leave only twice during the course of their employment with the Bank.');
        if(session.message.address.user.empGender == "Male"){
          session.send('Note: * Hope you are checking the same for a female colleague of yours as my intelligence says that you will not avail it! *');  
        }   
    },
]);
dialog.matches('ADOPTION LEAVE', [
    function(session) {
        session.send('* In case of adoption, the employee shall be entitled to leave with pay for a period of 3 months immediately following the day of adoption. \n\n* The employee shall be eligible for leave with pay for a period of 45 days in the unfortunate event of a miscarriage.');
        session.send('Note : * No other leave shall be accruable to the employee in this regard *');
    },
]);
dialog.matches('PATERNITY LEAVE', [
    function(session) {
        session.send('* Employees who become fathers during the course of employment would be eligible for 7 days of Paternity Leave (inclusive of weekends and five working days). \n\n* Paternity Leave needs to be availed at a stretch and within three months of the birth of the child. \n\n* Employees can avail this leave only twice during the course of their employment with the Bank.');
        if(session.message.address.user.empGender != "Male"){
            session.send('Note: *Hope you are checking the same for a male colleague of yours as my intelligence says that you will not avail it!*');
        }
    },
]);
dialog.matches('LEAVE WITHOUT PAY', [
    function(session) {
        session.send('* Leave without pay would be granted on a case to case basis with the approval of the respective Business heads / Function heads and Head -HR. \n\n* Supervisor can also update leaves/ Leave without Pay in system on behalf of employee by following below steps in SAP.');
    },
]);
dialog.matches('ADVANCE LEAVE', [
    function(session) {
        session.send('* Only Privilege Leave can be availed as Advanced leave. \n\n* This would be granted on a case to case basis with the approval of the respective Business heads / Function heads and Head –HR\n\n* Please get in touch with your HR for any further details about the');
    },
]);
dialog.matches('MANDATORY LEAVE', [
    function(session) {
        session.send('* Since you have not completed 1 year with the Bank, you are not eligible to take Mandatory Leave.\n\n* Please connect with your HR for any further query on the same. \n\n* You need to avail 12 days of Mandatory leave in the current financial year. All public holidays and 2nd, 4th Saturday are included while your leave calculation. Sundays are excluded for the same.\n\n* Please plan and update your Mandatory Leave in SAP if not yet done. \n\n* You need to avail 9 days of Mandatory leave in the current financial year. All public holidays and 2nd, 4th Saturday are included while your leave calculation. Sundays are excluded for the same.\n\n* Please plan and update your Mandatory Leave in SAP if not yet done.');
    },
]);
/*OLD--LEAVE POLICY DIALOG HANDLE END*/


dialog.matches('TRAVEL ALLOWANCE', [
    function(session) {
        session.send('*LEAVE TRAVEL ALLOWANCE* \n\n *Leave Travel Allowance will be paid to confirmed employees who have completed one year service with the Bank. \n\nThe policy covers self, spouse, children and dependent parents. \n\nThe scheme is available for travel and is subject to Income Tax rules as applicable n\n\Tax benefit can only be given on submission of original documents of travel \n\nLTA will be payable once a financial year and for tax purposes, may be carried forward only upto two years. To avail of LTA employees must take atleast three days of Privilege leave. \n\nLTA may be reimbursed also if the family travels without the employee himself travelling \n\nThe amount of LTA paid will be a percentage of Basic salary as specified across the bands. \n\nEmployees who leave the services of the bank mid-year will be paid LTA on a prorated basis. The same will be a part of the employee’s full and final settlement.\n\nFor LTA, all periods would be calculated w.r.t. the joining date. \n\n* PROCEDURE FOR CLAIMING LTA * \n\n*LTA claim form has to be submitted to PAD along with original proof of travel, if any, for availing tax exemption. \n\nDates of leave have to be mentioned in the Claim Form and a copy of approved leave application should be attached with the form. \n\nLTA amount will be directly credited to the employees account by PAD.');
    },
]);
dialog.matches('MEDICLAIM POLICY', [
    function(session) {
        session.send('The Group Mediclaim Policy, issued by The New India Insurance Ltd. will cover all employees other than trainees. Trainees shall be covered on confirmation.  \n\nThe hospitalization benefit will be extended to the employee, his / her spouse and two dependant children. However the coverage will be extended to parents where the employee is single. On getting married, the employee is expected to cover his / her spouse & upto two children under the scheme (In lieu of coverage to parents).');
        session.send('FEATURES \n\nPre-existing diseases are covered. \n\nMaternity benefit coverage is increased to Rs.75,000/- for Assistant Vice President and above. Till a Senior Manager level, the limit remains at Rs.50, 000/-. \n\nMaternity benefit has been extended from the date of joining and is provided for to new Joinees. \n\nNew born child is covered from the date of birth, however all congenital diseases/illness and birth related disorders are excluded from the policy. \n\nSwitchover facility is provided (i.e. change of marital status and higher coverage due to promotion from Senior Manager to AVP grade.) \n\nAll benefits are provided for new Joinees, provided they are covered from the date of joining. \n\nAmbulance charges are provided as actual but not exceeding Rs.3000/-. It is not to be treated as an additional benefit. n\nClubbing of limits is allowed up to Rs.5 lakhs, for employee and spouse both working in HDFC Bank. \n\nThe minimum 24 hours of hospitalization is waived for the cases of pure accidental illness and above for treatments like cataract operation, dialysis, chemotherapy, radiation treatment. \n\nThe Policy covers reimbursement of hospitalization expenses up to the limit of the sum insured. \n\nThe Policy also covers pre-hospitalization expenses up to 30 days prior to hospitalization and post-hospitalization expenses up to 60 days after hospitalization. (Not applicable to maternity cases) \n\nThe Insurance company in the event of a claim, will reimburse to the insured person actual hospitalization expenses falling under the following heads – ');
        session.send('Room expenses incurred in the Hospital / Nursing Home \n\nCost of medicines and nursing expenses \n\nSurgeons, anesthetist’s, consultant’s fee \n\nX Ray, Pathological charges, Blood, Oxygen, Operation Theatre charges, Dialysis, Chemotherapy, etc.');
        session.send('The scheme also covers Maternity Benefits for the employee or spouse and new born. Under Maternity expenses, claim in respect of first two deliveries will be considered. Pre and post hospitalization expenses incase of maternity are not covered. \n\nThe Mediclaim Policy, however will not cover the expenses in respect of the following – \n\nThe cost of spectacles, contact lenses and hearing aids. \n\nDental treatment or surgery of any kind, unless due to accident. \n\nConvalescence, general debility, etc. \n\nCharges incurred towards X Ray and diagnostic expenses not consistent with positive existence of any illness. \n\nVoluntary Termination of Pregnancy \n\nInfertility treatment.\n\nAs an additional benefit, in case the insurance company only reimburses a part of the claim, the Bank will pay for 50% of the difference between the claimed amount and the reimbursed amount.\n\nPlease note that these reimbursements shall be for medical expenses only (and not for incidentals like food etc). Such reimbursements would be subject to a maximum of Rs. 20,000/- per claim.');
        session.send('PROCEDURE\n\nThe Mediclaim cover is currently provided through the New India Insurance Company Limited. The nomination form in this respect can be downloaded from Lotus Notes – Information Portal – Policies –Personal Administration Department – Pad Procedures – Insurance – Mediclaim Policy. One needs to complete the form and submit it to PAD-Mediclaim help desk for further coverage.\n\nIn case of any Hospitalization claim, the necessary claim forms are available with PAD on the Information Portal as above. The completed claim form with full documentation must be submitted to PAD Department.\n\nThe TPA will revert within 10 days of receipt of claim for any additional queries or documents required. \n\nThe expected turnaround time from the TPA is settlement within 20 days of receipt of full documentation.\n\nPAD will clear the cheques after receiving from TPA and give the Credit to the employees account.\n\nAll claims should be submitted within 30 days of discharge to PAD.\n\nIn case of employee’s avail of cashless benefit, employees should write their Employee codes and relationship with the patient in the pre-authorization form available with tie up hospitals.');
    },
]);
dialog.matches('LOAN FACILITIES', [
    function(session, args) {
        builder.Prompts.choice(session, "Which type of Loan you want to know, please select the desired option", "HOUSING LOAN|PERSONAL LOAN|VEHICLE LOAN", { listStyle: builder.ListStyle.button });
    },
    function(session, results) {
        switch(results.response.index) {
            case 0:
                session.beginDialog('/HL');
                session.endDialog();
                break;
            case 1:
                session.beginDialog('/PERLO');
                session.endDialog();
                break;
            case 2:
                session.beginDialog('/VELO');
                session.endDialog();
                break;
            default:
                session.endDialog();
                break;
        }
    },
]);
bot.dialog('/HL', [
    function(session) {
        session.send("The total loan entitlement includes all loans i.e. Housing Personal & Vehicle loan. The individual loan amounts cannot be exceeded. For e.g. if an employee has opted for the maximum of Personal / Vehicle loan then only the balance amount can be taken as Housing Loan. \n\nThe above staff loans as applicable to individual bands may not be claimed as a condition of service or as a matter of right. They are subject to Management's discretion and can be declined without assigning any reasons. \n\nAll loans may be foreclosed. However, partial closures of loans are not permitted");
        session.send("Housing Loan can be availed by an employee to acquire for his / her own use a residential apartment / house.");
        session.send('ELIGIBILITY \n\nThe scheme will be applicable to all confirmed employees of the Bank \n\nEmployees should be first applicant for the house for which he is applying for Housing Loan');
        session.send('ENTITLEMENTS \n\nWithin the overall limits prescribed per cadre the Bank will fund 90% of the agreement value of the apartment / house subject to the given limits. \n\nUnutilized Vehicle Loan amount may be clubbed with the Housing Loan amounts. However, in no case, would the total loan amount be greater than 90% of the agreement value of the house. Total loan utilized by the employee also cannot exceed his total loan entitlement. For this portion of Housing Loan, repayment terms of vehicle loan shall apply. \n\nHousing Loan to allow for two houses within entitlement may be considered. The second loan would be a difference of entitlement and amount initially disbursed for the first house. \n\nIn instances of the employee being promoted to the next cadre he will be eligible to claim the difference in the quantum of loan, provided that the total loan amount does not exceed 90% of the agreement value of the apartment / house. \n\nFor extension of an existing apartment / house the Bank will fund only upto 90% of the extension value, provided again, that the total loan amount does not exceed 90% of the agreement value of the apartment / house. \n\nThe amount paid towards stamp duty / registration charges will not be part of the loan.');
        session.send('RATE OF INTEREST \n\nThe rate of interest applicable will be 2.5% per annum payable monthly, inclusive of interest tax. ');
        session.send("TERMS OF REPAYMENT \n\nSubject to the Bank’s right to demand payment of the entire amount with interest at any point in time, at its discretion \n\nThe tenure of the loan can be either ten years or twenty years. However, if the employee's retirement date is earlier than the tenure option chosen by the employee; the tenure of the loan would be between date of disbursement of loan and date of retirement. \n\nThe principal amount, in full or part will have to be repaid by way of Equal Monthly Installments (EMI). The employee has three options on principal repayment. His EMIs may be calculated basis 30% or 70% or 100% of principal amount. \n\nRepayment of the balance of the principal amount shall be by way of adjustment of the retiral benefits viz. provident fund, gratuity, superannuation amount wherever applicable and any other amount that may become payable at the time of retirement. \n\nThe employee can change the conditions of payment only once during the tenure of a particular Housing Loan. \n\nThe interest on the loan will also be recovered through EMIs. \n\nIf an employee ceases to be in the services of the Bank for any reason whatsoever before completing 3 years service in the Bank irrespective of the date of disbursement of the loan the entire amount will have to be repaid at the prevalent Prime Lending Rate.\n\nThis also applies in case of takeover loans. ");
        session.send('SECURITY \n\nDemand Promissory Note \n\nLoan Agreement \n\nDeclaration cum Power of Attorney \n\nEquitable mortgage of the property by deposit of Title Deeds with the Bank (evidenced by a Declaration cum Power of Attorney to be executed by the employee) \n\nA Life Insurance Policy on the life of the employee who has taken the loan duly assigned to the Bank and / or any other additional security / ies as may be considered necessary by the Bank, on case to case basis. The insurance cover must be to the full extent of the loan for Executives and Assistant Managers. For all other grades, the policy must be at least the full loan amount less 4 lacs. This 4 lac amount would be adjusted against the Superannuation.');
        session.send("PROCEDURE \n\nThe employee has to obtain an in-principle approval from his Group Head if he wants to avail of the Housing Loan. \n\nOn receiving in-principle approval, an application has to be made to Human Resources in the prescribed form by the eligible employee wishing to avail housing loan. \n\nTitle Deeds have to be cleared by solicitors approved by the Bank, and documentation has to be cleared by the Bank’s Legal Department. The application has to be approved by the Group Head of the respective Function and Group Head HR. \n\nThe Bank retains the right to recall the above mentioned Loan facilities or review all or any of the terms and conditions of the Schemes as deemed necessary at its sole discretion.");
        session.endDialog();
    },
])
bot.dialog('/PERLO', [
    function(session) {
        session.send("The total loan entitlement includes all loans i.e. Housing Personal & Vehicle loan. The individual loan amounts cannot be exceeded. For e.g. if an employee has opted for the maximum of Personal / Vehicle loan then only the balance amount can be taken as Housing Loan. \n\nThe above staff loans as applicable to individual bands may not be claimed as a condition of service or as a matter of right. They are subject to Management's discretion and can be declined without assigning any reasons. \n\nAll loans may be foreclosed. However, partial closures of loans are not permitted")
        session.send("Personal Loan will be given to provide financial assistance in times of emergencies or unforeseen contingencies or to finance essential expenses.");
        session.send('ELIGIBILITY \n\nPersonal Loan will be given to all confirmed employees of the Bank subject to approvals as stated');
        session.send('RATE OF INTEREST \n\nRate of Interest applicable will be 5% plus interest tax (if applicable) per annum, payable monthly.');
        session.send('TERMS OF REPAYMENT \n\nThe loan will be repayable in 60 equal monthly installments debited directly to the account of the employee by Personal Administration Department. The entire amount including interest must be liquidated before date of retirement, or on leaving the services of the Bank. Subject however to the Bank’s right to demand payment of the entire amount with interest at any point in time, at its discretion. \n\nWithin the overall limits prescribed per Band, the loan maybe availed in more than one installment, subject to each such installment amount being in multiples of Rs.25,000/- for staff within Band E4 and above, and in multiples of Rs.10,000/- for staff in Band E1, E2 & E3. \n\nWithin the overall limits prescribed per cadre, staff in Band E1, E2 & E3 having repaid not less than Rs. 10,000/- of existing Personal loan can avail a fresh loan in multiples of Rs. 10,000/-. Similarly, staff in Band E4 and above having repaid not less than Rs. 25,000/- of existing Personal loan can avail a fresh loan in multiples of Rs. 25,000/. \n\nIn case of foreclosure of loan, the employee can only avail of a fresh loan after a period of three months from the date of closure.');
        session.send('SECURITY \n\nDemand Promissory Note or other additional security / ies as may be considered necessary by Human Resources is required as security for the loan. ');
        session.send('PROCEDURE \n\nEmployees should liase with PAD to ascertain his /her eligibility for Personal loan, who will in turn confirm the same to HR. \n\nEligibility Application for Personal Loan must be signed off by Business Head / Group Head. \n\nApplication and the following documents duly completed have to be forwarded to the HR dept: \n\nLetter to HDFC Bank Ltd. Employees’ P.F. Trust \n\nLetter of Undertaking Re. P. F. loan \n\nLetter of lien in favour of the Bank \n\nAgreements for personal loan on Rs.100/- stamp pape\n\nDemand Promissory Note \n\nHR will ascertain the eligibility of the employee and then send a note of advice to PAD at Mumbai, who will credit the employees’ account, accordingly.');
        session.endDialog();
    },
]);
bot.dialog('/VELO', [
    function(session) {
        session.send("The total loan entitlement includes all loans i.e. Housing Personal & Vehicle loan. The individual loan amounts cannot be exceeded. For e.g. if an employee has opted for the maximum of Personal / Vehicle loan then only the balance amount can be taken as Housing Loan. \n\nThe above staff loans as applicable to individual bands may not be claimed as a condition of service or as a matter of right. They are subject to Management's discretion and can be declined without assigning any reasons. \n\nAll loans may be foreclosed. However, partial closures of loans are not permitted")
        session.send("To provide financial assistance to employees to purchase a vehicle for their personal use. ");
        session.send('ELIGIBILITY \n\nVehicle Loan will be given to all confirmed employees in Band E1 to Band E4');
        session.send('LIMITS \n\nLoan entitlement amount as applicable to individual band or 80% of the cost of the vehicle (ex-showroom price) whichever is less. ');
        session.send('RATE OF INTEREST \n\nRate of Interest applicable will be 3% plus interest tax (if applicable) per annum, payable monthly.');
        session.send("TERMS OF REPAYMENT \n\nThe loan will be repayable in 60 equal monthly installments debited directly to the account of the employee by Personal Administration Department. The entire amount including interest must be liquidated before date of retirement, or on leaving the services of the Bank subject however to the Bank’s right to demand payment of the entire amount with interest at any point in time, at its discretion.");
        session.send('SECURITY \n\nDemand Promissory Note and all original documents related to the car as well as any other additional security / ies as may be required by the Bank. \n\nHypothecation of the Vehicle in the name of the Bank \n\nNoting of Bank’s charge in RTO’s book \n\nComprehensive insurance covering all the risks including riot, with Bank’s name appearing in the policy \n\nStamped receipt for purchase of vehicle must be lodged with the bank within 30 days after the loan is disbursed');
        session.send('PROCEDURE \n\nEmployee must submit an application for Vehicle Loan along with the original invoice for the approval of his /her Business Head / Group Head. \n\nThis approved application and the following documents duly filled have to be forwarded to HR \n\nLetter to HDFC Bank Ltd. Employees’ P.F. Trust \n\nLetter of Undertaking regarding P. F. loan \n\nLetter of lien in favour of the Bank \n\nAgreements for Vehicle loan on Rs.100/- stamp paper \n\nDemand Promissory Note \n\nA letter of omnibus irrevocable undertaking on Rs. 100/- stamp paper');
        session.send("HR will ascertain the eligibility of the employee vis a vis total loan entitlement and then send a note of advice to PAD at Mumbai to issue cheque directly in favour of the vendor. \n\nThe employee is allowed to take a fresh loan only after one year from the date of disbursement of the previous loan, provided he closes the previous loan. If however, the employee gets promoted and there is a change in his entitlements, he may foreclose the previous loan and opt for a fresh loan immediately. ");
        session.send('Policy Title: Loans Closure on Resignations.\n\nAll Employee Loans need to be closed by the exiting employees within one month from the last date of working. The loan should either be repayed in full by the exiting employee, or the new organization where the employee is joining should provide sufficient comfort specifying the effective date and the amount of loan takeover. Failure to comply within one month of the last date of working with either of the aforesaid clauses would lead to the attraction of PLR on the outstanding loan with effect from the next day of the last date of working.');
        session.send('Process:\n\nThe Centralized Operations Team in Human Resources (COPS - HR) would release the exit checklist of the resigned employee.\n\nThe supervisor of the exiting employee would provide the COPS - HR team with the last date of working which in turn would be communicated to the PAD team\n\nAgainst the exit checklist, PAD team would provide details on the outstanding loan amount if any. The outstanding loan amount would be communicated to the concerned employee by the exit team. The O/S letter/mail to the employee shall contain the clause of PLR application in case of non compliance.\n\nThe employee should either provide a comfort letter from his/her new employer or else specify the mode of repayment of the outstanding loan with a date.\n\nThe comfort letter should be provided to the COPS - HR team within one month from the last date of working. The information of the same would be informed to PAD by the same team. If PAD does not receive any information from the HR team on the comfort letter within one month of the last date of working, PAD will start charging PLR on the O/S amount and the interest thereof, with effect from the next day of the last date of working. PLR shall also be applied if the organization taking over the loan overshoots the pre committed date by more than seven days.\n\nThe account debit advise/Cheque/DD received from the employee would be forwarded to PAD for loan closure. If PAD does not receive any information on the same   within one month of the last date of working, PAD would start charging PLR on the O/S amount and the interest thereof with effect from the next day of the last date of working.');
        session.endDialog();
    },
]);
dialog.matches('PROVIDENT FUND', [
    function(session) {
        session.send("The employees’ Provident Fund is administered by the HDFC Bank Ltd. Employees Provident Fund Trust, managed by trustees who are officers of the Bank nominated by the Management. ");
        session.send('ELIGIBILITY \n\nAll employees will become members of the Trust from their date of joining the services of the Bank');
        session.send('DEDUCTION AND CONTRIBUTION \n\nEvery employee who is a member of the Fund will contribute 12% of base salary towards the Fund every month. \n\nThe Bank will make an equal contribution of 12% of employees’ base salary every month. \n\nThe contributions of the employee and the Bank will be credited to the Trust Fund each month. \n\nEmployees joining the Bank from other organizations may transfer their Provident Fund Balance from the previous employer to the Bank’s Trust Fund. Such employees will fill Form 13 (A) and route it through the Bank’s Trust to their previous organization. \n\nInterest earned on the accumulated amount will be credited to the employees’ PF Account at the end of each financial year. Members will be issued a statement of account affirming balances to their credit for each financial year.\n\nFor details of the scheme, please peruse the detailed booklet given to you at the time of joining');
        session.send('NOMINATION \n\nEvery employee who is a member of the Trust is required to make nominations through the relevant form, conferring upon one or more persons the right to receive the amount lying to the credit of his / her PF account, in case of death. \n\nIf the officer is not married and has no family, the nomination may be in favour of any person(s). However, in the event of the officer getting married and having a family subsequently, fresh nominations can be made favouring the family member(s).');
        session.send("GRATUITY \n\nThe HDFC Bank Ltd. Gratuity Scheme is administered by the trustees who are officers of the Bank nominated by the Management. The Fund is managed by LIC on behalf of the trustees.");
        session.send('ELIGIBILITY \n\nManagement Trainees, Executive Trainees and Trainees will be covered on confirmation of their services in the Bank. \n\nThe Gratuity Scheme will be applicable to all other employees from their date of joining the services of the Bank. \n\nBENEFIT \n\nEmployees having completed a minimum of 5 years with the Bank, will be entitled to receive gratuity at the rate of 15 days Base Salary for every completed year of service. The last drawn Base Salary will be applicable for calculation in this regard. \n\nNOMINATION \n\nEvery employee who is a member of the gratuity scheme is required to make a nomination on the relevant form conferring upon one or more persons the right to receive gratuity benefits on his / her death.');
        session.send('WITHOLDING OF BENEFITS \n\nThe Bank shall be entitled to withhold and forfeit the whole or part of the aforesaid Terminal Benefits payable to the employee - in case the employee is found to be guilty of misconduct or has violated the Code of Conduct at any time during the period of his service with the Bank.\n\nSUPERANNUATION \n\nThe HDFC Bank Ltd. Superannuation Scheme is administered by the trustees who are officers of the Bank nominated by the Management. The Fund is managed by LIC on behalf of the trustees. \n\nELIGIBILITY \n\nThe Superannuation Scheme will be applicable to employees in Band E4 and above at the discretion of the Management. \n\nHowever, the employee is required to work for minimum five years in Band E4 and above to qualify for the superannuation scheme.\n\nCONTRIBUTION \n\nAs per the Superannuation Scheme the Bank will contribute 13% of Annual Base Salary for all employees covered. This contribution will be made at the start of every financial year, in advance for the following year.');
        session.send('NOMINATION \n\nEvery employee who is a member of the Superannuation Scheme is required to make a nomination on the relevant form conferring upon one or more persons the right to receive superannuation benefits on his / her death. \n\nMoney due through superannuation may only be claimed at the time of leaving the services of the Bank.\n\nEvery Branch Head / Unit Head / Departmental Head is authorised for staff welfare activities to the extent Rs. 500/- per employee per year. The amount may be used for activities like departmental picnics, lunch-outs, dinner, get-togethers and the like. \n\nThis amount is over and above the money specified for late sitings/ night allowances or normal tea / coffee during the day. Please also note that in case of shared resources, only one department will be allowed to claim for the person. \n\nClaims made in this respect need to be authorised by respective Regional Business Manager / Function Heads and forwarded directly to finance for payments.');
        session.endDialog();
    },
]);
dialog.matches('TRANSFER AND RELOCATION POLICY', [
    function(session) {
        session.send("TRANSFER AND RELOCATION POLICY \n\nThe Bank reserves the right to transfer employees to any other office / branch, subsidiary, or associate company of the Bank that is in existence or may come into existence at a future date. Such transfers could be permanent or for a temporary period.");
        session.send('TRAVEL ON TRANSFER \n\nAn employee and his/her family (spouse and children) will be eligible to travel by the same class of accommodation as in case of travel on official work.');
        session.send('TRANSIT ACCOMMODATION ON TRANSFER \n\nEmployees (not immediately being accompanied by a family i.e on a single status basis) being permanently transferred should stay at the Bank’s Guest House, if any, at that location, as a first option. \n\nIn other cases, the employee may stay at the Hotel approved as per his / her Band or any other equivalent arrangement made by the Bank at Club etc. Limits on expenses for meals/ laundry will be as per entitlements on business travel. \n\nA transferred employee can stay at the Guest House or Hotel for a maximum period of one month from the date of reporting at the location, to enable him / her to make arrangements for suitable accommodation. Exceptions to the one month rule maybe approved by the Group Head / Finance and Administration. \n\nEmployees staying at the Guest House will be reimbursed Rs. 500 towards meal and other incidental expenses per day. \n\nAlternatively, a transferred employee making his own stay arrangements for the initial month will be reimbursed out-of-pocket expenses at Rs. 500/- each for self and spouse and Rs.300/- per child, per day.');
        session.send('RESIDENTIAL ACCOMMODATION ON TRANSFER ON BANK’S BEHEST FOR BAND D2 AND ABOVE \n\nEmployees transferred permanently at the behest of the Bank, in Bands D2 and above will be entitled to accommodation as per Bank’s residential accommodation policy at the new location.\n\nRESIDENTIAL ACCOMMODATION ON TRANSFER ON BANK’S BEHEST FOR BAND D1 AND E4 \n\nEmployees transferred permanently at the behest of the Bank, in Bands D1 & E4 will be entitled to residential accommodation at a maximum cost / outflow of Rs. 8 lakhs deposit and Rs 8000/- rent per month in Mumbai. For locations outside Mumbai, equivalent accommodation will be provided at the cost appropriate to the location to be approved by the Human Resources Department on case to case basis.\n\nRELOCATION EXPENDITURE \n\nThe packing and forwarding charges, subject to one truck load together with transit insurance cost, will be picked up the Bank against actual bills / vouchers from packers approved by Administration. In the absence of an approved packer, the employee can put forward the cost details of an alternate packer for approval by the Group Head – Finance & Administration.\n\nSETTLING EXPENSES \n\nAn employee transferred from one location to another at the behest of the Bank will be entitled to reimbursement of amount equivalent to one month’s base and allowances towards other incidental expenditure.');
        session.send("REQUEST TRANSFERS \n\nRequests for transfers from employees may be considered subject to suitable vacancy at the branch / office specified. \n\nAll the concerned Business / Group Head must approve such request, in writing. The Head - HR, will be the final approving authority. \n\nFor such transfers, the above mentioned terms pertaining to travel, accommodation, and relocation expenditure will not be applicable.\n\nHRA on Transfer\n\nRequest Transfers:\n\nIn case of all request transfers, the employee would get paid HRA as per the city where he has been transferred to. This might imply a reduction / increase of salary for the incumbent as the case may be.\n\nBank Transfers: \n\nFor the Assistant Managers and Deputy Managers, the employee’s salary would be protected. If the person is moving from lower city class to higher city class, he would get the benefit of extra HRA. If the person is moving from higher city class to lower city class, the person would get the HRA as per lower city class. However, the differential amount to bridge up to his existing salary would be done by means of an Additional HRA component. This component would continue to exist even on promotion. If and when the person is transferred back to his original city class; this additional HRA component would cease to exist and would be adjusted into his HRA. Also, Additional HRA component would cease to exist once the person becomes eligible for Bank accommodation.\n\nThe Senior Managers and AVPs, the Bank provides accommodation in case of transfer at the request of the Bank. For AVPs, there would be a reduction in salary to the extent of his Additional HRA and housing would be added on. In cases, where the employee opts for cash in lieu of housing, the cash component would be greater than or equal to the higher Additional HRA. As and when he moves into Bank accommodation, Additional HRA or Cash for housing would stop. \n\nFor Senior Managers, similarly, we would have a reduction in salary to the tune of HRA difference and housing / Cash in lieu would be given. Same principle as followed in case of AVPs shall apply.");
        session.endDialog();
    },
]);
dialog.matches('TRAVEL POLICY', [
    function(session, args) {
        builder.Prompts.choice(session, "Which type of Travel policy you want to know, please select the desired option", "TRAVEL ON OFFICIAL WORK|TRAVEL ON TRAINING |TRAVEL ON DEPUTATION|OVERSEAS TRAVEL POLICY", { listStyle: builder.ListStyle.button });
    },
    function(session, results) {
        switch(results.response.index) {
            case 0:
                session.beginDialog('/TOO');
                session.endDialog();
                break;
            case 1:
                session.beginDialog('/TOT');
                session.endDialog();
                break;
            case 2:
                session.beginDialog('/TOD');
                session.endDialog();
                break;
            case 3:
                session.beginDialog('/OTP');
                session.endDialog();
                break;
            default:
                session.endDialog();
                break;
        }
    },
]);
bot.dialog('/TOO', [
    function(session) {
        session.send("Travel entitlements have been segregated into three distinct areas to cater to all types of travel on work: \n\nTRAVEL ON OFFICIAL WORK \n\nTRAVEL ON TRAINING \n\nTRAVEL ON DEPUTATION\n\nEmployees will not be entitled to reimbursement of expenses on liquor and cigarettes under any of the above areas of travel. \n\nTrainees would get their reimbursement according to their future grade of confirmation \n\nTravel advance if any, should not be outstanding for more than a month. The Bank would be authorised to debit the employee’s account in case of such an eventuality.");
        session.send("TRAVEL ON OFFICIAL WORK \n\nThese entitlements will apply to executives travelling on official work for a period less than or equal to 7 days. \n\nTravel for a period exceeding 7 days is covered separately under “Travel on Deputation”. \n\nAPPROVING AUTHORITY \n\nThe respective Group Head or Business Unit Heads nominated by the respective Group Heads must approve all travel plans prior to travel.\n\nMODE OF TRAVEL \n\nAll employees shall, while travelling on official work, be eligible for travel by air. Where alternative modes of travel are convenient and cost effective, employees are expected to travel by the same. \n\nAir travel in all cases will be by economy class except in the case of Band CX, who shall be entitled to travel by Executive/Business Class, subject to MD’s approval. \n\nSubmission of paid air-ticket and boarding card is a necessity for reimbursement. \n\nEmployees in Band D4 and above accompanying Group Heads on Business travel may be upgraded to Executive Class with the approval of the Group Heads excluding travel for Conferences and Training. \n\nEmployees travelling overnight between cities are eligible to claim for meals and incidental expenses as per actuals. ");
        session.send('ACCOMMODATION \n\nEmployees on business travel should avail of the Guest House as a first option of stay. \n\nHowever, employees in Band D4 & above, with the approval of Group Head / MD, may opt for hotel accommodation. \n\nThe bank has or will enter into special arrangements (for concessional tariff ) with certain hotels. The list of these hotels will be circulated from time to time. Executives shall stay only in such hotels, unless accommodation is not available in any of the hotels specified by the Bank. \n\nEmployees requiring hotel accommodation while travelling on official work will be entitled to stay in a standard single occupancy room. \n\nOther than in respect of concessional tariff arrangements entered into by the Bank, the entitlements would apply for hotel accommodation as given in your entitlements. ');
        session.send('MEALS \n\nThe Bank will meet all actual expenses for meals and laundry (within the rates applicable per Band), excluding alcoholic beverages and outstation personal call expenses. Entitlements as given in the grade shall apply. \n\nTELEPHONE CALLS \n\nExpenditure incurred on Official Calls only will be reimbursed. Expenses on Personal Calls are to be paid by the executive himself and should be settled at the hotel at the time of check out. Employees should, to the extent, make official calls from the Bank offices/ Branches rather than from the hotel. \n\nUnless phone bills are not specifically mentioned to be official, then it would be construed to be for personal purposes. \n\nPER DIEM (Accommodation in lieu of availing the Hotel facilities) \n\nIn instances where the Guest House is not available, employees making their own arrangements for stay, will be entitled to per diem covering meals and lodging, excluding local conveyance, as given below \n\nIn cases, where the Guest House is available and the employee still chooses to make his own arrangements, he / she will be paid a per diem of Rs. 500/- towards incidental expenses, excluding local conveyance. Per Diem would be calculated on the basis of number of nights spent in the ');
        session.send('GUEST HOUSE ACCOMMODATION \n\nAt all the Bank’s Guesthouses, only employees at the level of Band E1 & E2 would need to share room accommodation. However, female and male employees are not expected to share room accommodation. \n\nEmployees of grade Band E3 and above will be eligible for independent room accommodation except where a large number of employees are staying at the guest house on account of training /conferences.\n\nCAR HIRE ON BUSINESS TRAVEL \n\nEmployees in Band D2 & above are eligible to hire a car while travelling on business. \n\nAll other employees may however also hire a car in exceptional circumstances where he/ she is required to accompany Corporate Clients. This must be specifically mentioned on the travel claim and approved by the Group Head. \n\nIn locations where there is no organized public transport system like taxis / pre-paid taxis / auto etc., with specific prior approval of the Group Head, the employee may choose to hire a non –a/c car only. \n\nClaim for business travel which includes car hire charges, as an exception to the above rules must have specific approval of the Group Head on the travel claim form before being sent to Fin. Con. for payment processing. \n\nEmployees who have been provided bank maintained vehicle shall use the same for business purpose for distances of 150 Kms (round trip). if they choose not to travel by other mode of transport viz. air, train or bus. The option of car hire can be availed only where the business travel is greater than 150 kms on a round trip basis. \n\nReimbursement for use of car is permitted only if cost of reimbursement is lesser than normal mode of transport. \n\nRate of reimbursement will be same as mentioned under intra – city car hire.\n\nLOCAL CONVEYANCE IN BUSINESS TRAVEL / INTER OFFICE VISITS \n\nEmployees in Band D1 and below travelling up-country and making local official trips will be reimbursed on actuals for hiring metered Taxis / auto rickshaws, as the case may be. Similarly, employees in the Band D2 and above, travelling upcountry will be reimbursed on actuals for hiring private taxis or travelling by a metered Taxi. \n\nIntra-city, employees making use of their own vehicles for conducting the Bank’s business, will be reimbursed Rs. 7.50/- per km. for use of a four-wheeler, and Rs. 4.00/- per km. for use of a two-wheeler. This intra-city reimbursement will not be applicable to employees in the Bands of D1 and above, who are eligible for a company car, unless their vehicle is under maintenance. A detailed trip sheet with mileage should form part of the claim voucher. \n\nOnly those employees, who are not entitled for a bank car, are eligible for claiming local taxi /local conveyance fare if on a business call or visiting another office/branch in the same city. \n\nCar hire would not be permitted in Mumbai for any grade.');
        session.endDialog();
    },
]);
bot.dialog('/TOT', [
    function(session) {
        session.send("Travel entitlements have been segregated into three distinct areas to cater to all types of travel on work: \n\nTRAVEL ON OFFICIAL WORK \n\nTRAVEL ON TRAINING \n\nTRAVEL ON DEPUTATION\n\nEmployees will not be entitled to reimbursement of expenses on liquor and cigarettes under any of the above areas of travel. \n\nTrainees would get their reimbursement according to their future grade of confirmation \n\nTravel advance if any, should not be outstanding for more than a month. The Bank would be authorised to debit the employee’s account in case of such an eventuality.")
        session.send("APPROVING AUTHORITY \n\nThe respective Business Unit / Group Head must approve all travel plans prior to travel. \n\nMODE OF TRAVEL \n\nTravel for Training will be by Economy Class - Air, for all employees, in the Bands of Band E4 and above, and by II AC / I Class - Rail, for all other employees. Any exception will require the approval of the Group Head. ");
        session.send('ACCOMODATION\n\nWhen accommodation has been arranged for the entire group, the participants will have to be guided by these arrangements. These would supercede any grade wise entitlements. \n\nIn Locations where the Bank has a Guest House, out-station employees must use the same as a first option of stay. \n\nCONVEYANCE \n\nExpenditure on local conveyance would be reimbursed on actuals. \n\nWherever arrangements have been made for the Group for Airport /Railway Station transport, the participants shall avail of the same. \n\nEmployees (below Band D2) using their personal vehicle for business purposes / attending training entitled to claim @ Rs 7.50 /- per Km for four wheelers and Rs 3/- per Km for two wheelers scooter / motorcycle. \n\nIt is OK to reimburse car hire provided the cost of car hire is less than the normal mode of transport or reimbursement at the rate as mentioned above. \n\nMEALS \n\nWherever Meal arrangements have been made for the Group, the participants shall avail of the same. \n\nHowever, in absence of any such arrangements participants will be entitled to the same amounts as on business travel (whether for Guest House or Hotel). ');
        session.endDialog();
    },
]);
bot.dialog('/TOD', [
    function(session) {
        session.send("Travel entitlements have been segregated into three distinct areas to cater to all types of travel on work: \n\nTRAVEL ON OFFICIAL WORK \n\nTRAVEL ON TRAINING \n\nTRAVEL ON DEPUTATION\n\nEmployees will not be entitled to reimbursement of expenses on liquor and cigarettes under any of the above areas of travel. \n\nTrainees would get their reimbursement according to their future grade of confirmation \n\nTravel advance if any, should not be outstanding for more than a month. The Bank would be authorised to debit the employee’s account in case of such an eventuality.")
        session.send('Temporary transfers / relocation for a period exceeding seven days but not exceeding three months would be treated as deputation. Any deputation would require the Business Head’s approval.\n\nMODE OF TRAVEL \n\nEmployees on deputation will be entitled to the same means of travel, as applicable for travel on other official work.');
        session.send('ACCOMMODATION \n\nEmployees on deputation should stay at the bank’s Guest House, if any, at that location, as a first option. \n\nIf staying at the Guest House, employees will be eligible for an all inclusive allowance to the maximum of Rs 500 per day towards meals, laundry and incidentals. The same would be reimbursed to him on production of bills. \n\nIn case the Bank Guest House facility is not available the employee will be eligible for hotel accommodation and allowances as per his entitlement. \n\nACCOMODATION ALLOWANCE (in case of own arrangement) \n\nAs far as possible the organization will make arrangements for accommodation, as it may deem feasible. In the event when this is not possible the employee may make his own arrangements for which allowance will be given: This would be calculated on pro-rata basis for the number of days on deputation. \n\nTRAVEL CLAIMS \n\nAn employee travelling on Bank’s business may take an advance, duly approved by the Group / Business Head. \n\nPost travel, employee will fill in the Travel and Entertainment Claim Statement Form and get the approval of the Group / Business Head at the Band 6 or above. \n\nApproved statements will be submitted with all relevant supports, to Finance within 5 days from return of each tour. \n\nFinance will process these vouchers and return them to the concerned employee for encashment across the cash counter.\n\nFREQUENT FLYER PRIVILEGES \n\nEmployees travelling on the Banks business may become entitled to the frequent flier program benefits in terms of mileage benefits offered by various airlines. These mileage benefits would accrue to the individual employee concerned for personal use. If the same is redeemed against business travel, the amount will not be reimbursed.');
        session.endDialog();
    },
]);
bot.dialog('/OTP', [
    function(session) {
        session.send("Travel entitlements have been segregated into three distinct areas to cater to all types of travel on work: \n\nTRAVEL ON OFFICIAL WORK \n\nTRAVEL ON TRAINING \n\nTRAVEL ON DEPUTATION\n\nEmployees will not be entitled to reimbursement of expenses on liquor and cigarettes under any of the above areas of travel. \n\nTrainees would get their reimbursement according to their future grade of confirmation \n\nTravel advance if any, should not be outstanding for more than a month. The Bank would be authorised to debit the employee’s account in case of such an eventuality.")
        session.send("Travel Plan approval\n\nAny business or training related overseas travel by a bank employee must be approved by the MD or by a Group Head designated in this respect as part of a MD approved policy.");
        session.send('Air Travel Class\n\nEmployees are entitled to class of travel as per grid below :\n\nBand Travel Class\n\nUpto 6  Economy class\n\n* On training, travel class will be as per International Training Policy in force. Any deviation in travel class for specific situations will need approval by MD.');
        session.send('Hotel Stay\n\nEmployees, while on official work, are entitled to stay at any of the designated hotels.\n\nIn the absence of a designated hotel at the place of travel, respective Group Head / MD must approve the hotel room rate tariff, prior to travel.\n\nThe bank will pay hotel room charges (plus applicable taxes, etc.) but not for laundry, meals, etc. which will have to be paid by the employee from the per diem.\n\nTelephone calls \n\nOfficial telephone calls (local / international), duly approved, will be reimbursed to the employee. Employees should avoid making international phone calls from the hotel (given high surcharge charged by hotels) and opt for alternatives like mobile phones with international roaming.\n\nEntertainment expense\n\nBusiness entertainment expense, duly approved, will be reimbursed to the employee.\n\nCar Hire/Conveyance\n\nRespective Group Head / MD must approve car hire charges (normally only for inter-city travel), since local conveyance is to be incurred by the employee from the per diem.\n\nVisa/Insurance charges\n\nVisa and overseas medical insurance charges, duly approved, will be reimbursed to the employee.\n\nPer Diem allowance\n\nEmployees, while travelling overseas on official work, will be entitled to a Per Diem covering meals, laundry, airport taxes, airport transportation, local conveyance and all other incidental expenses (not separately covered in this Policy).\n\nPer Diem will be for the number of days of travel + 1 day for each city travelled to. \n\nIn case of sponsored travel trips (sponsor bearing cost of meals) or where the participation fee / package include cost of meals, employees will be entitled to claim 50% of normal Per Diem. \n\nPer Diem allowance on training will be at 75% of normal per diem or as per International Training policy in force. \n\n　　Per Diem grid is given below:\n\n  Grade  Far / Middle East  Europe / USA\n\nUpto Band 4   USD 80  USD 100\n\nBand 5 USD 100 USD 125\n\nBand 6    USD 125  USD 150\n\nFor the number of days that the employee does not avail of hotel stay, per diem will be increased by $ 75 for all grades.\n\nTravel Expense Statement (expense within limits as per Policy) must be approved by respective Group Head, and submitted to Payments Desk – Fincon normally within 7 days of return. Any FX advance (towards per diem, etc.) must be settled within the same timeframe.\n\nThe total foreign currency utilization has to be within the Reserve Bank of India guidelines in force.');
        session.endDialog();
    },
]);
dialog.matches('CAR POLICY', [
    function(session) {
        session.send("CAR POLICY \n\nEmployees in Band D2 and above will be provided with a car. The Bank shall also reimburse to the employee, car running and maintenance expenses as per entitlements at respective Bands, which will be announced from time to time. \n\nEmployees, who do not opt for the car, will be given cash allowance subject to limits which are announced from time to time. \n\nEmployees in Band D1 shall also be given cash in lieu of car");
        session.send('ENTITLEMENT/SCHEME\n\nAn employee in grade Deputy Vice President and above is eligible for a car within his entitlements as specified. In case he opts for a car higher than his entitlement, the employee would have to pay the difference. In such a case, the employee has to buy back the car at the end of four years or his\n\nleaving the services of the Bank, whichever is earlier.\n\nThe registration charges at actuals will be reimbursed corresponding to the basic car price subject to a maximum as specified in the entitlements. For instance, if an employee opts for a car that exceeds the entitlement as stated above, the difference on account of registration will not be borne by the Bank.\n\nWithin his entitlements, an employee can buy as many "new" cars as possible. . \n\nIn the event of an employee resigning from the services of the Bank, the accessories along with the Car will have to be returned to the Bank.\n\nThe employee may be at the Bank’s discretion be allowed to do a buy-back at the higher of book value, WDV or market price. \n\nIn case of upward revision of Car Entitlement within the same financial year as purchase of Car, the employee shall be reimbursed car price, registration and insurance at the lower value of: \n\nDifferential between actual base cost of car (incl. accessories) and entitlement before revision, OR\n\nDifferential between new entitlement and entitlement before revision \n\nEmployee may buy more than one new car as long as the total cost of all cars bought by the employee is within the entitlement. The Bank will bear the registration and insurance of one or more such cars as long it does not exceed the registration and insurance that would have been incurred if the car was purchased as per total limit set as entitlement. \n\nBank shall also reimburse fuel and maintenance of all the cars in Bank books, subject to the same collectively being within the limits as prescribed for the employee');
        session.send('POOL CARS \n\nEmployees eligible for a car should be given cars out of the pool, if requested. \n\n"Reference Cost" for this section is defined as the higher of the book value or market value of the car. \n\nIf the original cost of the car is less than the entitlement, then the employee can opt for the same at reference cost.\n\nIf the original cost of the car is greater than entitlement, the employee would have to get the car at reference cost. In case the reference cost for the car is greater than entitlements, then the employee would have to pay the difference.\n\nThe employee taking a car pool should use the car for at least two years before he can avail of the buyback policy @ 1%; provided the car has completed four years of its life.\n\nThe repair and maintenance limits would be as per life of car. \n\nIf the life of car is less than two years, then normal maintenance amounts shall apply as per the life of the car. For example, if the car is one year old, then till the 4th year of the life of car, maintenance amount for 2nd, 3rd, and 4th year shall apply.\n\nIf the life of car is greater than two years, then for the two years, then for the two years that the car would be with the employee before the 1% buyback, maintenance amounts for 3rd and 4th year shall apply');
        session.send('Car Maintenance expenses will be reimbursed as stated in Entitlements.\n\nThe amounts mentioned in the same will exclude replacement of batteries and of tyres in the third / fourth year. Amount unspent in a particular year will be carried forward to the following year. If the repairs in a particular year exceed the above amounts (including any carried forward amount) the value of unused petrol entitlement can be offset against the repairs cost.\n\nCar parking charges and Toll Taxes may be claimed on production of bills. These would be within car maintenance limit. \n\nCar washing charges will also be reimbursed but as a part of maintenance limits.\n\nTraffic fines and Driver’s salary shall not be reimbursed.');
        session.send("CAR BUY BACK\n\nEmployees would at the end of 4 years be allowed to purchase the car at a nominal value of 1% of the original cost.\n\nIf an employee on promotion is eligible for a higher entitlement, the same will be granted only provided his existing car has completed a two-year period. In such a situation, the employee has an option of not buying back the car.\n\nIn case the employee wishes to buy back the car, then he needs to buy back the car first and then purchase the new car. \n\nThe employee will coordinate with administration for purchase of new car. Employee is expected to hand over the old car to Administration on the day of delivery of the new car. \n\nIf for the existing car, the employee had opted for an upgraded model and the car has completed two years, then he can buy back the car at book WDV of the Bank’s cost. (The differential amount paid by him will not be taken into account whilst arriving at book WDV)\n\nNote – The above scheme is applicable for purchase of new cars only. Second Hand vehicles cannot be purchased under the scheme. \n\nCash Allowance In Lieu of Car \n\nEmployees, who do not opt for the car, will be given cash allowance in lieu of car, limits of which are stated in the entitlements: This Cash Allowance in lieu of car is subject to income tax as applicable.");
        session.endDialog();
    },
]);
dialog.matches('CREDIT CARDS', [
    function(session) {
        session.send("CREDIT CARDS \n\nAll employees on the permanent rolls of the Bank will be eligible for a Bank Credit Card. Locations where cards would be issued will depend on whether the product has been rolled out to retail customers in that city. \n\nAll eligible staff must apply for the Bank Credit Card using the form applicable only for staff. The form should be complete with signature and employee code. ");
        session.send('All employees in Band 5A and above will be eligible for Bank Gold Card. \n\nThe Bank reserves the right to withdraw this facility at any point of time. \n\nAll employees, excepting in cities where Corporate Credit Cards has not been issued, will be required to use only the HDFC Bank Credit Card for Business Expenses.');
        session.endDialog();
    },
]);
dialog.matches('RESIDENTIAL ACCOMMODATION', [
    function(session) {
        session.send("RESIDENTIAL ACCOMMODATION \n\nEmployees at grades Deputy Vice Presidents (Band D2) above are eligible for Bank leased accommodation or cash in lieu thereof as per their eligibility. The Bank may, at its discretion provide residential accommodation to an employee in Band D2 and above.\n\nTypically, this policy would not be applicable to employees who are being offered position of work in their hometown. The type of accommodation will be at the discretion of the bank as applicable to the Band of the employee and place of posting.\n\nCash in lieu of Housing, subject to prescribed limits shall be paid to all those employees eligible, but who have not availed of the housing facility. ");
        session.send('RESIDENTIAL ACCOMODATION\n\nThe policy will be applicable to all employees in Band D2 and above level at Managerial Discretion. The Bank will enter into lease for the houses subject to limits as specified normally for a period of three years.\n\nIn addition to entitlements as mentioned, 1% of deposit and I month’s rent will be paid to the employee as brokerage subject to approval of Group Head in charge of Residential properties.\n\nReimbursement of Expenses – Bank Leased Accommodation:');
        session.send('BACKGROUND\n\nThe Bank provides residential accommodation to executives above a certain grade. These executives hold key positions in the Bank which may require them to perform official work from their residences. The Bank may need to carry out refurbishment from time to time to such leased premises such that the same are in habitable condition. These refurbishments which include plumbing and tiling, wood and electrical fittings, painting etc. not being permanent in nature are not capitalized.\n\nAs the grade of the executive increases, so does his / her scope of authority / responsibility and there is greater need for interactions with fellow employees / business partners. For senior executives, where the Bank provides accommodation, arranging customer / business entertainment and work-related informal employee meetings at their residences is common practice in this industry and is more cost-effective for the Bank as against organizing such events in hotels. It is important that the refurbishments are commensurate for such requirements, and hence there is a need to introduce different levels of refurbishment depending on the grade of the executive. ');
        session.send('PROCESS\n\nAt the time of moving into the accommodation, Group Head in charge of residential properties will approve reimbursement of actual expenditure incurred towards painting/ repairs / refurbishment etc. of the house, (subject to the limits specified below) as a one time expense. Before incurring the expense, an estimate will need to be furnished and necessary approval sought from Group Head in charge of residential properties or from an official designated by the Group Head to approve such estimates.\n\nOn renewal of leases, after an initial lease period of at least 33 months, the flat may require repainting and additional refurbishment. These amounts, subject to limits as stated below, will be reimbursed on prior approval of Group Head in charge of residential properties. \n\nBand  Amount (new lease)  Amount (renewals)\n\nBand D2 & Band D3  Rs. 150,000/- Rs. 75,000/-\n\nIf the Bank gives a guarantee to the lessor on behalf of the employee then Rs. 5000/- p.m. from the rent amount payable or Rs. Five Lac from the deposit payable will be reduced. \n\nIn addition to the above, minor repairs of upto Rs. 10,000/- per annum would be reimbursed towards maintenance of the flat (electrical / plumbing / pest control etc.)\n\nEmployees at Grade Senior Vice Presidents and above would be entitled for self leased Accommodation. Eligible employees may combine the lease deposit along with the amount eligible under the staff Housing loan scheme of the Bank, provided that the total amount funded by the Bank does not exceed 80% of the agreement value of the property\n\nThe above amounts would apply to self leased accommodation / accommodation for which deposit and loan amount are combined.\n\nThe above facilities are effective January 16, 2010');
        session.endDialog();
    },
]);
dialog.matches('PERFORMANCE MANAGEMENT', [
    function(session) {
        session.send("PERFORMANCE MANAGEMENT\n\nThere will be specific JOB DESCRIPTIONS for every position in the Bank. Each Job Description will have a list of Technical and Behavioral Competencies required to perform that particular job effectively.\n\nFrom the Job Description will flow the KEY RESULT AREAS, and GOALS will thus be ascertained. Goal Setting is a performance planning process that links the individual’s work to the department’s goals and to business goals. This process should be characterized by a candid and constructive discussion of the organization priorities and the individuals expected performance levels to meet these priorities. There will be a time bound monitoring of performance, which will culminate in the ANNUAL PERFORMANCE REVIEW and INCREMENTS for employees will be based on the Annual Appraisal. Based on outstanding performance, the employee may be eligible to receive a PERFORMANCE BONUS. PROMOTIONS will be reviewed from time to time. (Currently for Manager & below, every six months, i.e. April and October).");
        session.endDialog();
    },
]);
dialog.matches('CAREER PROGRESSION ', [
    function(session) {
        session.send("CAREER PROGRESSION \n\nThe Bank will, as an inherent part of its HR philosophy, evolve career paths for employees. Career planning and progression thereafter will be based on individual performance and competencies viz. potential, aptitude and skill");
        session.endDialog();
    },
]);
dialog.matches('TRAINING', [
    function(session) {
        session.send("People development is an integral value of HDFC Bank. The Bank’s training programmes are tuned towards consolidating key functional skills, building service capabilities, and influencing superior individual and team performance. \n\nTraining needs will be identified, based on - \n\nOrganizational / Business requirement \n\nCompetency gaps\n\nThe training effort will be coordinated by Human Resources, with regard to identified needs. Employees are expected to make the best use of such opportunities as these will contribute to their personal growth and career progression.");
        session.endDialog();
    },
]);


/*Holiday List dialog Code Start*/
dialog.matches('ShowHolidayList', [
    function(session, args, next) {
        if(args.entities[0] != null && args.entities[0].entity != null) {
            if(args.entities[0].type == "holiday state name") {
                if(args.entities[0].entity == "andaman & nicobar") {
                    AndamanAndNicobarHL(session);
                } else if(args.entities[0].entity == "andhra pradesh") {
                    AndhraPradeshHL(session);
                } else if(args.entities[0].entity == "arunachal pradesh") {
                    ArunachalPradeshHL(session);
                } else if(args.entities[0].entity == "assam") {
                    AssamHL(session);
                } else if(args.entities[0].entity == "bihar") {
                    BiharHL(session);
                } else if(args.entities[0].entity == "chandigarh") {
                    ChandigarhHL(session);
                } else if(args.entities[0].entity == "dadra & nagar haveli" || args.entities[0].entity == "dadra and nagar haveli") {
                    DadraNagarHaveliHL(session);
                } else if(args.entities[0].entity == "daman & diu" || args.entities[0].entity == "daman and diu") {
                    DamanDiuHL(session);
                } else if(args.entities[0].entity == "delhi") {
                    DelhiHL(session);
                } else if(args.entities[0].entity == "goa") {
                    GoaHL(session);
                } else if(args.entities[0].entity == "gujarat") {
                    GujaratHL(session);
                } else if(args.entities[0].entity == "haryana") {
                    HaryanaHL(session);
                } else if(args.entities[0].entity == "himachal pradesh") {
                    HimachalPradeshHL(session);
                } else if(args.entities[0].entity == "jammu & kashmir" || args.entities[0].entity == "jammu and kashmir") {
                    JammuKashmirHL(session);
                } else if(args.entities[0].entity == "jharkhand") {
                    JharkhandHL(session);
                } else if(args.entities[0].entity == "karnataka") {
                    KarnatakaHL(session);
                } else if(args.entities[0].entity == "kerala") {
                    KeralaHL(session);
                } else if(args.entities[0].entity == "maharashtra") {
                    MaharashtraHL(session);
                } else if(args.entities[0].entity == "manipur") {
                    ManipurHL(session);
                } else if(args.entities[0].entity == "meghalaya") {
                    MeghalayaHL(session);
                } else if(args.entities[0].entity == "mizoram") {
                    MizoramHL(session);
                } else if(args.entities[0].entity == "nagaland") {
                    NagalandHL(session);
                } else if(args.entities[0].entity == "andaman & nicobar" || args.entities[0].entity == "andaman and nicobar") {
                    AndamanNicobarHL(session);
                } else if(args.entities[0].entity == "orissa") {
                    OrissaHL(session);
                } else if(args.entities[0].entity == "pondicherry" || args.entities[0].entity == "puducherry" ) {
                    PuducherryHL(session);
                } else if(args.entities[0].entity == "punjab") {
                    PunjabHL(session);
                } else if(args.entities[0].entity == "rajasthan") {
                    RajasthanHL(session);
                } else if(args.entities[0].entity == "sikkim") {
                    SikkimHL(session);
                } else if(args.entities[0].entity == "tamil nadu") {
                    TamilNaduHL(session);
                } else if(args.entities[0].entity == "telangana") {
                    TelanganaHL(session);
                } else if(args.entities[0].entity == "tripura") {
                    TripuraHL(session);
                } else if(args.entities[0].entity == "uttar pradesh" || args.entities[0].entity == "U P" || args.entities[0].entity == "U.P" || args.entities[0].entity == "up") {
                    UttarPradeshHL(session);
                } else if(args.entities[0].entity == "uttarakhand") {
                    UttarakhandHL(session);
                } else if(args.entities[0].entity == "west bengal" || args.entities[0].entity == "WB" || args.entities[0].entity == "wb" || args.entities[0].entity == "w b") {
                    WestBengalHL(session);
                } else if(args.entities[0].entity == "madhya pradesh" || args.entities[0].entity == "MP" || args.entities[0].entity == "mp" || args.entities[0].entity == "m p") {
                    MadhyaPradeshHL(session);
                }
            } else {
                session.send(session, "It looks like I am not able to find it. Please select state from the below list");
                session.beginDialog('/OtherStateHolidayList');
            }
        } else {
            builder.Prompts.choice(session, "Please select the below options.", "Your state|Other states", { listStyle: builder.ListStyle.button });
        }
    },
    function(session, results) {
        switch(results.response.index) {
            case 0:
                session.beginDialog('/YourStateHolidayList');
                session.endDialog();
                break;
            case 1:
                session.beginDialog('/OtherStateHolidayList');
                session.endDialog();
                break;
            default:
                session.endDialog();
                break;
        }
    }
]);
bot.dialog('/YourStateHolidayList', [
    function(session) {
        var msg3 = new builder.Message(session).attachments([{
            contentType: "image/jpeg",
            contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Maharashtra.jpg"
        }]);
        session.endDialog(msg3);
    },
]);
bot.dialog('/OtherStateHolidayList', [
    function(session) {
        builder.Prompts.choice(session, "Please select from the below options.", "Andaman & Nicobar holiday list|Andhra Pradesh holiday list| Arunachal Pradesh holiday list| Assam holiday list| Bihar holiday list| Chandigarh holiday list| Chattisgarh holiday list| Dadra & Nagar Haveli holiday list| Daman & Diu holiday list| Delhi holiday list| Goa holiday list| Gujarat holiday list| Haryana holiday list| Himachal Pradesh holiday list| Jammu & Kashmir holiday list| Jharkhand holiday list| Karnataka holiday list| Kerala holiday list| Madhya Pradesh holiday list| Maharashtra holiday list| Manipur holiday list| Meghalaya holiday list|Mizoram holiday list| Nagaland holiday list| Orissa holiday list| Puducherry holiday list| Punjab holiday list| Rajasthan holiday list| Sikkim holiday list| Tamil Nadu holiday list| Telangana holiday list| Tripura holiday list| Uttar Pradesh holiday list| Uttarakhand holiday list| West Bengal holiday list", { listStyle: builder.ListStyle.button });
    },
    function(session, results) {
        switch(results.response.index) {
            case 0:
                AndamanAndNicobarHL(session);
                break;
            case 1:
                AndhraPradeshHL(session);
                break;
            case 2:
                ArunachalPradeshHL(session);
                break;
            case 3:
                AssamHL(session);
                break;
            case 4:
                BiharHL(session);
                break;
            case 5:
                ChandigarhHL(session);
                break;
            case 6:
                ChattisgarhHL(session);
                break;
            case 7:
                DadraNagarHaveliHL(session);
                break;
            case 8:
                DamanDiuHL(session);
                break;
            case 9:
                DelhiHL(session);
                break;
            case 10:
                GoaHL(session);
                break;
            case 11:
                GujaratHL(session);
                break;
            case 12:
                HaryanaHL(session);
                break;
            case 13:
                HimachalPradeshHL(session);
                break;
            case 14:
                JammuKashmirHL(session);
                break;
            case 15:
                JharkhandHL(session);
                break;
            case 16:
                KarnatakaHL(session);
                break;
            case 17:
                KeralaHL(session);
                break;
            case 18:
                MadhyaPradeshHL(session);
                break;
            case 19:
                MaharashtraHL(session);
                break;
            case 20:
                ManipurHL(session);
                break;
            case 20:
                MeghalayaHL(session);
                break;
            case 21:
                MizoramHL(session);
                break;
            case 22:
                NagalandHL(session);
                break;
            case 23:
                AndamanNicobarHL(session);
                break;
            case 24:
                OrissaHL(session);
                break;
            case 25:
                PuducherryHL(session);
                break;
            case 26:
                PunjabHL(session);
                break;
            case 27:
                RajasthanHL(session);
                break;
            case 28:
                SikkimHL(session);
                break;
            case 29:
                TamilNaduHL(session);
                break;
            case 30:
                TelanganaHL(session);
                break;
            case 31:
                TripuraHL(session);
                break;
            case 32:
                UttarPradeshHL(session);
                break;
            case 33:
                UttarakhandHL(session);
                break;
            case 34:
                WestBengalHL(session);
                break;
            default:
                session.endDialog();
                //session.beginDialog('/');
                break;
        }
    }
]);
//State Holiday List Image function Start
function AndamanAndNicobarHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Andaman & Nicobar.jpg"
    }]);
    session.endDialog(msg3);
}

function AndhraPradeshHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Andhra Pradesh.jpg"
    }]);
    session.endDialog(msg3);
}

function ArunachalPradeshHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Arunachal Pradesh.jpg"
    }]);
    session.endDialog(msg3);
}

function AssamHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Assam.jpg"
    }]);
    session.endDialog(msg3);
}

function BiharHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Bihar.jpg"
    }]);
    session.endDialog(msg3);
}

function ChandigarhHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Chandigarh.jpg"
    }]);
    session.endDialog(msg3);
}

function ChattisgarhHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Chattisgarh.jpg"
    }]);
    session.endDialog(msg3);
}

function DadraNagarHaveliHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Dadra & Nagar Haveli.jpg"
    }]);
    session.endDialog(msg3);
}

function DamanDiuHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Daman & Diu.jpg"
    }]);
    session.endDialog(msg3);
}

function DelhiHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Delhi.jpg"
    }]);
    session.endDialog(msg3);
}

function GoaHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Goa.jpg"
    }]);
    session.endDialog(msg3);
}

function GujaratHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Gujarat.jpg"
    }]);
    session.endDialog(msg3);
}

function HaryanaHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Haryana.jpg"
    }]);
    session.endDialog(msg3);
}

function HimachalPradeshHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Himachal Pradesh.jpg"
    }]);
    session.endDialog(msg3);
}

function JammuKashmirHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Jammu & Kashmir.jpg"
    }]);
    session.endDialog(msg3);
}

function JharkhandHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Jharkhand.jpg"
    }]);
    session.endDialog(msg3);
}

function KarnatakaHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Karnataka.jpg"
    }]);
    session.endDialog(msg3);
}

function KeralaHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Kerala.jpg"
    }]);
    session.endDialog(msg3);
}

function MadhyaPradeshHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Madhya Pradesh.jpg"
    }]);
    session.endDialog(msg3);
}

function MaharashtraHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Maharashtra.jpg"
    }]);
    session.endDialog(msg3);
}

function ManipurHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Manipur.jpg"
    }]);
    session.endDialog(msg3);
}

function MeghalayaHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Meghalaya.jpg"
    }]);
    session.endDialog(msg3);
}

function MizoramHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Mizoram.jpg"
    }]);
    session.endDialog(msg3);
}

function NagalandHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Nagaland.jpg"
    }]);
    session.endDialog(msg3);
}

function AndamanNicobarHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Andaman & Nicobar.jpg"
    }]);
    session.endDialog(msg3);
}

function OrissaHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Orissa.jpg"
    }]);
    session.endDialog(msg3);
}

function PuducherryHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Puducherry.jpg"
    }]);
    session.endDialog(msg3);
}

function PunjabHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Punjab.jpg"
    }]);
    session.endDialog(msg3);
}

function RajasthanHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Rajasthan.jpg"
    }]);
    session.endDialog(msg3);
}

function SikkimHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Sikkim.jpg"
    }]);
    session.endDialog(msg3);
}

function TamilNaduHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Tamil Nadu.jpg"
    }]);
    session.endDialog(msg3);
}

function TelanganaHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Telangana.jpg"
    }]);
    session.endDialog(msg3);
}

function TripuraHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Tripura.jpg"
    }]);
    session.endDialog(msg3);
}

function UttarPradeshHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Uttar Pradesh.jpg"
    }]);
    session.endDialog(msg3);
}

function UttarakhandHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/Uttarakhand.jpg"
    }]);
    session.endDialog(msg3);
}

function WestBengalHL(session) {
    var msg3 = new builder.Message(session).attachments([{
        contentType: "image/jpeg",
        contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/West Bengal.jpg"
    }]);
    session.endDialog(msg3);
}
//State Holiday List Image function End
/*Holiday List dialog Code End*/





/*NEW--LEAVE POLICY DIALOG HANDLE START*/

dialog.matches('ShowLeaves', [
    function(session, args, next) {
        if(args.entities[0] != null && args.entities[0].entity != null) {
            if(args.entities[0].type == "LeaveType") {
                // try extracting entities
                if((args.entities[0].entity).indexOf('paternity') >= 0 )
                {
                    paternityLeave(session);
                }else if((args.entities[0].entity).indexOf('maternity') >= 0){
                    maternityLeave(session);
                }else if((args.entities[0].entity).indexOf('mandatory') >= 0){
                    mandatoryLeave(session);
                }else if((args.entities[0].entity).indexOf('advance') >= 0){
                    AdvanceLeave(session);
                }else if((args.entities[0].entity).indexOf('leave without pay') >= 0 || (args.entities[0].entity).indexOf('lop') >= 0 ){
                    leaveWithoutPay(session);
                }else if((args.entities[0].entity).indexOf('adoption') >= 0){
                    adoptionLeave(session);
                }else if((args.entities[0].entity).indexOf('casual') >= 0){
                    casualLeave(session);
                }else if((args.entities[0].entity).indexOf('sick') >= 0){
                    sickLeave(session);
                }else if((args.entities[0].entity).indexOf('privilege') >= 0){
                    PrivilegeLeave(session);
                }
            }
        }else{
            builder.Prompts.choice(session, "Please select from below :", "Show Privilege Leave policy|Show Sick Leave policy|Show Casual Leave policy|Show Maternity Leave policy|Show Adoption Leave policy|Show Paternity Leave policy|Show Leave Without Pay policy|Show Advance Leave policy|Show Mandatory Leave policy", { listStyle: builder.ListStyle.button });
            session.endDialog();
        }
    },
]);

dialog.matches('LeaveDetails', [
    function(session, args) {
        builder.Prompts.choice(session, "Please select the desired option", "How to Apply|Leave Balance|Cancellation of Approved Leaves|Leave Policy", { listStyle: builder.ListStyle.button });
    },
    function(session, results) {
        switch(results.response.index) {
            case 0:
                session.endDialog();
                session.send('Please login to SAP and use the following path to apply your leave\n\nLogin SAP -->  Employee Self Service -->  Leave and attendance --> Create Leave/Attendance Request -->  Select type of Leave, Start Date, End Date, Leave Reason Code, Contact No and Click on Send and New (button on Left top corner of the screen).\n\nLink to SAP: - https://hcm650.tcsprocesscloud.in');
                break;
            case 1:
                session.endDialog();
                session.send('Please login to SAP and use the following path to check your leave balance\n\nLogin SAP -->  Employee Self Service -->  Leave and attendance -->  Display Leave Balances\n\nYou will get to see your leave balance for your Privilege, Casual and Sick Leave.\n\nLink to SAP: - https://hcm650.tcsprocesscloud.in');
                break;
            case 2:
                session.endDialog();
                session.beginDialog('/cancel');
                break;
            case 3:
                session.endDialog();
                session.beginDialog('/');
                break;
            default:
                session.beginDialog('/dialog');
                session.endDialog();
                break;
        }
    },
]);
bot.dialog('/cancel', [
    function(session) {
        session.send("* Once the leaves are approved in SAP employee cannot cancel / modify the leaves in SAP. For cancellation / modification of leaves Supervisor to follow the below steps in SAP. \n* Please ask your supervisor to cancel your approved leaves using the following steps:\n\nLink to SAP: - https://hcm650.tcsprocesscloud.in");
        //session.send("");
        var msg3 = new builder.Message(session).attachments([{
            contentType: "image/jpeg",
            contentUrl: "https://api.zinglifedocs.com/chatbot/custom-bots/hdfcassets/sap-leave-cancel.png"
        }]);
        session.endDialog(msg3);
    }
]);



function paternityLeave(session){
     session.send('* Employees who become fathers during the course of employment would be eligible for 7 days of Paternity Leave (inclusive of weekends and five working days). \n\n* Paternity Leave needs to be availed at a stretch and within three months of the birth of the child. \n\n* Employees can avail this leave only twice during the course of their employment with the Bank.');
        if(session.message.address.user.empGender != "Male"){
            session.send('Note: *Hope you are checking the same for a male colleague of yours as my intelligence says that you will not avail it!*');
        }
}

function maternityLeave(session){
    session.send('* An expectant mother is eligible for a Maternity Leave of 6 months. \n\n* All women employees of the Bank, irrespective of their tenure shall be eligible for Maternity Leave.\n\n* Any extension on the same will be on approval of the concerned Business /Function Head and approval of Head – Human Resources.\n\n* Employees can avail this leave only twice during the course of their employment with the Bank. \n\n* An expectant mother is eligible for a Maternity Leave of 6 months.\n\n* Any extension on the same will be on approval of the concerned Business /Function Head and approval of Head – Human Resources.\n\n* Employees can avail this leave only twice during the course of their employment with the Bank.');
        if(session.message.address.user.empGender == "Male"){
          session.send('Note: * Hope you are checking the same for a female colleague of yours as my intelligence says that you will not avail it! *');  
        }  
}

function mandatoryLeave(session) {
        session.send('* Since you have not completed 1 year with the Bank, you are not eligible to take Mandatory Leave.\n\n* Please connect with your HR for any further query on the same. \n\n* You need to avail 12 days of Mandatory leave in the current financial year. All public holidays and 2nd, 4th Saturday are included while your leave calculation. Sundays are excluded for the same.\n\n* Please plan and update your Mandatory Leave in SAP if not yet done. \n\n* You need to avail 9 days of Mandatory leave in the current financial year. All public holidays and 2nd, 4th Saturday are included while your leave calculation. Sundays are excluded for the same.\n\n* Please plan and update your Mandatory Leave in SAP if not yet done.');
    }
function AdvanceLeave(session) {
        session.send('* Only Privilege Leave can be availed as Advanced leave. \n\n* This would be granted on a case to case basis with the approval of the respective Business heads / Function heads and Head –HR\n\n* Please get in touch with your HR for any further details about the');
    }
function leaveWithoutPay(session) {
        session.send('* Leave without pay would be granted on a case to case basis with the approval of the respective Business heads / Function heads and Head -HR. \n\n* Supervisor can also update leaves/ Leave without Pay in system on behalf of employee by following below steps in SAP.');
    }    
function adoptionLeave(session) {
        session.send('* In case of adoption, the employee shall be entitled to leave with pay for a period of 3 months immediately following the day of adoption. \n\n* The employee shall be eligible for leave with pay for a period of 45 days in the unfortunate event of a miscarriage.');
        session.send('Note : * No other leave shall be accruable to the employee in this regard *');
    }
 function casualLeave(session) {
        session.send('* Casual leave can be availed up to a maximum of 12 days per year.\n* Casual Leave of the last financial year gets converted to sick leave on every 1st April and new 12 Casual leaves gets credited to the account. \n\n* Casual leave can be availed up to maximum two days at a time.');
    }
 function sickLeave(session) {
        session.send('* Sick Leave can be accumulated up to 30 days\n* Casual leave can be availed up to maximum two days at a time. Applications for sick leave exceeding two days should be supported by a medical certificate, which has to be produced at the time of reporting back to duty.\n* Sick leave availed beyond 9 days will be debited to Privilege leave, other than in cases of major illness / hospitalization.');
    }
function PrivilegeLeave(session) {
        session.send("* Privilege Leave of 30 days DOES NOT get credited after confirmation but ONLY after completion on 1 year. After that it will be credited to an employee’s account on April 1 every year on pro-rata basis.\n* A minimum of 9 days privilege leave must be taken at a stretch each year by each employee and a minimum of 12 days for employees in sensitive roles ( as part of mandatory leave)\n* Minimum 3 days PL should be availed at a time..) \n* There will be no accumulation of PL starting 1st April 2018 and all leaves of last financial year will lapse.\n* No Privilege Leave will be encashed. The same may however be set off against the employee’s notice pay, on his / her resignation, at the Bank’s discretion.");
    }            
/*NEW--LEAVE POLICY DIALOG HANDLE END*/


dialog.matches('HowAreYou', [
    function(session) {
        session.send("I am cool like a fish in the pool!");
        session.endDialog();
    },
]);

dialog.matches('HateYou', builder.DialogAction.send("Oops! Is there anything I can do to change your mind?"));

bot.dialog('/Menu', [
    function(session) {
        builder.Prompts.choice(session,"Sometimes, I may not have the information you need. I am just a virtual assistant who can help you with HR related queries. \n\nHere are few quick links for your easy reference.", "Know your HR|Find any Branch |Holiday List|Leave Details|Tell a friend/Karo Sifarish", { listStyle: builder.ListStyle.button });
        session.endDialog();
    }/*,
    function(session, results) {
        switch(results.response.index) {
            case 0:
                // session.send(""+hour);
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
            default:
                //session.beginDialog('/EXIT');
                session.endDialog();
                session.beginDialog('/');
                break;
        }
    },*/
]);
dialog.onDefault([function(session, args, next) {
    builder.DialogAction.send("Sometimes, I may not have the information you need. I am just a virtual assistant who can help you with HR related queries.");
    session.beginDialog('/Menu');
}]);











//https://docs.botframework.com/en-us/node/builder/chat/IntentDialog/