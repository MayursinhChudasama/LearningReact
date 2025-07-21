import { render, screen } from '@testing-library/react';
import Greetings from './Greetings';

describe('Greetings', () => {
    test('renders welcome to our app', ()=>{
        render(<Greetings />);
        const welcome = screen.getByText('Welcome to our app', { exact: false });
        expect(welcome).toBeInTheDocument();
    })

})



