import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'lightGray',
    paddingBottom: 8
  },
  title: {
    flexWrap: 'wrap',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

type HeaderProps = {
  title: string;
};

function Header({title}: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title} >{title}</Text>
    </View>
  );
}

export default React.memo(Header);

