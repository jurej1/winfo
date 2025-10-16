export const webapp = new sst.aws.StaticSite("WebApp", {
  path: "packages/web",
  dev: {
    command: "npm run dev",
  },
});
