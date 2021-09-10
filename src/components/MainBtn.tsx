import React, {  } from 'react';
import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styles from '../assets/css/styles';

interface IMainBtn extends TouchableOpacityProps {
  text: string,

}

export default function MainBtn({text, ...rest}:IMainBtn) {
    return (
      <TouchableOpacity {...rest}>
        <View style={[styles.bgColorBlue, styles.br30, styles.p20, styles.mt10]}>
          <Text
            style={[
              styles.colorWhite,
              styles.ffm,
              styles.fs16,
              { alignSelf: 'center' },
            ]}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>

    );

}
