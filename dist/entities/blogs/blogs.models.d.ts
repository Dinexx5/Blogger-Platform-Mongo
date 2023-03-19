export declare class blogParamModel {
    blogId: string;
}
export declare class BanBlogModel {
    isBanned: boolean;
}
export declare class blogAndPostParamModel {
    blogId: string;
    postId: string;
}
export declare class blogAndUserParamModel {
    blogId: string;
    userId: string;
}
export declare class blogViewModel {
    id: string;
    name: string;
    description: string;
    isMembership: boolean;
    websiteUrl: string;
    createdAt: string;
    constructor(id: string, name: string, description: string, isMembership: boolean, websiteUrl: string, createdAt: string);
}
export declare class blogSAViewModel {
    id: string;
    name: string;
    description: string;
    isMembership: boolean;
    websiteUrl: string;
    createdAt: string;
    blogOwnerInfo: object;
    banInfo: object;
    constructor(id: string, name: string, description: string, isMembership: boolean, websiteUrl: string, createdAt: string, blogOwnerInfo: object, banInfo: object);
}
