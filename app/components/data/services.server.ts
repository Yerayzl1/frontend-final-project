import { json } from "@remix-run/node";

export async function ServicesData() {
  try {
    const servicesResponse = await fetch("http://localhost:8000/api/services", {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });

    if (!servicesResponse.ok) {
      throw new Error("Failed to fetch services");
    }
    const services = await servicesResponse.json();

    return json({ services: services.data });
  } catch (err) {
    console.error("Loader Error:", err.message);
    throw new Response("Failed to load data", { status: 500 });
  }
}