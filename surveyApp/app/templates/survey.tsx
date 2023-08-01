import React from 'react';
import {StyleSheet, View} from 'react-native';
import CardSelector from '../components/core/cards';
import ResultCard from '../components/core/cards/result_card';
import Paginator, { PaginatorRef } from '../components/core/paginator';
import { SurveyResponse } from '../service/api.types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

type SurveyProps = {
  data: SurveyResponse;
  onReset: () => void;
};

const Survey: React.FC<SurveyProps> = ({
  data,
  onReset
}) => {
  const [answers, setAnswers] = React.useState<Record<number, string | string[]>>({});
  const ref = React.useRef(null);

  const onSetNewAnswer = (answer: string | string[], id: number) => {
    const newAnswers = {...answers};
    newAnswers[id] = answer;
    setAnswers(newAnswers);
  };

  return (
    <View style={{flex: 1}}>
      <Paginator ref={ref}>
        {data.response.map((item, index) => (
          <CardSelector item={item} key={`${index}`} onSetNewAnswer={onSetNewAnswer}/>
        ))}
        <ResultCard answers={answers} questions={data.response} onReset={onReset} />
      </Paginator>
    </View>
  );
};

export default Survey;
