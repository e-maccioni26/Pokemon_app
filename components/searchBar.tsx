import { TextInput, View, Image, StyleSheet } from "react-native";
import { Row } from "./Row";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = {
    value: string,
    onChnage: (s: string) => void,

}

export function SearchBar({value, onChnage}: Props) {
    const colors = useThemeColors();
    return (
        <Row gap={8} style={[styles.wrapper, {backgroundColor: colors.white}]}>
            <Image 
            source={require('@/assets/images/search.png')} 
            width={16} 
            height={16} 
            />
            <TextInput style={styles.input} value={value} onChangeText={onChnage} />
        </Row> 
    );   
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        borderRadius: 16,
        height: 32,
        paddingHorizontal: 12,
    },

    input: {
        flex: 1,
        height: 16,
        fontSize: 10,
        lineHeight: 16,
    }
});