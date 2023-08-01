export interface SurveyResponse {
  response: Array<MultipleChoice | SingleChoice | RatingScale | FreeText>
}

export type QuestionType = "single_choice" | "rating_scale" | "freetext" | "multiple_choice";

export interface Survey {
  id: number;
  type: QuestionType;
  question: string;
}

export interface MultipleChoice extends Survey {
  options: string[];
}

export interface SingleChoice extends Survey {
  options: string[];
}


export interface RatingScale extends Survey {
  min_text: string;
  min_value: number;
  max_text: string;
  max_value: number;
}

export interface FreeText extends Survey {}
