const featuredEvents = {
	routes: [
		{
			method: "GET",
			path: "/myPetitions",
			handler: "user-petitions.getUserPetitions",
			config: { auth: {} },
		},
	],
};
export default featuredEvents;
