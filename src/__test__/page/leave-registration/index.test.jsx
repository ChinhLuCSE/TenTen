import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom";

import LeaveRegistration from "@/app/(main)/leave-registration/page";

// Mock the service/request module
jest.mock('../../../service/request.js', () => ({
  sendRequestWithToken: jest.fn(() => Promise.resolve({})),
}));

describe('LeaveRegistration', () => {
  test('renders leave registration page', async () => {
    render(<LeaveRegistration />);

    // You can use screen.getByText, screen.getByTestId, etc. to assert the presence of certain elements
    expect(screen.getByText('Application for leave')).toBeInTheDocument();
  });

  test('opens and closes the modal', async () => {
    render(<LeaveRegistration />);

    // Click the "+ Add leave" button to open the modal
    fireEvent.click(screen.getByText('+ Add leave'));

    // Check if the modal is visible
    expect(screen.getByText('Remaining days off')).toBeInTheDocument();

    // Close the modal
    fireEvent.click(screen.getByText('Cancel'));

    // Check if the modal is closed
    await waitFor(() => {
      expect(screen.queryByText('Remaining days off')).not.toBeInTheDocument();
    });
  });

  test('submits leave request', async () => {
    render(<LeaveRegistration />);

    // Click the "+ Add leave" button to open the modal
    fireEvent.click(screen.getByText('+ Add leave'));

    // Mock user input
    fireEvent.change(screen.getByPlaceholderText('Input your reason here'), {
      target: { value: 'Test reason' },
    });

    // Mock date selections
    fireEvent.change(screen.getByLabelText('Start date'), {
      target: { value: new Date() },
    });
    fireEvent.change(screen.getByLabelText('End date'), {
      target: { value: new Date() },
    });

    // Mock the API response when submitting the form
    jest.spyOn(window, 'fetch').mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({}),
    });

    // Click the "Submit" button
    fireEvent.click(screen.getByText('Submit'));

    // Wait for the asynchronous operation to complete
    await waitFor(() => {
      // Add assertions based on the expected behavior after form submission
      // For example, check if the modal is closed
      expect(screen.queryByText('Remaining days off')).not.toBeInTheDocument();
    });
  });
});

