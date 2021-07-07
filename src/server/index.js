import { createServer } from "miragejs";
import data from "./data";

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    seeds(server) {
      server.db.loadData(data);
    },

    routes() {
      this.namespace = "api";
      this.timing = 500;

      this.get("/get-giphy-data", async (schema, request) => {
        const topic = request.queryParams.q;
        const limit = request.queryParams.limit;
        if (limit === "10") {
          return { data: schema.db[topic].slice(1) };
        } else if (schema.db.hasOwnProperty(topic)) {
          return { data: schema.db[topic].slice(0, 1) };
        } else {
          return {
            data: [
              {
                images: {
                  downsized_medium: {
                    url: "https://media.giphy.com/media/3ov9k1173PdfJWRsoE/giphy.gif",
                  },
                },
              },
            ],
          };
        }
      });
    },
  });

  return server;
}
