import { ThemeText } from "@/components/ThemeText";
import { Card } from "@/components/Card";
import { Row } from "@/components/Row";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useState } from "react";
import { Text, Image, Modal, Pressable, StyleSheet, View } from "react-native";

type Props = {
    value: "id" | "name";
    onChange: (v: "id" | "name") => void;
};

const options = [
    {label: "Number", value: "id"},
    {label: "Name", value: "name"},
]

export function SortButton({ value, onChange }: Props) {
    const colors = useThemeColors();
    const [isModaleVisible, setModaleVisibility] = useState(false);
    const onButtonPress = () => {
        setModaleVisibility(true);
    };
    const onClose = () => {
        setModaleVisibility(false);
    }
    return (
      <>
        <Pressable onPress={onButtonPress}>
            <View style={[styles.button, {backgroundColor: colors.white}]}>
                <Image
                    source={
                        value === "id" ? require("@/assets/images/tag.png") : require("@/assets/images/text_format.png")
                    }
                    width={16}
                    height={16}
                />
            </View>
        </Pressable>
        <Modal transparent visible={isModaleVisible} onRequestClose={onClose}>
              <Pressable style={styles.backdrop} onPress={onClose} />
              <View style={[styles.popup, {backgroundColor: colors.tint}]}>
                    <ThemeText
                        style={styles.title}
                        variant="Subtitle2"
                        color="white"
                    >
                        Sort by :
                    </ThemeText>
                    <Card style={styles.card}>
                        {options.map(o => <Row key={o.value}>
                            <View/>
                            <ThemeText>{o.label}</ThemeText>
                        </Row>)}
                    </Card>
              </View>
        </Modal>
      </>  
    );
}

const styles = StyleSheet.create({
    button: {
        width: 32,
        height: 32,
        borderRadius: 32,
        flex: 0,
        alignItems: "center",
        justifyContent: "center",
    },

    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },

    popup: {
        padding: 4,
        borderRadius: 12,
        paddingTop: 16,
        gap: 16,
    },
    title: {
        paddingLeft: 20,
    },

    card: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        gap: 16,
    },
});