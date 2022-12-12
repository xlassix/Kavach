const _package = require("..");
const { ethers } = require("ethers");
const { getAuthMessage } = require("../../getAuthMessage");

describe("revoke file address", () => {
  let signer, signer2;

  beforeAll(async () => {
    const provider = new ethers.getDefaultProvider();
    signer = new ethers.Wallet(
      "0x8218aa5dbf4dbec243142286b93e26af521b3e91219583595a06a7765abc9c8b",
      provider
    );
    signer2 = new ethers.Wallet(
      "0x8218aa5dbf4dbec243142286b93e26af521b3e91219583595a06a7765abc9c8a",
      provider
    );
  });

  test("revoke to address", async () => {
    const authMessage = await getAuthMessage(signer.address);
    const signedMessage = await signer.signMessage(authMessage.message);
    const { error, isSuccess } = await _package.revokeAccess(
      signer.address,
      "testCid",
      signedMessage,
      [signer2.address]
    );
    expect(error).toBe(null);
    expect(isSuccess).toBe(true);
  }, 20000);
});
