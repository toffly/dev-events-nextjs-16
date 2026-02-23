<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into your **DevEvent** Next.js 16 App Router project. Here's a summary of every change made:

- **`instrumentation-client.ts`** (new file): Initialises PostHog client-side using the Next.js 15.3+ `instrumentation-client` pattern. Configures a reverse proxy path (`/ingest`), automatic exception capture, and debug mode in development.
- **`next.config.ts`**: Added reverse proxy `rewrites` to tunnel PostHog requests through `/ingest`, reducing interception by ad-blockers. Also set `skipTrailingSlashRedirect: true` as required by PostHog.
- **`components/ExploreBtn.tsx`**: Added a click handler that fires `explore_events_clicked` when users click the "Explore Events" hero button.
- **`components/EventCard.tsx`**: Converted to a client component and added a click handler that fires `event_card_clicked` with the event's title, slug, location, and date as properties.
- **`components/Navbar.tsx`**: Converted to a client component and added click handlers on all nav links that fire `nav_link_clicked` with the link label as a property.
- **`.env.local`**: Populated `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` with your project credentials (covered by `.gitignore`).

## Events instrumented

| Event name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicks the "Explore Events" hero CTA button, signalling intent to browse | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicks an event card to view details; includes `event_title`, `event_slug`, `event_location`, `event_date` | `components/EventCard.tsx` |
| `nav_link_clicked` | User clicks a navbar link; includes `nav_label` (Home, Events, Create Event, logo) | `components/Navbar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics**: https://us.posthog.com/project/321050/dashboard/1300283
- **User Engagement Trends** (CTA clicks vs card clicks over time): https://us.posthog.com/project/321050/insights/RFqPeiOT
- **Hero-to-Event Discovery Funnel** (drop-off from CTA → card click): https://us.posthog.com/project/321050/insights/2Wi7vEif
- **Navigation Link Clicks** (which nav links are used most): https://us.posthog.com/project/321050/insights/XuZOjfzS
- **Unique Users Exploring Events** (daily unique top-of-funnel users): https://us.posthog.com/project/321050/insights/7vpo13H6
- **Top Clicked Events** (most popular event cards by title): https://us.posthog.com/project/321050/insights/0AKlTpCQ

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/posthog-integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
