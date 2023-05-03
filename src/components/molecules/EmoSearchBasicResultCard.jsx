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

class EmoSearchBasicResultCard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      articleExpand: false,
      articleData: this.props.articleData,
      emoIcon: this.props.emoIcon
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.articleData !== this.props.articleData) {
      this.setState({ articleData: this.props.articleData })
    }
  }

  render () {
    return (
        <View>
            <Card style={styles.articleCard}>
                <CardContent>
                    <Typography sx={{ fontSize: 1.2 * vh }} color="text.primary" gutterBottom>
                        Most {this.state.emoIcon}
                    </Typography>
                    <Typography variant="h5" sx={{ fontSize: 1.6 * vh }}>
                        {this.state.articleData !== undefined &&
                            <a href={this.state.articleData.url} style={{ color: '#808B96' }}>{this.state.articleData.title}</a>
                        }
                    </Typography>
                    <Typography sx={{ fontSize: 1.2 * vh }} color="text.primary">
                        {this.state.articleData !== undefined &&
                            this.state.articleData.publisher
                        }
                        <br></br>
                        {this.state.articleData !== undefined &&
                            this.state.articleData.published_date
                        }
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => this.setState({ articleExpand: !this.state.articleExpand })}>Learn More</Button>
                </CardActions>
                <Collapse in={this.state.articleExpand} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography sx={{ fontSize: 1.2 * vh }} color="text.secondary" gutterBottom>
                            Emotional Engagement
                        </Typography>
                        <Typography paragraph sx={{ fontSize: 1.2 * vh }}>
                            {this.state.articleData !== undefined &&
                                this.state.articleData.emotional_engagement
                            }
                            <br></br>
                            <br></br>
                            <Typography sx={{ fontSize: 1.2 * vh }} color="text.secondary" gutterBottom>
                                Extracted Concepts
                            </Typography>
                            {this.state.articleData !== undefined &&
                            <ul>
                                {this.state.articleData.extracted_keywords.map(keywords => (
                                    <li>{keywords[0]}</li>
                                ))}
                            </ul>
                            }
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </View>
    )
  }
}

export default EmoSearchBasicResultCard
