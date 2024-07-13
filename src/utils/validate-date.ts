export function validateDate(date: string): boolean {
  const separateDate = date.split('/')

  const currentMonth = new Date().getMonth() + 1 // Zero-based month - January = 0
  const currentYear = new Date().getFullYear()

  const month = Number(separateDate[0]) 
  const year = Number(separateDate[1]) + 2000 // Year 20xx

  if (year > currentYear) {
    return true
  }

  if (year === currentYear) {
    if (month >= currentMonth) {
      return true
    }
    return false
  } 

  return false
}