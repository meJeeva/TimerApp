import { Text } from "@rneui/themed";
import { FONTS } from "../utils/constant";
import { StyleSheet } from "react-native";

const CustomText = ({ style, children, ...props }) => {
    return <Text style={[styles.text, style]} {...props}>{children}</Text>;
};



export {
    CustomText
}


const styles = StyleSheet.create({
    text: {
        fontFamily: FONTS.montserratMedium,
    },
});