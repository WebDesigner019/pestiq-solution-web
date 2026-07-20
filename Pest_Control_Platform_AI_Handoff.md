---
title: "Pest Control Platform"
subtitle: "AI Continuity & Production MVP Build Specification"
author: "Project working document"
date: "19 July 2026"
---

# 1. How to use this document

This is the authoritative continuity document for a residential pest-control web platform targeted at New York, United States. It is written so that a capable developer or AI coding agent can continue the project without access to the original conversation.

When continuing this project:

1. Treat the decisions marked **finalized** as the default architecture. Do not reopen them without a concrete technical or business reason.
2. Never invent business facts, approved prices, licenses, reviews, guarantees, service coverage, or treatment claims.
3. Never request or place live secret keys in chat, source control, screenshots, tickets, or this document. The business owner creates credentials and stores them in the hosting provider's encrypted environment settings.
4. Build one end-to-end commercial vertical slice before expanding decorative or editorial work.
5. Keep the product brand-distinct. Terminix is a UX and information-architecture reference, not a source of reusable branding, copy, images, reviews, prices, or proprietary plan names.
6. Preserve a production-ready data model and payment boundary even when the first shipment uses a constrained scope.

## Current project state

| Item | Status |
|---|---|
| Business name | Cleared by owner; exact spelling still needs to be placed in configuration |
| Domain | Purchased; exact domain and DNS access still need to be connected |
| Operating market | New York, United States |
| Currency | USD |
| Product scope | Residential pest control only |
| CRM decision | Finalized: custom Pest Operations Console |
| Payment decision | Finalized: Stripe for release one |
| Backend decision | Finalized: Supabase managed PostgreSQL, Auth, and Storage |
| Transactional email | Finalized: Resend |
| Hosting | Finalized: Vercel |
| Logo | Pending owner approval; use a restrained provisional text mark |
| Photography | Use real open-library or royalty-free commercial-use photographs; no AI imagery |
| Initial prices | Provisional test data only; owner approval required before live checkout |
| Delivery target | Working production MVP in 5–7 calendar days, subject to same-day owner inputs |

# 2. Product objective

Build a mature, trustworthy pest-control platform that allows a residential customer to:

- Understand the service and the pests treated.
- Search a city, borough, neighborhood, or postal code.
- Learn immediately whether the address is in a supported service area.
- See only the plans and prices approved for that area.
- Purchase Monthly Protection or a One-Time Treatment.
- Receive an accurate order, payment, and service-onboarding confirmation.
- Use Stripe Customer Portal to view invoices and manage billing according to the approved cancellation policy.

The business owner must be able to:

- Find customers and service addresses.
- See quotes, orders, Stripe payment state, and subscription state.
- Create or update appointment preferences and jobs.
- Record operational notes and status history.
- Change future service-area availability and prices without modifying application code.
- Replace the provisional logo and all temporary photography without modifying page components.

## Release-one non-goals

- No termite, home-services, commercial, careers, or empty placeholder sections.
- No technician route optimization or full mobile dispatch application.
- No second payment provider.
- No HubSpot, Salesforce, or external field-service CRM unless a real existing system must receive data.
- No custom card form or storage of raw payment credentials.
- No real-time appointment promise unless a real capacity source exists.
- No large location-SEO page factory.
- No AI-generated people, technicians, homes, vehicles, pests, evidence, or testimonials.

# 3. Final architecture decisions

| Concern | Final selection | Responsibility |
|---|---|---|
| Web application | Next.js + TypeScript | Public pages, server rendering, API routes, checkout orchestration, admin UI |
| Styling | CSS variables and intentional component system; Tailwind permitted | Tokens, responsive layout, components, states |
| Database | Supabase PostgreSQL | Operational source of truth |
| Staff identity | Supabase Auth | Admin login, sessions, roles, MFA when available |
| Authorization | PostgreSQL Row Level Security plus server checks | Separation of public, customer, operator, manager, and admin access |
| Media | Supabase Storage | Logo, favicon, hero images, pest images, rights metadata, replaceable assets |
| Payments | Stripe Checkout | Hosted recurring and one-time collection |
| Subscription lifecycle | Stripe Billing | Invoices, payment attempts, retries, status, cancellation |
| Billing self-service | Stripe Customer Portal | Payment method, invoice, and subscription management |
| Payment synchronization | Stripe webhooks | Verified, idempotent financial event stream |
| CRM | Custom Pest Operations Console | Customers, areas, quotes, appointments, jobs, notes, operational history |
| Email | Resend | Order, payment, appointment, failure, and operator notifications |
| Hosting | Vercel | Preview, production, domain, CDN, functions, environment separation |
| Error monitoring | Sentry or equivalent if account is available | Server and browser errors without personal-data leakage |

