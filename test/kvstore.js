const KVStore = artifacts.require('./KVStore.sol');

contract('KVStore', async (accounts) => {
  it('returns a correct value to the address storing the key-value pair', async () => {
    const instance = await KVStore.deployed();
    const [accountOne] = accounts;
    await instance.set('satoshi', 'nakamoto', {
      from: accountOne,
    });
    const value = await instance.get.call(accountOne, 'satoshi', {
      from: accountOne,
    });
    assert.equal(value, 'nakamoto');
  });

  it('returns a correct value to another address', async () => {
    const instance = await KVStore.deployed();
    const [accountOne, accountTwo] = accounts;
    await instance.set('satoshi', 'nakamoto', {
      from: accountOne,
    });
    const value = await instance.get.call(accountOne, 'satoshi', {
      from: accountTwo,
    });
    assert.equal(value, 'nakamoto');
  });

  it("doesn't allow storing a too long key", async () => {
    const instance = await KVStore.deployed();
    const [accountOne] = accounts;
    try {
      await instance.set(
        'satoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamoto',
        'satoshi',
        { from: accountOne },
      );
      assert.fail();
    } catch (err) {
      assert.ok(/revert/.test(err.message));
    }
  });

  it("doesn't allow storing a too long value", async () => {
    const instance = await KVStore.deployed();
    const [accountOne] = accounts;
    try {
      await instance.set(
        'satoshi',
        'satoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamotosatoshinakamoto',
        { from: accountOne },
      );
      assert.fail();
    } catch (err) {
      assert.ok(/revert/.test(err.message));
    }
  });

  it('outputs an address on deployment', async () => {
    const instance = await KVStore.deployed();
    assert.typeOf(instance.address, 'string');
    assert.isAtLeast(instance.address.length, 10);
  });
});
