import twilio from 'twilio';

const TWILIO_ACCOUNT_SID='AC0fb5e73fc214fe994d00bb1b4ab422fb'
const TWILIO_AUTH_TOKEN='b5aaa8f6c2049bf19811470e346d22dc'

export const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
