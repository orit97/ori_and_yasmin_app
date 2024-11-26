import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Dimensions, ActivityIndicator,TouchableWithoutFeedback,Modal,TextInput } from 'react-native';
import { fetchData } from '../api';
import Navbar from '../components/NavBar';
import { useLoading } from '../contexts/LoadingContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';



interface Product {
    id: number;
    name: string;
    shortDesc: string;
    longDesc?: string;
    imag: string; // Assuming this is a URL
    minQty: number;
    currQty: number;
    price: number;
    discount?: number;
    category: string;
    isLiked?: boolean;
    isAddedToCart?: boolean;
    isCartButtonGreen?: boolean;
}

type RootStackParamList = {
    Store: undefined;
    Product: { id: any }; // Define the Product route with `id` as parameter
  };
  type StoreScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Store'>;

  // const mockProducts: Product[] = [
  //   { id: 1, name: "Ocean", shortDesc: "water colors", longDesc: "", imag: require('../assets/Images/Ocean.jpg'), minQty: 1, currQty: 7, price: 150, discount: 15, category: "water colors" },
  //   { id: 2, name: "Pink storm", shortDesc: "oil colors", longDesc: "", imag: require('../assets/Images/pink.jpg'), minQty: 1, currQty: 10, price: 200,  category: "oil colors" },
  //   { id: 3, name: "Rainbow", shortDesc: "oil colors", longDesc: "", imag: require('../assets/Images/rainbow.jpg'), minQty: 1, currQty: 14, price: 180, discount: 10, category: "oil colors" },
  //   { id: 4, name: "Childhood", shortDesc: "water colors", longDesc: "", imag: require('../assets/Images/childhood.jpg'), minQty: 1, currQty: 6, price: 120, discount: 5, category: "water colors" },
  //   { id: 8, name: "Sad Storm", shortDesc: "oil colors", longDesc: "", imag: require('../assets/Images/obb.jpg'), minQty: 1, currQty: 4, price: 170, discount: 12, category: "abstract" },
  //   { id: 10, name: "Yellow Storm", shortDesc: "oil colors", longDesc: "", imag: require('../assets/Images/yellow.jpg'), minQty: 1, currQty: 3, price: 140, category: "abstract" },
  //   { id: 11, name: "Pain", shortDesc: "emotional art", longDesc: "", imag: require('../assets/Images/pain.jpg'), minQty: 1, currQty: 6, price: 190, discount: 18, category: "abstract" },
  //   { id: 12, name: "Mysterious Woman", shortDesc: "portrait", longDesc: "", imag: require('../assets/Images/women.jpg'), minQty: 1, currQty: 8, price: 210,  category: "portrait" },
  //   { id: 13, name: "Waves", shortDesc: "water colors", longDesc: "", imag: require('../assets/Images/waves.jpg'), minQty: 1, currQty: 5, price: 160, discount: 14, category: "water colors" },
  //   { id: 14, name: "Kitty Cat", shortDesc: "animal art", longDesc: "", imag: require('../assets/Images/cat.jpg'), minQty: 1, currQty: 3, price: 125, discount: 9, category: "animals" },
  //   { id: 15, name: "Love of Fox Mom", shortDesc: "animal art", longDesc: "", imag: require('../assets/Images/fox.jpg'), minQty: 1, currQty: 1, price: 200,  category: "animals" },
  //   { id: 16, name: "Blue Storm", shortDesc: "oil colors", longDesc: "", imag: require('../assets/Images/blue.jpg'), minQty: 1, currQty: 7, price: 180, discount: 15, category: "abstract" },
  //   { id: 17, name: "Forest", shortDesc:"oil colors", longDesc: "", imag: require('../assets/Images/trees.jpg'), minQty: 1, currQty: 4, price: 150,  category: "abstract" },
  //   { id: 18, name: "Lonly fish", shortDesc: "water colors", longDesc: "", imag: require('../assets/Images/fish.jpg'), minQty: 1, currQty: 8, price: 120,  category: "water colors" },
  // ];

