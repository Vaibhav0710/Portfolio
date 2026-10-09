// Architecture of the voting system, drawn from its README (github.com/Vaibhav0710/Voting_System).
// The path a vote takes is drawn in the accent colour.

const Box = ({ x, y, w, h, title, note }: { x: number; y: number; w: number; h: number; title: string; note?: string }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={4} fill="var(--plate)" stroke="var(--ink)" strokeWidth={1.25} />
    <text x={x + w / 2} y={note ? y + h / 2 - 3 : y + h / 2 + 4.5} textAnchor="middle" fontSize={13} fontWeight={600} fill="var(--ink)">
      {title}
    </text>
    {note && (
      <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle" fontSize={10.5} fill="var(--muted)">
        {note}
      </text>
    )}
  </g>
);

export const VotingDiagram = () => {
  return (
    <figure className="mt-8">
      <div className="overflow-x-auto rounded-md bg-plate p-4 ring-1 ring-rule">
        <svg
          viewBox="0 0 640 262"
          className="h-auto w-full min-w-[580px] font-sans"
          role="img"
          aria-label="Clients call the API gateway, which uses Eureka for discovery and routes to the user, candidate, voting and result services. The voting service checks Redis and publishes vote events to Kafka, which the result service consumes."
        >
          <defs>
            <marker id="arrow-ink" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10z" fill="var(--muted)" />
            </marker>
            <marker id="arrow-accent" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10z" fill="var(--accent)" />
            </marker>
          </defs>

          <g fill="none" strokeWidth={1.25}>
            {/* gateway to the services it routes to */}
            <path d="M268 135H299V29H328" stroke="var(--muted)" markerEnd="url(#arrow-ink)" />
            <path d="M299 81H328" stroke="var(--muted)" markerEnd="url(#arrow-ink)" />
            <path d="M299 135V233H328" stroke="var(--muted)" markerEnd="url(#arrow-ink)" />
            {/* discovery */}
            <path d="M204 170V208" stroke="var(--muted)" strokeDasharray="4 4" />
            {/* Voting checks Redis */}
            <path d="M450 123H498" stroke="var(--muted)" markerEnd="url(#arrow-ink)" />

            {/* the vote's path */}
            <path d="M94 135H138" stroke="var(--accent)" strokeWidth={2} markerEnd="url(#arrow-accent)" />
            <path d="M268 135H328" stroke="var(--accent)" strokeWidth={2} markerEnd="url(#arrow-accent)" />
            <path d="M450 143H474V183H498" stroke="var(--accent)" strokeWidth={2} markerEnd="url(#arrow-accent)" />
            <path d="M560 202V233H452" stroke="var(--accent)" strokeWidth={2} markerEnd="url(#arrow-accent)" />
          </g>

          <Box x={10} y={115} w={84} h={40} title="Client" />
          <Box x={140} y={100} w={128} h={70} title="API gateway" note="routing, rate limits, JWT" />
          <Box x={140} y={210} w={128} h={44} title="Eureka" note="service discovery" />
          <Box x={330} y={10} w={120} h={38} title="User service" />
          <Box x={330} y={62} w={120} h={38} title="Candidate service" />
          <Box x={330} y={114} w={120} h={38} title="Voting service" />
          <Box x={330} y={214} w={120} h={38} title="Result service" />
          <Box x={500} y={102} w={128} h={42} title="Redis" note="double-vote check" />
          <Box x={500} y={162} w={128} h={42} title="Kafka" note="vote events" />
        </svg>
      </div>
      <figcaption className="mt-3 font-sans text-sm text-muted">
        How a vote travels (in red). User, candidate and voting services each have their own PostgreSQL database; the result service is stateless.
      </figcaption>
    </figure>
  );
};
