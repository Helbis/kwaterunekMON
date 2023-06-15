export const prettyDate = (date) => {

  if (date == null) {
    return ''
  }
  // return date.getYear()
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}