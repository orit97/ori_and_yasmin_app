import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Store() {
  return (
    <View>
      <Text>store</Text>
    </View>
  )
}

const styles = StyleSheet.create({})





// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// interface Painting {
//   id: string; // Unique identifier for each painting
//   title: string;
//   artist: string;
//   imageUrl: string; // URL of the painting image
//   description?: string; // Optional description for paintings
//   // Add other relevant properties like medium, size, price, etc.
// }

// const PaintingStorePage: React.FC<{ paintingsData: Painting[] }> = ({ paintingsData }) => {
//   const [selectedPainting, setSelectedPainting] = useState<Painting | null>(null);

//   const handlePaintingPress = (painting: Painting) => {
//     setSelectedPainting(painting);
//   };

//   const renderPaintingItem = ({ item }: { item: Painting }) => ( // Explicitly type item
//     <TouchableOpacity onPress={() => handlePaintingPress(item)}>
//       <Image source={{ uri: item.imageUrl }} style={styles.paintingImage} />
//       <Text style={styles.paintingTitle}>{item.title}</Text>
//       <Text style={styles.paintingArtist}>{item.artist}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={paintingsData}
//         renderItem={renderPaintingItem}
//         keyExtractor={(item) => item.id}
//         numColumns={2} // Adjust for grid layout
//       />
//       {selectedPainting && (
//         <View style={styles.detailsModal}>
//           <Image source={{ uri: selectedPainting.imageUrl }} style={styles.detailImage} />
//           <Text style={styles.detailTitle}>{selectedPainting.title}</Text>
//           <Text style={styles.detailArtist}>{selectedPainting.artist}</Text>
//           <Text style={styles.detailDescription}>{selectedPainting.description}</Text>
//           {/* Add buttons for "Add to Cart" and "View Artist Profile" (if applicable) */}
//         </View>
//       )}
//     </View>
//   );
// };


// export default PaintingStorePage;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
    
//   },
//   paintingImage: {
//     width: '100%',
//     height: 200,
//     marginBottom: 10,
//   },
//   paintingTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   paintingArtist: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 10,
//   },
//   detailsModal: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',  
//   },
//   detailImage: {
//     width: '80%',
//     height: '80%',
//     marginBottom: 10,
//   },
//   detailTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   detailArtist: {
//     fontSize: 18,
//     color: '#666',
//     marginBottom: 10,
//   },
//   detailDescription: {
//     fontSize: 16,
//     }});