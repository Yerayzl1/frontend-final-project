export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: {
    name: "Client" | "Admin" | "Professional";
  };
  phone_number: string;
  is_active: boolean;
}

export async function UsersData({
  page = 1,
  limit = 10,
  query = "",
}: {
  page?: number;
  limit?: number;
  query?: string;
}) {
  try {
    let queryParams = `?page=${page}&limit=${limit}`;
    if (query) {
      queryParams += `&name=${query}&email=${query}&username=${query}`;
    }

    const response = await fetch(`http://localhost:8000/api/users/search${queryParams}`, {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      data: [],
      page: 1,
      limit: 10,
      total_pages: 0,
      total_elements: 0,
    };
  }
}
