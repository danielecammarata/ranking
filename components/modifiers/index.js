const convertDate = (inputFormat) => {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat)
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
}

/**
   * Group match data by createdAt date
   * @param {array} data - matches array
   * @param {array} initialMatches - initial matches array
   * @returns {object} grouped matches
   */
  const prepareMatchData = (data, initialMatches) => {
    const matches = initialMatches
    data.forEach(item => {
      const currDate = convertDate(item.createdAt)
      if (currDate in matches) {
        matches[currDate].matches.push(item)
      } else {
        matches[currDate] = {
          matches: [item]
        }
      }
    })

    return matches
  }

export {
  convertDate,
  prepareMatchData
}
