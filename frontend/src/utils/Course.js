const Course = {
  getLikes: async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/course/likes`,
      { credentials: "include" }
    );
    if (response.status !== 401) {
      const data = await response.json();
      return data;
    }
  },
};

export default Course;