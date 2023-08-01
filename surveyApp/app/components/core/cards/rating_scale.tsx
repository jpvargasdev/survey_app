import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { RatingScale } from '../../../service/api.types';
import Card from './base_card';

import CheckBox from '@react-native-community/checkbox';

const styles = StyleSheet.create({
  container: {},
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemHeader1: {
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  itemHeader2: {
    justifyContent: 'center',
    alignItems: 'flex-end'
  },

  body: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

type ChoiceProps = {
  onMoveNext: () => void;
  onSetNewAnswer: (answer: string | string[], id: number) => void;
} & RatingScale;


function Choice({ question, onMoveNext, min_text, max_text, min_value, max_value, onSetNewAnswer, id }: ChoiceProps) {
  const numberOfBoxes = max_value - min_value;
  const itemsToRender = Array.from(Array(10).keys());
  const [selection, setSelection] = React.useState<number | null>(null);

   const onSetSelection = (index: number) => {
    if (selection === index) {
      setSelection(null);
    } else {
      setSelection(index);
    }
  };

  const willMoveNext = () => {
    onSetNewAnswer(`${selection}`, id);
    onMoveNext();
  };

  return (
    <Card title={question} onMoveNext={willMoveNext} canMoveNext={selection !== null}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.itemHeader1}>
            <Text>{min_text}</Text>
            <Text>{min_value}</Text>
          </View>
          <View style={styles.itemHeader2}>
            <Text>{max_text}</Text>
            <Text>{max_value}</Text>
          </View>
        </View>
        <View style={styles.body}>
          {itemsToRender.map((item, index) => (
            <CheckBox
              key={`${index}`}
              value={selection === index}
              disabled={false}
              onValueChange={(value) => onSetSelection(index)} 
              boxType="square"
            />
          ))}
        </View>
      </View>
    </Card>
  );
}

export default Choice;

