import Card from "../Card";
import { useSelector } from "react-redux";

function Preview() {
    const products = useSelector((state) => state.products.value)

    return <div className="preview-contanier">
        {products.map((product) => 
            <Card data={product} />
        )}
    </div>
}

export default Preview;