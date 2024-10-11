import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as DocumentPicker from "expo-document-picker";

const ChatScreen = ({ route, navigation }) => {
  const { userName } = route.params;
  const audioRecorderPlayer = new AudioRecorderPlayer();

  // Update the header title to the contact's name and make it clickable
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Contact Info", { userName })}
        >
          <Text style={styles.headerTitle}>{userName}</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, userName]);

  // Sample chat messages
  const [messages, setMessages] = useState([
    { id: "1", text: "Hello!", sender: "other", type: "text" },
    { id: "2", text: "Hi there!", sender: "self", type: "text" },
    { id: "3", text: "How are you?", sender: "other", type: "text" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  // Send a text message
  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: String(prevMessages.length + 1),
        text: newMessage,
        sender: "self",
        type: "text",
      },
    ]);
    setNewMessage("");
  };

  // Start or stop recording a voice message
  const toggleRecording = async () => {
    if (isRecording) {
      // Stop recording
      const result = await audioRecorderPlayer.stopRecorder();
      setIsRecording(false);
      console.log("Recorded file: ", result);

      // Add the recorded audio as a message
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: String(prevMessages.length + 1),
          text: "Voice message",
          sender: "self",
          type: "audio",
        },
      ]);
    } else {
      // Start recording
      await audioRecorderPlayer.startRecorder();
      setIsRecording(true);
    }
  };

  // Pick a document and send it as a message
  const sendDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.type === "success") {
        console.log("Selected document: ", result);

        // Add the document as a message
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: String(prevMessages.length + 1),
            text: result.name,
            sender: "self",
            type: "document",
          },
        ]);
      }
    } catch (err) {
      Alert.alert("Error", "Failed to pick document");
    }
  };

  // Render each chat item based on its type (text, audio, or document)
  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "self" ? styles.selfMessage : styles.otherMessage,
      ]}
    >
      {item.type === "text" ? (
        <Text style={styles.messageText}>{item.text}</Text>
      ) : item.type === "audio" ? (
        <Text style={styles.messageText}>🎤 Voice message</Text>
      ) : (
        <Text style={styles.messageText}>📄 {item.text}</Text>
      )}
      <Text style={styles.timeText}>18:30</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        source={require("../../../assets/images/background.jpg")} // Add your image path here
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={styles.chatList}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={toggleRecording} style={styles.iconButton}>
            <Ionicons
              name={isRecording ? "mic-off" : "mic"}
              size={24}
              color="#fff"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={sendDocument} style={styles.iconButton}>
            <Ionicons name="document" size={24} color="#fff" />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Type a message"
            value={newMessage}
            onChangeText={setNewMessage}
          />

          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  headerTitle: {
    color: "#8e44ad",
    fontSize: 18,
    fontWeight: "bold",
  },
  chatList: {
    flex: 1,
  },
  messageContainer: {
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  selfMessage: {
    backgroundColor: "#8e44ad",
    alignSelf: "flex-end",
    borderBottomRightRadius: 0,
  },
  otherMessage: {
    backgroundColor: "#f0e6fa",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    color: "#000",
  },
  timeText: {
    fontSize: 12,
    color: "#ccc",
    alignSelf: "flex-end",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#8e44ad", // Dark purple background for input area
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
    backgroundColor: "#fff",
  },
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#d1c4e9", // Change button color here if needed
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#000",
    fontSize: 16,
  },
});

export default ChatScreen;
