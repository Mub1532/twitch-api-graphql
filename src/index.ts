import axios, { AxiosError } from 'axios';
import { RequestData, TwitchUser } from "../@types/RequestTypes";

export default class TwitchClient {
    clientID = "kimne78kx3ncx6brgo4mv6wki5h1ko";
    
    constructor(clientID?: string){
        if(clientID){
            this.clientID = clientID;
        }
    }

    endpoint = 'https://gql.twitch.tv/gql';

    async request(schema: string, variables: Object){
            try {

                const body = {
                    query: schema,
                    variables
                } as RequestData;
                
                const request = await axios(this.endpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain;charset=UTF-8",
                        "Client-Id": this.clientID
                    },
                    data: JSON.stringify(body)
                })
    
                return request.data;                
            } catch(err){
                const error = err as AxiosError;
                if(error.response?.status === 400){
                    throw 'Error: Invalid Client ID Provided.';
                } else{
                    throw error;
                }
            }
    }

    async fetchUserByID(userID: string){
        const schema = `query fetchUserByID($id: ID!) {
            user(id: $id) {
              id
              login
              displayName
              description
              createdAt
              profileImageURL(width:70){}
              roles {
                isPartner
              }
              stream {
                id
                title
                type
                viewersCount
                createdAt
                previewImageURL
                game {
                id
                displayName
                avatarURL
                description
                followersCount
                }
              }
            }
          }
          `

        const request = await this.request(schema, {
            id: userID
        })

        return request.data.user as TwitchUser | null;
    }
}