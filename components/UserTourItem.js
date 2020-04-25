import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Dimensions
} from 'react-native';

import DefaultTitle from "../components/DefaultTitle"
import Colors from '../constants/Colors';


const UserTourItem = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <View style={styles.details}>
              <DefaultTitle numberOfLines={2} style={styles.title}>{props.title}</DefaultTitle>
              <DefaultTitle numberOfLines={1} style={{...styles.title, color:Colors.accentColor}}>{props.city}</DefaultTitle>
              <Text style={styles.price}>₺{props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
              {props.children}
            </View>
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    height: Dimensions.get("window").height * 0.4,
    marginVertical: Dimensions.get("window").height * 0.02,
    marginHorizontal: Dimensions.get("window").height * 0.015,    
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white'
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  details: {
    alignItems: 'center',
    height: '17%',
    paddingVertical: Dimensions.get("window").height * 0.015,
    paddingHorizontal: Dimensions.get("window").height * 0.035,
  },
  title: {
    marginVertical: 2
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: 'grey'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: Dimensions.get("window").height * 0.035,  
  }
});

export default UserTourItem;
