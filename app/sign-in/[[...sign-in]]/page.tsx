import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen w-screen bg-base text-primary select-none">
      {/* Left Panel: Large Screens Only */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 border-r border-border-default bg-surface relative overflow-hidden">
        {/* Ambient subtle decoration */}
        <div className="absolute -top-40 -left-40 pointer-events-none bg-accent-primary-dim blur-[120px] rounded-full h-80 w-80 opacity-40" />
        
        {/* Header */}
        <div className="flex items-center gap-2 relative z-10">
          <div className="h-2 w-2 rounded-full bg-brand animate-pulse" />
          <span className="font-sans font-medium tracking-wider text-copy-primary text-sm uppercase">
            Ghost AI
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6 max-w-md relative z-10 my-auto">
          <h1 className="text-3xl font-semibold tracking-tight text-copy-primary leading-tight">
            Collaborative system design, accelerated by AI.
          </h1>
          <p className="text-sm text-copy-secondary leading-relaxed">
            Describe your architecture in plain English, collaborate with your team in real time, and generate polished technical specifications.
          </p>

          <div className="h-[1px] bg-border-default w-24 my-2" />

          {/* Text-only feature list */}
          <ul className="flex flex-col gap-4 text-xs text-copy-muted">
            <li className="flex items-start gap-2.5">
              <span className="text-brand font-medium">01</span>
              <span>Real-time collaborative canvas powered by React Flow</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-brand font-medium">02</span>
              <span>Durable AI system design generator from prompt descriptions</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-brand font-medium">03</span>
              <span>Instant Markdown spec generation from graph architectures</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-brand font-medium">04</span>
              <span>Curated starter templates for common microservice and cloud patterns</span>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="text-[11px] text-copy-faint relative z-10">
          © {new Date().getFullYear()} Ghost AI. All rights reserved.
        </div>
      </div>

      {/* Right Panel: Centered Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-base">
        <SignIn />
      </div>
    </div>
  );
}
