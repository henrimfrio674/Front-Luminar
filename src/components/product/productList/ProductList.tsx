import { useState, useEffect, useContext } from 'react';
import { find } from '../../../services/Services';
import { toastAlert } from '../../../util/toastAlert';
import CardProduct from '../productCard/productCard';
import Products from '../../../models/Products';
import { AuthContext } from '../../../contexts/AuthContext';

interface ProductListProps {
  isAdmin?: boolean; // Recebe a prop isAdmin
  limit?: number; // Nova prop para definir o limite de produtos
}

function ProductList({ isAdmin = false, limit }: ProductListProps) {
  const [products, setProducts] = useState<Products[]>([]);
  const { user } = useContext(AuthContext);
  const token = user.token;

  useEffect(() => {
    findProducts();
  }, []);

  async function findProducts() {
    try {
      await find('/product', setProducts, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        toastAlert('An error occurred while fetching products', 'info');
      }
    }
  }

  return (
    <>
      {products.length === 0 && (
        <div className="container min-h-screen my-1 flex flex-col justify-center items-center">
          <div className="text-center mt-4">
            <h2 className="text-2xl font-bold mb-2">No products found</h2>
            <p className="text-gray-600">
              There are currently no products available; please check back later.
            </p>
          </div>
        </div>
      )}
      <div className="container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
        {/* Exibe apenas os produtos limitados pela prop "limit" */}
        {products.slice(0, limit).map((product) => (
          <CardProduct key={product.id} product={product} isAdmin={isAdmin} />
        ))}
      </div>
    </>
  );
}

export default ProductList;
