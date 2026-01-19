export function getPaginateIndex(page: number, totalPerPage: number) {
  const start = (page - 1) * totalPerPage
  const end = page * totalPerPage

  return { start, end }
}