## Why Stripe, not PayPal, for release one

Stripe is the primary provider because the first release needs one coherent integration for hosted checkout, recurring subscriptions, one-time payments, customer billing self-service, invoices, webhook-driven status, and test/live environments. PayPal also supports subscriptions, but shipping both providers next week would create two catalogs, two event taxonomies, two cancellation paths, two reconciliation processes, and more failure cases.

PayPal may be evaluated after launch as an optional customer payment method. It must not become a second operational source of truth. If added, provider-specific events must normalize into the existing `orders`, `payments`, and `subscriptions` domain model.

## Source-of-truth boundary

| Data | System of record |
|---|---|
| Customers, service addresses, eligibility, plans, area prices | Supabase PostgreSQL |
| Quotes, appointments, jobs, notes, consent, audit history | Supabase PostgreSQL |
| Card numbers, verification codes, payment methods | Stripe only |
| Invoices, charge attempts, refunds, financial subscription lifecycle | Stripe |
| Operational payment/subscription view | Supabase mirror populated by verified Stripe events |
| Public content and media metadata | Supabase PostgreSQL and Storage |

# 4. Commercial flows

## Monthly Protection

1. Customer enters an area or postal code.
2. Server normalizes the input and resolves exactly one active `service_area`.
3. Server returns only active, effective-dated area prices.
4. Customer chooses Monthly Protection.
5. Server creates an expiring quote. The browser never sends an authoritative total.
6. Server reloads the quote and refuses checkout when the quote is expired, superseded, mismatched, or not approved for live mode.
7. Server creates a Stripe Checkout Session in subscription mode with the recurring price and a one-time initial-service price.
8. Customer pays on Stripe-hosted Checkout.
9. Redirected confirmation is provisional until the server sees a verified Stripe event.
10. Verified events update the customer, order, payment, and subscription mirror.
11. The system sends the customer confirmation and creates an appointment-preference onboarding record.

## One-Time Treatment

The same eligibility and quote rules apply. Checkout uses one-time payment mode. A successful verified event creates an order and onboarding record but no recurring subscription.

## Out-of-area journey

Do not show a nearby price. Show the searched area, explain that online booking is unavailable there, suggest supported areas where appropriate, and provide a phone/contact or waitlist route. Store this as a lead only after consent.

# 5. New York service-area and price seed

The first database seed should support two area groups. The owner must confirm actual licensing, travel limits, and operating coverage.

| Area group | Provisional test configuration |
|---|---|
| New York City | Manhattan, Brooklyn, Queens, Bronx, Staten Island. Monthly $59; initial service $149; one-time $279. |
| Lower Westchester | Yonkers, Mount Vernon, New Rochelle. Monthly $49; initial service $149; one-time $249. |

These figures are functional seed data for Stripe test mode. They are not Terminix prices. Terminix's official pages require an address and state that cost varies with location, property, pest, and treatment frequency.

## Mandatory live-price guard

- `area_plan_prices.approval_status` must be `provisional`, `approved`, or `retired`.
- Test-mode checkout may use provisional rows.
- Live-mode checkout must reject any quote sourced from a row that is not `approved`.
- Approval records the approver, timestamp, policy version, and Stripe Price IDs.
- A price update creates a new effective-dated version. Never rewrite amounts on historical quotes or orders.

# 6. Data model

The database migration should create at least these tables:

