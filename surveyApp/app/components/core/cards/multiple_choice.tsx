import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { MultipleChoice } from '../../../service/api.types';
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
} & MultipleChoice;

function Choice({ options, question, onMoveNext, onSetNewAnswer, id }: ChoiceProps) {
  const [selections, setSelections] = React.useState<number[]>([]);

  const onSetSelection = (value: boolean, index: number) => {
    if (value) {
      const newSelections = [...selections, index];
      setSelections(newSelections);
    } else {
      const newSelections = [...selections];
      const idx = newSelections.indexOf(index);
      if (idx > -1) {
        newSelections.splice(idx, 1);
      }
      setSelections(newSelections);
    }
  };
  
  const willMoveNext = () => {
    const answers = selections.map((selection) => options[selection]);
    onSetNewAnswer(answers, id);
    onMoveNext();
  };

  return (
    <Card title={question} onMoveNext={willMoveNext} canMoveNext={selections.length > 0}>
      {options.map((option, index) => (
        <View style={styles.container} key={`${option}-${index}`}>
          <Text style={styles.label}>{option}</Text>
          <CheckBox
            disabled={false}
            onValueChange={(value) => onSetSelection(value, index)}
            boxType="square"
          />
        </View>
      ))}
    </Card>
  );
}

export default Choice;

