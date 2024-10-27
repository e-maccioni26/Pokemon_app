import { ThemeText } from "@/components/ThemeText";
import { Card } from "@/components/Card";
import { Row } from "@/components/Row";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useRef, useState } from "react";
import { Text, Image, Modal, Pressable, StyleSheet, View, Dimensions } from "react-native";
import { Radio } from "@/components/Radio";
import { Shadows } from "@/constants/Shadows";

type Props = {
    value: "id" | "name";
    onChange: (v: "id" | "name") => void;
};

const options = [
    {label: "Number", value: "id"},
    {label: "Name", value: "name"},
] as const;

export function SortButton({ value, onChange }: Props) {
    const buttonRef = useRef<View>(null);
    const colors = useThemeColors();
    const [isModaleVisible, setModaleVisibility] = useState(false);
    const [position, setPosition] = useState<null | {top: number; right: number;}>(null); 
    const onButtonPress = () => {
        buttonRef.current?.measureInWindow((x, y, width, height) => {
            setPosition({
                top: y + height,
                right: Dimensions.get("window").width -x - width,
            })
            setModaleVisibility(true);
        });
    };
    const onClose = () => {
        setModaleVisibility(false);
    }
    return (
      <>
        <Pressable onPress={onButtonPress}>
            <View ref={buttonRef} style={[styles.button, {backgroundColor: colors.white}]}>
                <Image
                    source={
                        value === "id" ? require("@/assets/images/tag.png") : require("@/assets/images/text_format.png")
                    }
                    width={16}
                    height={16}
                />
            </View>
        </Pressable>
        <Modal animationType="fade" transparent visible={isModaleVisible} onRequestClose={onClose}>
              <Pressable style={styles.backdrop} onPress={onClose} />
              <View style={[styles.popup, {backgroundColor: colors.tint, ...position}]}>
                    <ThemeText
                        style={styles.title}
                        variant="Subtitle2"
                        color="white"
                    >
                        Sort by :
                    </ThemeText>
                    <Card style={styles.card}>
                        {options.map(o => 
                            <Pressable key={o.value} onPress={() => onChange(o.value)}>
                                <Row gap={8} key={o.value}>
                                    <Radio checked={o.value === value} />
                                    <ThemeText>{o.label}</ThemeText>
                                </Row>
                            </Pressable>
                        )}
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
        width: 113,
        position: "absolute",
        padding: 4,
        borderRadius: 12,
        paddingTop: 16,
        gap: 16,
        ...Shadows.dp2
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