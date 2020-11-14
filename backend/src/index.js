const { GraphQLServer } = require('graphql-yoga')
const prisma = require('./prisma')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutaition')


const gqlServer = new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers: {
        Query,
        Mutation
    },
    resolverValidationOptions: {
        requireResolversForResolveType: false
    },
    context(req) {
        return {...req, prisma}
    }
})

gqlServer.start({
    cors: {
        credentials: true,
        // origin: process.env.FRONTEND_URL
    }
}, deets => console.log(`Yinon Server is now runnig on port http://localhost:${ deets.port }`))