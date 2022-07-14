import {Pressable, StyleSheet, Text} from 'react-native';
import React, {FC} from 'react';

interface ButtonProps {
  text: string;
  onPress: () => void;
}

const Button: FC<ButtonProps> = ({text, onPress}) => {
  return (
    <Pressable style={styles.signUpButton} onPress={onPress}>
      <Text style={styles.signUpText}>{text}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  signUpButton: {
    width: 340,
    paddingVertical: 20,
    backgroundColor: '#1A73E8',
    borderRadius: 7,
    marginTop: 40,
  },
  signUpText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: 'white',
  },
});
