export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const hexAF = {'a': 10, 'b': 11, 'c': 12, 'd': 13, 'e': 14, 'f': 15}

export function useFormat() {
  const formattedHextoRgba = function(hex, alpha){
    const first = [hex[1], hex[2]]
    const second = [hex[3], hex[4]]
    const third = [hex[5], hex[6]]

    first[0] = Number.parseInt(first[0]) || first[0] === '0' ? Number(first[0]) : hexAF[String(first[0]).toLowerCase()]
    first[1] = Number.parseInt(first[1]) || first[1] === '0' ? Number(first[1]) : hexAF[String(first[1]).toLowerCase()]

    second[0] = Number.parseInt(second[0]) || second[0] === '0' ? Number(second[0]) : hexAF[String(second[0]).toLowerCase()]
    second[1] = Number.parseInt(second[1]) || second[1] === '0' ? Number(second[1]) : hexAF[String(second[1]).toLowerCase()]

    third[0] = Number.parseInt(third[0]) || third[0] === '0' ? Number(third[0]) : hexAF[String(third[0]).toLowerCase()]
    third[1] = Number.parseInt(third[1]) || third[1] === '0' ? Number(third[1]) : hexAF[String(third[1]).toLowerCase()]

    const calR = (first[0] * Math.pow(16, 1)) + (first[1] * Math.pow(16, 0))
    const calG = (second[0] * Math.pow(16, 1)) + (second[1] * Math.pow(16, 0))
    const calB = (third[0] * Math.pow(16, 1)) + (third[1] * Math.pow(16, 0))

    return `rgba(${calR}, ${calG}, ${calB}, ${alpha})`
  }

  const formattedDate = function(newDate){
    const date = new Date(newDate)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const formattedDateToRead = function(newDate){
    const date = formattedDate(newDate).split('-').reverse()
    return `${parseInt(date.at(0))} ${months.at(date.at(1) - 1)}, ${date.at(-1)}`;
  }
  return { formattedHextoRgba, formattedDate, formattedDateToRead, months }
}
