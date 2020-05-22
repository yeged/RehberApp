import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Button, Alert, ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import UserTourItem from "../components/UserTourItem"
import Colors from "../constants/Colors";
import * as tourActions from "../store/actions/tour"
import DefaultTitle from "../components/DefaultTitle"


const MyToursScreen = props => {

  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState()

  const userTours = useSelector(state => state.tours.userTour);
  const dispatch = useDispatch();


  const loadTour = useCallback(async () => {
    setError(null)
    setIsRefreshing(true)
    try {
      await dispatch(tourActions.setTour())
    } catch (err) {
      setError(err.message)
    }
    setIsRefreshing(false)
  }, [dispatch, setError, setIsLoading])

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadTour)

    return () => {
      willFocusSub.remove()
    }
  }, [loadTour])


  useEffect(() => {
    setIsLoading(true)
    loadTour().then(() => {
      setIsLoading(false)
    })
  }, [dispatch, loadTour])

  const editProductHandler = id => {
    props.navigation.navigate('StartEdit', { tid: id });
  };

  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: async () => {
          setError(null)
          setIsLoading(true)
          try{
            await dispatch(tourActions.deleteTour(id));
          }catch(err){
            setError(err.message)
          }
          setIsLoading(false)
        }
      }
    ]);
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occured!</Text>
        <Button title="try again" onPress={loadTour} />
      </View>
    )
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.detailbgColor} />
      </View>
    )
  }

  // if (!isLoading && userTours.length === 0) {
  //   return (
  //     <View style={styles.centered}>
  //       <Text>No Tour Here </Text>
  //     </View>
  //   )
  // }

  return (
    <FlatList
      onRefresh={loadTour}
      refreshing={isRefreshing}
      data={userTours}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <UserTourItem
          image={itemData.item.tourImage}
          title={itemData.item.tourName}
          price={+itemData.item.price}
          city={itemData.item.city}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <Button
            color={Colors.detailbgColor}
            title="Düzenle"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.detailbgColor}
            title="Sil"
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </UserTourItem>
      )}
    />
  );
};

MyToursScreen.navigationOptions = (navData) => {
  return{
    headerTintColor: "white",
    headerTitle: () => <DefaultTitle style={{ fontSize: 22, color: "white" }}>Turlarım</DefaultTitle>,
    headerStyle: {
        backgroundColor: Colors.detailbgColor
    }
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})

export default MyToursScreen;