I got the below error after clicking the signout button.

## Error Type
Runtime Error

## Error Message
Invalid Server Actions request.

Next.js version: 15.5.19 (Webpack)


The below is the log of my terminal

> ai-studio-applet@0.1.0 dev
> next dev

   ▲ Next.js 15.5.19
   - Local:        http://localhost:3000
   - Network:      http://10.0.5.201:3000
   - Environments: .env.local

 ✓ Starting...
 ✓ Ready in 1994ms
 ○ Compiling /middleware ...
 ✓ Compiled /middleware in 1241ms (255 modules)
 ○ Compiling / ...
<w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (218kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
 ✓ Compiled / in 6.6s (1065 modules)
Attention: Clerk collects telemetry data from its SDKs when connected to development instances.
The data collected is used to inform Clerk's product roadmap.
To learn more, including how to opt-out from the telemetry program, visit: https://clerk.com/docs/telemetry.

 GET / 307 in 7973ms
 ○ Compiling /editor ...
 ✓ Compiled /editor in 6.4s (2474 modules)
 GET /editor 200 in 7026ms
`x-forwarded-host` header with value `symmetrical-zebra-jjvvjx5ggxq6f5wr7-3000.app.github.dev` does not match `origin` header with value `localhost:3000` from a forwarded Server Actions request. Aborting the action.
 ⨯ [Error: Invalid Server Actions request.] { digest: '1576279599' }
 POST /editor 500 in 409ms