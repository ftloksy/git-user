import { render, screen } from '@testing-library/react';
import UserSearch from './pages/UserSearch';

// Describe a test suite for the UserSearch component
describe('UserSearch component', () => {
 test('it renders', () => {
  
   // Render the UserSearch component
   render(<UserSearch />);

   // Assert that the 'Submit' text is present in the rendered component
   expect(screen.getByText('Submit')).toBeInTheDocument();
 });
})
