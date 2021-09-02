import { getMockOffers, getMockDestinations, getMockPoints } from './mocks';

export const mockOffers = getMockOffers();
export const mockDestinations = getMockDestinations();
export const mockPoints = getMockPoints(mockOffers, mockDestinations);
