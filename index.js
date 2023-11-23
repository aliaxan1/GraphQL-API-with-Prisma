import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4'
import {typeDefs} from './graphql/schema.js';
import {resolvers} from './graphql/resolvers.js';


async function startApolloServer() {

    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    

    app.use(cors());
    app.use(bodyParser.json());

    await server.start();

    app.use("/graphql", expressMiddleware(server));
    app.listen(4000, () => {
        console.log("Server is running on port 4000");
    });
}

startApolloServer();