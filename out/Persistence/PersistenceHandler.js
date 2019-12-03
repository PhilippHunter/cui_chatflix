"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
class PersistenceHandler {
    //
    //      Database related methods
    //  
    connectClient() {
        const client = new pg_1.Client({
            user: 'postgres',
            host: '0.0.0.0',
            database: 'agentdb',
            password: 'postgres',
            port: 5432
        });
        client.connect();
        return client;
    }
    disconnect(client) {
        return client.end();
    }
    createUserTable(client) {
        const queryText = `CREATE TABLE IF NOT EXISTS userData(
            user_id SERIAL PRIMARY KEY, 
            first_name VARCHAR (50) NOT NULL, 
            last_name VARCHAR (50) NOT NULL, 
            player_name VARCHAR (50) NOT NULL);`;
        return client.query(queryText);
    }
    createPlayerTable(client) {
        const queryText = `CREATE TABLE IF NOT EXISTS playerData(
            player_id SERIAL PRIMARY KEY, 
            player_name VARCHAR (50) NOT NULL, 
            position VARCHAR (10) NOT NULL, 
            team VARCHAR (5) NOT NULL);`;
        return client.query(queryText);
    }
    createGameTable(client) {
        const queryText = `CREATE TABLE IF NOT EXISTS gameData(
            game_id SERIAL PRIMARY KEY, 
            player1_id VARCHAR (40) NOT NULL, 
            player2_id VARCHAR (40), 
            player3_id VARCHAR (40), 
            player4_id VARCHAR (40), 
            timestamp TIMESTAMPTZ NOT NULL);`;
        return client.query(queryText);
    }
}
exports.PersistenceHandler = PersistenceHandler;
//# sourceMappingURL=PersistenceHandler.js.map