const Store: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { loading, setLoading } = useLoading();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigation = useNavigation<StoreScreenNavigationProp>();
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState<string>('None');
  const [categoryModalVisible, setCategoryModalVisible] = useState<boolean>(false);
  const [sortModalVisible, setSortModalVisible] = useState<boolean>(false);

  useEffect(() => {
    fetchProducts();
    loadWishlist();
  }, []);
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetchData('/products');

                // Logging the raw response to understand its structure
                console.log('API Response:', response);

                // Assuming response has a "data" field containing products
                const productData = Array.isArray(response) ? response : response.data;

                // Validate product fields and add fallback for missing data
                const validatedProducts = productData.map((product: any, index: number) => ({
                    id: product.id ?? index,
                    name: product.name ?? 'Unnamed Product',
                    shortDesc: product.shortDesc ?? '',
                    longDesc: product.longDesc ?? '',
                    imag: product.imag ?? 'https://res.cloudinary.com/djy3q6qin/image/upload/v1727519265/samples/cloudinary-icon.png', // Fallback URL if imag is missing
                    minQty: product.minQty ?? 1,
                    currQty: product.currQty ?? 0,
                    price: product.price ?? 0,
                    discount: product.discount ?? 0,
                    category: product.category ?? 'General',
                }));

                setProducts(validatedProducts);
                setFilteredProducts(validatedProducts);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to load products.');
                setProducts(mockProducts);
                setFilteredProducts(mockProducts)
            } finally {
                setLoading(false);
            }
        };
        const loadWishlist = async () => {
            try {
              const storedWishlist = await AsyncStorage.getItem('wishlist');
              
              if (storedWishlist) {
                const parsedWishlist = JSON.parse(storedWishlist);
                setWishlist(JSON.parse(storedWishlist));
                setProducts((prevProducts) =>
                  prevProducts.map((product) => ({
                    ...product,
                    isLiked: parsedWishlist.includes(product.id),
                  }))
                );
              }
            } catch (err) {
              console.error('Error loading wishlist:', err);
            }
          };
          const toggleWishlist = async (productId: number) => {
            try {
              // Retrieve the stored wishlist
              const storedWishlist = await AsyncStorage.getItem('wishlist');
              const wishlist = storedWishlist ? JSON.parse(storedWishlist) : []; // Parse stored JSON or initialize empty array
          
              // Check if the product is already in the wishlist
              const existingIndex = wishlist.findIndex((id: number) => id === productId);
          
              if (existingIndex !== -1) {
                // If the product is already in the wishlist, remove it
                wishlist.splice(existingIndex, 1); // Remove the existing product ID
              } else {
                let item = products.find((p)=>p.id==productId)
                if(item)
                // Otherwise, add the product to the wishlist
                wishlist.push(item);
              }
          
              // Save the updated wishlist back to AsyncStorage
              await AsyncStorage.setItem('wishlist', JSON.stringify(wishlist));
              console.log('Wishlist updated:', wishlist);
          
              // Update the state to reflect changes
              setWishlist(wishlist);
          
              // Update the products' `isLiked` property
              setProducts((prevProducts) =>
                prevProducts.map((product) =>
                  wishlist.includes(product.id)
                    ? { ...product, isLiked: true }
                    : { ...product, isLiked: false }
                )
              );console.log(wishlist);
            } catch (error) {
              console.error('Failed to update wishlist:', error);
            }
          };
          
          
        
          const handleAddToCart = async (product: Product) => {
            try {
              const storedCart = await AsyncStorage.getItem('cart');
              const cart = storedCart ? JSON.parse(storedCart) : [];
          
              const existingProductIndex = cart.findIndex((item: Product) => item.id === product.id);
          
              if (existingProductIndex !== -1) {
                // אם המוצר כבר בעגלה, נוודא שלא נחרוג מהמלאי המקסימלי
                if (cart[existingProductIndex].currQty < product.currQty) {
                  cart[existingProductIndex].currQty += 1;
                } else {
                  alert('Cannot add more items than available in stock.');
                  return;
                }
              } else {
                // אם המוצר לא בעגלה, נוסיף אותו עם כמות התחלתית של 1
                if (product.currQty > 0) {
                  cart.push({ ...product, currQty: 1 });
                } else {
                  alert('המוצר אינו זמין במלאי.');
                  return;
                }
              }
          
              await AsyncStorage.setItem('cart', JSON.stringify(cart));
              console.log('Product added to cart:', cart);
          
              // Update the state to show "Added to Cart", change button color to green, and revert after 0.5 seconds
              setProducts(prevProducts =>
                prevProducts.map(p =>
                  p.id === product.id ? { ...p, isAddedToCart: true, isCartButtonGreen: true } : p
                )
              );
          
              setTimeout(() => {
                setProducts(prevProducts =>
                  prevProducts.map(p =>
                    p.id === product.id ? { ...p, isCartButtonGreen: false, isAddedToCart: false } : p
                  )
                );
              }, 500); // Change the background back after 0.5 seconds
          
            } catch (error) {
              console.error('Failed to add item to cart', error);
            }
          };

     // Generate dynamic categories
  const categories = ['All', ...Array.from(new Set(products.map((product) => product.category)))];

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setFilteredProducts(
      category === 'All' ? products : products.filter((product) => product.category === category)
    );
  };
    const handleSortSelect = (option: string) => {
    setSortOption(option);
    const sorted = [...filteredProducts].sort((a, b) => {
      const priceA = a.price * (1 - (a.discount ?? 0) / 100);
      const priceB = b.price * (1 - (b.discount ?? 0) / 100);
      if (option === 'Price: Low to High') return priceA - priceB;
      if (option === 'Price: High to Low') return priceB - priceA;
      return 0;
    });
    setFilteredProducts(sorted);
  };
  
  if (loading) {
      return (
          <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
          </View>
      );
  }

  if (error) {
      return (
          <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
          </View>
      );
  }
  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <TouchableOpacity onPress={() => navigation.navigate('Product', { item })}>
        <Image source={{ uri: item.imag }} style={styles.productImage} />
      </TouchableOpacity>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}₪</Text>
        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={() => toggleWishlist(item.id)} style={styles.heartIcon}>
            <Icon
              name="heart"
              size={24}
              color={item.isLiked ? 'red' : 'grey'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleAddToCart(item)}
            style={[
              styles.addToCartButton,
              item.isCartButtonGreen ? { backgroundColor: 'green' } : {}
            ]}
            disabled={item.isAddedToCart}
          >
            <Text style={styles.addToCartText}>
              {item.isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
            </Text>
            <Icon name="shopping-cart" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  
  const renderModal = (
    visible: boolean,
    setVisible: (visible: boolean) => void,
    options: string[],
    onSelect: (option: string) => void
  ) => (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={() => setVisible(false)}>
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {options.map((option, index) => (
              <TouchableOpacity key={index} onPress={() => onSelect(option)}>
                <Text style={styles.modalItem}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

    return (
        <>
      <Navbar />
      <TextInput
        style={styles.searchBar}
        placeholder="Search Products"
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          handleCategorySelect(selectedCategory);
        }}
      />
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={() => setCategoryModalVisible(true)}>
          <Text style={styles.filterButtonText}>{selectedCategory}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => setSortModalVisible(true)}>
          <Text style={styles.filterButtonText}>{sortOption}</Text>
        </TouchableOpacity>
      </View>
      {renderModal(categoryModalVisible, setCategoryModalVisible, categories, handleCategorySelect)}
      {renderModal(sortModalVisible, setSortModalVisible, ['None', 'Price: Low to High', 'Price: High to Low'], handleSortSelect)}
      {filteredProducts.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No products found.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.flatListContent}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
    searchBar: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#f8f8f8',
      },
      container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
      },
      filterButton: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: '#e6e6e6',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
      },
      filterButtonText: {
        fontSize: 16,
        color: '#333',
      },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
    flatListContent: {
        paddingHorizontal: 10,
    },
    productCard: {
      flex: 1,
      margin: 10,
      backgroundColor: '#fff',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    productImage: {
      width: '100%',
      height: 150,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      resizeMode: 'cover',
    },
    productInfo: {
      padding: 10,
      alignItems: 'flex-start',
    },
    productName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    productPrice: {
      fontSize: 14,
      color: '#7C8139',
      marginBottom: 10,
    },
    actionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 5,
    },
    heartIcon: {
      marginRight: 10,
    },
   modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        width: '80%',
        alignItems: 'center',
      },
      modalItem: {
        paddingVertical: 10,
        fontSize: 16,
        color: '#333',
      },
      emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      emptyStateText: {
        fontSize: 18,
        color: '#888',
      },
      addToCartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#333',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        flex: 1, // Ensure the button fills the remaining space
      },
      addToCartText: {
        color: '#fff',
        fontSize: 14,
        marginRight: 5,
      },
    });

