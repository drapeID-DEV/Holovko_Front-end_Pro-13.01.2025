function Card({ data }) {
    return <div className="product-card">
        <img className="product-image" src="https://pngimg.com/d/laptop_PNG101796.png" alt="image" />
        <h3 className="product-title">{data.category} {data.name}</h3>
        <div className="product-info">
            <h3 className="product-price">{data.price}₴</h3>
            <h3 className="product-quantity">Кількість: {data.quantity}</h3>
        </div>
        <button className="control-btn buy-btn">Готовий до відправки</button>
    </div>
}

export default Card;