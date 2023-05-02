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
      articleExpand: false
    }
  }

  render () {
    return (
        <View>
            <Card style={styles.articleCard}>
                <CardContent>
                    <Typography sx={{ fontSize: 1.2 * vh }} color="text.secondary" gutterBottom>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="div">
                        benevolent
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                    </Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => this.setState({ articleExpand: !this.state.articleExpand })}>Learn More</Button>
                </CardActions>
                <Collapse in={this.state.articleExpand} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph sx={{ fontSize: 1.2 * vh }}>Chevrolet Description</Typography>
                        <Typography paragraph sx={{ fontSize: 1.2 * vh }}>
                            Chevrolet is an iconic American automobile brand founded in 1911 by Louis Chevrolet and William C. Durant
                        </Typography>
                        <Typography paragraph sx={{ fontSize: 1.2 * vh }}>
                            It is currently the fourth-largest automotive brand in the United States and is a division of General Motors. Chevrolet has become one of America’s most iconic brands, producing reliable and stylish cars, trucks, and SUVs for over a century. Its models range from the economical Spark to the luxurious Corvette.
                        </Typography>
                        <Typography paragraph sx={{ fontSize: 1.2 * vh }}>
                            Chevrolet is also known for its commitment to safety, providing advanced features like lane departure warning and front crash prevention. (Discard any mussels that don&apos;t open.)
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </View>
    )
  }
}

export default EmoSearchBasicResultCard
