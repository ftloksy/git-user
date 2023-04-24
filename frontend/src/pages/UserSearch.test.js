import { render, screen } from '@testing-library/react';
import UserSearch from './UserSearch';

describe('UserSearch component', () => {
 test('it renders', () => {
   render(<UserSearch />);


   expect(screen.getByText('Search:')).toBeInTheDocument();
 });
})
