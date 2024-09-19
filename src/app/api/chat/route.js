// pages/api/proxy.js
import { NextResponse } from "next/server";
import getToken from "../../components/layout/Token/page";

export async function POST(request) {
  const token_access = await getToken();

  const response = await fetch(
    "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token_access}`,
        "Content-Type": "application/json",
      },
      body: request.body,
      duplex: "half",
    }
  );
  const data = await response.json();
  return NextResponse.json(data);
}
