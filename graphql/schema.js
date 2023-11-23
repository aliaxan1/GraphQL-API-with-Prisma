export const typeDefs = `
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
`;