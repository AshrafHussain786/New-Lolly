const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require('faunadb'),
  q = faunadb.query;
const shortid = require('shortid');


const typeDefs = gql`
getVCard: [vCard]
}
type vCard {
  id: ID!
  c1: String!
  c2: String!
  c3: String!
  rec: String!
  sender: String!
  msg: String!
  link: String!
}
type Mutation {
  addVCard(c1: String!, 
    c2: String!,
    c3: String!,
    rec: String!,
    sender: String!,
    msg: String!) : vCard
}
`

const resolvers = {
Query: {
  getVCard: (root, args, context) => {
    return [{}]
  }
},
Mutation: {
  addVCard: async (_, { c1, c2, c3, rec, msg, sender }) => {
    // var adminClient = new faunadb.Client({ secret: 'fnAEGJYyhzACB422ziWq42_43HjnetVjZ-48rfJp' });
    console.log("============================");
    console.log(c1, c2, c3, rec, msg, sender);
    console.log("============================");

    // const result = await adminClient.query(
    //   q.Create(
    //     q.Collection('vCards'),
    //     {
    //       data: {
    //         c1, c2, c3, rec, msg, sender,
    //         link: shortid.generate()
    //       }
    //     },
    //   )
    // )
    // return result.data.data
    return {}
  }
}
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
