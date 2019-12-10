"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const actions_on_google_1 = require("actions-on-google");
const DataHandler_1 = require("./Persistence/DataHandler");
let isUserKnown = false;
const app = actions_on_google_1.dialogflow({ debug: true });
const dataHandler = new DataHandler_1.DataHandler();
app.intent('Welcome Intent', conv => {
    conv.ask('Hallo, ich bin Chatflix. Wie kann ich dir helfen?');
});
app.intent('InformationIntent', (conv, params) => {
    console.log(conv.intent);
    console.log(params);
    const series = params.Serie;
    const film = params.Film;
    //decide between film and series
    if (series != '') {
        console.log(series);
        conv.ask('Hier sind Informationen zu deiner Suche:');
        const information = dataHandler.getInformation(series);
        conv.ask(information);
    }
    else {
        console.log(film);
        conv.ask('Hier sind Informationen zu deiner Suche:');
        const information = dataHandler.getInformation(film);
        conv.ask(information);
    }
});
app.intent('GenreIntent', (conv, params) => {
    let genre = params.Genre;
    let resultString = '';
    let result = dataHandler.getMoviesInGenre(genre);
    if (result.length != 0) {
        console.log(result);
        conv.ask('Hier sind ein paar Vorschläge:');
        result.forEach(s => resultString = resultString + '\n' + s);
    }
    conv.ask(resultString);
});
app.fallback((conv) => {
    const intent = conv.intent;
    conv.close('Ok, thanks!');
});
const expressApp = express().use(bodyParser.json());
expressApp.post('/fulfillments', app);
expressApp.listen(3000);
//# sourceMappingURL=index.js.map