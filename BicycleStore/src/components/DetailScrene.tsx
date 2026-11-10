import { RootStackParamLis } from '@/app'
import { NativeStackScreenProps } from 'expo-router'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from 'react-native'

type Props = NativeStackScreenProps<RootStackParamLis, 'Detail'>

type dlXe = {
  id: number
  title: string
  price: number
  poster: string
}

export default function DetailScrene({ route, navigation }: Props) {
  const { id } = route.params
  const [product, setProduct] = useState<dlXe | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getDetail = async () => {
      try {
        const resp = await fetch(`https://6ab224c45b9b60f39d345cdd.mockapi.io/bycyclestore/${id}`)
        const data = await resp.json()
        setProduct(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    getDetail()
  }, [id])

  if (loading) return <ActivityIndicator size="large" color="#E53935" style={{ flex: 1, marginTop: 100 }} />
  if (!product) return <Text style={{ textAlign: 'center', marginTop: 50 }}>Không tìm thấy sản phẩm</Text>

  return (
    <View style={styles.container}>
      {/* Nút Back bằng Text */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={{ padding: 15 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>←</Text>
        </Pressable>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>List</Text>
      </View>

      {/* Vùng Ảnh */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.poster }} style={styles.image} resizeMode="contain" />
      </View>

      {/* Vùng Nội dung */}
      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>
        
        <View style={styles.priceRow}>
          <Text style={styles.discountText}>15% OFF | 350$</Text>
          <Text style={styles.price}>{product.price}$</Text>
        </View>

        <Text style={styles.descTitle}>Description</Text>
        <Text style={styles.description}>
          It is a very important form of writing as we write almost everything in paragraphs, be it an answer, essay, story, emails, etc.
        </Text>
      </View>

      {/* Thanh Button dưới cùng */}
      <View style={styles.bottomBar}>
        {/* Dùng Text thay cho Icon Tim */}
        <Text style={{ fontSize: 28 }}>♡</Text>
        
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Add to card</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40, // Bù trừ cho thanh trạng thái (tai thỏ)
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  imageContainer: {
    backgroundColor: '#FCE4EC',
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { width: '90%', height: '90%' },
  content: { padding: 20, flex: 1 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
  priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  discountText: { fontSize: 16, color: '#888' },
  price: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  descTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 16, color: '#666', lineHeight: 24 },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  button: {
    backgroundColor: '#E53935',
    paddingVertical: 15,
    borderRadius: 30,
    width: '75%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
})