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

  expect(screen.getByText(/AI Customer Intelligence/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Start Analysis/i })).toBeInTheDocument();
});
