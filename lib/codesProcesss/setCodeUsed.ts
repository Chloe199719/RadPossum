import pb from "../pocketbase";

export default async function setCodeUsed(id: string) {
  pb.collection(`codes`).update(id, { used: true }, { APIKEY: "412312312" });
}
