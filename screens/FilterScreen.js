import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet, Dimensions, Platform, Text, Switch } from "react-native";
import { useSelector, useDispatch } from "react-redux"
import { toggleFilter } from "../store/actions/tour"
import Colors from "../constants/Colors"
import CustomButton from "../components/CustomButton"

function FilterSwitch(props) {
    return (
        <View style={styles.filterContainer}>
            <Text >{props.label}</Text>
            <Switch
                value={props.state}
                onValueChange={props.onChange}
                trackColor={{ true: Colors.primaryColor }}
                thumbColor={Platform.OS === " android" ? Colors.primaryColor : ""}
            />
        </View>
    )
}


const CityScreen = (props) => {

    const dispatch = useDispatch()

    const [isNatural, setIsNatural] = useState(false);
    const [isCultural, setIsCultural] = useState(false);
    const [isPhotography, setIsPhotography] = useState(false);
    const [isNightlife, setIsNightlife] = useState(false);

    const { navigation } = props

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            natural: isNatural,
            cultural: isCultural,
            photography: isPhotography,
            night: isNightlife
        }
        dispatch(toggleFilter(appliedFilters))
        navigation.navigate("City")
    }, [isNatural, isCultural, isPhotography, isNightlife])

    useEffect(() => {
        navigation.setParams({
            save: saveFilters
        })
    }, [saveFilters])


    return (
        <View style={styles.screen}>
            <Text style={styles.title}> Available Filters / Restrictions</Text>
            <FilterSwitch
                label="Doğa Gezintisi"
                state={isNatural}
                onChange={newValue => setIsNatural(newValue)}
            />
            <FilterSwitch
                label="Kültür Gezintisi"
                state={isCultural}
                onChange={newValue => setIsCultural(newValue)}
            />
            <FilterSwitch
                label="Fotoğraf Gezintisi"
                state={isPhotography}
                onChange={newValue => setIsPhotography(newValue)}
            />
            <FilterSwitch
                label="Gece Hayatı"
                state={isNightlife}
                onChange={newValue => setIsNightlife(newValue)}
            />

            <CustomButton title="Filtrele" onSelect={navigation.getParam("save")} />

        </View>



    )
}

const styles = StyleSheet.create({
    screen: {
       paddingHorizontal:Dimensions.get("window").width *0.05
    },
    filterContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width:"100%",
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 15,
        marginVertical: 10
    },
    title: {
        fontFamily: "open-sans-bold",
        fontSize: 20,
        margin: 20,
        textAlign: "center"
    },
})

export default CityScreen;