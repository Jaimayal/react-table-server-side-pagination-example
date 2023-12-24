const responses = {
	1: {
		data: [
			{
				id: 1,
				title: "Post 1",
				content: "Lorem ipsum dolor sit amet.",
				category: "Technology",
			},
		],
		pagination: {
			total_records: 3,
			current_page: 1,
			total_pages: 3,
			next_page: 2,
			prev_page: null,
		},
	},
	2: {
		data: [
			{
				id: 2,
				title: "Post 2",
				content: "Praesent fermentum orci in ipsum.",
				category: "Sports",
			},
		],
		pagination: {
			total_records: 3,
			current_page: 2,
			total_pages: 3,
			next_page: 3,
			prev_page: 1,
		},
	},
	3: {
		data: [
			{
				id: 3,
				title: "Post 3",
				content: "Vestibulum ante ipsum primis in faucibus.",
				category: "Fashion",
			},
		],
		pagination: {
			total_records: 3,
			current_page: 3,
			total_pages: 3,
			next_page: null,
			prev_page: 2,
		},
	},
};

export async function fetchPosts(page: number) {
	const data = await new Promise((resolve) =>
		setTimeout(() => resolve(responses[page]), 500)
	);
	return data;
}
