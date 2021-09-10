import React, { Component } from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import RNRestart from 'react-native-restart';

const styles = StyleSheet.create({
  contentContainerStyle: {
    padding: 20,
    paddingBottom: 100,
    flexGrow: 1,
    justifyContent: 'center',
  },

  heading: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  explanation: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 30,
  },
});

export class ErrorBoundaryCatchAll extends Component<
  {},
  {
    hasError: boolean;
  }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <Text style={styles.heading}>Oops, Something Went Wrong</Text>
          <Text style={styles.explanation}>
            The app ran into a problem and could not continue. We apologize for
            any inconvenience this has caused. Press the restart button below,
            to restart the app and sign back in. Please contact us if this issue
            persists.
          </Text>
          <TouchableOpacity
            onPress={() => {
              RNRestart.Restart();
            }}>
            <Text>Restart</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    }
    return this.props.children;
  }
}
