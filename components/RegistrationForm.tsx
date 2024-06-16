import { StyleSheet, Text, View } from 'react-native'
import {useState} from 'react'

export default function RegistrationForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  return (
    <View>
      <Text>RegistrationForm</Text>
    </View>
  )
}

const styles = StyleSheet.create({})