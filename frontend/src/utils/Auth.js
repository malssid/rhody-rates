const Auth = {
  signIn: async (user) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/student/signin`,
      {
        method: "post",
        body: JSON.stringify(user),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  },
  signUp: async (user) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/student/signup`,
      {
        method: "post",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return { data, status: response.status };
  },
  signOut: async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/student/signout`,
      {
        credentials: "include",
      }
    );
    const data = await response.json();
    return data;
  },
  isAuthenticated: async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/student/authenticated`,
      { credentials: "include" }
    );
    if (response.status !== 401) {
      const data = await response.json();
      return data;
    } else {
      return {
        isAuthenticated: false,
        user: { username: "" },
      };
    }
  },
};

export default Auth;
