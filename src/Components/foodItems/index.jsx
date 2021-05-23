function FoodItem({ image, itemName, ingredients, price }) {
  return (
    <div>
      <img src={image} alt={itemName} />
      <span>{itemName}</span>
      <span>{ingredients}</span>
      <span>{price}</span>
    </div>
  );
}

export default FoodItem;
