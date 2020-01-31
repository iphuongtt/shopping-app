import React, {useReducer, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

import {TextInputProps} from '../../interfaces';

interface Props extends TextInputProps {
  initialValue: string;
  label: string;
  initialIsValid: boolean;
  errorMessage?: string;
  min?: number;
  required?: boolean;
  email?: boolean;
  max?: number;
  minLength?: number;
  onInputChange: Function;
  id: string;
}

interface InputState {
  value: string;
  isValid: boolean;
  touched: boolean;
}
const INPUT_UPDATE = 'INPUT_UPDATE';
const INPUT_BLUR = 'INPUT_BLUR';
interface UpdateAction {
  value: string;
  type: typeof INPUT_UPDATE;
  isValid: boolean;
}

interface BlurAction {
  type: typeof INPUT_BLUR;
}

const inputReducer = (state: InputState, action: UpdateAction | BlurAction) => {
  switch (action.type) {
    case INPUT_UPDATE: {
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    }
    case INPUT_BLUR: {
      return {
        ...state,
        touched: true,
      };
    }
    default:
      return state;
  }
};

export const Input = (props: Props) => {
  const {onInputChange, id} = props;
  const [state, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initialIsValid,
    touched: false,
  });
  const textChangeHandler = (text: string) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({type: INPUT_UPDATE, value: text, isValid});
  };

  const lostFocusHandler = () => {
    dispatch({type: INPUT_BLUR});
  };

  useEffect(() => {
    if (state.touched) {
      onInputChange(id, state.value, state.isValid);
    }
  }, [state, onInputChange, id]);
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={state.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      />
      {!state.isValid && state.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
  },
  label: {
    fontFamily: 'OpenSans-Bold',
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
  },
});

export default Input;
