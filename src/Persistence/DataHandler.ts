import  *  as  data  from  '../data.json'

export class DataHandler{

    getInformation(name:any) {
        //iterating through object
        for (var key in data) {          
            //getting value
            const curName = data[key].name;

            //comparing names
            if(curName.localeCompare(name)==0){
                //getting information for name
                const information = data[key].information;
                console.log(information);
                return information;
            }
        }    
    }
    
    getMoviesInGenre(genre:any) {
        let result: string[] = [];
        
        for (var key in data) {          
            //getting value
            const curGenre = data[key].genre
            
            //comparing names
            if(curGenre.localeCompare(genre)==0) {

                //getting information for name
                const movieName = data[key].name;
                console.log(movieName);
                result.push(movieName);
            }       
        }
        return result;
    }
}