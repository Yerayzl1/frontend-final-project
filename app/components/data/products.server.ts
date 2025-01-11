export interface Product {
  id: number;
  name: string;
  price: string;
  stock: number;
  status: string;
}

export async function ProductsData({ page = 1, limit = 10, query = "" }: { page?: number; limit?: number; query?: string }) {
  try {
    let queryParams = `?page=${page}&limit=${limit}`;
    if (query) {
      queryParams += `&name=${query}&price=${query}&stock=${query}`;
    }

    const response = await fetch(
      `http://localhost:8000/api/products/search${queryParams}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products.");
    }

    const data = await response.json();
    return {
      products: data.data,
      total_elements: data.total_elements,
      total_pages: data.total_pages,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      products: [],
      total_elements: 0,
      total_pages: 0,
    };
  }
}
