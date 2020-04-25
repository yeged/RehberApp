import React from 'react';
import { FlatList, Button, Platform, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import UserTourItem from "../components/UserTourItem"
import Colors from "../constants/Colors";
import * as tourActions from "../store/actions/tour"

const MyToursScreen = props => {
  const userTours = useSelector(state => state.tours.userTour);
  const dispatch = useDispatch();

  const editProductHandler = id => {
    props.navigation.navigate('EditTour', { tid: id });
  };

  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(tourActions.deleteTour(id));
        }
      }
    ]);
  };

  return (
    <FlatList
      data={userTours}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <UserTourItem
          image={itemData.item.Image}
          title={itemData.item.tourName}
          price={+itemData.item.price}
          city={itemData.item.city}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <Button
            color={Colors.detailbgColor}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.detailbgColor}
            title="Delete"
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </UserTourItem>
      )}
    />
  );
};

export default MyToursScreen;