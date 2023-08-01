import React from 'react';
import {View, StyleSheet} from 'react-native';
import CustomTheme from '../../../theme/colors';
import Footer from './footer';
import Header from './header';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white', 
    flex: 1,
    marginBottom: 50,
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation:  2,
  }
});

type CardProps = {
  children: React.ReactNode,
  title: string,
  onMoveNext: () => void;
  canMoveNext: boolean;
};

const Card: React.FC<CardProps> = ({children, title, onMoveNext, canMoveNext = true}) => {
  return (
    <View style={styles.container}>
      <Header title={title}/>
      {children}
      <Footer onPress={onMoveNext} isEnabled={canMoveNext}/>
    </View>
  )
}

export default Card;

