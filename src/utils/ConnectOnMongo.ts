import {MongoClient, Db} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
let db: Db | null;

const DB_HOST: string = process.env.DB_HOST ?? '';
const DB_NAME: string = process.env.DB_NAME ?? '';

if(DB_HOST === '' || DB_NAME === ''){
    throw new Error('Variaveis de ambiente DB_HOST ou DB_NAME nao encontradas.');
}

interface MongoDb {
    connectToMongo: () => Promise<Db>
} 

const mongoDb: MongoDb = {
    connectToMongo: async (): Promise<Db> => {
        if(db){
            //Retorna uma conexao ja existente se houver            
            return db;
        }

        const connectionString: string = `${DB_HOST}/${DB_NAME}`;
        const client = new MongoClient(connectionString);
        try {
            console.log('🔃 Conectando ao banco de dados...');
            await client.connect();
            db = client.db(DB_NAME);
            console.log('✅ Conectado com sucesso!');
            return db!;
        } catch (error) {
            console.error('Erro ao conectar:', error);
            throw new Error((error as Error).message);
        }
    }
}

export default mongoDb;