import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const LanguageSelectionScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  // Language options (only English and German)
  const languages = [
    { id: '1', name: 'English' },
    { id: '2', name: 'German' },
  ];

  const toggleLanguage = (language) => {
    setSelectedLanguage(language);
  };

  const handleContinue = () => {
    if (selectedLanguage) {
      // Navigate to the Login screen
      navigation.navigate('Login');
    } else {
      alert('Please select a language');
    }
  };

  const renderLanguageItem = ({ item }) => (
    <View style={styles.languageItem}>
      <Text style={styles.languageText}>{item.name}</Text>
      <Switch
        value={selectedLanguage === item.name}
        onValueChange={() => toggleLanguage(item.name)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a language</Text>
      
      <FlatList
        data={languages}
        keyExtractor={(item) => item.id}
        renderItem={renderLanguageItem}
        style={styles.languageList}
      />

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B306A',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  languageList: {
    width: '90%',
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  languageText: {
    fontSize: 16,
    color: '#000',
  },
  continueButton: {
    backgroundColor: '#8E44AD',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginTop: 20,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LanguageSelectionScreen;
