import { useContext, useLayoutEffect } from 'react'
import { View, Text, StyleSheet, Image, ScrollView, Button } from "react-native"

import { MEALS } from "../data/dummy-data";
import Subtitle from "../components/MealDetaul/Subtitle";
import List from "../components/MealDetaul/List";
import MealDetails from "../components/MealDetails";
import IconButton from '../components/IconButton';
import { FavoritesContext } from '../store/context/favorites-context';

function MealDetailScreen({ route, navigation }) {

    const favoriteMealsCtx = useContext(FavoritesContext);

    const mealId = route.params.mealId

    const selectedMeal = MEALS.find((meal) => meal.id === mealId)

    const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);

    function changeFavoritesStatusHandler() {
        if (mealIsFavorite) {
            favoriteMealsCtx.removeFavories(mealId)
        } else {
            favoriteMealsCtx.addFavorites(mealId)
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <IconButton
                    icon={mealIsFavorite ? 'star' : 'star-outline'}
                    color="white"
                    onPress={changeFavoritesStatusHandler} />
            }
        });
    }, [navigation, changeFavoritesStatusHandler])

    return (
        <ScrollView style={styles.root}>
            <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
            <Text style={styles.title}>{selectedMeal.title}</Text>
            <MealDetails
                duration={selectedMeal.duration}
                complexity={selectedMeal.complexity}
                affordability={selectedMeal.affordability}
                textStyle={styles.detailText}
            />
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                    <Subtitle>Ingredients</Subtitle>
                    <List data={selectedMeal.ingredients} />
                    <Subtitle>Steps</Subtitle>
                    <List data={selectedMeal.steps} />
                </View>
            </View>

        </ScrollView>
    )
}

export default MealDetailScreen;

const styles = StyleSheet.create({
    root: {
        marginBottom: 32,
    },
    image: {
        width: '100%',
        height: 350,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: 'center',
        color: 'white'

    },
    detailText: {
        color: 'white'
    },
    listOuterContainer: {
        alignItems: 'center'
    },
    listContainer: {
        width: '80%'
    }
})