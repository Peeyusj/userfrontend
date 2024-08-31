import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// generate a random unique number based on prop
export const generateNum = (num) => {
  const digits = '0123456789'
  num = num || 10
  let NUM = ''
  for (let i = 0; i < num; i++) {
      NUM += digits[Math.floor(Math.random() * 10)]
  }
  return NUM
}

/**
* Orders the columnsDataArray based on the provided propsDataArray.
* @param {Array<string>} propsDataArray - The array specifying the order of elements.
* @param {Array<Object>} columnsDataArray - The array of objects to be ordered.
* @returns {Array<Object>} - The ordered array of objects based on the propsDataArray.
*/
export function orderColumnsByProps(propsDataArray, columnsDataArray) {
  const orderedColumns = []

  // Iterate through each element in the propsDataArray
  propsDataArray.forEach(prop => {
      // Find the matching column from columnsDataArray
      const column = columnsDataArray.find(columnData => columnData.name === prop)

      // If a matching column is found, add it to the orderedColumns array
      if (column) {
          orderedColumns.push(column)
      }
  })

  return orderedColumns
}

/**
 * Converts a timestamp string to the "d-M-Y" format.
 * @param {string} timestamp - The timestamp string to convert.
 * @returns {string} The date formatted as "d-M-Y".
 */
export const formatNewDate = (timestamp) => {
  const dateObj = new Date(timestamp)
  const day = dateObj.getUTCDate()
  const monthIndex = dateObj.getUTCMonth() // Note: getUTCMonth returns a zero-based index (0 for January, 11 for December)
  const year = dateObj.getUTCFullYear()

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const month = monthNames[monthIndex]

  return `${day}-${month}-${year}`
}