| Table | Purpose and essential fields |
|---|---|
| `profiles` | Supabase user profile, display name, status |
| `staff_roles` | user, role, active dates; roles: operator, manager, admin |
| `customers` | customer number, name, email, phone, Stripe customer ID, preferences |
| `service_addresses` | customer, normalized address, city, state, postal code, service area, access notes |
| `service_areas` | code, public name, group, state, active dates, serviceability status |
| `service_area_aliases` | area, normalized alias, alias type, priority |
| `plans` | name, billing mode, cadence, inclusions, exclusions, follow-up policy, status |
| `area_plan_prices` | area, plan, currency, initial amount, service amount, tax behavior, effective dates, version, approval, Stripe product/price IDs |
| `quotes` | public reference, area, plan, copied price breakdown, price version, expiry, mode, status |
| `customers_quotes` | optional link when the customer is known after quote creation |
| `orders` | customer, quote, billing mode, amount, currency, Stripe Checkout ID, status |
| `payments` | order, Stripe PaymentIntent/Invoice/Charge IDs, amount, state, receipt link, event timestamp |
| `subscriptions` | customer, address, plan, Stripe subscription ID, status, period dates, cancel state, last event time |
| `appointment_requests` | order, preferred window, pest concern, access notes, request status |
| `jobs` | appointment, assigned staff/technician, scheduled window, job status, completion summary |
| `notes` | protected operational notes linked to customer, order, appointment, or job |
| `webhook_events` | unique provider event ID, type, signature result, received time, processing state, retries, error summary |
| `audit_events` | actor, action, entity, record ID, safe before/after summary, timestamp, correlation ID |
| `media_assets` | storage key, role, alt text, source URL, creator, license, attribution requirement, approval, focal point |
| `site_settings` | business name, wordmark, contact channels, support hours, social links, global media references |
| `email_deliveries` | template, recipient hash or protected reference, provider ID, state, attempts, last error |

## Database rules

- Store money as integer cents and currency as uppercase ISO code.
- Use UUID primary keys internally and separate human-safe public references.
- Put unique constraints on Stripe object IDs and provider event IDs.
- Add effective-date indexes for service area and price lookups.
- Add a database constraint preventing an approved price from missing required Stripe Price references.
- Do not expose unrestricted operational tables through client-side public queries.
- Add RLS before production data is inserted.
- Audit all price approval, order status, subscription status, and appointment/job changes.

# 7. API surface

| Endpoint | Purpose | Critical protection |
|---|---|---|
| `GET /api/service-area` | Normalize and resolve city/postal eligibility | Rate limit; no personal data in logs |
| `GET /api/plans?area=` | Return effective plans and display prices | Server source of truth; cache by non-personal area code |
| `POST /api/quotes` | Create an expiring immutable quote | Server-calculated cents; idempotency; signed public reference |
| `POST /api/checkout/session` | Create Stripe Checkout Session | Revalidate quote, price approval, environment, and address-area match |
| `POST /api/webhooks/stripe` | Receive Stripe events | Raw body; signature verification; unique event ID; fast response; retry-safe processing |
| `POST /api/appointments` | Create onboarding preference | Requires paid/approved order or protected assisted-sales path |
| `POST /api/billing-portal` | Create Stripe Customer Portal session | Authenticated ownership check; safe return URL |
| `POST /api/contact` | General or out-of-area inquiry | Rate limit, bot defense, consent, safe email relay |
| `GET /api/admin/*` | Admin queries | Staff session, role check, RLS, audit logging |
| `PATCH /api/admin/prices/*` | Schedule or approve price version | Manager/admin only; no historical rewrite |

# 8. Stripe integration contract

## Required Stripe configuration

- Business-owned Stripe account with completed business verification before live activation.
- Sandbox/test mode and live mode kept strictly separate.
- Products and Prices for Monthly Protection recurring service, initial service, and One-Time Treatment.
- Price rows per approved area group where the amount differs.
- Hosted Checkout branding using the provisional or approved business brand.
- Customer Portal configuration aligned with the owner's cancellation policy.
- Production webhook endpoint and separate local/preview webhook configuration.
- Statement descriptor, support email, support phone, refund policy, terms, and privacy links.

## Minimum webhook event coverage

- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.paid`
- `invoice.payment_failed`
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- Refund/charge events required by the selected refund implementation

## Webhook rules

1. Read the raw request body and verify the Stripe signature.
2. Insert the event ID into `webhook_events` under a unique constraint.
3. If the event already exists, return success without repeating side effects.
4. Return a success response quickly; process complex work through a durable job where available.
5. Treat events as possibly delayed, duplicated, or out of order.
6. Fetch the current Stripe object when an older event would overwrite newer local state.
7. Make customer creation, order activation, subscription update, appointment creation, and email delivery independently idempotent.
8. Run scheduled reconciliation for recent subscriptions, invoices, and incomplete events.

# 9. Pest Operations Console

Release-one protected routes:

- `/admin` — operating summary and exceptions.
- `/admin/customers` — search by customer number, name, email, phone, or postal code.
- `/admin/customers/[id]` — addresses, quotes, orders, subscription, visits, notes, audit history.
- `/admin/orders` — payment and onboarding state.
- `/admin/subscriptions` — active, incomplete, past due, paused, canceled, and unpaid filters.
- `/admin/appointments` — preferred and confirmed visit windows.
- `/admin/jobs` — requested, scheduled, assigned, in progress, completed, canceled, no access.
- `/admin/service-areas` — active areas and aliases.
- `/admin/pricing` — price versions, effective dates, approval, Stripe references.
- `/admin/content` — plans, FAQs, contact information, trust claims, and page status.
- `/admin/media` — replaceable logo and photography with rights metadata.
- `/admin/audit` — protected change history.

Admin UI must provide loading, empty, error, permission-denied, and conflict states. It must never display raw API keys, full payment credentials, or secret webhook values.

# 10. Public information architecture

| Route | Purpose |
|---|---|
| `/` | Pest-control homepage, area search, service modes, trust, process, reviews/credentials, FAQs |
| `/pest-control` | Monthly and one-time comparison, coverage, exclusions, process, area search |
| `/pests` | Pest index |
| `/pests/[slug]` | Ants, cockroaches, bed bugs, rodents, spiders, mosquitoes |
| `/how-it-works` | Inspect, treat, prevent, follow up |
| `/reviews` | Verified proof only; use transparent alternatives if review data is unavailable |
| `/about` | Company, operating standards, licensing, technician policy |
| `/contact` | Phone, email, support hours, inquiry form |
| `/service-area` | Eligibility result and local plans |
| `/checkout/quote` | Plan and price summary |
| `/checkout/details` | Customer, address, consent, pest and visit details |
| `/checkout/payment` | Stripe Checkout handoff |
| `/checkout/confirmation` | Server-verified order and onboarding state |
| `/privacy`, `/terms`, `/cancellation`, `/accessibility` | Required policy pages |

Do not publish empty navigation links. Excluded business lines stay absent until they have real content and a complete user journey.

# 11. Visual and media rules

The site should feel established through hierarchy, authentic content, deliberate spacing, restrained color, consistent components, and complete states—not through decorative AI-style effects.

## Design direction

- Dark forest primary, controlled green action color, warm neutral surfaces, high-contrast ink.
- Professional sans-serif typography with direct headings and readable line lengths.
- 8 px spacing system, disciplined desktop/mobile section rhythm.
- Limited card variants; do not put every section in identical rounded cards.
- Restrained shadow, radius, and motion.
- Minimum 44 px action targets, visible focus, reduced-motion support, WCAG 2.2 AA target.

## Photography policy

- Use real openly licensed or royalty-free commercial-use photographs from sources such as Unsplash, Pexels, or properly licensed Wikimedia Commons files.
- No visible watermark, agency label, embedded credit, unrelated company logo, Terminix branding, or unclear license.
- No AI-generated people, homes, technicians, uniforms, vehicles, pest evidence, testimonial portraits, or treatment scenes.
- Store source URL, creator, license text/link, download date, attribution requirement, approval state, and focal point.
- Keep attribution metadata even when visible attribution is not required.
- Prefer consistent lighting and credible scenes: exterior inspection, equipment in use, technician/customer consultation, accurate pest macro imagery.
- Never imply that stock subjects are actual employees or customers.

## Replaceability requirement

The logo, wordmark, favicon, hero media, pest images, trust images, and contact imagery must resolve through `site_settings` or `media_assets`. Replacing an approved asset must not require component code changes.

# 12. Required accounts and environment variables

The owner creates the accounts and credentials. Record names only—never values—in project documentation.

```text
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
SUPABASE_SERVICE_ROLE_KEY
DATABASE_URL

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_RESTRICTED_KEY
STRIPE_WEBHOOK_SECRET
STRIPE_CUSTOMER_PORTAL_CONFIGURATION_ID
STRIPE_ENVIRONMENT

