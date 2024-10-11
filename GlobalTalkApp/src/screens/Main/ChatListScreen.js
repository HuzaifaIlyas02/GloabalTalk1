import React, { useLayoutEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const chatData = [
  {
    id: "1",
    name: "John Doe",
    lastMessage: "Hey, how are you?",
    time: "10:30 AM",
  },
  {
    id: "2",
    name: "Jane Smith",
    lastMessage: "Meeting at 3 PM",
    time: "Yesterday",
  },
  {
    id: "3",
    name: "Alice Johnson",
    lastMessage: "Let's catch up soon!",
    time: "Monday",
  },
  {
    id: "4",
    name: "Michael Brown",
    lastMessage: "Happy Birthday!",
    time: "2 days ago",
  },
  {
    id: "5",
    name: "Emily White",
    lastMessage: "Call me when you can.",
    time: "Last week",
  },
];

const ChatListScreen = ({ navigation }) => {
  //   // Set up the header with the `Settings` icon
  //   useLayoutEffect(() => {
  //     navigation.setOptions({
  //       headerRight: () => (
  //         <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
  //           <Ionicons name="settings-outline" size={24} color="#fff" style={{ marginRight: 15 }} />
  //         </TouchableOpacity>
  //       ),
  //     });
  //   }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate("Chat", { userName: item.name })}
    >
      <Ionicons
        name="person-circle"
        size={50}
        color="#8e44ad"
        style={styles.contactIcon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message}>{item.lastMessage}</Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color="gray"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Chat"
          placeholderTextColor="gray"
        />
      </View>

      <FlatList
        data={chatData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Add Contact")}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dcd6f7", // Light purple background
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    margin: 10,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "black",
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f0e6fa", // Light background for chat item
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    borderRadius: 8,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  contactIcon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4a0072", // Darker purple for the contact name
  },
  message: {
    fontSize: 14,
    color: "gray",
  },
  time: {
    fontSize: 12,
    color: "gray",
  },
  addButton: {
    backgroundColor: "#8e44ad", // Purple color for add button
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
    bottom: 20,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export default ChatListScreen;
