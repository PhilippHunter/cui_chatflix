import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as uuidv4 from 'uuid'

import { dialogflow, Permission, BasicCard, Image} from 'actions-on-google'
import { DataHandler } from './Persistence/DataHandler'

let isUserKnown: boolean = false

const app = dialogflow({debug: true})

const dataHandler = new DataHandler()

app.intent('InformationIntent', (conv, params) => {
    console.log(conv.intent);
    console.log(params);
    const input = params.Serie ? params.Serie : params.Film;

    //decide between film and series
    if(input !== '') {
        const information = dataHandler.getInformation(input);        
        conv.ask('Hier sind Informationen zu deiner Suche:\n' +information);
        conv.ask('Möchtest du noch mehr Informationen zu den Schauspielern erfahren?')
    }
    else {
        conv.ask('Leider habe ich den gewünschten Titel nicht gefunden. Probiere es mit einem anderen.')
    }
});

app.intent('SuggestionInformationIntent_2', (conv, params) => {
    console.log(conv.intent);
    console.log(params);
    const input = params.Serie ? params.Serie : params.Film;

    //decide between film and series
    if(input !== '') {
        const information = dataHandler.getInformation(input);        
        conv.ask('Hier sind Informationen zu deiner Suche:\n' +information);
        conv.ask('Möchtest du noch mehr Informationen zu den Schauspielern erfahren?')
    }
    else {
        conv.ask('Leider habe ich den gewünschten Titel nicht gefunden. Probiere es mit einem anderen.')
    }
});

app.intent('ActorInformationSuggestionIntent', (conv, params) => {
    let resultString:string = '';
    console.log(conv.intent);
    console.log(params);  
    let parameters = conv.contexts.get('suggestioninformationintent_2-followup').parameters
    const input = parameters.Serie ? parameters.Serie : parameters.Film;
    console.log(input);
    if(input !== ''){
        let actors = dataHandler.getActors(input);
        actors.forEach(s => resultString = resultString + '\n' + s);
        conv.ask('Es spielen folgende Schauspieler mit: \n' +resultString);
    }
    else {
        conv.ask('Leider habe den gewünschten Titel nicht gefunden. Probiere es mit einem anderen.')
    }
});

app.intent('ActorInformation-FollowupIntent', (conv, params) => {
    let resultString:string = '';
    console.log(conv.intent);
    console.log(params);   
    let parameters = conv.contexts.get('informationintent-followup').parameters
    const input = parameters.Serie ? parameters.Serie : parameters.Film;
    console.log(input);
    if(input !== ''){
        let actors = dataHandler.getActors(input);
        actors.forEach(s => resultString = resultString + '\n' + s);
        conv.ask('Es spielen folgende Schauspieler mit: \n' +resultString);
    }
    else {
        conv.ask('Leider habe den gewünschten Titel nicht gefunden. Probiere es mit einem anderen.')
    }

});

app.intent('ActorInformationIntent', (conv, params) => {
    let resultString:string = '';
    console.log(conv.intent);
    console.log(params);
    const input = params.Serie ? params.Serie : params.Film;

    if(input !== '') {
        let actors = dataHandler.getActors(input);
        actors.forEach(s => resultString = resultString + '\n' + s);
        conv.ask('Es spielen folgende Schauspieler mit: \n' +resultString);
    }
    else {
        conv.ask('Leider habe ich den gewünschten Titel nicht gefunden. Probiere es mit einem anderen.')
    }
});

app.intent('GenreIntent', (conv, params) => {
    let genre = params.Genre;
    console.log(genre);
    let result = dataHandler.getMoviesInGenre(genre);
    if(result.length !== 0) {
        console.log(result);
        conv.ask('Hier sind ein paar Vorschläge:')
        let resultString = '';
        result.forEach(s => resultString = resultString + '\n' + s);
        conv.ask(resultString);
    }
    else {
        conv.ask('Leider habe ich keinen Titel im gewünschten Genre gefunden. Probiere es mit einem anderen.');
    }
})

