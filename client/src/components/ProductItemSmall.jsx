import { Link } from "react-router-dom";

export default function ProductItemSmall({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="border p-4 rounded-lg shadow-md hover:shadow-lg transition"
    >
      <img
        src={product.imageUrl}
        className="w-full h-40 object-cover mb-2"
      />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-500">{product.price} kr</p>
    </Link>
  );
}