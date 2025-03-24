import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductForm from '../components/ProductForm';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  // Hämta produktdata för redigering
  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`/api/products/`);
          setProduct(response.data);
        } catch (error) {
          console.error('Det gick inte att hämta produkten', error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  // När formuläret är skickat, navigera tillbaka till produktlistan
  const handleFormSubmit = (newProduct) => {
    // Du kan här navigera till produktlistan eller visa den nya produkten
    navigate('/products');
  };

  return (
    <div>
      {product ? (
        <ProductForm product={product} onSubmit={handleFormSubmit} />
      ) : (
        <ProductForm onSubmit={handleFormSubmit} />
      )}
    </div>
  );
};

export default ProductEdit;