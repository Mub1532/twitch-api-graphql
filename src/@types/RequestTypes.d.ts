export declare type RequestData = {
    variables?: Object;
    query?: string;
};
export declare type TwitchRoles = {
    isPartner: boolean;
};
export declare type TwitchGame = {
    id: string;
    displayName: string;
    avatarURL: string;
    description: string;
    followersCount: number;
} | null;
export declare type TwitchStream = {
    id: string;
    title: string;
    type: string;
    viewersCount: number;
    createdAt: Date;
    previewImageURL: string | null;
    game: TwitchGame | null;
    broadcaster?: TwitchUser;
};
export declare type NodeStream = {
    node: {
        id: string;
        title: string;
        previewImageURL: string;
        type: string;
        viewersCount: number;
        game: TwitchGame;
        broadcaster: SimpleTwitchUser;
    };
};
declare type SimpleTwitchUser = {
    id: string;
    displayName: string;
    login: string;
    profileImageURL: string;
};
export interface TwitchUser extends SimpleTwitchUser {
    description: string;
    createdAt: Date;
    roles: TwitchRoles;
    stream: TwitchStream | null;
}
export declare type TrendingStream = {
    edges: NodeStream[];
};
export declare type TwitchResponse = {
    data: {
        user: TwitchUser | null;
        game: TwitchGame;
        streams: TrendingStream | null;
    };
};
export declare type TwitchError = {
    message: string;
    locations: string[];
};
export {};
