/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  // // 프로젝트 엔드포인트를 127.0.0.1:8000으로 호출한다. (api만 호출할 때에는 좋은 방법이라고 생각했으나, 라우팅을 사용하려고 보니 아래 방법은 불가능하다는 걸 알게 됨)
  // async rewrites() {
  //   return [
  //     {
  //       source: "/:path*",
  //       destination: "http://localhost:8000/:path*/",
  //       // source: "/",
  //       // destination: "http://localhost:8000",
  //       // permanent: true
  //     },
  //   ];
  // },
};

// const nextConfig = {
//   async headers() {
//       return [
//           {
//               // matching all API routes
//               source: "/api/:path*",
//               headers: [
//                   { key: "Access-Control-Allow-Credentials", value: "true" },
//                   { key: "Access-Control-Allow-Origin", value: "http://127.0.0.1:8000" }, // replace this your actual origin
//                   { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
//                   { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
//               ]
//           }
//       ]
//   }
// }

export default nextConfig;
// module.exports = nextConfig
