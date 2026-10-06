import { RootStackParamLis } from '@/app'
import { NativeStackScreenProps } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'

type Props = NativeStackScreenProps<RootStackParamLis, 'List'>

type dlXe = {
  id: number
  title: string
  price: number
  genre: string
  poster: string
}

export default function ListScrene({ navigation }: Props) {
  const [dsXe, setDsXe] = useState<dlXe[]>([])

  useEffect(() => {
    const layDL = async () => {
      try {
        const resp = await fetch("https://6ab224c45b9b60f39d345cdd.mockapi.io/bicyclestore")
        const data = await resp.json()
        setDsXe(data)
      } catch (err) {
        console.error("Loi fetch data: ", err)
      }
    }
    layDL()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>The world's Best Bike</Text>

      <View style={styles.filterContainer}>
        <Pressable style={[styles.filterBtn, styles.filterBtnActive]}>
          <Text style={styles.filterTextActive}>All</Text>
        </Pressable>
        <Pressable style={styles.filterBtn}>
          <Text style={styles.filterText}>Roadbike</Text>
        </Pressable>
        <Pressable style={styles.filterBtn}>
          <Text style={styles.filterText}>Mountain</Text>
        </Pressable>
      </View>

      <FlatList
        data={dsXe}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable 
            style={styles.card} 
            onPress={() => navigation.navigate("Detail", { id: String(item.id) })}
          >
            <Text style={styles.heartIcon}>♡</Text>
            <Image source={{ uri: item.poster }} style={styles.cardImage} resizeMode="contain" />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardPrice}>$ {item.price}</Text>
          </Pressable>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E53935',
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  filterBtnActive: {
    borderColor: '#E53935',
    backgroundColor: '#fff',
  },
  filterText: {
    color: '#888',
    fontSize: 14,
  },
  filterTextActive: {
    color: '#E53935',
    fontWeight: 'bold',
    fontSize: 14,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: '#FDF5E6',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 18,
    color: '#ccc',
  },
  cardImage: {
    width: 120,
    height: 80,
    marginVertical: 10,
  },
  cardTitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardPrice: {
    fontSize: 16,
    color: '#E5A03A',
    fontWeight: 'bold',
  }
})