import React, { FC, useEffect, useState } from 'react';
import { StyleProp, TextInputProps } from 'react-native';
import { NativeViewGestureHandlerProperties, TextInput as RNTextInput } from 'react-native-gesture-handler';

// https://stackoverflow.com/a/59875773 and https://github.com/react-navigation/react-navigation/issues/6201#issuecomment-651612104
export const TextInput: FC<NativeViewGestureHandlerProperties & TextInputProps> = ({ style, editable, ...props }) => {
  const styles: StyleProp<any> = style ? (Array.isArray(style) ? style : [style]) : [];
  const [editableState, setEditableState] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setEditableState(editable !== undefined ? editable : true);
    }, 50);
  }, []);

  return <RNTextInput {...props} editable={editableState} style={styles} />;
};
