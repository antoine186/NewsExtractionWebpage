function EmoEngagementStringFormatter (emoBreakdown) {
  let emoEngagementFormattedString = ''

  emoEngagementFormattedString = '😡 ' + (emoBreakdown.anger_percentage * 100).toFixed(2) + ' '
  emoEngagementFormattedString = emoEngagementFormattedString + '😃 ' + (emoBreakdown.joy_percentage * 100).toFixed(2) + ' '
  emoEngagementFormattedString = emoEngagementFormattedString + '😢 ' + (emoBreakdown.sadness_percentage * 100).toFixed(2) + ' '
  emoEngagementFormattedString = emoEngagementFormattedString + '🤢 ' + (emoBreakdown.disgust_percentage * 100).toFixed(2) + ' '
  emoEngagementFormattedString = emoEngagementFormattedString + '😱 ' + (emoBreakdown.fear_percentage * 100).toFixed(2) + ' '
  emoEngagementFormattedString = emoEngagementFormattedString + '😯 ' + (emoBreakdown.surprise_percentage * 100).toFixed(2) + ' '
  emoEngagementFormattedString = emoEngagementFormattedString + '😐 ' + (emoBreakdown.neutral_percentage * 100).toFixed(2)

  return emoEngagementFormattedString
}

export default EmoEngagementStringFormatter

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
