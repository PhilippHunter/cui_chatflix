import *  as  data from '../data.json'
import *  as  watchlist from '../watchlist.json'
import * as fs from 'fs';
import { Title } from '../Models/Title.js';

export class DataHandler {

    getInformation(name: any) {
        //iterating through object
        for (var key in data) {
            //getting value
            const curName = data[key].name;

            //comparing names
            if (curName.localeCompare(name) == 0) {
                //getting information for name
                const information = data[key].information;
                console.log(information);
                return information;
            }
        }
    }

    getMoviesInGenre(genre: any) {
        let result: Title[] = [];

        for (var key in data) {
            //getting value
            const curGenre = data[key].genre

            //comparing names
            if (curGenre.localeCompare(genre) == 0) {
                //getting entry with matching genre
                const title: Title = new Title(
                    data[key].name,
                    data[key].information,
                    data[key].image_url
                )
                result.push(title);
            }
        }
        return result;
    }

    getActors(name: any) {
        //iterating through object
        for (var key in data) {
            //getting value
            const curName = data[key].name;

            //comparing names
            if (curName.localeCompare(name) == 0) {

                //getting information for name
                const actors = data[key].actors;
                console.log(actors);
                return actors;
            }
        }
    }

    addToWatchlist(name: any) {

        //iterating through object
        for (var key in data) {
            //getting value
            const curName = data[key].name;

            //comparing names
            if (curName.localeCompare(name) == 0) {
                for (var entry in watchlist) {
                    if (watchlist[entry].name.localeCompare(name) == 0) {
                        return false
                    }
                    else {
                        watchlist.push(data[key]);
                        var json = JSON.stringify(watchlist) + '\n';
                        fs.writeFileSync('src/watchlist.json', json);
                        return true;
                    }
                }
            }
        }
    }

    getMoviesInWatchlist() {
        let result: Title[] = [];

        for (var key in watchlist) {
            const title : Title = new Title(
                watchlist[key].name,
                watchlist[key].information,
                watchlist[key].image_url
            );
            result.push(title)
        }
        return result
    }

    getMostLikedMovies() {
        let result: Title[] = [];

        for (var key in data) {
            //getting value
            const curRating = data[key].rating;
            if (curRating > 4) {
                const title : Title = new Title(
                    data[key].name,
                    data[key].information,
                    data[key].image_url
                );
                result.push(title);
            }
        }
        return result
    }
}