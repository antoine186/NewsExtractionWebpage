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
const { vw, vh, vmin, vmax } = require('react-native-viewport-units')

class EmoSearchOverallResultCard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      resultData: this.props.resultData
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.resultData !== this.props.resultData) {
      this.setState({ resultData: this.props.resultData })
    }
  }

  render () {
    return (
        <View>
            <Card style={styles.articleCard}>
                <CardContent>
                    <Typography variant="h5" sx={{ fontSize: 1.6 * vh }}>
                        Overall Emotional Engagement with Search Topic
                    </Typography>
                    <Typography sx={{ fontSize: 1.2 * vh }} color="text.secondary">
                        Emotional Engagement
                    </Typography>
                    <br></br>
                    <Typography variant="body2" sx={{ fontSize: 1.4 * vh }}>
                        {this.state.resultData[0] !== undefined &&
                            this.state.resultData[0]['emotional_engagement']
                        }
                        <br></br>
                        {this.state.resultData[0] !== undefined && this.state.resultData[0]['emotional_engagement_percentage_change'] !== undefined &&
                          this.state.resultData[0]['emotional_engagement_percentage_change']
                        }
                    </Typography>
                </CardContent>
            </Card>
        </View>
    )
  }
}

export default EmoSearchOverallResultCard
