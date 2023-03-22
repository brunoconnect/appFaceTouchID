import { Alert, Text, TouchableHighlight, View } from "react-native";
import {useState, useEffect} from 'react'
import TouchId from 'react-native-touch-id'

// Video para ajuda: https://www.youtube.com/watch?v=lpz0PSf2yhE

export default function App() {
  /*
    Como você não deu um tipo a isso, o typescript deve tentar inferi-lo. 
    Ele vê que você passou em um nulo, então assume que esse estado é (e sempre será) nulo. 
    Em vez disso, você precisa especificar o tipo, como em: <boolean | null>
  */
  const [supported, setSuported] = useState<boolean | null>(null)
  const [nome, setNome] = useState('Anonimo')

  useEffect(() => {
    TouchId.isSupported()
    .then(sucesso => {
      setSuported(true);
      console.log('TOUCH ID: ' + sucesso)
    })
    .catch(err => {
      console.log('ERRO TOUCH: ' + err)
      Alert.alert('TouchID não suportado ou não habilitado.')
    })
  },[])
  function handleLogin(){
    // Alert.alert('Olá')
    const configs = {
      title: 'Autenticação Touch ID',
      color: '#FF0000',
      sensorErrorDescription: 'Touch ID inválido.'
    }
    TouchId.authenticate("Login apps connect df", configs)
    .then( (sucesso: any) => {
      console.log('Seja bem vindo!')
      setNome('Bruno Staine')
    })
    .catch((err: any) => {
      console.log(err)
    })
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableHighlight onPress={handleLogin} style={{backgroundColor: '#0391d7', padding: 15}}>
        <Text style={{color: '#FFF'}}>Entrar</Text>
      </TouchableHighlight>
      <Text style={{ fontSize: 30, }}>Face ID: {nome}</Text>
    </View>
  )
}