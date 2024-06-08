import axios from "@/utils/axiosConfig";

export async function POST(request) {
  const body = await request.json();

  try {
    const response = await axios.post("/auth/register", body);
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.response.data.message }),
      {
        status: error.response.status,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
