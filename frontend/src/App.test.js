import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './pages/Home';

test('renders the home screen', () => {
  render(
    <MemoryRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Home />
    </MemoryRouter>,
  );

  expect(screen.getByText(/Know your customer before they reach/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Get started free/i })).toBeInTheDocument();
});
