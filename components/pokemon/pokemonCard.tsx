import { type ViewStyle, Image, Pressable, StyleSheet, View } from 'react-native';
import { Card } from '@/components/Card';
import { ThemeText } from '@/components/ThemeText';
import { useThemeColors } from '@/hooks/useThemeColors';
import { Link } from 'expo-router';

type Props = {
    style?: ViewStyle,
    id: number, 
    name: string,
}


export function PokemonCard ({style, id, name}: Props) {
    const colors = useThemeColors();
    return <Link href={{pathname: "/pokemon/[id]", params: {id: id}}} asChild>
        <Pressable style={style}>
            <Card style={[styles.card]}>
                <View style={[styles.shadow, {backgroundColor: colors.grayBackground}]}/>
                <ThemeText style={styles.id} variant="Caption" color="grayMedium">#{id.toString().padStart(3, '0')}</ThemeText>
                <Image source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}} 
                width={72} height={72}
                />
                <ThemeText>{name}</ThemeText>
            </Card> 
        </Pressable>
       </Link> 
}

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        padding: 4,
    },

    id: {
        alignSelf: 'flex-end'
    },

    shadow: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 44,
        borderRadius: 7,
    }
})