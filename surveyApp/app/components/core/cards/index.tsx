import React from 'react';
import { QuestionType, Survey } from '../../../service/api.types';

import FreeText from './free_text';
import MultipleChoice from './multiple_choice';
import RatingScale from './rating_scale';
import SingleChoice from './single_choice';

type CardSelectorProps = {
  onSetNewAnswer: (answer: string | string[], id: number) => void;
  item: Survey,
  onMoveNext?: () => void;
};

const CARDS_TO_RENDER: Record<QuestionType, any> = {
  "single_choice": SingleChoice,
  "multiple_choice": MultipleChoice,
  "rating_scale": RatingScale,
  "freetext": FreeText
};

function CardSelector(props: CardSelectorProps) {
  const {item, onMoveNext, onSetNewAnswer} = props;
  if (!item) return null;
  const CardToRender = CARDS_TO_RENDER[item.type];
  return <CardToRender {...item} onMoveNext={onMoveNext} onSetNewAnswer={onSetNewAnswer}/>
}

export default CardSelector;


