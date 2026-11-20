# Ballot Public Route Copy

This document contains all user-facing copy for public routes on Ballot. Every section uses direct language without marketing jargon, dashes, or artificial drama.

---

## 1. Landing Page (`/`)

### Navigation Bar

- Brand: `ballot.`
- Links: `Elections`, `Verify`, `About`
- Action: `Sign In`

### Hero Section

- Badge: `Zero paper ballots. One student, one vote.`
- Headline: `Institutional voting you can actually verify.`
- Subheadline: `Run clean elections for student unions, faculty boards, and clubs. Students sign in with their school email, cast a secret ballot, and get a receipt proving their vote was counted.`
- Input label: `Enter election code`
- Input placeholder: `e.g. OAU-ENG-24`
- Input button: `Join Election`
- Microcopy: `No password needed. We verify your institutional email domain directly.`
- Secondary action: `Create an Election`

### The Problem With Paper Ballots

- Section title: `Why paper elections fail on campus`
- Section intro: `Paper ballots create friction for election committees and distrust among voters.`
- Card 1:
  - Title: `Long queues and lost time`
  - Text: `Students spend hours waiting at polling booths between classes. Turnout drops when voting takes more than five minutes.`
- Card 2:
  - Title: `Disputed counts and accusations`
  - Text: `Hand-counted paper slips invite allegations of box stuffing and spoiled ballots. Arguments often delay results for days.`
- Card 3:
  - Title: `Printing and logistics costs`
  - Text: `Printing thousands of serialized ballots, securing physical boxes, and staffing tables drains union budgets.`

### How It Works

- Section title: `Three steps from sign-in to verified result`
- Step 1:
  - Step label: `Step 01`
  - Title: `Verify your school email domain`
  - Text: `Enter the election code and your official school email. The platform checks whether your domain matches the election rules, such as @oauife.edu.ng. If it does, we send an instant sign-in link.`
- Step 2:
  - Step label: `Step 02`
  - Title: `Cast an anonymous vote`
  - Text: `Review candidate profiles, manifestos, and contest questions. When you submit, the platform logs that you voted, then separates your identity from your candidate choices before storing the ballot.`
- Step 3:
  - Step label: `Step 03`
  - Title: `Download your voting receipt`
  - Text: `You receive a cryptographic receipt code. You can use this code on the public audit tool to confirm your ballot sits in the final tally, without showing anyone who you voted for.`

### Key Guarantees

- Section title: `Built for impartial elections`
- Guarantee 1:
  - Title: `Strict domain gating`
  - Text: `Election creators decide exactly which email domains can participate. Personal addresses like @gmail.com or @yahoo.com are rejected automatically.`
- Guarantee 2:
  - Title: `Exactly one vote per person`
  - Text: `The database tracks which accounts have cast a vote. Once your ballot is recorded, your voting token is retired immediately.`
- Guarantee 3:
  - Title: `Secret ballots by design`
  - Text: `Your name is never attached to your choices. Administrators can see who voted and the final totals, but they cannot connect a voter to a candidate.`
- Guarantee 4:
  - Title: `Live tallies when polls close`
  - Text: `Results compute automatically the second voting ends. No manual recounts, no midnight tally sessions.`

### Frequently Asked Questions

- Section title: `Frequently asked questions`

- Q1: `Can an administrator see who I voted for?`
  - A1: `No. The system records that your email participated to prevent duplicate votes, but your candidate choices are stored in a separate table without any link to your identity. Even the database administrator cannot connect your account to your choices.`

- Q2: `What happens if I try to vote with a personal email?`
  - A2: `The election gate checks your email against the allowed domain list set by the organizer. If an election requires @unilag.edu.ng and you enter a Gmail address, access is denied immediately.`

- Q3: `Do I need to install an app to vote?`
  - A3: `No. Ballot works in any modern mobile or desktop browser. You only need an internet connection and your official school email inbox.`

- Q4: `Can I create an election for my student group or faculty?`
  - A4: `Yes. Any registered user can create an election. You set the contest titles, add candidates, define allowed domains, and choose start and end dates.`

- Q5: `Can one account vote in multiple elections?`
  - A5: `Yes. Your account works across elections. You can vote in your faculty election, vote in your departmental election, and manage an election for your student club from the same login.`

### Bottom Call to Action

- Headline: `Ready to run a clean election?`
- Subheadline: `Set up your student union, departmental, or organization ballot in minutes.`
- Button 1: `Create an Election`
- Button 2: `Join an Active Election`

### Footer

- Left: `ballot.`
- Tagline: `Institutional voting platform for schools and organizations.`
- Columns:
  - Platform: `Browse Elections`, `Verify`, `Create Election`, `About`
  - Legal & Privacy: `Secret Ballot Protocol`, `Privacy Notice`, `Terms of Service`
  - Verification: `Public Audit Ledger`, `Design System`
- Copyright: `Ballot Platform. All rights reserved.`

---

## 2. Join and Eligibility Route (`/join` and `/elections/[code]`)

### Join Screen

