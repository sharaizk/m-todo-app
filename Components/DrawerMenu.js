import React from 'react'
import { StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native';
const HeaderMenu = ({navigation}) =>{

    const MenuPress = () =>{
        navigation.openDrawer()
    }
    return(
        <TouchableOpacity onPress={MenuPress}>
            <Feather name="menu" color="white" style={styles.menuIcon}/>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    menuIcon:{
        fontSize: 35,
        paddingTop:9
    }
})
export default HeaderMenu