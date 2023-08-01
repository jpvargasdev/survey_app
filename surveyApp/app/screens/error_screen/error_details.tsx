import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../../components/base/Button';
import Text from '../../components/base/Text';
import CustomTheme from '../../theme/colors';

export interface ErrorDetailsProps {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  onReset(): void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  resetButton: {
    padding: 8,
    backgroundColor: CustomTheme.colors.error,
    borderRadius: 4,
  },
  resetButtonText: {
    fontSize: 18,
    color: CustomTheme.colors.white,
  }
});

function ErrorDetails({
  error,
  errorInfo,
  onReset,
}: ErrorDetailsProps) {

  React.useEffect(() => {
    console.error(error?.message);
    console.error(errorInfo?.componentStack)
  }, []);

  return (
    <View style={styles.container}>
      <Text text='errorScreen.title' style={styles.title}/>
      <Button
        text='errorScreen.reset'
        buttonProps={{
          onPress: onReset,
          style: styles.resetButton
        }}
        textProps={{
          style: styles.resetButtonText
        }}
      />
    </View>
  );
}

export default ErrorDetails;
