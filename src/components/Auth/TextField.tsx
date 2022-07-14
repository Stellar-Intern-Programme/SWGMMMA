import React, {FC} from 'react';
import {StyleSheet, TextInput} from 'react-native';

interface TextFieldProps {
  name: string;
  value: string;
  setField: (name: string, newValue: string) => void;
  placeholder: string;
}

const TextField: FC<TextFieldProps> = ({
  name,
  value,
  setField,
  placeholder,
}) => {
  const onChangeText = (newValue: string) => {
    setField(name, newValue);
  };

  return (
    <>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={newValue => onChangeText(newValue)}
        placeholder={placeholder}
        placeholderTextColor={'#BEBDBD'}
        editable
      />
    </>
  );
};

export default TextField;

const styles = StyleSheet.create({
  input: {
    width: 340,
    borderRadius: 7,
    backgroundColor: '#727272',
    fontSize: 20,
    height: 55,
    marginTop: 20,
    paddingLeft: 10,
  },
});
