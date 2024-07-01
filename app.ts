import { WebClient } from "@slack/web-api";
import { Handler } from "aws-lambda";

import { SLACK_CHANNEL_ID } from "./config";
import { getTodaysFact } from "./api/useless-facts-jsph";

if (process.env.NODE_ENV !== "prod") {
  require("dotenv").config();
}

const slackClient = new WebClient(process.env.SLACK_BOT_TOKEN);

console.log("Slack app is running!");

export const handler: Handler = async () => {
  console.log("Starting the lambda function");
  const factOfTheDay = await getTodaysFact();
  console.log("Sending message to Slack channel");

  try {
    await slackClient.chat.postMessage({
      channel: SLACK_CHANNEL_ID,
      text: factOfTheDay,
    });
  } catch (error) {
    console.error(error);
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify("Slack message sent!"),
  };
  return response;
};
