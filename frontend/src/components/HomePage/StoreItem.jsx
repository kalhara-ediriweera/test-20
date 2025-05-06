import "../../css/HomePage/store.css";

function StoreItem({ prd_name, price, category, img_url }) {
  return (
    <div className="store-item">
      <img className="item-image" src={img_url} alt={prd_name} />
      <div className="item-name">{prd_name}</div>
      <div className="item-category">{category}</div>
      <div className="item-price">Rs. {price}.00</div>
    </div>
  );
}

export default StoreItem;
