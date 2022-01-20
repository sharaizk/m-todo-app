import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'

const TextButton =({hint, navigate})=>{
    //         onPress={()=>navigation.push('SignUp')}
    return(
        <TouchableOpacity style={styles.toSignUp} onPress={navigate}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            letterSpacing: 0.56,
            color: "#7E7E7E",
          }}
        >
          {hint}
        </Text>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    toSignUp: {
        marginVertical: 20,

      }
})

export default TextButton