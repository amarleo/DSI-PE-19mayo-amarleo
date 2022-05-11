import 'mocha';
import {expect} from 'chai';
import {index} from '../src/index';

describe('Index', () => {
  it('Index', () => {
    expect(index()).to.be.eql('index');
  });
});
