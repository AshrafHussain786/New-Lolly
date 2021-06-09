const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb");
const axios = require("axios");
q = faunadb.query;
// require("dotenv").config();
// const shortid = require("shortid")

const typeDefs = gql`
  type Query {
    hello: String!
    getVCard: [vCard!]
    getLollyByLink(link: String!): vCard
  }
  type vCard {
    c1: String!
    c2: String!
    c3: String!
    rec: String!
    sender: String!
    msg: String!
    link: String!
  }
  type Mutation {
    addVCard(
      c1: String!
      c2: String!
      c3: String!
      rec: String!
      sender: String!
      msg: String!
      link: String!
    ): vCard
  }
`
// var client = new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET });
var client = new faunadb.Client({secret: "fnAEGJYyhzACB422ziWq42_43HjnetVjZ-48rfJp"})

const resolvers = {
  Query: {
    hello: () => {
      return "Hello, Virtual Lolly...."
    },

    getVCard: async (root, args, context) => {
      var result = await client.query(
        q.Map(q.Paginate(q.Match(q.Index("link"))),
          q.Lambda("x", q.Get(q.Var("x")))
        )
      )
      let x = [];
      result.data.map(curr => {
        x.push(curr.data)
      })
      return x;
    },

    getLollyByLink: async (_, { link }) => {
      console.log(link)
      try {
        const result = await client.query(
          q.Get(q.Match(q.Index("link"), link)))
        console.log(result)
        return result.data
      } catch (error) {
        return error.toString()
      }
    },
  },

  Mutation: {
    addVCard: async (_, { c1, c2, c3, rec, msg, sender, link }) => {
      console.log("====================================")
      console.log(c1, c2, c3, rec, msg, sender, link)
      console.log("====================================")
      try {
      const result = await client.query(
        q.Create(q.Collection("vCards"), {
          data: {
            c1,
            c2,
            c3,
            rec,
            msg,
            sender,
            link,
          },
        })
      )

      // new faunadb.Client({ secret: process.env.FAUNADB_SERVER_SECRET })
      axios
        .post("https://api.netlify.com/build_hooks/607c44e23d1282a75ef48bb1")
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.error(error)
        })

      console.log("Result in addMutation >>>>> ", result)
      return result.data;
      } catch (error) {
        return error.toString();
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()