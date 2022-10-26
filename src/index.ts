import axios, { AxiosError } from 'axios';
import { readFileSync } from 'fs';
import { RequestData, TwitchGame, TwitchUser } from '../@types/RequestTypes';

export default class TwitchClient {
    clientID = 'kimne78kx3ncx6brgo4mv6wki5h1ko';

    constructor(clientID?: string) {
        if (clientID) {
            this.clientID = clientID;
        }
    }

    endpoint = 'https://gql.twitch.tv/gql';

    async request(schema: string, variables: Object) {
        try {
            const body = {
                query: schema,
                variables
            } as RequestData;

            const request = await axios(this.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=UTF-8',
                    'Client-Id': this.clientID
                },
                data: JSON.stringify(body)
            });

            return request.data;
        } catch (err) {
            const error = err as AxiosError;
            if (error.response?.status === 400) {
                throw new Error('Error: Invalid Client ID Provided.');
            } else {
                throw new Error(error.message);
            }
        }
    }

    /**
     * Fetches a twitch user and returns their info and streaming status, if there is no user it will return null.
     * @param {string} userID The Twitch ID of the user you want to fetch.
     * @returns {TwitchUser | null}
     */

    async fetchUserByID(userID: string): Promise<TwitchUser | null> {
        const schema = readFileSync(`${__dirname}/../schemas/getUser.gql`).toString();

        const request = await this.request(schema, {
            id: userID
        });

        return request.data.user as TwitchUser | null;
    }

    /**
     * Fetches a twitch game and returns its info, null if not found.
     * @param {string} name The name of the game. Eg Rocket League.
     * @returns {TwitchGame | null}
     */

    async fetchGameByName(name: string): Promise<TwitchGame | null> {
        const schema = readFileSync(`${__dirname}/../schemas/getGame.gql`).toString();

        const request = await this.request(schema, {
            name
        });

        return request.data.game as TwitchGame | null;
    }
}
