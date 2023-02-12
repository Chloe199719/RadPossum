import PocketBase from "./node_modules/pocketbase";

const pb = new PocketBase(process.env.DB_URL);

export default pb;
