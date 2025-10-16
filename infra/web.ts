import { api } from "./api";
import { reownProjectID } from "./secrets";

export const webapp = new sst.aws.StaticSite("WebApp", {
  path: "packages/web",
  dev: {
    command: "npm run dev",
  },
  environment: {
    API_URL: api.url,
    REOWN_PROJECT_ID: reownProjectID.value,
  },
});
