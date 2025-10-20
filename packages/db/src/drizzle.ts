import { drizzle } from "drizzle-orm/neon-http";
import { Resource } from "sst";

import * as schema from "./schemas/index";

export const db = () => drizzle(Resource.DatabaseUrl.value, { schema });
