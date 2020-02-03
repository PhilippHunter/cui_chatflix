import * as express from 'express'
import * as bodyParser from 'body-parser'

import { dialogflow, Permission, BasicCard, Image, Carousel, List} from 'actions-on-google'
import { DataHandler } from './Persistence/DataHandler'
import { utils } from './utils'

const app = dialogflow({debug: true})

const dataHandler = new DataHandler()

//#region Information Display
app.intent('InformationIntent', (conv, params) => {
    const input = params.Serie ? params.Serie : params.Film;

    //check if title is available
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

    const input = params.Serie ? params.Serie : params.Film;

    //check if title is available
    if(input !== '') {
        const information = dataHandler.getInformation(input);        
        conv.ask('Hier sind Informationen zu deiner Suche:\n' +information);
        conv.ask('Möchtest du noch mehr Informationen zu den Schauspielern erfahren?')
    }
    else {
        conv.ask('Leider habe ich den gewünschten Titel nicht gefunden. Probiere es mit einem anderen.')
    }
});

//#endregion

//#region Actor Information Display
app.intent('ActorInformationSuggestionIntent', (conv, params) => {
    let resultString:string = ''; 
    let parameters = conv.contexts.get('suggestioninformationintent_2-followup').parameters
    const input = parameters.Serie ? parameters.Serie : parameters.Film;

    //check if title is available
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
    let parameters = conv.contexts.get('informationintent-followup').parameters
    const input = parameters.Serie ? parameters.Serie : parameters.Film;

    //check if title is available
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
    const input = params.Serie ? params.Serie : params.Film;

    if(input !== '') {
        let actors = dataHandler.getActors(input);
        conv.ask('Es spielen folgende Schauspieler mit:');

        //create list from recieved titles
        let list : List = utils.createList(actors);
        conv.ask(list);
    }
    else {
        conv.ask('Leider habe ich den gewünschten Titel nicht gefunden. Probiere es mit einem anderen.')
    }
});

//#endregion

//#region Genre Filter
app.intent('GenreIntent', (conv, params) => {
    let genre = params.Genre;
    let result = dataHandler.getMoviesInGenre(genre);

    //check if genre could be found
    if(result.length !== 0) {
        conv.ask('Hier sind ein paar Vorschläge:')

        //create carousel from recieved titles
        let carousel : Carousel = utils.createCarousel(result);
        conv.ask(carousel);
    }
    else {
        conv.ask('Leider habe ich keinen Titel im gewünschten Genre gefunden. Probiere es mit einem anderen.');
    }
})
//#endregion

//#region Inspiration
app.intent('InspirationWatchlistIntent', (conv) => {
    let result = dataHandler.getMoviesInWatchlist();

    //check if watchlist was not empty
    if(result.length != 0) {
        conv.ask('Folgende Titel befinden sich in deiner Watchlist:')

        //create carousel from recieved titles
        let carousel : Carousel = utils.createCarousel(result);
        conv.ask(carousel);
    }
    else {
        conv.ask('Leider befinden sich momentan noch keine Titel in deiner Watchlist.');
    }
})

app.intent('InspirationCurrentlyLikedIntent', (conv) => {
    let result = dataHandler.getMostLikedMovies();

    //check if movies could be found
    if(result.length != 0) {
        conv.ask('Titel mit den besten Bewertungen:')

        //create carousel from recieved titles
        let carousel : Carousel = utils.createCarousel(result);
        conv.ask(carousel);
    } 
    else {
        conv.ask('Es ist ein Fehler aufgetreten. Keine Titel gefunden.')
    }
})

app.intent('ShowCurrentlyLikedIntent', (conv, params) => {
    let result = dataHandler.getMostLikedMovies();

    //check if movies could be found
    if(result.length != 0) {
        conv.ask('Titel mit den besten Bewertungen:')

        //create carousel from recieved titles
        let carousel : Carousel = utils.createCarousel(result);
        conv.ask(carousel);
    } 
    else {
        conv.ask('Leider befinden sich momentan keine Titel in deiner Watchlist.')
    }
})
//#endregion

//#region Watchlist
app.intent('AppendWatchlistIntent', (conv, params) => {
    const input = params.Serie ? params.Serie : params.Film;

    //check if title is available
    if(input !== '') {
        //check if title is not yet in watchist
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
    let result = dataHandler.getMoviesInWatchlist();

    //check if watchlist was not empty
    if(result.length != 0) {
        conv.ask('Folgende Titel befinden sich in deiner Watchlist:')

        //create carousel from recieved titles
        let carousel : Carousel = utils.createCarousel(result);
        conv.ask(carousel);
    } 
    else {
        conv.ask('Leider befinden sich momentan keine Titel in deiner Watchlist.')
    }
})
//#endregion

//#region Play Title
app.intent('PlayTrailerIntent', (conv, params) => {
    let title:string = params.Serie ? params.Serie.toString() : params.Film.toString();

    //check if title is available
    if(title !== '') {
        conv.ask('Hier ist der Trailer zu '+title+':')

        //create Card View
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

    //check if title is available
    if(title !== '') {
        conv.ask('Okay, ich starte '+title+':')

        //create Card View
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
    //saving parameters
    let season = params.Season;
    let episode = params.number;
    let title:string = params.Serie.toString();

    //checking if title exists
    if(title !== '') {

        //checking if season and episodes exist -> returns array [true/false, maxSeasonNumber, maxEpisodeNumber]
        let returnArray = dataHandler.checkIfExistent(title, season, episode);

        //if seasons and episodes exist
        if(returnArray[0]){
            conv.ask('Okay, hier ist '+params.Season+', Folge '+params.number+' von '+title+':')
            conv.ask(new BasicCard({
                title: title,
                image: new Image({
                    url: 'https://images.assetsdelivery.com/compings_v2/4zevar/4zevar1509/4zevar150900035.jpg',
                    alt: 'play_image'
                })
            }))
        }

        //if season or episode does not exist
        else{
            //get maxNumbers for Output
            let maxSeasons = returnArray[1].toString();
            let maxEpisodes = returnArray[2].toString();

            conv.ask('Leider existiert die angegebene Staffel oder Episode nicht. ' + title + ' hat ' + maxSeasons +' Staffeln mit je '+maxEpisodes+' Folgen.')
        }       
    }
    else {
        conv.ask('Leider habe ich den Titel nicht gefunden. Versuche es mit einem anderen.')
    }
})
//#endregion

app.fallback((conv) => {
    const intent = conv.intent

    conv.close('Ok, thanks!');
})

const expressApp = express().use(bodyParser.json())

expressApp.post('/fulfillments', app)

expressApp.listen(3000)