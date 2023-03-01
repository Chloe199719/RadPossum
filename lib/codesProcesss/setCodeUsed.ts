import pb from "../pocketbase";

export default async function setCodeUsed(id: string) {
  await pb
    .collection(`codes`)
    .update(id, { used: true }, { API_KEY: process.env.API_KEY });
}
