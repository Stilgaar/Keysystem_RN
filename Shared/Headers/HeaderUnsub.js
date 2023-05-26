import {StyleSheet, Text, View} from 'react-native';

import React from 'react';

export default function HeaderUnsub({
  // navigation, // if navigation needed incomment here  (for contact or RGPD later ?)
  title,
}) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
