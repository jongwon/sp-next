import httpProxyMiddleware from "next-http-proxy-middleware";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  httpProxyMiddleware(req, res, {
    target: process.env.NEXT_PUBLIC_API_URL,
    pathRewrite: [
      {
        patternStr: "^/api",
        replaceStr: "/api",
      },
    ],
    changeOrigin: true,
  }).then();
};
