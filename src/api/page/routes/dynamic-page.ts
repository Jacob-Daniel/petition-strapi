export default {
  routes: [
    {
      method: "GET",
      path: "/pages/filtered",
      handler: "dynamic-page.filteredPages",
      config: {
        auth: false,
      },
    },
  ],
};
