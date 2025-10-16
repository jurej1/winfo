import { api } from "./api";
import { reownProjectID } from "./secrets";

export const webapp = new sst.aws.StaticSite("WebApp", {
  path: "packages/web",
  dev: {
    command: "npm run dev",
  },
  environment: {
    NEXT_PUBLIC_API_URL: api.url,
    NEXT_PUBLIC_REOWN_PROJECT_ID: reownProjectID.value,
  },
});
