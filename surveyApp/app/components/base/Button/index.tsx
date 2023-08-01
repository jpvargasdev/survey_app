import React from 'react';
import { TextProps, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { TxKeyPath } from '../../../i18n';
import Text from '../Text';

interface ButtonProps {
  text?: TxKeyPath;
  buttonProps: TouchableOpacityProps;
  textProps: TextProps;
}

function Button({
  text,
  buttonProps,
  textProps,
}: ButtonProps) {
  return (
    <TouchableOpacity {...buttonProps}>
      <Text text={text} {...textProps}/>
    </TouchableOpacity>
  );
}

export default React.memo(Button);

