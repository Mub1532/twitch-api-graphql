import { TwitchGame, TwitchUser } from '../@types/RequestTypes';
export default class TwitchClient {
    clientID: string;
    constructor(clientID?: string);
    endpoint: string;
    request(schema: string, variables: Object): Promise<any>;
    /**
     * Fetches a twitch user and returns their info and streaming status, if there is no user it will return null.
     * @param {string} userID The Twitch ID of the user you want to fetch.
     * @returns {TwitchUser | null}
     */
    fetchUserByID(userID: string): Promise<TwitchUser | null>;
    /**
     * Fetches a twitch game and returns its info, null if not found.
     * @param {string} name The name of the game. Eg Rocket League.
     * @returns {TwitchGame | null}
     */
    fetchGameByName(name: string): Promise<TwitchGame | null>;
}
