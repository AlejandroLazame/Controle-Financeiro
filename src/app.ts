import express from 'express';
import cors from 'cors';
import { createHandler } from 'graphql-http/lib/use/express';
import { makeExecutableSchema } from '@graphql-tools/schema';

const { ruruHTML } = require('ruru/server');

import mongoDb from './utils/ConnectOnMongo';
import typeDefs from './model/graphql';
import resolvers from './resolvers';

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

(async (): Promise<void> => {
    const db = await mongoDb.connectToMongo();
    
    const app = express();
    app.use(cors())
    app.all('/graphql', createHandler({
            schema: schema,
            context: async req => {
                return { db: db }
            }
        })
    );

    app.get('/', (_req, res)=>{
        res.type('html');
        res.end(ruruHTML({ endpoint: '/graphql' }));
    });
    
    app.listen(4000, ()=> console.log(`✅ Server is running on http://localhost:4000/graphql`));
})();
