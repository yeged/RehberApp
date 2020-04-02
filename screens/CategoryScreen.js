import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import SearchEngine from "../components/SearchEngine"
import GuideList from "../components/GuideList";
import DefaultTitle from "../components/DefaultTitle"


const CategoryScreen = (props) => {
    return (
        <View style={styles.screen}>


            <ScrollView contentContainerStyle={styles.container}>
                <SearchEngine />
                <View style={styles.textContainer}>
                    <DefaultTitle style={styles.text}>Öne çıkan "Kültür" Gezintileri</DefaultTitle>
                </View>
                 <GuideList navigation={props.navigation} name="Galata Kulesi & Taksim Kültür Sanat ve Tarih Gezisi Tarih Gezisi Tarih Gezisi" time={4} price={250} target="Ankara" img="https://cdn1.ntv.com.tr/gorsel/VKEoxgDl5UyALbc91dZjKQ.jpg?width=1000&height=748&mode=crop&scale=both&v=20191015134847912" />
                <GuideList navigation={props.navigation} name="Galata Kulesi & Taksim Kültür Sanat ve Tarih Gezisi" time={4} price={250} target="Istanbul" img="https://gezilecekyerler.com/wp-content/uploads/2017/03/Galata-Kulesi.jpg" />
                <GuideList navigation={props.navigation} name="Galata Kulesi & Taksim Kültür Sanat ve Tarih Gezisi" time={4} price={250} target="Ankara" img="https://gezilecekyerler.com/wp-content/uploads/2017/03/Galata-Kulesi.jpg" />
                <GuideList navigation={props.navigation} name="Galata Kulesi & Taksim Kültür Sanat ve Tarih Gezisi" time={4} price={250} target="Eskişehir" img="https://gezilecekyerler.com/wp-content/uploads/2017/03/Galata-Kulesi.jpg" />

            </ScrollView>

        </View>
    )
}

CategoryScreen.navigationOptions = (navData) => {
    return{
        headerTitle: () => <DefaultTitle>"Kültür Gezintisi"</DefaultTitle>
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    textContainer:{
        paddingHorizontal: Dimensions.get("window").width * 0.05,
        paddingBottom: Dimensions.get("window").height * 0.07
    },
    text:{
        fontSize:20
    }
})

export default CategoryScreen;