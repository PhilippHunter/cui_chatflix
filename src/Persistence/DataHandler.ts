import  *  as  data  from  '../data.json'

export class DataHandler{

    getInformation(name:any) {
        //iterating through object
        for (var key in data) {          
            for(var key2 in data[key]){
                if(key2 == "name"){

                    //getting value
                    const curName = JSON.stringify(data[key][key2]).slice(1,-1);

                    //comparing names
                    if(curName.localeCompare(name)==0){

                        //getting information for name
                        const information = JSON.stringify(data[key]['information']).slice(1,-1);
                        console.log(information);
                        return information;
                    }
                }            
            }
          }
    }
}