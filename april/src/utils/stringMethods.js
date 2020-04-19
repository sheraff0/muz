export const toPascalName = str => {
    const str1 = str.replace(/[-_\s]+(.)?/g, (match, char) =>
      (char ? char.toUpperCase() : ''),
    )
    return str1.substr(0, 1).toUpperCase() + str1.substr(1)
  }

export const toCamelCase = str => {
  const str1 = str.replace(/[-_\s]+(.)?/g, (match, char) =>
    (char ? char.toUpperCase() : ''),
  )
  return str1.substr(0, 1).toLowerCase() + str1.substr(1)
}

export const removeDuplication = fullName =>
  fullName?.replace(/(,\s[\-\d\s\/А-Яа-я]+){2}$/g, '$1')

export const filterOption = (input, option) => {
  const words = input.toLowerCase().split(' ')
  return words.reduce((acc, curr) =>
    acc && (
      !curr ? true // skip empty string resulting from trailing spaces
      : option.children.toLowerCase().indexOf(curr) !== -1
    ), true
  )
}