export default Store;









/*import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { fetchData } from '../api';
import Navbar from '../components/NavBar';
import { useLoading } from '../contexts/LoadingContext';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

// Interface for Product data type
interface Product {
  id: number;
  name: string;
  shortDesc: string;
  longDesc?: string;
  imag: string; // Assuming this is a URL
  minQty: number;
  currQty: number;
  price: number;
  discount?: number;
  category: string;
  isLiked?: boolean;
  isAddedToCart?: boolean;
  isCartButtonGreen?: boolean;
}

type RootStackParamList = {
  Store: undefined;
  Product: { item: Product };
};

type StoreScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Store'>;

const mockProducts: Product[] = [
    { id: 1, name: "Ocean", shortDesc: "water colors", longDesc: "", imag: require('../assets/Images/Ocean.jpg'), minQty: 1, currQty: 7, price: 150, discount: 15, category: "water colors" },
    { id: 2, name: "Pink storm", shortDesc: "oil colors", longDesc: "", imag: require('../assets/Images/pink.jpg'), minQty: 1, currQty: 10, price: 200,  category: "oil colors" },
    { id: 3, name: "Rainbow", shortDesc: "oil colors", longDesc: "", imag: require('../assets/Images/rainbow.jpg'), minQty: 1, currQty: 14, price: 180, discount: 10, category: "oil colors" },
    { id: 4, name: "Childhood", shortDesc: "water colors", longDesc: "", imag: require('../assets/Images/childhood.jpg'), minQty: 1, currQty: 6, price: 120, discount: 5, category: "water colors" },
    { id: 8, name: "Sad Storm", shortDesc: "oil colors", longDesc: "", imag: require('../assets/Images/obb.jpg'), minQty: 1, currQty: 4, price: 170, discount: 12, category: "abstract" },
    { id: 10, name: "Yellow Storm", shortDesc: "oil colors", longDesc: "", imag: require('../assets/Images/yellow.jpg'), minQty: 1, currQty: 3, price: 140, category: "abstract" },
    { id: 11, name: "Pain", shortDesc: "emotional art", longDesc: "", imag: require('../assets/Images/pain.jpg'), minQty: 1, currQty: 6, price: 190, discount: 18, category: "abstract" },
    { id: 12, name: "Mysterious Woman", shortDesc: "portrait", longDesc: "", imag: require('../assets/Images/women.jpg'), minQty: 1, currQty: 8, price: 210,  category: "portrait" },
    { id: 13, name: "Waves", shortDesc: "water colors", longDesc: "", imag: require('../assets/Images/waves.jpg'), minQty: 1, currQty: 5, price: 160, discount: 14, category: "water colors" },
    { id: 14, name: "Kitty Cat", shortDesc: "animal art", longDesc: "", imag: require('../assets/Images/cat.jpg'), minQty: 1, currQty: 3, price: 125, discount: 9, category: "animals" },
    { id: 15, name: "Love of Fox Mom", shortDesc: "animal art", longDesc: "", imag: require('../assets/Images/fox.jpg'), minQty: 1, currQty: 1, price: 200,  category: "animals" },
    { id: 16, name: "Blue Storm", shortDesc: "oil colors", longDesc: "", imag: require('../assets/Images/blue.jpg'), minQty: 1, currQty: 7, price: 180, discount: 15, category: "abstract" },
    { id: 17, name: "Forest", shortDesc:"oil colors", longDesc: "", imag: require('../assets/Images/trees.jpg'), minQty: 1, currQty: 4, price: 150,  category: "abstract" },
    { id: 18, name: "Lonly fish", shortDesc: "water colors", longDesc: "", imag: require('../assets/Images/fish.jpg'), minQty: 1, currQty: 8, price: 120,  category: "water colors" },
  ];

const Store: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { loading, setLoading } = useLoading();
  const navigation = useNavigation<StoreScreenNavigationProp>();
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState<string>('None');
  const [categoryModalVisible, setCategoryModalVisible] = useState<boolean>(false);
  const [sortModalVisible, setSortModalVisible] = useState<boolean>(false);

  // Fetch products from API or use mock data as fallback
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetchData('/products');
        const productData = Array.isArray(response) ? response : response.data;
        const validatedProducts = productData.map((product: any, index: number) => ({
          id: product.id ?? index,
          name: product.name ?? 'Unnamed Product',
          shortDesc: product.shortDesc ?? '',
          longDesc: product.longDesc ?? '',
          imag:
            product.imag ??
            'https://res.cloudinary.com/djy3q6qin/image/upload/v1727519265/samples/cloudinary-icon.png',
          minQty: product.minQty ?? 1,
          currQty: product.currQty ?? 0,
          price: product.price ?? 0,
          discount: product.discount ?? 0,
          category: product.category ?? 'General',
        }));
        setProducts(validatedProducts);
        setFilteredProducts(validatedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products.');
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Generate dynamic categories
  const categories = ['All', ...Array.from(new Set(products.map((product) => product.category)))];

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setFilteredProducts(
      category === 'All' ? products : products.filter((product) => product.category === category)
    );
  };

  const handleSortSelect = (option: string) => {
    setSortOption(option);
    const sorted = [...filteredProducts].sort((a, b) => {
      const priceA = a.price * (1 - (a.discount ?? 0) / 100);
      const priceB = b.price * (1 - (b.discount ?? 0) / 100);
      if (option === 'Price: Low to High') return priceA - priceB;
      if (option === 'Price: High to Low') return priceB - priceA;
      return 0;
    });
    setFilteredProducts(sorted);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <TouchableOpacity onPress={() => navigation.navigate('Product', { item })}>
        <View style={styles.imageContainer}>
          <Image
            source={item.imag ? { uri: item.imag } : require('../assets/Images/fallbackImage.jpg')}
            style={styles.productImage}
          />
          {item.discount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{item.discount}% OFF</Text>
            </View>
          )}
        </View>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}₪</Text>
        <Text style={styles.productShortDesc}>{item.shortDesc}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderModal = (
    visible: boolean,
    setVisible: (visible: boolean) => void,
    options: string[],
    onSelect: (option: string) => void
  ) => (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalItem}
                onPress={() => {
                  onSelect(option);
                  setVisible(false);
                }}
              >
                <Text style={styles.modalItemText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <>
      <Navbar />
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={() => setCategoryModalVisible(true)}>
          <Text style={styles.filterButtonText}>{selectedCategory}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => setSortModalVisible(true)}>
          <Text style={styles.filterButtonText}>{sortOption}</Text>
        </TouchableOpacity>
      </View>
      {renderModal(categoryModalVisible, setCategoryModalVisible, categories, handleCategorySelect)}
      {renderModal(sortModalVisible, setSortModalVisible, ['None', 'Price: Low to High', 'Price: High to Low'], handleSortSelect)}
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
      />
    </>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    errorText: {
      fontSize: 18,
      color: 'red',
      textAlign: 'center',
    },
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: '#f8f8f8',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    filterButton: {
      flex: 1,
      marginHorizontal: 5,
      paddingVertical: 10,
      backgroundColor: '#e6e6e6',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    filterButtonText: {
      fontSize: 16,
      color: '#333',
    },
    flatListContent: {
      paddingHorizontal: 10,
      paddingBottom: 20,
    },
    productCard: {
      flex: 1,
      margin: 10,
      backgroundColor: '#fff',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    imageContainer: {
      position: 'relative',
    },
    productImage: {
      width: '100%',
      height: 150,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      resizeMode: 'cover',
    },
    discountBadge: {
      position: 'absolute',
      top: 10,
      left: 10,
      backgroundColor: '#FF6347',
      padding: 5,
      borderRadius: 5,
    },
    discountText: {
      color: 'white',
      fontWeight: 'bold',
    },
    productName: {
      fontSize: 16,
      fontWeight: 'bold',
      margin: 10,
    },
    productShortDesc: {
      fontSize: 14,
      color: '#555',
      marginHorizontal: 10,
      marginBottom: 5,
    },
    productPrice: {
      fontSize: 16,
      color: '#7C8139',
      margin: 10,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      width: '80%',
      alignItems: 'center',
    },
    modalItem: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      width: '100%',
    },
    modalItemText: {
      fontSize: 16,
      color: '#333',
    },
  });
  

export default Store;
 */ 