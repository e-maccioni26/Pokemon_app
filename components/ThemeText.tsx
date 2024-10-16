import { useThemeColors } from "@/hooks/useThemeColors";
import { StyleSheet, Text, type TextProps } from "react-native";
import { Colors } from "@/constants/Colors";


type Props = TextProps & {
    variant?: keyof typeof styles,
    color?: keyof typeof Colors["light"]
}

export  function ThemeText ({variant, color, style, ...reset}: Props) {
    const colors = useThemeColors();
    return <Text style={[styles[variant ?? 'body3'], {color: colors[color ?? "grayDark"]}, style]} {...reset}/>
}

const styles = StyleSheet.create({
    body3: {
        fontSize: 10,
        lineHeight: 16,
    },
    body1: {
        fontSize: 14,
        lineHeight: 16,
    },
    body2: {
        fontSize: 12,
        lineHeight: 16,
    },
    Caption: {
        fontSize: 8,
        lineHeight: 12,
    },
    Headline: {
        fontWeight: "bold",
        lineHeight: 32,
        fontSize: 24,
    },
    Subtitle3: {
        fontSize: 10,
        lineHeight: 16,
        fontWeight: "bold",
    },
    Subtitle2: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: "bold",
    },
    Subtitle1: {
        fontSize: 14,
        lineHeight: 16,
        fontWeight: "bold",
    },
})