import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { CheckBox } from '@rneui/themed';


const TimerScreen = () => {
    const [name, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [category, setCategory] = useState("");
    const [halfwayAlert, setHalfwayAlert] = useState(false);
    const navigation = useNavigation();

    const saveTimer = async () => {
        if (!name || !duration || !category) {
            Alert.alert("Error", "All fields are required");
            return;
        }

        const newTimer = {
            id: Date.now().toString(),
            name,
            duration: parseInt(duration),
            category,
            halfwayAlert,
        };

        try {
            const existingTimers = await AsyncStorage.getItem("timers");
            const timers = existingTimers ? JSON.parse(existingTimers) : [];
            timers.push(newTimer);
            await AsyncStorage.setItem("timers", JSON.stringify(timers));
            setName("");
            setDuration("");
            setCategory("");
            setHalfwayAlert(false);
            Alert.alert("Success", "Timer saved successfully");
        } catch (error) {
            console.error("Error saving timer:", error);
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Create New Timer</Text>

            <TextInput placeholder="Name" value={name} onChangeText={setName} style={{ borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 }} />
            <TextInput placeholder="Duration (seconds)" value={duration} onChangeText={setDuration} keyboardType="numeric" style={{ borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 }} />
            <TextInput placeholder="Category" value={category} onChangeText={setCategory} style={{ borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 }} />

            <CheckBox title="Enable Halfway Alert" checked={halfwayAlert} onPress={() => setHalfwayAlert(!halfwayAlert)} />

            <Button title="Save Timer" onPress={saveTimer} />
            <Button title="View Timers" onPress={() => navigation.navigate("TimerListScreen")} />
            <Button title="history page" onPress={() => navigation.navigate("TimerHistory")} />

        </View>
    );
};

export default TimerScreen;
