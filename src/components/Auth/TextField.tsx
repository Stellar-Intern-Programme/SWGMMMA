import React, {FC} from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';

interface TextFieldProps {
  name: string;
  value: string;
  setField: (name: string, newValue: string) => void;
  placeholder: string;
  customStyles?: any;
  label?: string;
  error?: string;
  loading?: boolean;
  keyboardType?: 'numeric';
}

const TextField: FC<TextFieldProps> = ({
  name,
  value,
  setField,
  placeholder,
  customStyles = {},
  label = '',
  error = '',
  loading = false,
  keyboardType,
}) => {
  const onChangeText = (newValue: string) => {
    setField(name, newValue);
  };
  return (
    <View
      style={{
        flexDirection: 'column',
        flexWrap: 'nowrap',
        marginTop: 20,
        ...customStyles,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.error}>
          {error.length && !loading ? `(${error})` : ''}
        </Text>
      </View>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={newValue => onChangeText(newValue)}
        placeholder={placeholder}
        placeholderTextColor={'#BEBDBD'}
        secureTextEntry={name === 'password'}
        editable
        keyboardType={keyboardType ? keyboardType : 'default'}
      />
    </View>
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
    paddingLeft: 10,
    color: 'white',
  },
  label: {
    fontSize: 12,
    fontFamily: 'Inter',
    color: 'white',
    textTransform: 'uppercase',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
    fontFamily: 'Inter',
    marginLeft: 5,
  },
});
