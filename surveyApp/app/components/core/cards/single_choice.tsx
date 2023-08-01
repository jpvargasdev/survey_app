import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { SingleChoice } from '../../../service/api.types';
import Card from './base_card';
import CheckBox from '@react-native-community/checkbox';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    alignItems: 'center',
  },
  label: {
    fontSize: 16
  }
});

type ChoiceProps = {
  onMoveNext: () => void;
  onSetNewAnswer: (answer: string | string[], id: number) => void;
} & SingleChoice;


function Choice({ options, question, onMoveNext, onSetNewAnswer, id }: ChoiceProps) {
  const [selection, setSelection] = React.useState<number | null>(null);
  const onSetSelection = (index: number) => {
    if (selection === index) {
      setSelection(null);
    } else {
      setSelection(index);
    }
  };

  const willMoveNext = () => {
    if (selection === null) return;
    const answer = options[selection];
    onSetNewAnswer(answer, id);
    onMoveNext();
  }

  return (
    <Card title={question} onMoveNext={willMoveNext} canMoveNext={selection !== null}>
      {options.map((option, index) => (
        <View style={styles.container} key={`${option}-${index}`}>
          <Text style={styles.label}>{option}</Text>
          <CheckBox
            disabled={false}
            value={selection === index}
            onValueChange={(value) => onSetSelection(index)}
            boxType="circle"
          />
        </View>
      ))}
    </Card>
  );
}

export default Choice;

