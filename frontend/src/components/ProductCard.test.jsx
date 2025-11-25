import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';

describe('ProductCard', () => {
  // Datos de prueba
  const mockProduct = {
    id: 1,
    title: 'Producto de prueba',
    price: 150,
    description: 'Una descripción de prueba para el producto',
    thumbnail: 'https://dummyimage.com/300x300/cccccc/969696.png&text=Producto',
  };

  it('debería renderizar todos los elementos del producto', () => {
    // Renderizar el componente con datos de prueba
    render(<ProductCard product={mockProduct} />);

    // Verificar que todos los elementos estén presentes
    expect(screen.getByText(/Producto de prueba/i)).toBeInTheDocument();

    // Descripción (usando regex para no depender de truncado)
    expect(
      screen.getByText(/Una descripción de prueba/i)
    ).toBeInTheDocument();

    // Precio
    expect(screen.getByText(/150/)).toBeInTheDocument();

    // Verificar que la imagen tenga los atributos correctos
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockProduct.thumbnail);
    expect(image).toHaveAttribute('alt', mockProduct.title);
  });

  it('debería mostrar el precio con el símbolo de dinero', () => {
    render(<ProductCard product={mockProduct} />);

    // Verificar que el precio se muestre con el formato correcto
    expect(screen.getByText('💲 150')).toBeInTheDocument();
  });
});