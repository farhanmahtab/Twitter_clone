export async function getUserbyEmailorID(email, id) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // Create a body object
  const raw = JSON.stringify({
    email: email,
    id: id,
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  // Use try-catch to handle errors
  try {
    // Use await to wait for the fetch response
    const response = await fetch("/api/v2/users/user", requestOptions);

    return await response.json();
  } catch (error) {
    // Log the error
    throw new Error(error);
  }
}
