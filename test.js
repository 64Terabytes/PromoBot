let clinetId = "CLIENT_ID_HERE";
let clinetSecret = "CLINET_SECRET_HERE";

function getTwitchAuthorization() {
    let url = `https://id.twitch.tv/oauth2/token?client_id=${clinetId}&client_secret=${clinetSecret}&grant_type=client_credentials`;

    return fetch(url, {
    method: "POST",
    })
    .then((res) => res.json())
    .then((data) => {
        return data;
    });
}

async function getStreams() {
    const endpoint = "https://api.twitch.tv/helix/streams";

    let authorizationObject = await getTwitchAuthorization();
    let { access_token, expires_in, token_type } = authorizationObject;

    //token_type first letter must be uppercase    
    token_type =
    token_type.substring(0, 1).toUpperCase() +
    token_type.substring(1, token_type.length);

    let authorization = `${token_type} ${access_token}`;

    let headers = {
    authorization,
    "Client-Id": clinetId,
    };

    fetch(endpoint, {
    headers,
    })
    .then((res) => res.json())
    .then((data) => renderStreams(data));
}

function renderStreams(data) {
    document.body.innerHTML = `
${JSON.stringify(data)}
`;
}

getStreams();