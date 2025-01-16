export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./jest.setup.js"],
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy"
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
  }
};
