import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import { FreeText } from '../../../service/api.types';
import Card from './base_card';
import Header from './header';

type ChoiceProps = {
  onMoveNext: () => void;
  onSetNewAnswer: (answer: string | string[], id: number) => void;
} & FreeText;

function Choice({ question, onMoveNext, onSetNewAnswer, id }: ChoiceProps) {
  const [value, onChangeText] = React.useState('');
  const willMoveNext = () => {
    onSetNewAnswer(value, id);
    onMoveNext();
  }
  return (
    <Card title={question} onMoveNext={willMoveNext} canMoveNext={value.length > 10}>
      <TextInput
        editable
        multiline
        numberOfLines={4}
        maxLength={140}
        onChangeText={text => onChangeText(text)}
        value={value}
        style={{padding: 10, borderWidth: StyleSheet.hairlineWidth, height: 100}}
      />
    </Card>
  );
}

export default Choice;


