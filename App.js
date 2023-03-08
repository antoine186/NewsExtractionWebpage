import React from 'react';
import { Button, StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';

function Link(props) {
  return <Text {...props} accessibilityRole="link" style={StyleSheet.compose(styles.link, props.style)} />;
}

function App() {
  const [value, onChangeText] = React.useState('Search');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Emotional Machines</Text>
      </View>
      <View class="form-group form-row">
            <View class="col-10">
              <Text style={styles.text}>
                Find Emotions
              </Text>
              <TextInput
                editable
                multiline
                numberOfLines={4}
                maxLength={40}
                onChangeText={text => onChangeText(text)}
                value={value}
                style={{padding: 10, borderWidth: 2, borderColor: "#BC2BEA"}}
              />
              <label for="from_date" class="col-form-label">
                  From:
              </label>
              <br></br>
              <input type="date" id="date" min="2006-01-01"/>
              <label for="to_date" class="col-form-label">
                  To:
              </label>
              <input type="date" id="maxdatepicker" max="{{date.today()}}"/>
            </View>
      </View>
    </View>
  );
}

let ScreenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: ScreenHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  header: {
    padding: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginVertical: '1em',
    textAlign: 'center'
  },
  text: {
    lineHeight: '1.5em',
    fontSize: '1.125rem',
    marginVertical: '1em',
    textAlign: 'center'
  },
  link: {
    color: '#1B95E0'
  },
  code: {
    fontFamily: 'monospace, monospace'
  }
});
export default App;