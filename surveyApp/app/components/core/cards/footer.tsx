import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icons from '../../../assets';
import CustomTheme from '../../../theme/colors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 56,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
  },
  button: {
    padding: 10,
    borderRadius: 40,
    marginRight: 20,
    marginBottom: 20,
  }
});

type FooterProps = {
  isEnabled: boolean;
  onPress: () =>  void;
}

function Footer({isEnabled, onPress}: FooterProps) {
  const buttonColor = isEnabled ? CustomTheme.colors.green : 'gray';
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, {backgroundColor: buttonColor}]} onPress={isEnabled ? onPress : () => {}}>
        <Image source={Icons.caretRight} style={{width: 30, height: 30}}/>
      </TouchableOpacity>
    </View>
  )
}

export default React.memo(Footer);
