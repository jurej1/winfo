import { SwingToken } from "@w-info-sst/types";

export class SwingRepository {
  private static projectID = "test-jj";

  static async getEnabledTokens(chain: string) {
    const url = `https://platform.swing.xyz/api/v1/projects/${this.projectID}/tokens?chain=${chain}`;

    const options = {
      method: "GET",
      headers: {
        "x-swing-environment": "production",
        Accept: "application/json",
      },
    };

    try {
      const response = await fetch(url, options);

      return (await response.json()) as SwingToken[];
    } catch (error) {
      throw Error("Something went wrong while fetching enabled tokens");
    }
  }
}
