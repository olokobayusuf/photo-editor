import { Function } from "fxnjs"
import { type NextRequest } from "next/server"

/**
 * We use this API route to protect our Function access key 
 * from being exposed in the browser.
 * See https://docs.fxn.ai/insiders/keys#in-the-browser
 */
export async function POST (request: NextRequest) {
  try {
    const input = await request.json();
    const prediction = await fxn.predictions.create(input);
    return Response.json(prediction);
  } catch (err: any) {
    return Response.json(
      { errors: [{ message: err.message ?? "Failed to create prediction." }] },
      { status: err.status ?? 400 }
    );
  }
}

const fxn = new Function({ accessKey: process.env.FXN_ACCESS_KEY });