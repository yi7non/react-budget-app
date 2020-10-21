// ddk475g7pg07e6 - database name 
const { Prisma } = require('prisma-binding')

const prisma = new Prisma({
    typeDefs: "src/generated/prisma.graphql",
    endpoint: "http://localhost:4466/"
})

module.exports = prisma