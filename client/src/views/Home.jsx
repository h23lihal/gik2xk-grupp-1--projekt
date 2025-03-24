import ProductList from "../components/ProductList";

export default function Home() {
  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">Välkommen till TeaTime!</h1>
      <ProductList />
    </div>
  );
}