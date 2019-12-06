import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() });

describe('Cash Register', () => {

  describe('getChange', () => {
    it('Returns correct change when available', () => {
      const appWrapper = mount(<App />);

      const buttons = appWrapper.find('button');
      console.log(buttons);
      buttons.at(0).simulate('click'); // Click Add button.

      const inputs = appWrapper.find('input');

      // Add 3 x $2
      inputs.at(1).simulate('change', { target: { value: '3' }});

      // Add 1 x $5
      inputs.at(2).simulate('change', { target: { value: '1' }});

      appWrapper.find('.btn-success').simulate('click');

      const twosCount = appWrapper.find('#bill-count-2');
      const fivesCount = appWrapper.find('#bill-count-5');


      expect(parseInt(twosCount.text())).toEqual(3);
      expect(parseInt(fivesCount.text())).toEqual(1);

      // Three $2s and 1 $5 in register.

      // Click change mode button.
      buttons.at(2).simulate('click');

      const changeInput = appWrapper.find('input');

      changeInput.simulate('change', { target: { value: '6' }});

      // Click green change button.
      appWrapper.find('.btn-success').simulate('click');

      const result = appWrapper.find('#register-message');

      // Expect 3 x $2 in change.
      expect(result.text()).toEqual('0×$1 3×$2 0×$5 0×$10 0×$20')
    });
  });
});
