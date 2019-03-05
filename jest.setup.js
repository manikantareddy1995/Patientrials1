/* global jest fetch */
import * as mockCamera from './__mocks__/Camera';

jest.mock('Linking', () =>
  ({
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    openURL: jest.fn(),
    canOpenURL: jest.fn(),
    getInitialURL: jest.fn(),
  }),
);

jest.mock('react-native-push-notification', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  requestPermissions: jest.fn(),
  configure: jest.fn(),
}));

// Mocking the global.fetch included in React Native
global.fetch = jest.fn();

// Helper to mock a success response (only once)
fetch.mockResponseSuccess = (body) => {
  fetch.mockImplementationOnce(
    () => Promise.resolve({ json: () => Promise.resolve(JSON.parse(body)) }),
  );
};

// Helper to mock a failure response (only once)
fetch.mockResponseFailure = (error) => {
  fetch.mockImplementationOnce(
    () => Promise.reject(error),
  );
};

jest.mock('react-native-img-cache', () => ({
  DocumentDir: () => {},
  ImageCache: {
    get: {
      clear: () => {},
    },
  },
}));

jest.mock('react-native-camera', () => mockCamera);

