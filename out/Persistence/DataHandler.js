"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data = require("../data.json");
const watchlist = require("../watchlist.json");
const fs = require("fs");
const Title_js_1 = require("../Models/Title.js");
class DataHandler {
    getInformation(name) {
        //iterating through object
        for (var key in data) {
            //getting value
            const curName = data[key].name;
            //comparing names
            if (curName.localeCompare(name) == 0) {
                //getting information for name
                const information = data[key].information;
                return information;
            }
        }
    }
    getMoviesInGenre(genre) {
        let result = [];
        for (var key in data) {
            //getting value
            const curGenre = data[key].genre;
            //comparing names
            if (curGenre.localeCompare(genre) == 0) {
                //getting entry with matching genre
                const title = new Title_js_1.Title(data[key].name, data[key].information, data[key].image_url);
                //adding title to list
                result.push(title);
            }
        }
        return result;
    }
    getActors(name) {
        //iterating through object
        for (var key in data) {
            //getting value
            const curName = data[key].name;
            //comparing names
            if (curName.localeCompare(name) == 0) {
                //getting information for name
                const actors = data[key].actors;
                return actors;
            }
        }
    }
    addToWatchlist(name) {
        //iterating through object
        for (var key in data) {
            //getting value
            const curName = data[key].name;
            //comparing names
            if (curName.localeCompare(name) == 0) {
                for (var entry in watchlist) {
                    //checking if title is already in watchlist
                    if (watchlist[entry].name.localeCompare(name) == 0) {
                        return false;
                    }
                    else {
                        watchlist.push(data[key]);
                        var json = JSON.stringify(watchlist) + '\n';
                        //adding title to watchlist
                        fs.writeFileSync('src/watchlist.json', json);
                        return true;
                    }
                }
            }
        }
    }
    getMoviesInWatchlist() {
        let result = [];
        for (var key in watchlist) {
            const title = new Title_js_1.Title(watchlist[key].name, watchlist[key].information, watchlist[key].image_url);
            result.push(title);
        }
        return result;
    }
    getMostLikedMovies() {
        let result = [];
        for (var key in data) {
            //getting value
            const curRating = data[key].rating;
            if (curRating > 4) {
                const title = new Title_js_1.Title(data[key].name, data[key].information, data[key].image_url);
                result.push(title);
            }
        }
        return result;
    }
    checkIfExistent(title, season, episode) {
        //extracting season number
        let seasonNumber = parseInt(season.match(/\d+/)[0]);
        //iterating through object
        for (var key in data) {
            //getting value
            const curName = data[key].name;
            //comparing names
            if (curName.localeCompare(title) == 0) {
                //getting maxSeasons for name
                let maxSeasons = data[key].seasons;
                //comparing season numbers
                if (seasonNumber > maxSeasons) {
                    let returnArray = [false, maxSeasons, data[key].episodes];
                    return returnArray;
                }
                //if season number exists...
                else {
                    //getting maxEpisodes 
                    let maxEpisodes = data[key].episodes;
                    //comparing episode numbers
                    if (episode > maxEpisodes) {
                        let returnArray = [false, maxSeasons, data[key].episodes];
                        return returnArray;
                    }
                }
                //if not yet returned...
                let returnArray = [true, maxSeasons, data[key].episodes];
                return returnArray;
            }
        }
    }
}
exports.DataHandler = DataHandler;
//# sourceMappingURL=DataHandler.js.map