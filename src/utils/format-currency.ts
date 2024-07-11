export const formatCurrency = (number: number) => {
  return Intl.NumberFormat("pt-BR", {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2,
  }).format(number)
} 