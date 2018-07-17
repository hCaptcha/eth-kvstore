const KVStore = artifacts.require("./KVStore.sol");

/**
 * We set up the enums AccessRight.Invoked and AccessRight.Revoked to map authorized users.
 * AccessRight.Invoked = 1
 * AccessRight.Revoked = 0
 */

contract("KVStore", async accounts => {
  it("adds the account itself to authorized accounts", async () => {
    let instance = await KVStore.deployed();
    accountOne = accounts[0];
    authorizedAccount = await instance.isAuthorized(accountOne, {
      from: accountOne
    });
    assert.equal(authorizedAccount, 1);
  });

  it("adds an account to authorized account", async () => {
    let instance = await KVStore.deployed();
    accountOne = accounts[0];
    accountTwo = accounts[1];
    await instance.authorizeAccount(accountTwo, { from: accountOne });
    authorizedAccount = await instance.isAuthorized(accountTwo, {
      from: accountOne
    });
    assert.equal(authorizedAccount, 1);
  });

  it("denies the account revoking itself from authorized accounts", async () => {
    let instance = await KVStore.deployed();
    accountOne = accounts[0];
    try {
      await instance.revokeAccount(accountOne, { from: accountOne });
      assert.fail();
    } catch (err) {
      assert.ok(/revert/.test(err.message));
    }
  });

  it("removes an account from authorized accounts", async () => {
    let instance = await KVStore.deployed();
    accountOne = accounts[0];
    accountTwo = accounts[1];
    await instance.authorizeAccount(accountTwo, { from: accountOne });
    authorizedAccount = await instance.isAuthorized(accountTwo, {
      from: accountOne
    });
    assert.equal(authorizedAccount, 1);

    await instance.revokeAccount(accountTwo, {
      from: accountOne
    });
    authorizedAccount = await instance.isAuthorized(accountOne, {
      from: accountTwo
    });
    assert.equal(authorizedAccount, 0);
  });

  it("returns the correct value to the account itself", async () => {
    let instance = await KVStore.deployed();
    accountOne = accounts[0];
    await instance.set("satoshi", "nakamoto", { from: accountOne });
    value = await instance.get.call(accountOne, "satoshi", {
      from: accountOne
    });
    assert.equal(value, "nakamoto");
  });

  it("returns the correct value to an authorized account", async () => {
    let instance = await KVStore.deployed();
    accountOne = accounts[0];
    accountTwo = accounts[1];
    await instance.authorizeAccount(accountTwo, { from: accountOne });
    await instance.set("satoshi", "nakamoto", { from: accountOne });
    value = await instance.get.call(accountOne, "satoshi", {
      from: accountTwo
    });
    assert.equal(value, "nakamoto");
  });

  it("doesn't return a value to an unauthorized account", async () => {
    let instance = await KVStore.deployed();
    accountOne = accounts[0];
    accountTwo = accounts[1];
    accountThree = accounts[2];
    await instance.authorizeAccount(accountTwo, { from: accountOne });
    await instance.set("satoshi", "nakamoto", { from: accountOne });
    try {
      await instance.get.call(accountOne, "satoshi", {
        from: accountThree
      });
      assert.fail();
    } catch (err) {
      assert.ok(/revert/.test(err.message));
    }
  });

  it("doesn't return a value to a revoked account", async () => {
    let instance = await KVStore.deployed();
    accountOne = accounts[0];
    accountTwo = accounts[1];
    await instance.authorizeAccount(accountTwo, { from: accountOne });
    await instance.revokeAccount(accountTwo, { from: accountOne });
    await instance.set("satoshi", "nakamoto", { from: accountOne });
    try {
      await instance.get.call(accountOne, "satoshi", {
        from: accountTwo
      });
      assert.fail();
    } catch (err) {
      assert.ok(/revert/.test(err.message));
    }
  });

  it("doesn't allow storing a too long string", async () => {
    let instance = await KVStore.deployed();
    accountOne = accounts[0];
    try {
      await instance.set(
        "satoshi",
        "satoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamoto",
        { from: accountOne }
      );
      assert.fail();
    } catch (err) {
      assert.ok(/revert/.test(err.message));
    }
  });
});
