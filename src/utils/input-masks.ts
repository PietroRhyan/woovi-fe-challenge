export function cpfMask(cpf: string) {
  const cpfFormatted = cpf
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')

  return cpfFormatted
}

export function creditCardMask(cc: string) {
  const ccFormatted = cc
    .replace(/\D/g, '')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')
    .replace(/(\d{4})(\d)/, '$1 $2')

  return ccFormatted
}

export function validateMask(validate: string) {
  const validateFormatted = validate
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')

  return validateFormatted
}
