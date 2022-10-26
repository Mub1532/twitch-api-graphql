export type RequestData = {
    variables?: Object;
    query?: string;
}

export type TwitchRoles = { isPartner: boolean };

export type TwitchGame = {
    id: string;
    displayName: string;
    avatarURL: string;
    description: string;
    followersCount: number;
};

export type TwitchStream = {
    id: string;
    title: string;
    type: string;
    viewersCount: number;
    createdAt: Date;
    previewImageURL: string | null;
    game: TwitchGame | null;
};

export type TwitchUser = {
            id: string;
            login: string;
            displayName: string;
            description: string;
            createdAt: Date;
            roles: TwitchRoles;
            profileImageURL: string;
            stream: TwitchStream | null;
};