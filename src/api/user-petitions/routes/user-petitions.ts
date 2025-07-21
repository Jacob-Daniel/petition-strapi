const userPetitions = {
	routes: [
		{
			method: "GET",
			path: "/user-petitions",
			handler: "user-petitions.getUserPetitions",
			config: { auth: {} },
		},
		{
			method: "GET",
			path: "/user-petitions/:documentId/generate-pdf",
			handler: "user-petitions.generatePetitionPdf",
			config: { auth: {} },
		},
	],
};
export default userPetitions;
