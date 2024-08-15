import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SortableKeys } from '../types/StoreItem';

type FilterSortComponentProps = {
  onSortChange: (criteria: SortableKeys) => void;
  onFilterChange: (category: string) => void;
};

const FilterSortComponent: React.FC<FilterSortComponentProps> = ({ onSortChange, onFilterChange }) => {
  const [sortCriteria, setSortCriteria] = useState<SortableKeys>('price');
  const [filterCategory, setFilterCategory] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Sort by:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={sortCriteria}
            onValueChange={(itemValue: SortableKeys) => {
              setSortCriteria(itemValue);
              onSortChange(itemValue);
            }}
            style={styles.picker}
          >
            <Picker.Item label="Price" value="price" />
            <Picker.Item label="Name" value="name" />
          </Picker>
        </View>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Filter by category:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={filterCategory}
            onValueChange={(itemValue) => {
              setFilterCategory(itemValue);
              onFilterChange(itemValue);
            }}
            style={styles.picker}
          >
            <Picker.Item label="All" value="" />
            <Picker.Item label="Acrylic" value="Acrylic painting" />
            <Picker.Item label="Oil" value="Oil painting" />
            <Picker.Item label="Watercolor" value="Watercolor" />
            <Picker.Item label="Pastel" value="Pastel painting" />
          </Picker>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginVertical: 10,
  },
  pickerContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  picker: {
    height: 40,
  },
});

export default FilterSortComponent;
