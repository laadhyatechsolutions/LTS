# Forms setup — Supabase + Resend

The Contact form (`/contact`), the Get a Quote form (`/get-quote`) and the Free AI audit form (`/free-ai-audit`) all send to one server action: `src/app/actions/enquiry.ts`.

## What happens when someone submits

1. **Checks:** the action validates the fields. It silently drops bots that fill the hidden honeypot field, and it allows at most 5 submissions per visitor per 10 minutes.
2. **Saves** the enquiry to the Supabase `leads` table.
3. **Emails your team** at the `LEADS_EMAIL_TO` addresses through Resend, with Call and WhatsApp buttons. Pressing Reply in your inbox replies to the visitor.
4. **Sends the visitor a thank-you email**, if they gave an email address. This happens after their success screen shows, so it doesn't slow them down.

The visitor sees **success if step 2 or step 3 worked**. If both fail, they see an error asking them to call or WhatsApp instead, and the form keeps what they typed. A lead is never silently lost.

| Setup | What happens |
| --- | --- |
| Nothing set up (local dev) | The form works and the enquiry only appears in the terminal log |
| Nothing set up (production) | The visitor sees "form isn't working, please call/WhatsApp" |
| Supabase only | Saved, no emails |
| Resend only | Emailed, not saved |
| Both (recommended) | Saved and emailed |

## 1. Supabase (storage) — about 10 minutes

1. Create a free project at supabase.com. Choose the **Mumbai (ap-south-1)** region, the closest to Hyderabad.
2. Open **SQL Editor → New query**, paste everything from `supabase/leads.sql`, then click **Run**.
3. Go to **Project Settings → API** and copy two values:
   - **Project URL**. This is `SUPABASE_URL`.
   - **service_role** secret key. This is `SUPABASE_SERVICE_ROLE_KEY`.

     Use the service_role key, not the anon key. Keep it secret: it only ever runs on the server.
4. To view leads, open **Table Editor → leads**. You can change `status` (new, contacted, quoted, won or lost) and add `notes`.

## 2. Resend (email) — about 15 minutes, plus DNS time

1. Create an account at resend.com.
2. Go to **Domains → Add domain** and enter your website domain. Add the DNS records it shows (SPF/DKIM) at your domain provider, then wait until it says **Verified**.
3. Go to **API Keys → Create** and copy the key. This is `RESEND_API_KEY`.
4. Set the sender and the recipients:
   - `LEADS_EMAIL_FROM`, for example `LTS Website <enquiries@yourdomain.com>`. It must be on the verified domain.
   - `LEADS_EMAIL_TO`, for example `sales@yourdomain.com,owner@gmail.com`.

To test before your domain is verified, Resend lets you send from `onboarding@resend.dev`, but only to your own Resend account email.

## 3. Add the keys

**On your Mac (local testing):** copy `.env.example` to `.env.local`, fill in the values, then restart `npm run dev`.

**On Vercel (live site):** go to **Project → Settings → Environment Variables**, add the same keys, then redeploy.

`.env.local` is git-ignored, so never commit real keys.

## 4. Test before launch

- [ ] Submit the Contact form with an email address. Check that a row appears in Supabase, the team alert arrives, and the thank-you email arrives.
- [ ] Submit the Quote form, all 3 steps. Check that budget, timeline and business type appear in the row and in the email.
- [ ] Press Reply on the team alert. It should go to the visitor's email.
- [ ] Check the emails aren't landing in spam. If they are, finish SPF/DKIM and add a DMARC record.

## 5. Bot protection — Cloudflare Turnstile (free, built in)

1. In Cloudflare, go to **Turnstile → Add site**, enter your domain, and choose **Managed**.
2. Copy the **Site key** into `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and the **Secret key** into `TURNSTILE_SECRET_KEY`.
3. Redeploy. A small check appears above the Send button on the Contact, Quote and AI-audit forms. The server rejects submissions without a valid token.

Leave both keys empty and Turnstile stays off; the honeypot and rate limit still apply.

## 6. Analytics + cookie banner (built in)

- `NEXT_PUBLIC_GA4_ID` is the GA4 Measurement ID, e.g. `G-XXXXXXXXXX`.
- `NEXT_PUBLIC_CLARITY_ID` is the Microsoft Clarity project ID.
- The cookie banner appears **only** once at least one ID is set. Scripts load only after the visitor clicks **Accept**. "Cookie settings" in the footer reopens the banner.
- These events are sent automatically, so mark them as **key events (conversions)** in GA4:
  - `generate_lead`: a successful Contact, Quote or AI-audit form
  - `whatsapp_click`
  - `call_click`
  - `email_click`

## 7. Newsletter signup + booking link

- **Newsletter (footer):** uses the same Supabase and Resend keys. Run the second block of `supabase/leads.sql` once (it creates the `subscribers` table). Each signup is saved there and the visitor gets a welcome email. If Supabase is not set up but Resend is, you get an email per signup instead. Visitors unsubscribe by replying "unsubscribe" — set `unsubscribed = true` on their row.
- **Book a call:** set `NEXT_PUBLIC_BOOKING_URL` to your Calendly or Cal.com link. Without it, the contact page's "Book a free call" button goes to the free AI audit page.

## 8. Admin dashboard (/admin)

Set `ADMIN_PASSWORD` (8+ characters) next to your Supabase keys and restart. Then open `/admin`, sign in, and you can:
- see every enquiry, quote request, AI-audit request and subscriber (newest first);
- call, WhatsApp or email a lead in one tap;
- mark each lead new / contacted / quoted / won / lost and keep notes;
- export leads or subscribers as a CSV.

The password is checked on the server and unlocks a signed, 7-day, http-only cookie. `/admin` is hidden from search engines and from `robots.txt`. It needs the Supabase keys, so it stays off until both are set. For several team members, give each their own password later by moving to Supabase Auth.

## 9. Free checklists (lead magnet)

`/checklists` has one checklist per industry. The first 3 items are free; the rest unlock with an email, which is saved in `subscribers` with source `checklist:<industry>` and emailed a link back to the checklist. It is a "soft" gate: the emailed link (`?open=1`) and returning visitors skip the form. Edit the checklists in `src/data/checklists.ts` — they are general guidance, so review them with your own experience.

## Later (recommended)

- **A WhatsApp alert** for new leads, through the WhatsApp Business API or a Zapier/Make webhook.
