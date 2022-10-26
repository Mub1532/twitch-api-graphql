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
};
export declare type TwitchStream = {
    id: string;
    title: string;
    type: string;
    viewersCount: number;
    createdAt: Date;
    previewImageURL: string | null;
    game: TwitchGame | null;
};
export declare type TwitchUser = {
    id: string;
    login: string;
    displayName: string;
    description: string;
    createdAt: Date;
    roles: TwitchRoles;
    profileImageURL: string;
    stream: TwitchStream | null;
};
