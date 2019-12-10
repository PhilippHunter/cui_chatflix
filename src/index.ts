import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as uuidv4 from 'uuid'

import { dialogflow, Permission} from 'actions-on-google'
import { DataHandler } from './Persistence/DataHandler'

let isUserKnown: boolean = false

const app = dialogflow({debug: true})

const dataHandler = new DataHandler()

app.intent('Welcome Intent', conv => {
        conv.ask('Hallo, ich bin Chatflix. Wie kann ich dir helfen?')
})

app.intent('InformationIntent', (conv, params) => {
    console.log(conv.intent);
    console.log(params);
    const input = params.Serie ? params.Serie : params.Film;

    //decide between film and series
    if(input!=''){
        console.log(input);
        const information = dataHandler.getInformation(input);        
        conv.ask('Hier sind Informationen zu deiner Suche:\n' +information);
        conv.ask('Möchtest du noch mehr Informationen zu den Schauspielern erfahren?')
    }
});

app.intent('ActorInformation-FollowupIntent', (conv, params) => {
    let resultString:string = '';
    console.log(conv.intent);
    console.log(params);   
    let parameters = conv.contexts.get('informationintent-followup').parameters
    const input = parameters.Serie ? parameters.Serie : parameters.Film;
    console.log(input);

    let actors = dataHandler.getActors(input);
    actors.forEach(s => resultString = resultString + '\n' + s);
    conv.ask('Es spielen folgende Schauspieler mit: \n' +resultString);
});

app.intent('ActorInformationIntent', (conv, params) => {
    let resultString:string = '';
    console.log(conv.intent);
    console.log(params);
    const input = params.Serie ? params.Serie : params.Film;

    let actors = dataHandler.getActors(input);
    actors.forEach(s => resultString = resultString + '\n' + s);
    conv.ask('Es spielen folgende Schauspieler mit: \n' +resultString);
});

app.intent('GenreIntent', (conv, params) => {
    let genre = params.Genre
    let resultString: string = '';
    let result = dataHandler.getMoviesInGenre(genre);
    if(result.length != 0) {
        console.log(result)
        conv.ask('Hier sind ein paar Vorschläge:')
        result.forEach(s => resultString = resultString + '\n' + s);
    }
    conv.ask(resultString);
})


app.fallback((conv) => {
    const intent = conv.intent

    conv.close('Ok, thanks!');
})

const expressApp = express().use(bodyParser.json())

expressApp.post('/fulfillments', app)

expressApp.listen(3000)