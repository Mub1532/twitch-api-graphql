# Twitch Graph QL API Wrapper

## Example

### Fetching a user by their Twitch ID:

```ts
import TwitchClient from "@Mub1532/twitch-api-graphql";

const client = new TwitchClient(<clientID>: optional);

async function example(){
    const streamer = await client.fetchUserByID("32787655");
    
    console.log(streamer);
}

example()
```

Returns: 

```json
{
   "id": "32787655",
   "login": "kitboga",
   "displayName": "Kitboga",
   "description": "Improv artist who calls scammers and likes to explore the internet. Laughter is the best medicine.",
   "createdAt": "2012-08-06T23:53:09.42876Z",
   "profileImageURL": "https://static-cdn.jtvnw.net/jtv_user_pictures/626267a4-91d7-42cf-87c1-593eafd020da-profile_image-70x70.png",
   "roles": {
      "isPartner": true
   },
   "stream": {
      "id": "47368726557",
      "title": "[Ep. 1165] Calling Strange New Scams !aura",
      "type": "live",
      "viewersCount": 7878,
      "createdAt": "2022-10-26T15:11:36Z",
      "previewImageURL": "https://static-cdn.jtvnw.net/previews-ttv/live_user_kitboga-{width}x{height}.jpg",
      "game": {
         "id": "509658",
         "displayName": "Just Chatting",
         "avatarURL": "https://static-cdn.jtvnw.net/ttv-boxart/509658-{width}x{height}.jpg",
         "description": null,
         "followersCount": 21088104
      }
   }
}
```
