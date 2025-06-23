const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return "com.rockie2695.newsdataapp.dev";
  }

  if (IS_PREVIEW) {
    return "com.rockie2695.newsdataapp.preview";
  }

  return "com.rockie2695.newsdataapp";
};

const getAppName = () => {
  if (IS_DEV) {
    return "NewsData (Dev)";
  }

  if (IS_PREVIEW) {
    return "NewsData (Preview)";
  }

  return "NewsData";
};

export default ({ config }) => ({
  ...config,
  name: getAppName(),
  ios: {
    ...config.ios,
    bundleIdentifier: getUniqueIdentifier(),
  },
  android: {
    ...config.android,
    package: getUniqueIdentifier(),
  },
});
