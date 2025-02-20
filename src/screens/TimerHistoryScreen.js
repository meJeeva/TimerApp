import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNFS from "react-native-fs";
import Share from "react-native-share";

const TimerHistoryScreen = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        loadHistory();
    }, []);

    // 🔹 Load completed timers from AsyncStorage
    const loadHistory = async () => {
        try {
            const savedHistory = await AsyncStorage.getItem("timerHistory");
            if (savedHistory) {
                setHistory(JSON.parse(savedHistory));
            }
        } catch (error) {
            console.error("Error loading history:", error);
        }
    };

    // 🔹 Export timer history as JSON
    const exportHistory = async () => {
        try {
            if (history.length === 0) {
                Alert.alert("No Data", "No history available to export.");
                return;
            }

            const filePath = `${RNFS.DocumentDirectoryPath}/timer_history.json`;
            const jsonData = JSON.stringify(history, null, 2);

            await RNFS.writeFile(filePath, jsonData, "utf8");
            Alert.alert("Success", "History saved successfully!");

            const shareOptions = {
                title: "Exported Timer History",
                message: "Here is the exported timer history.",
                url: `file://${filePath}`,
                type: "application/json",
            };

            await Share.open(shareOptions);
        } catch (error) {
            console.error("Error exporting history:", error);
            Alert.alert("Error", "Failed to export history.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Timer History</Text>
            {history.length === 0 ? (
                <Text style={styles.noHistoryText}>No completed timers yet.</Text>
            ) : (
                <FlatList
                    data={history}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.historyItem}>
                            <Text style={styles.timerName}>{item.name}</Text>
                            <Text>Completed At: {item.completedAt}</Text>
                        </View>
                    )}
                />
            )}

            {/* Export Button */}
            {history.length > 0 && (
                <TouchableOpacity style={styles.exportButton} onPress={exportHistory}>
                    <Text style={styles.exportButtonText}>Export History</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    historyItem: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginVertical: 8, elevation: 2 },
    timerName: { fontWeight: "bold" },
    noHistoryText: { textAlign: "center", marginTop: 20, fontSize: 16, color: "gray" },
    exportButton: { backgroundColor: "green", padding: 10, borderRadius: 5, alignItems: "center", marginTop: 20 },
    exportButtonText: { color: "#fff", fontWeight: "bold" },
});

export default TimerHistoryScreen;
