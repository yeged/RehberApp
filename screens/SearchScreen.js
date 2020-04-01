import React from "react";
import { View, StyleSheet, Dimensions, ScrollView} from "react-native";

import SearchEngine from "../components/SearchEngine"
import DefaultTitle from "../components/DefaultTitle"
import CategoryList from "../components/CategoryList"


const SearchScreen = (props) => {
    return (
        <View style={styles.screen}>
            <SearchEngine />
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
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    categoryContainer:{
        paddingHorizontal: Dimensions.get("window").width * 0.01,
    },
    headerContainer: {
        alignItems: "center",
        padding: Dimensions.get("window").width * 0.03
    },
    title: {
        fontSize: Dimensions.get("window").width * 0.09
    }
})

export default SearchScreen;