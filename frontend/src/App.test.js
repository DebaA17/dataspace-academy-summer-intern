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

  expect(screen.getByText(/AI Powered Analysis/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Get Started/i })).toBeInTheDocument();
});
