import React, { useState, useEffect } from 'react';
import { Text, TextInput, Button, StyleSheet, Image, Alert, View, FlatList, Switch, RefreshControl } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Import expo-image-picker
import { postFormData, fetchData, updateData } from '../api';  // Use the correct function for FormData

interface ProductData {
  name: string;
  shortDesc: string;
  longDesc?: string;
  price: string;
  minQty: string;
  currQty: string;
  discount?: string;
  category: string;
  visibleInStore: boolean; // Add a new field for product visibility in store
}

interface Product extends ProductData {
  _id: string;
  imag: string;
}
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

const AdminDashboard: React.FC = () => {
  const [newProduct, setNewProduct] = useState<ProductData>({
    name: '',
    shortDesc: '',
    longDesc: '',
    price: '',
    minQty: '',
    currQty: '',
    discount: '',
    category: '',
    visibleInStore: false, // Default to false for new products
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);  // Image as a string URL
  const [uploading, setUploading] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null); // Store product ID when editing
  const [products, setProducts] = useState<Product[]>([]); // State to store fetched products
  const [loadingProducts, setLoadingProducts] = useState(true); // Loading state for fetching products
  const [refreshing, setRefreshing] = useState(false); // Refresh control state

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const data = await fetchData('/products'); // Fetch the products from your server
      setProducts(data); // Set the fetched products
    } catch (error) {
      console.error('Failed to fetch products:', error);
      Alert.alert('Error', 'Failed to fetch products');
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    
  }, []);

  // Refresh function to reload products
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  };

  // Requesting Permissions and Picking Image
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Permission denied', 'You need to grant permission to access the media library.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // Handle adding or updating a product
  const handleAddOrUpdateProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.shortDesc || !newProduct.minQty || !newProduct.currQty || !newProduct.category || !selectedImage) {
      alert('Please fill out all fields and select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('shortDesc', newProduct.shortDesc);
    formData.append('longDesc', newProduct.longDesc || '');
    formData.append('price', newProduct.price);
    formData.append('minQty', newProduct.minQty);
    formData.append('currQty', newProduct.currQty);
    formData.append('discount', newProduct.discount || '0');
    formData.append('category', newProduct.category);
    formData.append('visibleInStore', newProduct.visibleInStore ? 'true' : 'false');

    if (selectedImage) {
      const imageData: any = {
        uri: selectedImage,
        type: 'image/jpeg',
        name: 'product-image.jpg',
      };
      formData.append('image', imageData);
    }

    try {
      setUploading(true);

      // Update if editing, otherwise add a new product
      if (editingProductId) {
        const response = await updateData(`/products/${editingProductId}`, formData);
        console.log('Product updated:', response);
        Alert.alert('Success', 'Product updated successfully!');
      } else {
        const response = await postFormData('/products', formData);
        console.log('Product added:', response);
        Alert.alert('Success', 'Product added successfully!');
        setProducts((prevProducts) => [...prevProducts, response]); // Add the newly created product to the list
      }

      // Reset form fields and image
      setNewProduct({
        name: '',
        shortDesc: '',
        longDesc: '',
        price: '',
        minQty: '',
        currQty: '',
        discount: '',
        category: '',
        visibleInStore: false,
      });
      setSelectedImage(null);
      setEditingProductId(null); // Reset editing state
    } catch (error) {
      console.error('Failed to add/update product:', error);
      Alert.alert('Error', 'Failed to add/update product');
    } finally {
      setUploading(false);
    }
  };

  // Handle editing a product
  const handleEditProduct = (product: Product) => {
    setNewProduct({
      name: product.name,
      shortDesc: product.shortDesc,
      longDesc: product.longDesc || '',
      price: product.price.toString(),
      minQty: product.minQty.toString(),
      currQty: product.currQty.toString(),
      discount: product.discount?.toString() || '',
      category: product.category,
      visibleInStore: product.visibleInStore,
    });
    setSelectedImage(product.imag);
    setEditingProductId(product._id); // Set the product ID being edited
  };

  // Toggle visibility of a product in store
  const toggleVisibility = async (product: Product) => {
    try {
      const updatedProduct = { ...product, visibleInStore: !product.visibleInStore };
      await updateData(`/products/${product._id}`, updatedProduct);
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p._id === product._id ? updatedProduct : p))
      );
    } catch (error) {
      console.error('Failed to toggle visibility:', error);
      Alert.alert('Error', 'Failed to toggle visibility');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Dashboard</Text>

      {/* List of Products */}
      <Text style={styles.subHeader}>Existing Products</Text>
      {loadingProducts ? (
        <Text>Loading products...</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Image source={{ uri: item.imag }} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>

              {/* Edit Button */}
              <Button title="Edit" onPress={() => handleEditProduct(item)} />

              {/* Toggle Visibility */}
              <View style={styles.switchContainer}>
                <Text>Visible in Store:</Text>
                <Switch
                  value={item.visibleInStore}
                  onValueChange={() => toggleVisibility(item)}
                />
              </View>
            </View>
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} // Add pull-to-refresh functionality
        />
      )}

      {/* Form to add or edit a product */}
      <FlatList
        ListHeaderComponent={<Text style={styles.subHeader}>{editingProductId ? 'Edit Product' : 'Add a New Product'}</Text>}
        data={[]} // Empty data to allow scrolling
        ListEmptyComponent={
          <View>
            <TextInput
              style={styles.input}
              placeholder="Product Name"
              value={newProduct.name}
              onChangeText={(text) => setNewProduct({ ...newProduct, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Short Description"
              value={newProduct.shortDesc}
              onChangeText={(text) => setNewProduct({ ...newProduct, shortDesc: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Long Description"
              value={newProduct.longDesc}
              onChangeText={(text) => setNewProduct({ ...newProduct, longDesc: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              keyboardType="numeric"
              value={newProduct.price}
              onChangeText={(text) => setNewProduct({ ...newProduct, price: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Minimum Quantity"
              keyboardType="numeric"
              value={newProduct.minQty}
              onChangeText={(text) => setNewProduct({ ...newProduct, minQty: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Current Quantity"
              keyboardType="numeric"
              value={newProduct.currQty}
              onChangeText={(text) => setNewProduct({ ...newProduct, currQty: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Discount (%)"
              keyboardType="numeric"
              value={newProduct.discount}
              onChangeText={(text) => setNewProduct({ ...newProduct, discount: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Category"
              value={newProduct.category}
              onChangeText={(text) => setNewProduct({ ...newProduct, category: text })}
            />

            <Button title="Select Image" onPress={pickImage} />
            {selectedImage && <Image source={{ uri: selectedImage }} style={styles.selectedImage} />}
            <Button title={editingProductId ? "Update Product" : "Add Product"} onPress={handleAddOrUpdateProduct} />
            {uploading && <Text>Uploading...</Text>}
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  selectedImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  productItem: {
    marginBottom: 20,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default AdminDashboard;
