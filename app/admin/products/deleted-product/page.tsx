import { getDeletedProduct } from '@/lib/products';
import React from 'react'
import DeletedProductsTable from '../components/deletedProducts';

const DeletedProducts = async() => {

  const res = await getDeletedProduct();

  const result = res.data;


  return (
    <div>
      <DeletedProductsTable initialProducts={result} />
    </div>
  );
}

export default DeletedProducts;