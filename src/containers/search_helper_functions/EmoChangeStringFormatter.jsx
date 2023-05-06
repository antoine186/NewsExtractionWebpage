import { emoIcons } from "../../utils/emotional_configuration/EmoIcons"

function EmoChangeStringFormatter (emoBreakdown, previousEmoBreakdown) {
  let emoEngagementFormattedString = ''

  let emoBreakdownSorted = Object.keys(emoBreakdown).map(function(key) {
    return [key, emoBreakdown[key]]
  })

  emoBreakdownSorted.sort(function (first, second) {
    return second[1] - first[1]
  })

  let emoSign1 = ''
  if (((previousEmoBreakdown[emoBreakdownSorted[0][0]] - emoBreakdownSorted[0][1]) / emoBreakdownSorted[0][1] * 100) >= 0) {
    emoSign1 = '+'
  }
  emoEngagementFormattedString = emoIcons[emoBreakdownSorted[0][0]] + ' ' + emoSign1 + ((previousEmoBreakdown[emoBreakdownSorted[0][0]] - emoBreakdownSorted[0][1]) / emoBreakdownSorted[0][1] * 100).toFixed(2) + '% '

  let emoSign2 = ''
  if (((previousEmoBreakdown[emoBreakdownSorted[1][0]] - emoBreakdownSorted[1][1]) / emoBreakdownSorted[1][1] * 100) >= 0) {
    emoSign2 = '+'
  }
  emoEngagementFormattedString = emoEngagementFormattedString + emoIcons[emoBreakdownSorted[1][0]] + ' ' + emoSign2 + ((previousEmoBreakdown[emoBreakdownSorted[1][0]] - emoBreakdownSorted[1][1]) / emoBreakdownSorted[1][1] * 100).toFixed(2) + '% '

  let emoSign3 = ''
  if (((previousEmoBreakdown[emoBreakdownSorted[2][0]] - emoBreakdownSorted[2][1]) / emoBreakdownSorted[2][1] * 100) >= 0) {
    emoSign3 = '+'
  }
  emoEngagementFormattedString = emoEngagementFormattedString + emoIcons[emoBreakdownSorted[2][0]] + ' ' + emoSign3 + ((previousEmoBreakdown[emoBreakdownSorted[2][0]] - emoBreakdownSorted[2][1]) / emoBreakdownSorted[2][1] * 100).toFixed(2) + '% '

  let emoSign4 = ''
  if (((previousEmoBreakdown[emoBreakdownSorted[3][0]] - emoBreakdownSorted[3][1]) / emoBreakdownSorted[3][1] * 100) >= 0) {
    emoSign4 = '+'
  }
  emoEngagementFormattedString = emoEngagementFormattedString + emoIcons[emoBreakdownSorted[3][0]] + ' ' + emoSign4 + ((previousEmoBreakdown[emoBreakdownSorted[3][0]] - emoBreakdownSorted[3][1]) / emoBreakdownSorted[3][1] * 100).toFixed(2) + '% '

  let emoSign5 = ''
  if (((previousEmoBreakdown[emoBreakdownSorted[4][0]] - emoBreakdownSorted[4][1]) / emoBreakdownSorted[4][1] * 100) >= 0) {
    emoSign5 = '+'
  }
  emoEngagementFormattedString = emoEngagementFormattedString + emoIcons[emoBreakdownSorted[4][0]] + ' ' + emoSign5 + ((previousEmoBreakdown[emoBreakdownSorted[4][0]] - emoBreakdownSorted[4][1]) / emoBreakdownSorted[4][1] * 100).toFixed(2) + '% '

  let emoSign6 = ''
  if (((previousEmoBreakdown[emoBreakdownSorted[5][0]] - emoBreakdownSorted[5][1]) / emoBreakdownSorted[5][1] * 100) >= 0) {
    emoSign6 = '+'
  }
  emoEngagementFormattedString = emoEngagementFormattedString + emoIcons[emoBreakdownSorted[5][0]] + ' ' + emoSign6 + ((previousEmoBreakdown[emoBreakdownSorted[5][0]] - emoBreakdownSorted[5][1]) / emoBreakdownSorted[5][1] * 100).toFixed(2) + '% '

  let emoSign7 = ''
  if (((previousEmoBreakdown[emoBreakdownSorted[6][0]] - emoBreakdownSorted[6][1]) / emoBreakdownSorted[6][1] * 100) >= 0) {
    emoSign7 = '+'
  }
  emoEngagementFormattedString = emoEngagementFormattedString + emoIcons[emoBreakdownSorted[6][0]] + ' ' + emoSign7 + ((previousEmoBreakdown[emoBreakdownSorted[6][0]] - emoBreakdownSorted[6][1]) / emoBreakdownSorted[6][1] * 100).toFixed(2) + '% '

  return emoEngagementFormattedString
}

export default EmoChangeStringFormatter

/*
sadness 😢
joy 😃
love 🥰
disgust 🤢
anger 😡
fear 😱
surprise 😯
neutral 😐
*/
