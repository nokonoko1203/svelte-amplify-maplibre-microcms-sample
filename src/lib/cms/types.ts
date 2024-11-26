type MicrocmsImage = {
	url: string;
	height: number;
	width: number;
};

export type PostCategory = {
	id: string;
	name: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	revisedAt: string;
};

export type Post = {
	id: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	revisedAt: string;
	title: string;
	content: string;
	eyecatch: MicrocmsImage;
	category: PostCategory;
};

/**
 * MicroCMSのリスト型
 */
export type List<T> = {
	contents: T[];
	totalCount: number;
	offset: number;
	limit: number;
};
