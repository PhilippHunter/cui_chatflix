import  *  as  data  from  '../data.json'

export class DataHandler{

    getInformation(name:any) {
        //iterating through object
        for (var key in data) {          
            //getting value
            const curName = JSON.stringify(data[key]['name']).slice(1,-1);

            //comparing names
            if(curName.localeCompare(name)==0){

                //getting information for name
                const information = JSON.stringify(data[key]['information']).slice(1,-1);
                console.log(information);
                return information;
            }
        }    
    }
    
    getMoviesInGenre(genre:any) {
        let result: string[] = [];
        
        for (var key in data) {          
            //getting value
            const curGenre = JSON.stringify(data[key]['genre']).slice(1,-1);
            
            //comparing names
            if(curGenre.localeCompare(genre)==0) {

                //getting information for name
                const movieName = JSON.stringify(data[key]['name']).slice(1,-1);
                console.log(movieName);
                result.push(movieName);
            }       
        }
        return result;
    }

    getActors(name:any) {
        //iterating through object
        for (var key in data) {          
            //getting value
            const curName = data[key].name;

            //comparing names
            if(curName.localeCompare(name)==0){

                //getting information for name
                const actors = data[key].actors;
                console.log(actors);
                return actors;
            }
        }    
    }
}