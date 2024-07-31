import * as line from '@line/bot-sdk';
// create LINE SDK client
export const client = new line.messagingApi.MessagingApiClient({
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
});
//# sourceMappingURL=client.js.map