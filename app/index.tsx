import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeText } from "@/components/ThemeText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Card } from "@/components/Card";
import { PokemonCard } from "@/components/pokemon/pokemonCard";
import { useFetchQuery, useInfiniteFetchQuery } from "@/hooks/useFetchQuery";
import { getPokemonID } from "@/hooks/functionPokemon";
import { SearchBar } from "@/components/searchBar";
import { useState } from "react";
import { Row } from "@/components/Row";
import { SortButton } from "@/components/sortButton";

export default function Index() {
  const colors = useThemeColors();
  const {data, isFetching, fetchNextPage} = useInfiniteFetchQuery("/pokemon?limit=21");
  const [search, setsearch] = useState("");
  const [sortKey, setSortKey] = useState<"id" | "name">("id");
  const pokemons = data?.pages.flatMap((page => page.results.map(r => ({name: r.name, id: getPokemonID(r.url)})))) ?? [];
  const FilteredPokemons = [...(search ? pokemons.filter((p) => p.name.includes(search.toLowerCase()) || p.id.toString() === search) : pokemons)].sort((a, b) => (a[sortKey] < b[sortKey] ? -1 : 1));
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.tint}]}>
      <Row style={styles.header} gap={16}>
        <Image source={require("@/assets/images/pokeball.png")} width={24} height={24}/>
        <ThemeText variant="Headline" color="grayLight">Pokédex</ThemeText>
      </Row>

      <Row gap={16} style={styles.form}>
        <SearchBar value={search} onChnage={setsearch} />
        <SortButton value={sortKey} onChange={setSortKey} />
      </Row>

      <Card style={styles.containerCard}>
        <FlatList 
        data={FilteredPokemons} 
        numColumns={3}
        contentContainerStyle={[styles.gridGap, styles.list]}
        columnWrapperStyle={styles.gridGap}
        ListFooterComponent={
          isFetching ? <ActivityIndicator color={colors.tint} /> : null
        }
        onEndReached={search ? undefined : () => fetchNextPage()}
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
    paddingHorizontal: 12,
    paddingVertical: 8, 
  },

  containerCard: {
    flex: 1,
    marginTop: 16,
  },

  gridGap: {
    gap: 8
  },

  list: {
    padding: 12,
  },

  form: {
    paddingHorizontal: 12,
  }
});
