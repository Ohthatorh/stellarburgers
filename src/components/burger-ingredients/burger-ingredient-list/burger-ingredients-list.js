import BurgerIngredientItem from "../burger-ingredient-item/burger-ingredient-item";
import styles from "./burger-ingredient-list.module.css";
import classNames from "classnames";

function BurgerIngredientsList({ item, index }) {
  const burgeringredientsListClassNames = classNames(
    `${styles.burgerIngredientsList}`,
    "pt-6 pl-4 pb-10"
  );
  return (
    <li key={index}>
      <p className="text text_type_main-medium">{item.title}</p>
      <ul className={burgeringredientsListClassNames}>
        {item.items.map((el) => {
          return <BurgerIngredientItem item={el} key={el._id} />;
        })}
      </ul>
    </li>
  );
}

export default BurgerIngredientsList;
