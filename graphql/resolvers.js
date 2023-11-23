import { EventEmitter } from 'node:events';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const event = new EventEmitter();
export const resolvers=  {
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
            event.emit('createStudent', args);
        },
        updateStudent:async (parent, args) => {
            event.emit('updateStudent', args);
        },
        deleteStudent:async (parent, args) => {
            event.emit('deleteStudent', args);
        },
    }
}
//EVENTS 

event.on('createStudent', async (args) => {
    await prisma.student.create({
        data: { 
            first_name: args.first_name,
            last_name: args.last_name,
            email: args.email,
        },
    });
});
event.on('updateStudent', async (args) => {
    await prisma.student.update({
        where: {
            roll_no: parseInt(args.roll_no),
        },
        data: {
            first_name: args.first_name,
            last_name: args.last_name,
            email: args.email,
        },
    });
});
event.on('deleteStudent', async (args) => {
    await prisma.student.delete({
        where: {
            roll_no: parseInt(args.roll_no),
        },
    });
});
