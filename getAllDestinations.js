export async function getData() {
  const url = "http://127.0.0.1:3003/destinations";
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const destinations = await response.json();

    return destinations;
  } catch (error) {
    console.error(error);
  }
}

// window.addEventListener("load", getData);
