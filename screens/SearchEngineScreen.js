import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, FlatList, Text, Dimensions, TextInput, ActivityIndicator, TouchableOpacity } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import * as tourActions from "../store/actions/tour"
import { Ionicons } from "@expo/vector-icons"
import Colors from "../constants/Colors"


const data = [{ id: "1", name: "as" }, { id: "2", name: "as" }, { id: "3", name: "as" },]
const SearchEngineScreen = props => {


  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState()
  const [data, setData] = useState([])

  const availableCity = useSelector(state => state.tours.city)

  const dispatch = useDispatch()

  const loadCity = useCallback(async () => {
    try {
      await dispatch(tourActions.setCity())
    } catch (err) {
      throw err
    }
  }, [dispatch])


  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadCity)

    return () => {
      willFocusSub.remove()

    }
  }, [loadCity])

  useEffect(() => {
    setIsLoading(true)
    loadCity().then(() => {
      setData(availableCity)
      setIsLoading(false)
      console.log(data)
    })
  }, [dispatch, loadCity])



  const renderItem = (itemData) => {
    return <View style={styles.screen}>
      <TouchableOpacity onPress={() => {
        props.navigation.navigate("City", {
          provinceId: itemData.item.cityId,
          cityHeader: itemData.item.cityLabel
        })
      }}>
        <Text style={styles.text}>{itemData.item.cityLabel}</Text>
      </TouchableOpacity>
    </View>
  }

  const searchCity = value => {
    const filteredCity = availableCity.filter(city => {

      let lowerCaseCity = city.cityLabel.toLowerCase()

      let searchTermLower = value.toLowerCase()

      return lowerCaseCity.indexOf(searchTermLower) > -1

    })
    setData(filteredCity)
    console.log(value)
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.detailbgColor} />
      </View>
    )
  }

  return (
    <View>
        <View style={styles.border}>
          <View style={styles.container}>
            <View style={styles.row}>
              <View style={styles.icon}>
                <Ionicons name="ios-search" size={25} />
              </View>
              <View style={{ width: Dimensions.get("window").width * 0.9 }}>
                <TextInput
                  autoCapitalize="words"
                  placeholder="Search"
                  onChangeText={(value) => { searchCity(value) }}
                />
              </View>
            </View>
          </View>
        </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item => { item })}
        initialNumToRender={5}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    minHeight: Dimensions.get("window").width * 0.1,
    marginVertical:Dimensions.get("window").height * 0.02,
    padding: Dimensions.get("window").height * 0.01,
    marginHorizontal: Dimensions.get("window").width * 0.03,
    borderBottomWidth:1,
  },
  border: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: Dimensions.get("window").height * 0.07,
    marginHorizontal: Dimensions.get("window").width * 0.03,
    overflow: "hidden"
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.75,
    height: Dimensions.get("window").height * 0.05,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: Dimensions.get("window").width * 0.65
  },
  icon: {
    marginHorizontal: Dimensions.get("window").width * 0.025,
  },
  button: {
    marginVertical: Dimensions.get("window").height * 0.04,
    marginHorizontal: Dimensions.get("window").width * 0.03,
  },
  text: {
    fontFamily: "open-sans-bold",
    fontSize: 20
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
})

export default SearchEngineScreen


