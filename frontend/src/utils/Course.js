const Course = {
  getLikes: async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/likes`, {
      credentials: "include",
    });
    if (response.status !== 401) {
      return await response.json();
    }
  },
  getCourses: async (page = 1, keyword) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/courses?keyword=${keyword}&page=${page}`,
      { credentials: "include" }
    );
    if (response.status !== 401) {
      const results = await response.json();
      return {
        results: results.data,
        nextPage: page + 1,
        totalPages: results.pagination.lastPage,
      };
    }
  },
};

export default Course;
