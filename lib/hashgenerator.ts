import { randomBytes } from "crypto";
/* @ts-expect-error */
import { RandomHash } from "random-hash";

const Hash = new RandomHash({
  length: 30,
  charset: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_",
  rng: randomBytes,
});

export default Hash;
