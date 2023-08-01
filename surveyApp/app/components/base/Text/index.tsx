import React from 'react';
import {Text as RNText, TextProps as RNTextProps} from 'react-native';

import {translate, TxKeyPath} from '../../../i18n';

interface TextProps extends RNTextProps {
  text?: TxKeyPath;
}

function Text({text, children, ...props}: TextProps) {
  const i18nText = text && translate(text);
  const content = i18nText || children;
  return <RNText {...props}>{content}</RNText>;
}

export default React.memo(Text);
