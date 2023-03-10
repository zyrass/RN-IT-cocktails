import axios from "axios";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Alert,
  FlatList,
} from "react-native";

function CocktailDetails({ route }) {
  const [oneCocktail, setOneCocktail] = useState({ ...route.params.cocktail });
  const [ingredients, setIngredients] = useState([]);


  useEffect(async () => {
    const response = await axios.get(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${oneCocktail.idDrink}`
    );
    const data = response.data.drinks[0];

    setOneCocktail(data);
    // Récupération des ingrédients de la boisson

    const ingredientsTemporaire = [];
    for (let i = 1; i <= 15; i++) {
      if (data[`strIngredient${i}`]) {
        ingredientsTemporaire.push({
          name: data[`strIngredient${i}`],
          measure: data[`strMeasure${i}`],
        });
      } else {
        break;
      }
    }
    setIngredients(ingredientsTemporaire);
  }, []);

  return (
    <View key={oneCocktail.idDrink} style={{ flex: 1 }}>
      {/* IMAGE */}
      <View style={{ width: "100%", flex: 0.4 }}>
        <Image
          source={{
            uri: oneCocktail.strDrinkThumb,
            width: "100%",
            height: "100%",
          }}
        />
      </View>

      {/* TITLE */}
      <View style={{ width: "100%", marginVertical: 16, flex: 0.1 }}>
        <Text style={{ fontSize: 32, textAlign: "center", color: "#425b8a" }}>
          {oneCocktail.strDrink}
        </Text>
      </View>

      {/* DESCRIPTION */}
      <View
        style={{
          width: "100%",
          paddingHorizontal: 8,
          marginBottom: 8,
          flex: 0.1,
        }}
      >
        <TouchableWithoutFeedback
          onPress={() =>
            Alert.alert("Description", oneCocktail.strInstructions, [
              { text: "OK", onPress: () => console.log("OK Pressed") },
            ])
          }
        >
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              color: "#333333",
              fontStyle: "italic",
            }}
          >
            Clic sur moi pour Voir les instructions
          </Text>
        </TouchableWithoutFeedback>
      </View>

      {/* CATEGORY */}
      <View
        style={{
          width: "100%",
          flex: 0.1,
          paddingHorizontal: 16,
          marginBottom: 8,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            backgroundColor: "#425b8a",
            paddingVertical: 8,
            width: "100%",
            color: "#F1F1F1",
          }}
        >
          Catégorie : <Text>{oneCocktail.strCategory}</Text>
        </Text>
      </View>

      {/* INGREDIENTS */}
      <View
        style={{
          width: "100%",
          paddingHorizontal: 8,
          flex: 0.4,
        }}
      >
        <FlatList
          data={ingredients}
          renderItem={(item, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingHorizontal: 32,
                paddingVertical: 8,
              }}
            >
              {console.log(item)}
              <Image
                source={{
                  uri: `https://www.thecocktaildb.com/images/ingredients/${item.item.name}-Small.png`,
                  width: 50,
                  height: 50,
                }}
              />
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {item.item.name} of {"    "}
                <Text style={{ paddingLeft: 5, color: "salmon" }}>
                  {item.item.measure}
                </Text>
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

export default CocktailDetails;
