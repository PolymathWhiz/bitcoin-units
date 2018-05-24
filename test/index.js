import { assert } from 'chai';
import bitcoin from '../src/index';

describe('Converting units', () => {
  it('converts units', () => {
    const amount = 160000000;

    assert.deepEqual(
      bitcoin(1.6, 'btc').to('satoshi').value(),
      amount
    );
  });

  it('returns strings', () => {
    assert.deepEqual(
      bitcoin(1, 'mBTC').to('BTC').toString(),
      '0.001'
    );
  });

  it('formats units', () => {
    assert.deepEqual(
      bitcoin(1, 'BTC').to('mBTC').format(),
      '1000 mBTC'
    );
  });

  it('formats pluralizes units', () => {
    assert.deepEqual(
      bitcoin(1, 'BTC').to('satoshi').format(),
      '100000000 satoshis'
    );
  });

  it('shows custom displays', () => {
    bitcoin.setDisplay('satoshi', {
      unit: 'melo'
    });

    assert.deepEqual(
      bitcoin(1, 'BTC').to('satoshi').format(),
      '100000000 melo'
    );
  });

  it('sets new custom units', () => {
    bitcoin.setUnit('test', 1 / 1E2);

    assert.deepEqual(
      bitcoin(1, 'btc').to('test').value(),
      100
    );
  });

  it('sets new fiat units', () => {
    bitcoin.setFiat('usd', 8000);

    assert.deepEqual(
      bitcoin(1, 'satoshi').to('usd').value(),
      0.00008
    );
  });

  it('sets new fiat units with custom display', () => {
    bitcoin.setFiat('usd', 8000, { unit: 'USD' });

    assert.deepEqual(
      bitcoin(1, 'satoshi').to('usd').format(),
      '0.00008 USD'
    );
  });
});