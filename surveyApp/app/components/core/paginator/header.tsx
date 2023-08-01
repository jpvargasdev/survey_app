import * as React from 'react';
import {View, StyleSheet, Image, Pressable} from 'react-native';

import Stepper from './stepper';

import Icons from '../../../assets';

const styles = StyleSheet.create({
  container: {
    height: 74,
    paddingHorizontal: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonClose: {
    width: 24,
    height: 24,
  },
  buttonLeft: {
    width: 24,
    height: 24,
  },
});

type HeaderProps = {
  onClose: () => void;
  shouldShowBackButton: boolean;
  onMovePrevious: () => void;
  steps: number;
  currentStep: number;
};

function Header({
  onClose,
  onMovePrevious,
  shouldShowBackButton,
  steps,
  currentStep,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      {shouldShowBackButton ? (
        <Pressable
          hitSlop={20}
          onPress={onMovePrevious}
          style={styles.buttonLeft}
          android_ripple={{borderless: true}}>
          <Image source={Icons.back} />
        </Pressable>
      ) : (
        <View style={styles.buttonLeft} />
      )}
      <Stepper steps={steps} currentStep={currentStep} />
    </View>
  );
}

export default React.memo(Header);
