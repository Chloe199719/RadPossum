import pb from "../pocketbase";

export default async function setCodeUsed(id: string) {
  await pb
    .collection(`codes`)
    .update(id, { used: true }, { APIKEY: "412312312" });
}
