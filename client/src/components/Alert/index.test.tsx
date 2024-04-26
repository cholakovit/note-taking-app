import { render, screen, act } from '@testing-library/react';

import AlertMessage from '.';
import { ERROR, INITIAL_ALERT, SUCCESS } from '../../helper/constants';

// Mocking the setTimeout function for Jest
jest.useFakeTimers();

describe('AlertMessage Component', () => {
  it('should display the alert message and then disappear', () => {
    render(<AlertMessage alert={INITIAL_ALERT} type={SUCCESS} />);

    // Ensure the Alert is initially displayed
    const alertElement = screen.getByTestId('alert') as HTMLElement;
    expect(alertElement).toBeInTheDocument();

    // Fast-forward the timers by 3000ms to simulate the timeout
    act(() => {
      jest.advanceTimersByTime(30000);
    });

    // Ensure the Alert is no longer in the document
    expect(screen.queryByTestId('alert')).not.toBeInTheDocument();
  });

  it('should not render when no alert is provided', () => {
    render(<AlertMessage alert={null} type={ERROR} />);

    // Ensure the Alert is not rendered
    expect(screen.queryByTestId('alert')).not.toBeInTheDocument();
  });
});
