const Mutaition = {
    createIncome(parent, args, { prisma }, info) {
        return prisma.mutation.createIncome({data: args.data}, info)
    },
    updateIncome(parent, args, { prisma }, info) {
        return prisma.mutation.updateIncome({data: args.data, where: args.where}, info)
    },
    createExpense(parent, args, { prisma }, info) {
        return prisma.mutation.createExpense({data: args.data}, info)
    }
}

module.exports = Mutaition