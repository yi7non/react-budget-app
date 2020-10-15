const Mutaition = {
    createIncome(parent, args, { prisma }, info) {
        console.log(args.data, info);
        return prisma.mutation.createIncome({data: args.data}, info)
    },
    createExpense(parent, args, { prisma }, info) {
        return prisma.mutation.createExpense({data: args.data}, info)
    }
}

module.exports = Mutaition