import axios, { AxiosError } from 'axios';
import { readFileSync } from 'fs';
import { NodeStream, RequestData, TwitchGame, TwitchResponse, TwitchUser } from './@types/RequestTypes';

export default class TwitchClient {
    clientID = 'kimne78kx3ncx6brgo4mv6wki5h1ko';

    constructor(clientID?: string) {
        if (clientID) {
            this.clientID = clientID;
        }
    }

    endpoint = 'https://gql.twitch.tv/gql';

    /**
     * Request Twitch Data
     * @param {string} schema The GQL Schema
     * @param {object} variables The variables needed for the request
     * @returns {TwitchResponse}
     */

    async request(schema: string, variables: object): Promise<TwitchResponse> {
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

            if (request.data.errors) throw new Error(JSON.stringify(request.data.errors, null, 3));

            return request.data as TwitchResponse;
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

        if (!request.data) throw new Error('No response data.');

        return request.data?.user;
    }

    /**
     * Fetches a twitch game and returns its info, null if not found.
     * @param {string} name The name of the game. Eg Rocket League.
     * @returns {TwitchGame | null}
     */

    async fetchGameByName(name: string): Promise<TwitchGame> {
        const schema = readFileSync(`${__dirname}/../schemas/getGame.gql`).toString();

        const request = await this.request(schema, {
            name
        });

        if (!request.data) throw new Error('No response data.');

        return request.data?.game;
    }

    /**
     * Fetches the trending Twitch Feed, null or undefined if not found
     * @param {string} limit The amount of posts to fetch.
     * @returns {NodeStream[] | null | undefined}
     */

    async fetchTrendingFeed(limit: number): Promise<NodeStream[] | null | undefined> {
        const schema = readFileSync(`${__dirname}/../schemas/getFeed.gql`).toString();

        const request = await this.request(schema, {
            limit,
            platformType: 'all'
        });

        if (!request.data) throw new Error('No response data.');

        return request.data.streams?.edges;
    }
}
