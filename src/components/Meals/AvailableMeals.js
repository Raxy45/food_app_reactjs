import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import useHttp from "../hooks/use-http";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [data, setData] = useState([]);
  const { isLoading, error, sendRequest: getMenu } = useHttp();

  useEffect(() => {
    const transformMenu = (data) => {
      setData(data);
      console.log(data);
    };
    getMenu(
      {
        url: "https://react-http-hook-a2218-default-rtdb.firebaseio.com/menus.json",
      },
      transformMenu
    );
  }, [getMenu]);

  let mealist = "";
  if (isLoading) {
    mealist = (
      <section className={classes.MenuLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    mealist = (
      <section className={classes.MealsError}>
        <p>Error loading menus!</p>
      </section>
    );
  }

  if (!error && !isLoading) {
    mealist = data.map((meal) => (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ));
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealist}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
