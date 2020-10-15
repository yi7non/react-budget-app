const Query = {
    me(parent, args, ctx, info) {
        return 'yinon'
    },
    incomes(parent, args, { prisma }, info) {
        return prisma.query.incomes(null, info)
    },
    expenses(parent, args, { prisma }, info){
        return prisma.query.expenses(null, info)
    }
}

module.exports = Query