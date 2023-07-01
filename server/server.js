//////////////////////// EASYJOB

const https = require("https");
const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const axios = require("axios");

const cookieSession = require("cookie-session");
const { SESSION_SECRET } = require("./secrets.json");
const { Server } = require("http");
const server = Server(app);

const secrets = require("./secrets");
const FB_ACCESS_TOKEN = secrets.FB_ACCESS_TOKEN;
// const FB_ACCOUNT_ID = secrets.FB_ACCOUNT_ID;
const FB_CAMPAIGN_ID = secrets.FB_CAMPAIGN_ID;
const FB_CAMPAIGN_ID_ALT = secrets.FB_CAMPAIGN_ID_ALT;
const MAILCHIMP_KEY = secrets.MAILCHIMP_KEY;
const MAILCHIMP_DC = secrets.MAILCHIMP_DC;
const MAILCHIMP_AUDIENCE_ID = secrets.MAILCHIMP_AUDIENCE_ID;

const CHATGPT_KEY = secrets.CHATGPT_KEY;

///////////////////////// MIDDLEWARE

const helmet = require("helmet");
app.use(helmet());
app.use(compression());
app.use(express.static(path.join(__dirname, "..", "src", "public")));
app.use(express.static(path.resolve(__dirname, "../src/")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const cookieSessionMiddleware = cookieSession({
    secret: SESSION_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 14,
});
app.use(cookieSessionMiddleware);

///////////////////////////////////// SLACK

app.post("/api/slack", (request, response) => {
    // change webhook to certain channel
    const webhookURL = `SLACK WEBHOOK URL
    `; //insert webhook url
    axios
        .post(webhookURL, { blocks: request.body.blocks })
        .then(() => {
            console.log("BOT SUCCESS: message sent!");
        })
        .catch(() => {
            console.log("BOT ERROR : NOT SENT");
        });
});

app.post("/api/slackdeal", (request, response) => {
    // change webhook to certain channel
    const webhookURL = `SLACK WEBHOOK URL 
    `; //insert webhook url
    axios
        .post(webhookURL, { blocks: request.body.blocks })
        .then(() => {
            console.log("BOT SUCCESS: message sent!");
        })
        .catch(() => {
            console.log("BOT ERROR : NOT SENT");
        });
});
///////////////////////////////////// GOOGLE ANALYTICS

const { mainFetch } = require("../src/apibased/google/analyticstest.js");

app.get("/api/google", async (request, response) => {
    const toFetch = await mainFetch();
    response.json({ message: toFetch });
});

///////////////////////////////////// Facebook Ads

app.get("/api/facebook/reach", async (request, response) => {
    const toFetch = await axios.get(
        "https://graph.facebook.com/v15.0/" + FB_CAMPAIGN_ID + "/insights",
        {
            params: {
                date_preset: "last_7d",
                fields: "impressions",
                access_token: FB_ACCESS_TOKEN,
            },
        }
    );

    const toFetch2 = await axios.get(
        "https://graph.facebook.com/v15.0/" + FB_CAMPAIGN_ID + "/insights",
        {
            params: {
                date_preset: "last_14d",
                fields: "impressions",
                access_token: FB_ACCESS_TOKEN,
            },
        }
    );

    const fetchedThisWeek = toFetch.data.data[0].impressions;
    const fetchedLast14 = toFetch2.data.data[0].impressions;

    response.json({ thisWeek: fetchedThisWeek, lastWeek: fetchedLast14 });
});

app.get("/api/facebook/ctr", async (request, response) => {
    const toFetch = await axios.get(
        "https://graph.facebook.com/v15.0/" + FB_CAMPAIGN_ID + "/insights",
        {
            params: {
                date_preset: "last_7d",
                fields: "ctr",
                access_token: FB_ACCESS_TOKEN,
            },
        }
    );
    const toFetch2 = await axios.get(
        "https://graph.facebook.com/v15.0/" + FB_CAMPAIGN_ID + "/insights",
        {
            params: {
                date_preset: "last_14d",
                fields: "ctr",
                access_token: FB_ACCESS_TOKEN,
            },
        }
    );

    const fetchedThisWeek = toFetch.data.data[0].ctr;
    const fetchedLast14 = toFetch2.data.data[0].ctr;

    response.json({ thisWeek: fetchedThisWeek, lastWeek: fetchedLast14 });
});

app.get("/api/facebook/cpc", async (request, response) => {
    const toFetch = await axios.get(
        "https://graph.facebook.com/v15.0/" + FB_CAMPAIGN_ID + "/insights",
        {
            params: {
                date_preset: "last_7d",
                fields: "cpc",
                access_token: FB_ACCESS_TOKEN,
            },
        }
    );
    const toFetch2 = await axios.get(
        "https://graph.facebook.com/v15.0/" + FB_CAMPAIGN_ID + "/insights",
        {
            params: {
                date_preset: "last_14d",
                fields: "cpc",
                access_token: FB_ACCESS_TOKEN,
            },
        }
    );

    const fetchedThisWeek = toFetch.data.data[0].cpc;
    const fetchedLast14 = toFetch2.data.data[0].cpc;

    response.json({ thisWeek: fetchedThisWeek, lastWeek: fetchedLast14 });
});

///////////////////////////////////// FB Secondary

app.get("/api/facebook/reachSecondary", async (request, response) => {
    const toFetch = await axios.get(
        "https://graph.facebook.com/v15.0/" + FB_CAMPAIGN_ID_ALT + "/insights",
        {
            params: {
                date_preset: "last_7d",
                fields: "impressions",
                access_token: FB_ACCESS_TOKEN,
            },
        }
    );

    const toFetch2 = await axios.get(
        "https://graph.facebook.com/v15.0/" + FB_CAMPAIGN_ID_ALT + "/insights",
        {
            params: {
                date_preset: "last_14d",
                fields: "impressions",
                access_token: FB_ACCESS_TOKEN,
            },
        }
    );
    const fetchedThisWeek = toFetch.data.data[0].impressions;
    const fetchedLast14 = toFetch2.data.data[0].impressions;

    response.json({ thisWeek: fetchedThisWeek, lastWeek: fetchedLast14 });
});

app.get("/api/facebook/ctrSecondary", async (request, response) => {
    const toFetch = await axios.get(
        "https://graph.facebook.com/v15.0/" + FB_CAMPAIGN_ID_ALT + "/insights",
        {
            params: {
                date_preset: "last_7d",
                fields: "ctr",
                access_token: FB_ACCESS_TOKEN,
            },
        }
    );
    const toFetch2 = await axios.get(
        "https://graph.facebook.com/v15.0/" + FB_CAMPAIGN_ID_ALT + "/insights",
        {
            params: {
                date_preset: "last_14d",
                fields: "ctr",
                access_token: FB_ACCESS_TOKEN,
            },
        }
    );

    const fetchedThisWeek = toFetch.data.data[0].ctr;
    const fetchedLast14 = toFetch2.data.data[0].ctr;

    response.json({ thisWeek: fetchedThisWeek, lastWeek: fetchedLast14 });
});

app.get("/api/facebook/cpcSecondary", async (request, response) => {
    const toFetch = await axios.get(
        "https://graph.facebook.com/v15.0/" + FB_CAMPAIGN_ID_ALT + "/insights",
        {
            params: {
                date_preset: "last_7d",
                fields: "cpc",
                access_token: FB_ACCESS_TOKEN,
            },
        }
    );
    const toFetch2 = await axios.get(
        "https://graph.facebook.com/v15.0/" + FB_CAMPAIGN_ID_ALT + "/insights",
        {
            params: {
                date_preset: "last_14d",
                fields: "cpc",
                access_token: FB_ACCESS_TOKEN,
            },
        }
    );

    const fetchedThisWeek = toFetch.data.data[0].cpc;
    const fetchedLast14 = toFetch2.data.data[0].cpc;

    response.json({ thisWeek: fetchedThisWeek, lastWeek: fetchedLast14 });
});

///////////////////////////////////// mailchimp

app.get("/api/mailchimp", async (request, response) => {
    const toFetch = await axios.get(
        "https://" +
            MAILCHIMP_DC +
            ".api.mailchimp.com/3.0/lists/" +
            MAILCHIMP_AUDIENCE_ID,
        {
            auth: {
                username: "anystring",
                password: MAILCHIMP_KEY,
            },
        }
    );
    const stats = toFetch.data.stats;
    const subs = stats.member_count;
    const openRate = stats.open_rate;
    const clickRate = stats.click_rate;
    const unsubs = stats.unsubscribe_count;
    const unsubsLastPost = stats.unsubscribe_count_since_send;
    const subsLastPost = stats.member_count_since_send;
    const members = subs + unsubs;
    response.json({
        subs: subs,
        openRate: openRate,
        clickRate: clickRate,
        unsubs: unsubs,
        members: members,
        unsubSince: unsubsLastPost,
        subsSince: subsLastPost,
    });
});

///////////////////////////////////// Awwwards Website of the day

app.get("/api/wotd", async (request, response) => {
    const toFetch = await axios.get(
        "https://www.awwwards.com/api/annual/categories",
        {
            params: {
                page: "1",
            },
            headers: {
                accept: "application/json",
            },
        }
    );
    const fetchID = toFetch.data[0].nominees;
    const fetchRandomID = fetchID[Math.floor(Math.random() * fetchID.length)];

    const toFetchRandom = await axios.get(
        "https://www.awwwards.com/api/annual/nominees/sites/" + fetchRandomID,
        {
            headers: {
                accept: "application/json",
            },
        }
    );
    response.json({ message: toFetchRandom.data });
});

///////////////////////////////////// CHATGPT

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: CHATGPT_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/api/chatgpt", async (request, response) => {
    const toFetch = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: request.body.prompt,
        temperature: 0.5,
        max_tokens: 2000,
    });
    response.json(toFetch.data.choices[0].text);
});

app.post("/api/chatgptpictures", async (request, response) => {
    const toFetch = await openai.createImage({
        prompt: request.body.prompt,
        n: 1,
        size: "1024x1024",
    });
    response.json(toFetch.data.data[0].url);
});

app.post("/api/chatgptcode", async (request, response) => {
    const toFetch = await openai.createCompletion({
        model: "code-davinci-002",
        prompt: request.body.prompt,
        temperature: 0.5,
        max_tokens: 3500,
        top_p: 1,
        frequency_penalty: 0.52,
        presence_penalty: 0.53,
    });
    response.json(toFetch.data.choices[0].text);
});

///////////////////////////////////// Quote of the Day

app.get("/api/qotd", async (request, response) => {
    const toFetch = await axios.get("https://zenquotes.io/api/today/", {});

    response.send({ message: toFetch.data });
});

/////////////////////////////////////

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

server.listen(process.env.PORT || 3001, () => {
    console.log("I'm listening.");
});
