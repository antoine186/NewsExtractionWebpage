import React from 'react'
import PropTypes from 'prop-types'
import DateFormatter from '../../utils/DateFormatter'

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
        <input type="date" id="date" min={this.state.minDate} max={this.state.maxDate} onChange={this.props.onChange} />
    )
  }
}

CappedDatePicker.propTypes = {
  minDate: PropTypes.string.isRequired,
  maxDate: PropTypes.string.isRequired,
  onChange: PropTypes.func
}

const today = DateFormatter(new Date())

CappedDatePicker.defaultProps = {
  maxDate: today
}

export default CappedDatePicker
