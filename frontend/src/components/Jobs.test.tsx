import { render } from '@solidjs/testing-library';
import Jobs from './Jobs';


describe('<Jobs />', () => {
  test('it will render an text input and a button', () => {
    const {  getByText } = render(() => <Jobs />);
    expect(getByText('RECENT & FEATURED JOBS')).toBeInTheDocument();
    expect(getByText('Featured Jobs')).toBeInTheDocument();
  });

});