import React, { useState } from 'react';
import {Text, TextInput, Button, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Import expo-image-picker
import { postFormData } from '../api';  // Use the correct function for FormData

interface ProductData {
  name: string;
  shortDesc: string;
  longDesc?: string;
  price: string;
  minQty: string;
  currQty: string;
  discount?: string;
  category: string;
}

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
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);  // Image as a string URL
  const [uploading, setUploading] = useState(false);

  // Requesting Permissions and Picking Image
  const pickImage = async () => {
    // Request permission to access media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission denied', 'You need to grant permission to access the media library.');
      return;
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only allow images
      allowsEditing: true, // Let the user crop the image
      quality: 1, // Highest quality
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      // Set the image URI to state
      setSelectedImage(result.assets[0].uri);
    }
  };

  // Handle adding a new product
  const handleAddProduct = async () => {
    if (
      !newProduct.name || !newProduct.price || !newProduct.shortDesc || 
      !newProduct.minQty || !newProduct.currQty || !newProduct.category || 
      !selectedImage
    ) {
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

    // Append the image file
    if (selectedImage) {
      const imageData: any = {
        uri: selectedImage,
        type: 'image/jpeg', // Assuming JPEG; adjust based on the image format
        name: 'product-image.jpg', // You can name it anything
      };
      formData.append('image', imageData);
    }

    try {
      setUploading(true);
      const response = await postFormData('/products', formData);  // Use postFormData here
      console.log('Product added:', response);
      // Show success message after the product is added successfully
      Alert.alert('Success', 'Product added successfully!');

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
      });
      setSelectedImage(null);
    } catch (error) {
      console.error('Failed to add product:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Admin Dashboard</Text>

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

      {/* Button to select image */}
      <Button title="Select Image" onPress={pickImage} />

      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
      )}

      <Button title="Add Product" onPress={handleAddProduct} />

      {uploading && <Text>Uploading...</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
});

export default AdminDashboard;
