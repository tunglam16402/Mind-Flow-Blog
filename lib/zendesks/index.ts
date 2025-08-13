import zendesk from "node-zendesk";

const ZENDESK_USERNAME = process.env.ZENDESK_EMAIL || "";
const ZENDESK_API_TOKEN = process.env.ZENDESK_API_TOKEN || "";
const ZENDESK_SUBDOMAIN = process.env.ZENDESK_SUBDOMAIN || "";

export const client = zendesk.createClient({
  username: ZENDESK_USERNAME,
  token: ZENDESK_API_TOKEN,
  subdomain: ZENDESK_SUBDOMAIN,
});
