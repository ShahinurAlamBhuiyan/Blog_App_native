import { create } from "apisauce";

const JPClient = create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export { JPClient };
