const withPWA = require("next-pwa");

module.exports = withPWA({
  images: {
    domains: ["raw.githubusercontent.com"],
  },
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    register: true,
  },
  future: {
    webpack5: true
  }
});
