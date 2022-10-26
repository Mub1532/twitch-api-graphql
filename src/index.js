"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs_1 = require("fs");
class TwitchClient {
    constructor(clientID) {
        this.clientID = 'kimne78kx3ncx6brgo4mv6wki5h1ko';
        this.endpoint = 'https://gql.twitch.tv/gql';
        if (clientID) {
            this.clientID = clientID;
        }
    }
    async request(schema, variables) {
        try {
            const body = {
                query: schema,
                variables
            };
            const request = await (0, axios_1.default)(this.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=UTF-8',
                    'Client-Id': this.clientID
                },
                data: JSON.stringify(body)
            });
            return request.data;
        }
        catch (err) {
            const error = err;
            if (error.response?.status === 400) {
                throw new Error('Error: Invalid Client ID Provided.');
            }
            else {
                throw new Error(error.message);
            }
        }
    }
    /**
     * Fetches a twitch user and returns their info and streaming status, if there is no user it will return null.
     * @param {string} userID The Twitch ID of the user you want to fetch.
     * @returns {TwitchUser | null}
     */
    async fetchUserByID(userID) {
        const schema = (0, fs_1.readFileSync)(`${__dirname}/../schemas/getUser.gql`).toString();
        const request = await this.request(schema, {
            id: userID
        });
        return request.data.user;
    }
    /**
     * Fetches a twitch game and returns its info, null if not found.
     * @param {string} name The name of the game. Eg Rocket League.
     * @returns {TwitchGame | null}
     */
    async fetchGameByName(name) {
        const schema = (0, fs_1.readFileSync)(`${__dirname}/../schemas/getGame.gql`).toString();
        const request = await this.request(schema, {
            name
        });
        return request.data.game;
    }
}
exports.default = TwitchClient;
