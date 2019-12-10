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
    const series = params.Serie
    const film = params.Film

    //decide between film and series
    if(series!=''){
        console.log(series);
        conv.ask('Hier sind Informationen zu deiner Suche:');
        const information = dataHandler.getInformation(series);
        conv.ask(information);
    }
    else{
        console.log(film);
        conv.ask('Hier sind Informationen zu deiner Suche:');
        const information = dataHandler.getInformation(film);
        conv.ask(information);
    }
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