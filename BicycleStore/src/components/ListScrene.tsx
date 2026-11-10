import { RootStackParamLis } from '@/app'
import { NativeStackScreenProps } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'

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
  const [loading, setLoading] = useState(true)
  // 1. Thêm state để lưu trạng thái đang chọn nút nào
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const layDL = async () => {
      try {
        const resp = await fetch("https://6ab224c45b9b60f39d345cdd.mockapi.io/bycyclestore")
        const data = await resp.json()
        setDsXe(data)
      } catch (err) {
        console.error("Loi fetch data: ", err)
      } finally {
        setLoading(false)
      }
    }
    layDL()
  }, [])

  // 2. Logic lọc dữ liệu dựa vào state 'filter'
  const filteredData = filter === 'All' 
    ? dsXe 
    : dsXe.filter(item => item.genre === filter)

  if (loading) return <ActivityIndicator size="large" color="#E53935" style={{ flex: 1, marginTop: 100 }} />

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>The world's Best Bike</Text>

      <View style={styles.filterContainer}>
        {/* 3. Gắn sự kiện onPress và đổi màu nút đang được chọn */}
        <Pressable 
          style={[styles.filterBtn, filter === 'All' && styles.filterBtnActive]}
          onPress={() => setFilter('All')}
        >
          <Text style={filter === 'All' ? styles.filterTextActive : styles.filterText}>All</Text>
        </Pressable>
        
        <Pressable 
          style={[styles.filterBtn, filter === 'Roadbike' && styles.filterBtnActive]}
          onPress={() => setFilter('Roadbike')}
        >
          <Text style={filter === 'Roadbike' ? styles.filterTextActive : styles.filterText}>Roadbike</Text>
        </Pressable>
        
        <Pressable 
          style={[styles.filterBtn, filter === 'Mountain' && styles.filterBtnActive]}
          onPress={() => setFilter('Mountain')}
        >
          <Text style={filter === 'Mountain' ? styles.filterTextActive : styles.filterText}>Mountain</Text>
        </Pressable>
      </View>

      <FlatList
        data={filteredData} // 4. Truyền mảng đã lọc vào FlatList thay vì dsXe
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
            <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.cardPrice}>$ {item.price}</Text>
          </Pressable>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50, paddingHorizontal: 15 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#E53935', marginBottom: 20 },
  filterContainer: { flexDirection: 'row', marginBottom: 20, gap: 10 },
  filterBtn: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 8, borderWidth: 1, borderColor: '#ccc' },
  filterBtnActive: { borderColor: '#E53935', backgroundColor: '#fff' },
  filterText: { color: '#888', fontSize: 14 },
  filterTextActive: { color: '#E53935', fontWeight: 'bold', fontSize: 14 },
  row: { justifyContent: 'space-between' },
  card: {
    width: '48%', // Sửa thành 48% để thẻ không bị bè ra
    backgroundColor: '#FDF5E6',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heartIcon: { position: 'absolute', top: 10, left: 10, fontSize: 18, color: '#888' },
  cardImage: { width: '100%', height: 90, marginVertical: 10 },
  cardTitle: { fontSize: 14, color: '#666', fontWeight: 'bold', marginBottom: 5 },
  cardPrice: { fontSize: 16, color: '#E5A03A', fontWeight: 'bold' }
})