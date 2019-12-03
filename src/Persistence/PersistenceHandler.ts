import { Client } from 'pg'

export class PersistenceHandler {







    //
    //      Database related methods
    //  

    private connectClient(): any {
        const client = new Client({
            user: 'postgres',
            host: '0.0.0.0',
            database: 'agentdb',
            password: 'postgres',
            port: 5432
          })
    
          client.connect()
    
          return client
    }

    private disconnect(client: any): Promise<any> {
        return client.end()
    }


    private createUserTable(client: any): Promise<any> {
        const queryText = `CREATE TABLE IF NOT EXISTS userData(
            user_id SERIAL PRIMARY KEY, 
            first_name VARCHAR (50) NOT NULL, 
            last_name VARCHAR (50) NOT NULL, 
            player_name VARCHAR (50) NOT NULL);`
    
        return client.query(queryText)
    }

    private createPlayerTable(client: any): Promise<any> {
        const queryText = `CREATE TABLE IF NOT EXISTS playerData(
            player_id SERIAL PRIMARY KEY, 
            player_name VARCHAR (50) NOT NULL, 
            position VARCHAR (10) NOT NULL, 
            team VARCHAR (5) NOT NULL);`
    
        return client.query(queryText)
    }

    private createGameTable(client: any): Promise<any> {
        const queryText = `CREATE TABLE IF NOT EXISTS gameData(
            game_id SERIAL PRIMARY KEY, 
            player1_id VARCHAR (40) NOT NULL, 
            player2_id VARCHAR (40), 
            player3_id VARCHAR (40), 
            player4_id VARCHAR (40), 
            timestamp TIMESTAMPTZ NOT NULL);`
    
        return client.query(queryText)
    }

}