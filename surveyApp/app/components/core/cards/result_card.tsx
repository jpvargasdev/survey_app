import React from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import { Survey } from '../../../service/api.types';
import CustomTheme from '../../../theme/colors';
import Button from '../../base/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
 },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  questionItem: {
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
    padding: 10,
  },
  question: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  answer: {
    fontSize: 16,
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: CustomTheme.colors.violet,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});

type ResultCardProps = {
  answers: Record<number, string | string[]>;
  questions: Survey[];
  onReset: () => void;
};

function ResultCard({answers, questions, onReset}: ResultCardProps) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Result</Text>
      {questions.map((question, index) => {
        return (
          <View style={styles.questionItem} key={`${index}`}>
            <Text style={styles.question}>{question.question}</Text>
            <Text style={styles.answer}>{answers[question.id]}</Text>
          </View>
        );
      })}
      <Button
        text='errorScreen.reset'
        buttonProps={{
          style: styles.button,
          onPress: onReset
        }}
        textProps={{
          style: styles.text
        }}
      />
    </ScrollView>
  );
}

export default ResultCard;
