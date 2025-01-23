export const signUp = async (userData) => {
  try {
    const response = await fetch("https://backend-production-fb28.up.railway.app/auth/sign-up", {
      method: "POST",
      mode: "cors",  // ✅ Ensure CORS is enabled from the browser side
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log("Sign-Up Response:", data);

    if (!response.ok) {
      throw new Error(data.message || "Sign-Up failed");
    }

    return data;
  } catch (error) {
    console.error("Error during Sign-Up:", error);
    return { error: error.message };
  }
};

export const signIn = async (credentials) => {
  try {
    const response = await fetch("https://backend-production-fb28.up.railway.app/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    console.log("Sign-In Response:", data);

    if (!response.ok) {
      throw new Error(data.message || "Sign-In failed");
    }

    return data;
  } catch (error) {
    console.error("Error during Sign-In:", error);
    return { error: error.message };
  }
};