- Header title: `Enter an election`
- Header description: `Type the unique election code shared by your organization or election committee.`
- Field label: `Election Code`
- Placeholder: `e.g. OAU-ENG-24`
- Button: `Continue`

### Email Eligibility Verification Screen

- Election title display: `Faculty of Engineering Executive Council 2026`
- Organized by: `Faculty Electoral Commission`
- Restricted domain badge: `Allowed: @oauife.edu.ng`
- Email field label: `Institutional Email Address`
- Email placeholder: `your.name@oauife.edu.ng`
- Hint: `Use your official school address. Personal emails are rejected.`
- Button: `Verify Eligibility and Send Sign-In Link`

### State Banners

#### Accepted Domain Banner

- Badge: `Eligible`
- Heading: `Domain verified`
- Message: `Your email matches the required domain for this election. We sent a magic sign-in link to your inbox.`
- Submessage: `Check your inbox and click the link to open your secret ballot.`

#### Rejected Domain Banner

- Badge: `Access Denied`
- Heading: `Ineligible email domain`
- Message: `The address you entered (@gmail.com) is not permitted for this election. This vote requires an active @oauife.edu.ng address.`
- Action: `Try another email address`

#### Already Voted Banner

- Badge: `Ballot Recorded`
- Heading: `You have already voted in this election`
- Message: `Our records show a ballot was cast from this account on November 20, 2026 at 11:22 UTC.`
- Action: `Look up your receipt code on the public verification tool.`

#### Election Closed / Ended Banner

- Badge: `Voting Closed`
- Heading: `This election ended on November 20, 2026 at 12:00 UTC`
- Message: `Voting is complete. You can view the final certified tally below.`
- Action: `View Certified Results`

#### Election Upcoming Banner

- Badge: `Opens Soon`
- Heading: `Voting has not started`
- Message: `This election opens on November 21, 2026 at 08:00 UTC. Come back then with your school email.`

---

## 3. Public Ballot Verification Route (`/verify`)

### Header

- Title: `Verify a ballot receipt`
- Subtitle: `Check that your ballot sits in the final tally without revealing your choices to anyone.`

### Lookup Form

- Field label: `Receipt Code or Hash`
- Field placeholder: `e.g. 8f94a2b10cd47e91`
- Field helper: `You received this 16-character code on your confirmation screen after voting.`
- Button: `Search Receipt`

### Search Result: Found

- Status badge: `Verified and Counted`
- Card header: `Cryptographic Ballot Confirmation`
- Detail 1: `Election: Faculty of Engineering Executive Council 2026`
- Detail 2: `Status: Included in certified final tally`
- Detail 3: `Timestamp: November 20, 2026 at 11:22:45 UTC`
- Detail 4: `Voter domain: @oauife.edu.ng`
- Detail 5: `Receipt code: 8f94a2b10cd47e91`
- Privacy note: `Candidate choices are cryptographically decoupled from voter identity to protect ballot secrecy.`

### Search Result: Not Found

- Status badge: `No Record Found`
- Card header: `Receipt code not recognized`
- Message: `We could not find a recorded ballot matching that code. Check that you typed all 16 characters correctly.`
- Action: `Double-check your receipt screen or contact your election administrator.`

---

## 4. About Route (`/about`)

### Header

- Title: `About Ballot`
- Subtitle: `How the platform keeps voting honest, secret, and simple.`

### Principle 1: Domain-Specific Eligibility

- Title: `Restricting access by domain`
- Text: `Organizers configure one or more allowed email domains. Anyone without an active email address on that domain cannot open a ballot. This keeps outside actors from voting without requiring complicated registration forms.`

### Principle 2: Secret Ballot Decoupling

- Title: `Separating who voted from what they chose`
- Text: `When you cast your vote, the platform carries out two distinct database transactions:

1. It records that your account has voted, preventing duplicate submissions.
2. It writes your choices to an anonymous ballot ledger with no foreign key pointing back to your user account.
   Once written, there is no technical way to link a specific ballot back to the voter who cast it.`

### Principle 3: Single Unified Accounts

- Title: `One account for voting and organizing`
- Text: `Ballot does not separate users into rigid admin and voter roles. A student can create and run an election for their hall of residence while participating as an ordinary voter in their departmental election.`

### Principle 4: Instant Public Auditing

- Title: `Receipts anyone can check`
- Text: `Every completed ballot produces a unique receipt hash. Voters can enter their receipt into the public verification tool to confirm their ballot is counted, making final totals easy to audit.`

---

## 5. Sign-In Route (`/login`)

### Header

- Title: `Sign in to Ballot`
- Subtitle: `Enter your institutional email. We will send a secure sign-in link to your inbox.`

### Form

- Field label: `Institutional Email`
- Placeholder: `student@school.edu`
- Button: `Send Sign-In Link`

### Check Inbox Screen

- Heading: `Check your email`
- Body: `We sent a temporary sign-in link to your address. Click the link in that email to sign in.`
- Hint: `If you do not see the message within two minutes, check your spam folder.`
- Action: `Use a different email address`
