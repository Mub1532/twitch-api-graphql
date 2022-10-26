import TwitchClient from "./src";

const client = new TwitchClient("kimne78kx3ncx6brgo4mv6wki5h1ko");

async function ok(){
    const lmao = await client.fetchUserByID("32787655")

    console.log(JSON.stringify(lmao, null,3))
}

ok()