import { render, screen } from '@testing-library/react'
import { debug } from 'console'
import Home from '../pages'

describe('Home page', () => {
  it('renders correctly', () => {
    render(
      <Home
        product={{ priceId: 'fake-price-id', amount: 'R$10,00' }}
      />
    )
    expect(screen.getByText(/R$10,00/i)).toBeInTheDocument()
  })
})