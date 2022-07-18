import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';

interface ButtonProps {
  text: string;
  onPress: (e?: any) => void;
  customStyles?: any;
}

const Button: FC<ButtonProps> = ({text, onPress, customStyles = {}}) => {
  return (
    <View style={customStyles}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: 340,
    paddingVertical: 20,
    backgroundColor: '#1A73E8',
    borderRadius: 7,
    marginTop: 40,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: 'white',
  },
});
