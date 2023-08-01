import React, { useCallback } from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import Survey from '../templates/survey';
import {api} from '../service';
import { SurveyResponse } from '../service/api.types';
import CustomTheme from '../theme/colors';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [reset, setReset] = React.useState<boolean>(false);
  const [data, setData] = React.useState<SurveyResponse | undefined>();

  React.useEffect(() => {
    async function getSurveyQuestions() {
      setReset(false);
      const {data} = await api.getSurveyQuestions();
      setData(data);
    }
    getSurveyQuestions();
  }, [reset]);

  const onReset = () => {
    setData(undefined);
    setReset(true);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: CustomTheme.colors.background}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {data && (
        <Survey data={data} onReset={onReset}/>
      )}
    </SafeAreaView>
  );
}

export default App;
