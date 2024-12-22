const accountSid = 'AC0c7c7777388b80f7a9b527760047b426';
const authToken = '74a69cbbf23fe3342bed10f6d825214c';
const client = new twilio(accountSid, authToken);

const sendMessagetoMobile = (phone, message) => {
    client.messages
        .create({
            body: message,
            messagingServiceSid: 'MGbad243ebc2b4e123f566d026ce3f29a5',
            to: `+91${phone}`
        })
        .then(message => console.log(message.sid));
}
