import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import MealsList from "../components/MealList/MealList";
import { FavoritesContext } from "../store/context/favorites-context";
import { MEALS } from "../data/dummy-data";

function FavoritesScreen() {
    const favoriteMealsCtx = useContext(FavoritesContext);
    /*the reason we must do it bc context only presents
    the ids of favorites. In order to extrat all the id out,
    we need to do this so that we could have more info related 
    to that meal
    */

    const favoriteMeals = MEALS.filter(meal =>
        favoriteMealsCtx.ids.includes(meal.id))
    if (favoriteMeals.length === 0) {
        return <View style={styles.rootContainer}>
            <Text style={styles.text}> You have no favorite meals yet</Text>
        </View>
    }
    return <MealsList items={favoriteMeals}></MealsList>
}

export default FavoritesScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    }

})