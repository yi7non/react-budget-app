export function removeSalary(incomes) {
  const salIndex = incomes.findIndex(income => income.category === 'salary')
  return incomes.splice(salIndex, 1)
}

export function salaryRemaining(incomes) {
  const sal = removeSalary(incomes)
  const reduction = incomes.reduce(
    (accumulator, inc) => parseInt(accumulator) + parseInt(inc.cost),
    0
  )
  incomes.push(sal[0])
  incomes[incomes.length - 1].cost -= reduction
}
