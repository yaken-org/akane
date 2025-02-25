import GraphAPIServer from "@/graphql/server";
import { NextRequest } from "next/server";

const handler = GraphAPIServer;

export async function GET(request: NextRequest) {
	return handler(request);
}

export async function POST(request: NextRequest) {
	return handler(request);
}
