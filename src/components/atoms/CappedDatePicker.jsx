import React from 'react'
import PropTypes from 'prop-types'

class CappedDatePicker extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      minDate: this.props.minDate,
      maxDate: this.props.maxDate
    }
  }

  render () {
    return (
        <input type="date" id="date" min={this.state.minDate} max={this.state.maxDate} />
    )
  }
}

CappedDatePicker.propTypes = {
  minDate: PropTypes.string.isRequired,
  maxDate: PropTypes.string.isRequired
}

let today = new Date()
const dd = String(today.getDate()).padStart(2, '0')
const mm = String(today.getMonth() + 1).padStart(2, '0')
const yyyy = today.getFullYear()

today = yyyy + '-' + mm + '-' + dd

CappedDatePicker.defaultProps = {
  maxDate: today
}

export default CappedDatePicker
