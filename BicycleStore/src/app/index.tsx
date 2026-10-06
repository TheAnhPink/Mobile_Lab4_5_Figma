import DetailScrene from '@/components/DetailScrene'
import ListScrene from '@/components/ListScrene'
import Welcome from '@/components/Welcome'
import { createNativeStackNavigator } from 'expo-router/build/react-navigation/native-stack'

export type RootStackParamLis={
  Home: undefined
  List: undefined
  Detail: {
    id: string
  }
}

const Stack= createNativeStackNavigator<RootStackParamLis>()

const index = () => {
  return (
    <>
      <Stack.Navigator initialRouteName='Home'>

        <Stack.Screen name="Home" component={Welcome}/>
        <Stack.Screen name="List" component={ListScrene}/>
        <Stack.Screen name="Detail" component={DetailScrene}/>

      </Stack.Navigator>
    </>
  )
}

export default index