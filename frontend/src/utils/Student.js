const Student = {
  getProfile: async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/student/profile`,
      { credentials: "include" }
    );
    if (response.status !== 401) {
      return await response.json();
    }
  },
  getRatings: async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/student/ratings`,
      {
        credentials: "include",
      }
    );
    if (response.status !== 401) {
      return await response.json();
    }
  },
  rate: async (id, type) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/student/ratings/${id}`,
      {
        method: "post",
        body: JSON.stringify({ type: type }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return { data, status: response.status };
  },
};

export default Student;
