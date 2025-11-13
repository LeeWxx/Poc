export type Section = {
  id: string
  title: string
  body: string
}

export type Tab = {
  id: string
  label: string
  sections: Section[]
}

const makeBody = (lead: string) =>
  [
    lead,
    'Scroll Seam keeps anchors stable even when cards fold, filters change, or charts reflow. The goal is to make the viewport feel as if it is magnetized to intent rather than pixel offsets, so drastic DOM churn never feels jarring.',
    'This block repeats extra narrative on purpose so that every section stretches tall enough to require aggressive scrolling. Each paragraph pretends to be telemetry, but its only job is to create realistic, messy heights.',
    'Keep an eye on how the viewport recenters around the same anchor even after you collapse content, swap tabs, or trigger several state updates in rapid succession. The anchoring logic follows the element closest to the viewport midpoint.',
    'The copy is intentionally verbose: it simulates the erratic height changes of a dashboard with async widgets, audit feeds, long-form retrospectives, and comment threads that expand unpredictably.',
    'Feel free to interact quickly—capture and restore run on every dependency change, so even rapid toggles should feel seamless. If anything jumps unexpectedly, that means the example needs more stress!',
    'One more paragraph for good measure: imagine charts streaming new data, operations teams jotting minute-by-minute notes, and design tweaks altering paddings. Scroll Seam treats all of it as a single intent-preserving seam.',
  ].join('\n\n')

export const TABS: Tab[] = [
  {
    id: 'overview',
    label: 'Overview',
    sections: [
      {
        id: 'summary',
        title: 'Executive Summary',
        body: makeBody(
          'Key business health metrics with highlights for the current sprint headline this column.',
        ),
      },
      {
        id: 'growth',
        title: 'Growth Signals',
        body: makeBody(
          'Traffic, retention, and funnel depth charts will reflow when toggles change, encouraging layout shifts.',
        ),
      },
      {
        id: 'alerts',
        title: 'Risk Alerts',
        body: makeBody(
          'Operational issues detected by automated monitors deserve attention; switch tabs mid-read to test restoration.',
        ),
      },
      {
        id: 'experiments',
        title: 'Experiment Queue',
        body: makeBody(
          'Experiment proposals wax and wane in size, often stacking multiple charts and bulleted rationales into a single card.',
        ),
      },
      {
        id: 'backlog',
        title: 'Roadmap Backlog',
        body: makeBody(
          'Roadmap discussions tend to explode into subitems with owners, blockers, and ETA commentary that change hourly.',
        ),
      },
      {
        id: 'stakeholders',
        title: 'Stakeholder Notes',
        body: makeBody(
          'PM and leadership notes pour in as unformatted text walls—perfect for seeing how scroll anchors behave with wildly tall content.',
        ),
      },
    ],
  },
  {
    id: 'activity',
    label: 'Activity',
    sections: [
      {
        id: 'feed',
        title: 'Recent Activity',
        body: makeBody(
          'Timeline of deployments, incidents, and approvals forms a tall list—perfect for verifying deep scroll capture.',
        ),
      },
      {
        id: 'reviews',
        title: 'Pending Reviews',
        body: makeBody(
          'Human approvals pile up quickly; collapsing a subsection should drastically resize the host container.',
        ),
      },
      {
        id: 'notes',
        title: 'Ops Notes',
        body: makeBody(
          'Scratchpad for on-call handoffs contains deliberately long commentary to emulate analyst notes.',
        ),
      },
      {
        id: 'escalations',
        title: 'Escalations',
        body: makeBody(
          'Escalation threads combine chat logs, remediation steps, and policy reminders, each adding unpredictable height.',
        ),
      },
      {
        id: 'playbooks',
        title: 'Runbooks & Playbooks',
        body: makeBody(
          'Operational playbooks often stretch hundreds of lines with nested steps. Folding them should not derail scroll restoration.',
        ),
      },
      {
        id: 'handoff',
        title: 'Handoff Checklist',
        body: makeBody(
          'Shift handoff lists are intentionally repetitive to mimic real checklists. Jump between tabs mid-check to prove persistence.',
        ),
      },
    ],
  },
]
