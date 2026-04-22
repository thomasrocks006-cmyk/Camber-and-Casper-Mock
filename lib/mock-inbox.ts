export interface Thread {
  id: string;
  type: "Email" | "Message" | "Call" | "Meeting";
  sender: string;
  company: string;
  subject: string;
  preview: string;
  time: string;
  status: "unread" | "read" | "drafted";
  stage: string;
  commitments: string[];
  draft?: string;
  rationale?: string;
}

export const MOCK_INBOX_THREADS: Thread[] = [
  {
    id: "t1",
    type: "Email",
    sender: "Brett Kowalski",
    company: "Northside Auto & Tyre",
    subject: "Re: Job management demo — can we do Friday?",
    preview:
      "Thanks for sending that through. Had a quick look — the job auth reminder feature is exactly what we need. Friday arvo works if you're free around 2pm?",
    time: "14m ago",
    status: "unread",
    stage: "Meeting Booked",
    commitments: ["Confirm Friday 2pm demo slot", "Send calendar invite"],
    draft:
      "Hi Brett,\n\nFriday 2pm works perfectly — sending you a calendar invite now with a video link. I'll walk through the job auth reminders and the Xero integration in about 10 minutes.\n\nLooking forward to it.\n\nCheers,",
    rationale:
      "Brett confirmed interest and proposed a meeting time. High intent signal — the specific feature mention (job auth reminders) matches his key pain point. Priority: confirm and send invite immediately.",
  },
  {
    id: "t2",
    type: "Call",
    sender: "Kylie Andreou",
    company: "Sunshine Coast Panel & Paint",
    subject: "Discovery Call Transcript",
    preview:
      "…yeah, the parts invoicing is a nightmare. We get hit with variances from Burson every week and it takes us hours to reconcile. If your system flags those automatically that would be huge…",
    time: "2h ago",
    status: "read",
    stage: "Qualified",
    commitments: [
      "Send Burson invoice reconciliation demo clip",
      "Follow up by Thursday EOD",
    ],
    rationale:
      "Kylie highlighted a specific pain point around Burson parts invoice variances. This aligns with our Match Engine capability. High conversion signal — follow-up with a targeted demo clip today.",
  },
  {
    id: "t3",
    type: "Email",
    sender: "Wayne Pemberton",
    company: "Geelong Tyre & Service Centre",
    subject: "Pricing question — what does the full setup cost?",
    preview:
      "Interested but want to understand the full cost before we go any further. What's the setup fee and is there a lock-in contract?",
    time: "4h ago",
    status: "unread",
    stage: "Contacted",
    commitments: [
      "Send pricing overview",
      "Clarify no lock-in contract policy",
    ],
    draft:
      "Hi Wayne,\n\nGreat question — I'll keep it simple. There's a one-time setup fee of $1,200 which covers data migration and a half-day onboarding session. After that, it's a monthly subscription with no lock-in. You can pause or cancel anytime.\n\nI can walk you through it on a 15-minute call this week if that helps — happy to do whatever suits you.\n\nCheers,",
    rationale:
      "Price objection raised early — this is normal for D-type personality (results-focused, direct). Respond with clear numbers and a no-lock commitment. Address the objection directly without softening.",
  },
  {
    id: "t4",
    type: "Meeting",
    sender: "Raj Patel",
    company: "Bayside Automotive Repairs",
    subject: "Demo Meeting — Notes + Follow-Up",
    preview:
      "Great session with Raj today. He's ready to move forward after seeing the Xero reconciliation live. Wants his accountant to review the data export format first.",
    time: "1d ago",
    status: "read",
    stage: "Opportunity",
    commitments: [
      "Send Xero data export sample to accountant",
      "Prepare contract draft",
    ],
    rationale:
      "Demo converted successfully. Accountant review is the last step before sign-off — this is a formality, not a blocker. Send export sample today to keep momentum.",
  },
  {
    id: "t5",
    type: "Message",
    sender: "Sandra McHugh",
    company: "Mornington Mechanical",
    subject: "Quick Q on SMS reminders",
    preview:
      "Do the service reminders go out automatically or does someone have to approve them each time? We're only 2 staff so can't be checking a dashboard every day.",
    time: "1d ago",
    status: "unread",
    stage: "New",
    commitments: [
      "Explain automated vs manual reminder modes",
      "Invite for a brief call",
    ],
    draft:
      "Hi Sandra — they go out automatically once you set the schedule. You pick the trigger (e.g. 30 days before service due) and it runs without anyone needing to check in. You can review a log weekly if you want, but the system handles it. Happy to show you in a 10-minute screen share?",
    rationale:
      "Sandra is time-poor (2-person shop) — her concern is about adding admin, not capability. Frame the automation as 'set and forget'. This is a fast-close lead if the right message lands.",
  },
  {
    id: "t6",
    type: "Email",
    sender: "Craig Hutchinson",
    company: "Toowoomba Truck & Trailer",
    subject: "Integration with our current workshop system",
    preview:
      "We've been on Workshop Software for 8 years. Not looking to rip that out. Can your tool sit on top of it or does it replace it completely?",
    time: "2d ago",
    status: "read",
    stage: "Contacted",
    commitments: [
      "Explain integration layer vs replacement positioning",
      "Schedule technical call",
    ],
    rationale:
      "Craig has incumbent vendor loyalty and is raising a genuine technical concern. This is an integration question, not a rejection. Position as complementary intelligence layer rather than a replacement to reduce perceived risk.",
  },
  {
    id: "t7",
    type: "Call",
    sender: "Maria Esposito",
    company: "Parramatta Panel & Paint",
    subject: "Inbound enquiry — call transcript",
    preview:
      "…we found you via the Facebook ad. I handle all the admin here and my boss said to have a look at systems that help with quoting and customer follow-up. What can you actually do?",
    time: "3d ago",
    status: "read",
    stage: "New",
    commitments: [
      "Send overview brochure",
      "Book discovery call with decision-maker (owner)",
    ],
    rationale:
      "Maria is the gatekeeper — she handles admin but the owner is the buyer. Nurture relationship with Maria, but qualify whether she can champion the purchase internally or if a direct owner meeting is needed.",
  },
  {
    id: "t8",
    type: "Email",
    sender: "Tanya Fletcher",
    company: "Frankston Auto Electrics",
    subject: "Not proceeding this quarter — budget freeze",
    preview:
      "Hi, thanks for your time. We've had to put all new tools on hold until Q3 due to a budget freeze from ownership. We'll be back in touch in 90 days.",
    time: "3d ago",
    status: "read",
    stage: "Contacted",
    commitments: ["Set 90-day follow-up reminder", "Tag as re-engage Q3"],
    rationale:
      "Budget freeze is a timing objection, not a capability rejection. Tanya is still warm. Set a 90-day re-engage sequence with a value-add touchpoint at 45 days (industry update or tip) to maintain warmth.",
  },
];