RESEND_API_KEY
EMAIL_FROM
EMAIL_REPLY_TO
OWNER_NOTIFICATION_EMAIL

SENTRY_DSN
SENTRY_AUTH_TOKEN
CRON_SECRET
ADMIN_BOOTSTRAP_EMAIL
```

Rules:

- Prefer a least-privilege Stripe restricted key where the integration supports it.
- Use separate values for local/test, preview, and production.
- Mark server credentials as sensitive/non-readable in the hosting platform.
- Never prefix a secret with `NEXT_PUBLIC_`.
- Rotate any credential that appears in chat, a commit, build output, screenshot, or document.
- Document who owns each provider account and recovery method outside the codebase.

# 13. One-week execution plan

| Day | Focus | Exit condition |
|---|---|---|
| 1 | Repository, Vercel, Supabase, migrations, staff auth, design tokens, area and provisional price seed | Preview deploy works; admin can sign in; database policies exist |
| 2 | Area search, plan retrieval, immutable quote, Stripe product/price setup, recurring and one-time test Checkout | Both test purchases show correct server-controlled amounts |
| 3 | Stripe webhook verification, deduplication, customer/order/payment/subscription mirrors, Customer Portal, confirmation email | Replayed events create no duplicates; portal ownership is verified |
| 4 | Pest Operations Console: customers, orders, subscriptions, appointments, jobs, notes, audit | Owner can operate a test customer without database access |
| 5 | Homepage, plans, six pest pages, trust content, FAQs, contact, responsive navigation, media replacement | All P0 routes complete; no placeholder navigation |
| 6 | Security, privacy, accessibility, performance, error monitoring, backups, domain and production configuration | Test matrix passes; provisional prices cannot charge live |
| 7 | Owner acceptance, approved prices/policies/assets, live credentials, smoke purchase, rollback drill | Live purchase reaches Stripe and one correct operational record |

## Schedule assumptions

The 5–7 day target requires the owner to create provider accounts on day 1, respond to questions the same day, and approve prices, coverage, policies, and launch content before day 7. If live provider verification or DNS is delayed, ship the complete staging product and keep live checkout disabled rather than weakening controls.

# 14. Release acceptance matrix

## Commercial

- Eligible and ineligible area cases behave correctly.
- Monthly and one-time prices are selected by the matched area, not by the browser.
- Expired, superseded, provisional-live, and address-mismatch quotes are rejected.
- Checkout shows the correct amount due today, recurring cadence, currency, and policy links.
- Monthly test purchase creates one active/incomplete subscription mirror as appropriate.
- One-time test purchase creates no subscription.
- Customer Portal is available only to the authenticated or securely verified owner.

## Webhooks and reliability

- Invalid Stripe signature returns an error and creates no business side effect.
- Duplicate event IDs are acknowledged without duplicate customer, order, appointment, or email.
- Out-of-order events cannot overwrite newer subscription state.
- Payment failure, incomplete checkout, cancellation, refund, and past-due scenarios are visible to operators.
- Reconciliation detects or repairs missed recent events.

## CRM and operations

- Authorized operator can find a customer and see address, quote, order, payment state, subscription, appointment, job, notes, and audit history.
- Unauthorized users cannot query or mutate operational records.
- Price approval and status changes create audit entries.
- No UI displays payment secrets or raw card data.

## Public site and content

- All P0 routes are complete on mobile and desktop.
- No empty menu item or fake feature remains.
- All six pest pages use original reviewed copy and one reusable template.
- Logo and images are replaceable without code changes.
- Every temporary image has a documented source and license.
- No AI-generated or Terminix-owned media or copied copy remains.

## Quality

- Keyboard, screen-reader, zoom, focus, error-summary, and contrast checks pass the agreed baseline.
- No personal information appears in URLs, analytics events, general logs, or client error payloads.
- Core Web Vitals and bundle/image budgets are measured.
- Production errors and email delivery failures are observable.
- Database backup and rollback procedures are documented and tested proportionately.

# 15. Owner decisions still required

The software team must not silently decide these items:

- Exact business name and production domain.
- Legal business entity and business address.
- Confirmed service areas and any excluded ZIP codes.
- Approved monthly, initial-service, and one-time amounts.
- Taxability and tax-collection configuration, confirmed with a qualified adviser.
- Cancellation, refund, rescheduling, no-access, and failed-payment policies.
- Whether appointment selections are preferences or confirmed capacity.
- Covered pests, exclusions, visit cadence, return-service promise, and guarantee wording.
- Business phone, support hours, owner notification email, and customer Reply-To address.
- License/credential claims and verified review source.
- Final logo, colors, and photographs.

# 16. Instructions for the next developer or AI

Start by inspecting the repository, current deployment, migrations, and environment-variable names. Do not rewrite completed work merely to change frameworks or style preferences.

Then:

1. Verify whether Day 1 infrastructure exists.
2. Run database migrations and tests in a non-production environment.
3. Confirm `STRIPE_ENVIRONMENT=test` and the live-price guard before any checkout work.
4. Implement or verify the area → plan → quote → Checkout → webhook → operational record vertical slice.
5. Exercise duplicate, invalid-signature, out-of-order, failed-payment, and quote-expiry tests.
6. Build the operations console around the proven records.
7. Complete public pages and media only after the commercial path is reliable.
8. Record all materially changed decisions in this document and the main project blueprint.
9. Never enable live checkout until the owner approves service coverage, price rows, policies, tax behavior, and live credentials.

## Definition of done

A customer in an approved New York service area can see the correct approved price, purchase recurring or one-time pest service through Stripe, and receive a verified onboarding confirmation. The owner can see and operate that customer in the Pest Operations Console. Payment credentials remain exclusively with Stripe, operational records remain in Supabase, and all public branding and media are original, licensed, and replaceable.

# 17. Primary references

- [Terminix pest-control page](https://www.terminix.com/pest-control/) — reference conversion structure and address-based pricing behavior.
- [Terminix pest-control cost page](https://www.terminix.com/pest-control/cost/) — price factors and inspection-based estimates.
- [Stripe Checkout subscription guide](https://docs.stripe.com/payments/checkout/build-subscriptions) — recurring Checkout and initial one-time fee pattern.
- [Stripe subscription lifecycle](https://docs.stripe.com/billing/subscriptions/overview) — invoices, payment states, retries, and subscription status.
- [Stripe subscription webhooks](https://docs.stripe.com/billing/subscriptions/webhooks) — asynchronous billing events.
- [Stripe Customer Portal](https://docs.stripe.com/customer-management) — billing self-service.
- [Stripe API keys](https://docs.stripe.com/keys) — restricted keys, storage, and rotation.
- [Stripe pricing](https://stripe.com/pricing) — current US payment and Billing fees; recheck before launch.
- [PayPal subscriptions](https://developer.paypal.com/docs/subscriptions/integrate/) — reviewed alternative, deferred from release one.
- [Supabase database](https://supabase.com/docs/guides/database/overview) — managed PostgreSQL and backups.
- [Supabase Auth](https://supabase.com/docs/guides/auth) — identity and authorization integration.
- [Supabase Storage](https://supabase.com/docs/guides/storage) — media storage and access controls.
- [Resend with Next.js](https://resend.com/docs/send-with-nextjs) — transactional email.
- [Vercel environment variables](https://vercel.com/docs/environment-variables) — environment-separated configuration.
- [Unsplash License](https://unsplash.com/license) and [Pexels License](https://www.pexels.com/license/) — current media-use terms; verify every individual asset.
