import Hash from "@/lib/hashgenerator";

describe("Hash", () => {
  it("should generate a string of length 30", () => {
    const hash = Hash();
    expect(hash.length).toBe(30);
  });

  it("should generate a string of the correct charset", () => {
    const hash = Hash();
    const validCharacters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";
    const isValid = [...hash].every((char) => validCharacters.includes(char));
    expect(isValid).toBe(true);
  });
});
