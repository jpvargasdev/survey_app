import * as React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  BackHandler,
  ScrollView,
} from 'react-native';

import Header from './header';

const {width: screenWidth} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  childrenContainer: {
    width: screenWidth,
  },
});

type Props = {
  children?: React.ReactNode;
  showStepper?: boolean;
  ref?: React.Ref<React.ReactNode>;
  surfaceInFocus?: (index: number) => void;
};

export type PaginatorRef = {
  onMoveNext: () => void;
  onMovePrevious: () => void;
};

const Paginator: React.FC<Props> = React.forwardRef(
  ({children, showStepper, surfaceInFocus}, ref) => {
    const [currentScreen, setCurrentScreen] = React.useState(0);
    const childrenCount = React.Children.count(children);
    const scrollRef = React.useRef<ScrollView>(null);

    const shouldShowBackButton = childrenCount > 1 && currentScreen !== 0;

    const onMoveNext = React.useCallback(() => {
      const nScreen = currentScreen + 1;

      if (nScreen >= childrenCount) {
        return;
      }

      setCurrentScreen(nScreen);

      scrollRef.current?.scrollTo({
        animated: true,
        y: 0,
        x: screenWidth * nScreen,
      });

      surfaceInFocus && surfaceInFocus(nScreen);
    }, [childrenCount, currentScreen, surfaceInFocus]);

    const onMovePrevious = React.useCallback(() => {
      const nScreen = currentScreen - 1;
      setCurrentScreen(nScreen);

      scrollRef.current?.scrollTo({
        animated: true,
        y: 0,
        x: screenWidth * nScreen,
      });

      surfaceInFocus && surfaceInFocus(nScreen);
    }, [currentScreen, surfaceInFocus]);

    React.useImperativeHandle(ref, () => ({
      onMoveNext,
      onMovePrevious,
    }));

    // Handle back button on Android devices
    React.useEffect(() => {
      const backAction = () => {
        if (currentScreen !== 0) {
          onMovePrevious();
        }
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }, [currentScreen, onMovePrevious]);

    const childrens = React.Children.map(children, child => {
      let element = child;

      if (React.isValidElement(child)) {
        const extraProps = {
          onMoveNext: child.props.onMoveNext ?? onMoveNext,
        };
        element = React.cloneElement(child, extraProps);
      }

      return <View style={styles.childrenContainer}>{element}</View>;
    });

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.contentContainer}>
          <Header
            onMovePrevious={onMovePrevious}
            shouldShowBackButton={shouldShowBackButton}
            showStepper={showStepper}
            steps={childrenCount}
            currentStep={currentScreen}
          />
          <ScrollView
            horizontal
            pagingEnabled
            keyboardShouldPersistTaps="handled"
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
            ref={scrollRef}>
            {childrens}
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  },
);

export default React.memo(Paginator);
