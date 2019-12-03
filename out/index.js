"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const uuidv4 = require("uuid");
const actions_on_google_1 = require("actions-on-google");
let isUserKnown = false;
const app = actions_on_google_1.dialogflow({ debug: true });
app.middleware(conv => {
    isUserKnown = ('userId' in conv.user.storage);
});
app.intent('Default Welcome Intent', conv => {
    if (isUserKnown) {
        conv.ask('Hallo. Wie geht es Dir heute?');
    }
    else {
        console.log(conv.intent);
        conv.ask('Hallo. Wer bist Du denn?');
        conv.ask(new actions_on_google_1.Permission({
            context: "Wie ist Dein Name?",
            permissions: ["NAME"]
        }));
    }
});
app.intent('UserPermissionIntent', (conv, params, confirmationGranted) => {
    console.log(params);
    const { name } = conv.user;
    console.log('user\'s name' + name.given + ', ' + name.family);
    if (confirmationGranted) {
        conv.close('Hallo ' + name.given);
        const newUserId = uuidv4();
        conv.user.storage['userId'] = newUserId;
    }
    else {
        conv.close('Das ist aber Schade!');
    }
});
app.fallback((conv) => {
    const intent = conv.intent;
    conv.close('Ok, thanks!');
});
const expressApp = express().use(bodyParser.json());
expressApp.post('/fulfillments', app);
expressApp.listen(3000);
//# sourceMappingURL=index.js.map