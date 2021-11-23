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
};

export default Student;
