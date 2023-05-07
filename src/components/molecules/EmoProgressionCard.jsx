import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Icon, Image } from 'react-native'
import styles from '../../utils/style_guide/MainWebpageStyle'
// import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
const { vw, vh, vmin, vmax } = require('react-native-viewport-units')

class EmoProgressionCard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      progressionDataLine: this.props.progressionDataLine,
      chartData: [],
      progressionDates: this.props.progressionDates,
      emoIcon: this.props.progressionEmoIcon
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.progressionDataLine !== this.props.progressionDataLine) {
      const data = [
        {
          name: this.props.progressionDates[0].month + ' ' + this.props.progressionDates[0].year,
          emotion: this.props.progressionDataLine[0] * 100,
        },
        {
          name: this.props.progressionDates[1].month + ' ' + this.props.progressionDates[1].year,
          emotion: this.props.progressionDataLine[1] * 100,
        },
        {
          name: this.props.progressionDates[2].month + ' ' + this.props.progressionDates[2].year,
          emotion: this.props.progressionDataLine[2] * 100,
        },
        {
          name: this.props.progressionDates[3].month + ' ' + this.props.progressionDates[3].year,
          emotion: this.props.progressionDataLine[3] * 100,
        },
        {
          name: this.props.progressionDates[4].month + ' ' + this.props.progressionDates[4].year,
          emotion: this.props.progressionDataLine[4] * 100,
        },
        {
          name: this.props.progressionDates[5].month + ' ' + this.props.progressionDates[5].year,
          emotion: this.props.progressionDataLine[5] * 100,
        }
      ]
      this.setState({ chartData: data })
      this.setState({ progressionDataLine: this.props.progressionDataLine })
    }
  }

  render () {
    return (
        <View>
            <Card style={styles.chartCard}>
                <CardContent>
                    <Typography variant="h5" sx={{ fontSize: 1.6 * vh }}>
                        {this.state.emoIcon} Progression in %
                    </Typography>
                    <br></br>
                    <LineChart
                    width={32 * vw}
                    height={300}
                    data={this.state.chartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5
                    }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="emotion" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </CardContent>
            </Card>
        </View>
    )
  }
}

export default EmoProgressionCard
