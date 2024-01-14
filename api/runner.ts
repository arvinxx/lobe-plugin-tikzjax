import type { VercelRequest, VercelResponse } from '@vercel/node';
import tex2svg from 'node-tikzjax';

export default async (request: VercelRequest, response: VercelResponse) => {
  const { input } = JSON.parse(request.body);

  const svgString = await tex2svg(input);

  const base64EncodedSVG = Buffer.from(svgString).toString('base64');

  response.send(`![SVG](data:image/svg+xml;base64,${base64EncodedSVG})`);
};
