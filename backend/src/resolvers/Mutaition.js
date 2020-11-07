const Mutaition = {
    createIncome(parent, args, { prisma }, info) {
        return prisma.mutation.createIncome({data: args.data}, info)
    },
    updateIncome(parent, args, { prisma }, info) {
        return prisma.mutation.updateIncome({data: args.data, where: args.where}, info)
    },
    async createExpense(parent, args, { prisma }, info) {
        const prevExpense = await prisma.query.expense({where: {category: args.data.category}}, '{cost}')
        if(prevExpense) {
            args.data.cost = parseInt(args.data.cost) + parseInt(prevExpense.cost)
            return prisma.mutation.updateExpense({data: {bType: args.data.bType, cost: args.data.cost}, where: {category: args.data.category}})
        }
        return prisma.mutation.createExpense({data: args.data}, info)
    },
    deleteIncome(parent, args, { prisma }, info) {
    return deleteIncomeTotaly(args, prisma, info)
    }
}

async function deleteIncomeTotaly(args, prisma, info) {
    const income = await prisma.mutation.deleteIncome({where: args.where}, info)
    const expense = await prisma.mutation.deleteExpense({where: args.where}, info)

    return {
        ...income, expense
    }
}
module.exports = Mutaition