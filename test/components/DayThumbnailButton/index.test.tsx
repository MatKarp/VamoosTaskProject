import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DayThumbnailButton from "../../../src/components/DayThumbnailButton";
import { vi } from 'vitest';

const mockOnClick = vi.fn();

describe('DayThumbnailButton', () => {
    it('renders day, headline, and image correctly', () => {
        const day = 1;
        const headline = "Test Headline";
        const dailyPhoto = "https://example.com/photo.jpg";

        render(
            <DayThumbnailButton
                day={day}
                dailyPhoto={dailyPhoto}
                headline={headline}
                onClick={mockOnClick}
            />
        );
        expect(screen.getByRole('img')).toBeInTheDocument();
        expect(screen.getByText(`Day ${day}`)).toBeInTheDocument();
        expect(screen.getByText(headline)).toBeInTheDocument();
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', dailyPhoto);
    });

    it('shows loading indicator before image loads', () => {
        const day = 1;
        const headline = "Test Headline";
        const dailyPhoto = "https://example.com/photo.jpg";

        render(
            <DayThumbnailButton
                day={day}
                dailyPhoto={dailyPhoto}
                headline={headline}
                onClick={mockOnClick}
            />
        );

        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    it('hides loading spinner after image loads', async () => {
        const day = 1;
        const headline = "Test Headline";
        const dailyPhoto = "https://example.com/photo.jpg";

        render(
            <DayThumbnailButton
                day={day}
                dailyPhoto={dailyPhoto}
                headline={headline}
                onClick={mockOnClick}
            />
        );
        const img = screen.getByRole('img');
        fireEvent.load(img);
        await waitFor(() => {
            expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
        });
    });

    it('calls onClick when the button is clicked', () => {
        const day = 1;
        const headline = "Test Headline";
        const dailyPhoto = "https://example.com/photo.jpg";

        render(
            <DayThumbnailButton
                day={day}
                dailyPhoto={dailyPhoto}
                headline={headline}
                onClick={mockOnClick}
            />
        );
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(mockOnClick).toHaveBeenCalledWith(day);
    });
});
