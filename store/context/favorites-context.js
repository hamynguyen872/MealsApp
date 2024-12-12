import { createContext } from "react";

export const FavoritesContext = createContext({
    ids: [],
    addFavorites: (id) => { },
    removeFavories: (id) => { }
});

function FavoritesContextProvider({ children }) {
    const [favoriteMealIds, setFavoriteMealIds] = useState([])

    function addFavorites(id) {
        setFavoriteMealIds((currentFavIds) => [...currentFavIds, id]);
    }

    function removeFavories(id) {
        currentFavIds.filter((mealId) => mealId !== id)

    }

    const value = {
        id: favoriteMealIds,
        addFavorites: addFavorites,
        removeFavories: removeFavories,
    }

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export default FavoritesContextProvider;
