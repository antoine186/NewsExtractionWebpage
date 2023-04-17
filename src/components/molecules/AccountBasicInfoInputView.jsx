import React from 'react'
import PropTypes from 'prop-types'

class AccountBasicInfoInputView extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      minDate: this.props.minDate,
      maxDate: this.props.maxDate,
      defaultDate: this.props.defaultDate
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.minDate !== this.props.minDate) {
      this.setState({ minDate: this.props.minDate })
    }
  }

  render () {
    return (
        <input type="date" id="date" min={this.state.minDate} max={this.state.maxDate} onChange={this.props.onChange} defaultValue={this.props.defaultDate}/>
    )
  }
}

AccountBasicInfoInputView.propTypes = {
  minDate: PropTypes.string.isRequired,
  maxDate: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  defaultDate: PropTypes.string
}

AccountBasicInfoInputView.defaultProps = {
  maxDate: yesterday,
  defaultDate: yesterday
}

export default AccountBasicInfoInputView
