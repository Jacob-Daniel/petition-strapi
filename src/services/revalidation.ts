export const revalidateISR = async (paths) => {
	try {
		for (const path of paths) {
			const apiUrl = `${process.env.NEXT_FRONTEND_URL}/api/revalidate?secret=${process.env.NEXT_ISR_TOKEN}&path=${encodeURIComponent(path)}`;
			const response = await fetch(apiUrl);

			if (!response.ok) {
				const errorData = await response.json();
				console.error(`Failed to revalidate ${path}:`, errorData);
			} else {
				const successData = await response.json();
				console.log(
					`Successfully revalidated ${apiUrl}`,
					`Response: ${JSON.stringify(successData)}`,
				);
			}
		}
	} catch (error) {
		console.error("Error in ISR revalidation:", error);
	}
};