app.intent('InspirationWatchlistIntent', (conv) => {
    let resultString: string = '';
    let result = dataHandler.getMoviesInWatchlist();
    if(result.length != 0) {
        console.log(result)
        conv.ask('Folgende Titel befinden sich in deiner Watchlist:')
        result.forEach(s => resultString = resultString + '\n' + s);
        conv.ask(resultString);
    }
    else {
        conv.ask('Leider befinden sich momentan noch keine Titel in deiner Watchlist.');
    }
})

app.intent('InspirationCurrentlyLikedIntent', (conv) => {
    let resultString: string = '';
    let result = dataHandler.getMostLikedMovies();
    if(result.length != 0) {
        console.log(result)
        conv.ask('Titel mit den besten Bewertungen:')
        result.forEach(s => resultString = resultString + '\n' + s);
    }
    conv.ask(resultString);
})

app.intent('ShowCurrentlyLikedIntent', (conv, params) => {
    let resultString: string = '';
    let result = dataHandler.getMostLikedMovies();
    if(result.length != 0) {
        console.log(result)
        conv.ask('Titel mit den besten Bewertungen:')
        result.forEach(s => resultString = resultString + '\n' + s);
    }
    conv.ask(resultString);
})

app.intent('AppendWatchlistIntent', (conv, params) => {
    console.log(conv.intent);
    console.log(params);
    const input = params.Serie ? params.Serie : params.Film;

    if(input !== '') {
        if(dataHandler.addToWatchlist(input)){
            conv.ask('Ich habe '+input+' zu deiner Watchlist hinzugefügt.');
        }
        else {
            conv.ask(input+' befindet sich bereits in deiner Watchlist.');
        }
    }
    else {
        conv.ask('Leider habe ich diesen Titel nicht gefunden. Probiere es mit einem anderen.')
    }
})

app.intent('ShowWatchlistIntent', (conv, params) => {
    //CODE DUPLIKAT!

    console.log(params);
    let resultString: string = '';
    let result = dataHandler.getMoviesInWatchlist();
    if(result.length != 0) {
        console.log(result)
        conv.ask('Folgende Titel befinden sich in deiner Watchlist:')
        result.forEach(s => resultString = resultString + '\n' + s);
        conv.ask(resultString);
    }
    else {
        conv.ask('Leider befinden sich momentan noch keine Titel in deiner Watchlist.');
    }
})

app.intent('PlayTrailerIntent', (conv, params) => {
    let title:string = params.Serie ? params.Serie.toString() : params.Film.toString();
    if(title !== '') {
        conv.ask('Hier ist der Trailer zu '+title+':')
        conv.ask(new BasicCard({
            title: title,
            image: new Image({
                url: 'https://images.assetsdelivery.com/compings_v2/4zevar/4zevar1509/4zevar150900035.jpg',
                alt: 'play_image'
            })
        }))
    }
    else {
        conv.ask('Leider habe ich den Titel nicht gefunden. Versuche es mit einem anderen.')
    }
})

app.intent('PlayMovieIntent', (conv, params) => {
    let title:string = params.Serie ? params.Serie.toString() : params.Film.toString();
    if(title !== '') {
        conv.ask('Okay, ich starte '+title+':')
        conv.ask(new BasicCard({
            title: title,
            image: new Image({
                url: 'https://images.assetsdelivery.com/compings_v2/4zevar/4zevar1509/4zevar150900035.jpg',
                alt: 'play_image'
            })
        }))
    }
    else {
        conv.ask('Leider habe ich den Titel nicht gefunden. Versuche es mit einem anderen.')
    }
})

app.intent('PlaySeriesIntent', (conv, params) => {
    let title:string = params.Serie ? params.Serie.toString() : params.Film.toString();
    if(title !== '') {
        conv.ask('Okay, hier ist Staffel '+params.Season+', Folge '+params.number+' von '+title+':')
        conv.ask(new BasicCard({
            title: title,
            image: new Image({
                url: 'https://images.assetsdelivery.com/compings_v2/4zevar/4zevar1509/4zevar150900035.jpg',
                alt: 'play_image'
            })
        }))
    }
    else {
        conv.ask('Leider habe ich den Titel nicht gefunden. Versuche es mit einem anderen.')
    }
})

app.fallback((conv) => {
    const intent = conv.intent

    conv.close('Ok, thanks!');
})

const expressApp = express().use(bodyParser.json())

expressApp.post('/fulfillments', app)

expressApp.listen(3000)