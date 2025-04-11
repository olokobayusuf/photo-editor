import { Function } from "fxnjs"
import { type NextRequest } from "next/server"

/**
 * We use this API route to protect our Function access key 
 * from being exposed in the browser.
 * See https://docs.fxn.ai/insiders/keys#in-the-browser
 */
export async function POST (request: NextRequest) { 
  const input = await request.json();
  const prediction = await fxn.predictions.create(input);
  return Response.json(prediction);
}

const fxn = new Function({ accessKey: process.env.FXN_ACCESS_KEY });