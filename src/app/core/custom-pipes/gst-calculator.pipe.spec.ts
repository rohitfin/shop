import { GstCalculatorPipe } from './gst-calculator.pipe';

describe('GstCalculatorPipe', () => {
  it('create an instance', () => {
    const pipe = new GstCalculatorPipe();
    expect(pipe).toBeTruthy();
  });
});
