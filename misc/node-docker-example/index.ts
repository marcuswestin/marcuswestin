let port = 7856
console.log("Start on :"+port);
export default {
  port: port,
  fetch(request: Request) {
    return new Response("Hello from server", { status: 200 });
  },
};
