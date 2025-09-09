// app/api/auth/[...all]/route.ts
export const runtime = "nodejs";
import { auth } from "@/lib/auth";


// Export the handler as default
const handler = auth.handler;

export { handler as GET, handler as POST };
