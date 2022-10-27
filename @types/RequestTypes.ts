export type RequestData = {
    variables?: Object;
    query?: string;
};

export type TwitchRoles = { isPartner: boolean };

export type TwitchGame = {
    id: string;
    displayName: string;
    avatarURL: string;
    description: string;
    followersCount: number;
} | null;

export type TwitchStream = {
    id: string;
    title: string;
    type: string;
    viewersCount: number;
    createdAt: Date;
    previewImageURL: string | null;
    game: TwitchGame | null;
    broadcaster?: TwitchUser;
};

export type NodeStream = {
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

type SimpleTwitchUser = {
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

export type TrendingStream = {
    edges: NodeStream[];
};

export type TwitchResponse = {
    data: {
        user: TwitchUser | null;
        game: TwitchGame;
        streams: TrendingStream | null;
    };
};

export type TwitchError = {
    message: string;
    locations: string[];
};
