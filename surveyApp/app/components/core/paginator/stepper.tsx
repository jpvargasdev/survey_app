import * as React from 'react';
import {View, StyleSheet, LayoutChangeEvent, Animated} from 'react-native';
import CustomTheme from '../../../theme/colors';

const styles = StyleSheet.create({
  container: {
    height: 4,
    flex: 1,
    marginHorizontal: 20,
    backgroundColor: CustomTheme.colors.stroke,
    borderRadius: 6,
  },
  fill: {
    height: 4,
    borderRadius: 6,
    backgroundColor: CustomTheme.colors.slateBlue,
  },
});

type StepperProps = {
  steps: number;
  currentStep: number;
};

function Stepper({steps, currentStep}: StepperProps) {
  const [stepWidth, setStepWidth] = React.useState(0);
  const barWidth = React.useRef(new Animated.Value(0)).current;

  const onStepperRender = React.useCallback(
    (layoutEvent: LayoutChangeEvent) => {
      const newStepWidth = layoutEvent.nativeEvent.layout.width / steps;
      setStepWidth(newStepWidth);
    },
    [steps],
  );

  React.useEffect(() => {
    const nextValue = (currentStep + 1) * stepWidth;
    Animated.spring(barWidth, {
      toValue: nextValue,
      friction: 5,
      useNativeDriver: false,
    }).start();
  }, [barWidth, currentStep, stepWidth]);

  return (
    <View style={styles.container} onLayout={onStepperRender}>
      <Animated.View
        style={[
          styles.fill,
          {
            width: barWidth,
          },
        ]}
      />
    </View>
  );
}

export default React.memo(Stepper);
