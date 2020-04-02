import React from "react";
import { View, StyleSheet, Dimensions, ScrollView} from "react-native";

import SearchEngine from "../components/SearchEngine"
import DefaultTitle from "../components/DefaultTitle"
import CategoryList from "../components/CategoryList"
import CityList from "../components/CityList"


const SearchScreen = (props) => {
    return (
        <View style={styles.screen}>
        <ScrollView>
            <View style={styles.nameContainer}>
                <DefaultTitle style={styles.name}>Uygulamanın İsmi</DefaultTitle>
            </View>
            <View style={styles.headerContainer}>
                <DefaultTitle style={styles.title}>Şehrin Rehberlerinden Benzersiz Etkinlikler</DefaultTitle>
            </View>
            <View style={styles.categoryContainer}>
                <ScrollView horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    snapToInterval={Dimensions.get("window").width * 0.93}>
                    <CategoryList navigation={props.navigation} title="Doğa Gezintisi" text="Size aileden biri gibi davranan rehberlerle doğa gezintisinin keyfini çıkartın." img="https://i4.hurimg.com/i/hurriyet/75/750x0/5da995ee2269a21f783e80c8"/>
                    <CategoryList navigation={props.navigation} title="Sanat, Kültür ve Tarih" img="https://cdn2.enuygun.com/media/lib/825x620/uploads/image/efes-17431.jpeg"/>
                    <CategoryList navigation={props.navigation} title="Fotoğraf Gezintisi" img="https://lh3.googleusercontent.com/proxy/b1W0tQqqDbDDuRX7FAU5jjhs9F_OjWug8VGacBFV6sllI7_EHVy5vVJFN838ctu_CVKHamztAP4ovSJ9GWm7v114XVi60sJgsLpgcXUDe_VnSJwQCI9oIAcDViaxR7N_X2Ycyr15gZECXqo148RiNuVFQCVW5_PlKCMBSCw9"/>
                    <CategoryList navigation={props.navigation} title="Gece Hayatı" img="https://neredekalinir.com/wp-content/uploads/2017/07/kiev.jpg"/>
                </ScrollView>
            </View>
            <View style={styles.headerContainer}>
                <DefaultTitle style={styles.title}>Başka Şehirlerdeki Rehberler</DefaultTitle>
                </View>
            <View style={styles.needSomePaddingforBottom}>
            <ScrollView horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    snapToInterval={Dimensions.get("window").width * 0.434}>
                <CityList city="Ankara" img="https://www.buseterim.com.tr/upload/default/2019/11/9/30agustostrkiye680.jpg"  navigation={props.navigation} />
                <CityList city="istanbul" img="https://www.buseterim.com.tr/upload/default/2019/11/9/30agustostrkiye680.jpg" navigation={props.navigation} />
                <CityList city="eskişehir" img="https://www.buseterim.com.tr/upload/default/2019/11/9/30agustostrkiye680.jpg" navigation={props.navigation} />
                <CityList city="bursa" img="https://www.buseterim.com.tr/upload/default/2019/11/9/30agustostrkiye680.jpg" navigation={props.navigation} />
                <CityList city="izmir" img="https://www.buseterim.com.tr/upload/default/2019/11/9/30agustostrkiye680.jpg" navigation={props.navigation} />
                <CityList city="rize" img="https://www.buseterim.com.tr/upload/default/2019/11/9/30agustostrkiye680.jpg" navigation={props.navigation} />
                </ScrollView>
                </View>
            </ScrollView>
        </View>
    )
}

SearchScreen.navigationOptions=(navData) => {
    return{
        headerTitle: () => <SearchEngine style={styles.search} navigation={navData.navigation} />
    }
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#f5f5f5"
    },
    search:{
        marginHorizontal: Dimensions.get("window").width * 0.005,
    },  
    categoryContainer:{
        paddingHorizontal: Dimensions.get("window").width * 0.01,
        paddingVertical:Dimensions.get("window").height * 0.035
    },
    headerContainer: {
        alignItems: "center",
        padding: Dimensions.get("window").width * 0.04
    },
    title: {
        fontSize: Dimensions.get("window").width * 0.085
    },
    nameContainer:{
        padding: Dimensions.get("window").width * 0.04,
        marginTop: Dimensions.get("window").height * 0.04
    },
    name:{
        color: "grey"
    },
    needSomePaddingforBottom:{
        paddingHorizontal: Dimensions.get("window").width * 0.01,
        paddingBottom: Dimensions.get("window").height * 0.1
    }
})

export default SearchScreen;