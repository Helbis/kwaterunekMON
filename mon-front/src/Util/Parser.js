export const prettyDate = (date) => {

  if (date == null) {
    return ''
  }
  console.log(date)
  // return date.getYear()
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}