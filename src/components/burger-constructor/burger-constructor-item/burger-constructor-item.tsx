import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor-item.module.css";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { REMOVE_INGREDIENT } from "../../../services/actions/currentIngredients";
import { useDrag, useDrop } from "react-dnd";
import { FC, useRef } from "react";
import {
  TClassnames,
  IBurgerConstructorItem,
} from "../../../services/types/types";

const BurgerConstrucorItem: FC<IBurgerConstructorItem> = ({
  item,
  index,
  moveCard,
}) => {
  const ref = useRef<HTMLLIElement>(null);
  const burgerConstrucorItemClassName: TClassnames = classNames(
    `${styles.burgerConstrucorItem}`
  );
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch({
      type: REMOVE_INGREDIENT,
      index: index,
    });
  };
  const [, dragRef] = useDrag({
    type: "currentIngredient",
    item: () => {
      return { index };
    },
  });
  const [, dropRef] = useDrop({
    accept: "currentIngredient",
    hover(itemDrop: { index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = itemDrop.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      itemDrop.index = hoverIndex;
    },
  });
  dragRef(dropRef(ref));
  return (
    <li className={burgerConstrucorItemClassName} ref={ref}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={handleClose}
      />
    </li>
  );
};

export default BurgerConstrucorItem;
