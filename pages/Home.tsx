import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function Home() {
  const nav=useNavigation();
  return (
<SafeAreaView>
  <View style={styles.mainView}>
    <TouchableOpacity onPress={()=>nav.navigate('Store')}style={styles.clickableArea}>
     <Text>Store</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>nav.navigate('About')}style={styles.clickableArea}>
      <Text>About</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>nav.navigate('Cart')}style={styles.clickableArea}>
      <Text>Cart</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>nav.navigate('Profile')}style={styles.clickableArea}>
      <Text>Profile</Text>
    </TouchableOpacity>
  </View>
</SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainView: {
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'space-around',
      height: '100%',
  },
  clickableArea:{
      borderRadius:50,
      padding: 10,
      backgroundColor:'#FFC0CB'
  }
})