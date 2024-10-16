import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeText } from "@/components/ThemeText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Card } from "@/components/Card";
import { PokemonCard } from "@/components/pokemon/pokemonCard";

export default function Index() {
  const colors = useThemeColors();
  const pokemons = Array.from({length: 35}, (_, k) => ({
    name: 'Pokemon name',
    id: k + 1
  }))
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.tint}]}>
      <View style={styles.header}>
        <Image source={require("@/assets/images/pokeball.png")} width={24} height={24}/>
        <ThemeText variant="Headline" color="grayLight">Pokédex</ThemeText>
      </View>

      <Card style={styles.containerCard}>
        <FlatList 
        data={pokemons} 
        numColumns={3}
        contentContainerStyle={[styles.gridGap, styles.list]}
        columnWrapperStyle={styles.gridGap}
        renderItem={({item}) => <PokemonCard id={item.id} name={item.name} style={{flex: 1/3}}/>} keyExtractor={(item) => item.id.toString()}/>        
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 4,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 12,
  },

  containerCard: {
    flex: 1,
  },

  gridGap: {
    gap: 8
  },

  list: {
    padding: 12,
  }
});
