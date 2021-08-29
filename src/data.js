import { getMockOffers, getMockDestinations, getMockPoints, getInfoState, getFilterState } from './mocks';

export const mockOffers = getMockOffers();
export const mockDestinations = getMockDestinations();
export const mockPoints = getMockPoints(mockOffers, mockDestinations);
export const infoState = getInfoState(mockPoints);
export const filterState = getFilterState(mockPoints);