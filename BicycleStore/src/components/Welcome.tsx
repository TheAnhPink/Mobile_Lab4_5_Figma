import { RootStackParamLis } from '@/app'
import { NativeStackScreenProps } from 'expo-router'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

type Props = NativeStackScreenProps<RootStackParamLis, 'Home'>

function Welcome({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        A premium online store for sporter and their stylish choice
      </Text>

      <View style={styles.imageContainer}>
        <Image 
          source={require("@/assets/images/image.png")} 
          style={styles.image} 
          resizeMode="contain" 
        />
      </View>

      <Text style={styles.title}>POWER BIKE{'\n'}SHOP</Text>

      <Pressable 
        style={styles.button} 
        onPress={() => navigation.navigate('List')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
    fontFamily: 'monospace',
  },
  imageContainer: {
    backgroundColor: '#FCE4EC',
    borderRadius: 30,
    padding: 20,
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#E53935',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
})

export default Welcome