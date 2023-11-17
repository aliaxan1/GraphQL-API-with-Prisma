import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


async function startApolloServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs:`
            type Student {
                roll_no: ID!
                first_name: String!
                last_name: String!
                email: String!
            }

            type Query {
                getAllStudents: [Student]
                getStudent(roll_no: ID!): Student
            } 

            type Mutation {
                createStudent(first_name: String!, last_name: String!, email: String!): Student
                updateStudent(roll_no: ID!,first_name: String!, last_name: String!, email: String!): Student
                deleteStudent(roll_no: ID!): Student
            }
        `,
        resolvers: {
            Query:{
                getAllStudents:async () => {
                    const allStudents = await prisma.Student.findMany();
                    return allStudents; 
                },
                getStudent:async (parent,{roll_no}) => {
                    const id = parseInt(roll_no);
                    const query = { roll_no: id };
                    const student = await prisma.student.findUnique({
                        where: query,
                    });
                    if (!student) {
                        return `No student with id ${id}`;
                    }
                    return student;
                }
                
            },
            Mutation:{
                createStudent:async (parent, args) => {
                    const student = await prisma.student.create({
                        data: { 
                            first_name: args.first_name,
                            last_name: args.last_name,
                            email: args.email,
                        },
                    });
                    return student;
                },
                updateStudent:async (parent, args) => {
                    const student = await prisma.student.update({
                        where: {
                            roll_no: parseInt(args.roll_no),
                        },
                        data: {
                            first_name: args.first_name,
                            last_name: args.last_name,
                            email: args.email,
                        },
                    });
                    return student;
                },
                deleteStudent:async (parent, args) => {
                    const student = await prisma.student.delete({
                        where: {
                            roll_no: parseInt(args.roll_no),
                        },
                    });
                    return student;
                },
            }
        },
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