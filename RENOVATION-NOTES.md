Current version: V9. The gallery and city content below describe the earlier baseline and are superseded by V9-UPDATE-NOTES.md.

# 1st Choice Plumbing Services — original renovation baseline

The existing static multipage structure is retained. No framework, animation library or runtime frontend dependency was added. All 34 original HTML URLs remain, with six new article URLs and a photography-credit page (41 HTML pages total).

## What changed

- Pure black page and section backgrounds, warm white typography, deep red call buttons, restrained blue details, locally bundled Barlow Condensed and Manrope fonts.
- Compact two-level desktop header and centered mobile logo, original family icon and 24/7 label. Mobile drawer includes English/Spanish controls, close button, focus management and scroll locking.
- Homepage keeps the service / company approach / local areas / call hierarchy. The hero uses a candid licensed plumbing photograph, explicitly marked as a concept image.
- Separate Services page presents the same six categories with editorial image/copy sections and call links.
- About page has 873 words of English body content plus natural Spanish, without invented owner names, dates, licenses or history.
- All six existing articles rewritten at their original URLs, plus six new guides. English guides are approximately 730–760 words; Spanish conveys the same practical guidance more concisely. Every guide has a direct answer, observation steps, professional-help cues, FAQ and contact route.
- Blog uses a featured story and editorial listing. Article JSON-LD contains no invented authors or dates.
- All 22 local service-area URLs retained, with locally named introductions, varied homeowner scenarios, links and FAQs. No separate city offices are claimed.
- Reviews page has a finished empty state without testimonials, star ratings or review counts.
- Every HTML page includes the preserved six-field contact form and the existing `/api/contact` integration. Feedback requires an actual successful response with `ok: true`.

## Cinematic entrance

The home page renders before the entrance. On the first homepage visit per browser session, the actual logo receives a restrained light/reflection reveal and then uses the Web Animations API to move and scale toward the header logo. The sequence is about 1.6 seconds, with a 1.75-second cleanup deadline. It includes Skip Intro, respects reduced motion, and has no audio, video or 3D engine. With unsupported animation, disabled JavaScript or reduced motion, the static header is the fallback. Session preference uses `choice-intro`; language preference uses `choice-lang` in local storage.

## Inside the Work gallery

Five category selectors update a large local WebP image, descriptive text and position indicator. An SVG line and a restrained highlight connect desktop selections. Mobile categories scroll horizontally with snap behavior; images also accept swipe gestures. The native dialog lightbox supports a close control, Escape, arrow keys, previous/next controls and restored focus. Category buttons support arrow keys, Home and End. There is no autoplay or carousel library.

Replace photographs in `assets/photos/` and update the five `entries` records in `assets/site.js`. Update descriptions, alt text and concept labels when genuine business photos are approved. Licensing and adaptation credits are visible on `photo-credits.html`. Licensed CC BY-SA images remain available under their respective image licenses; these licenses do not apply to unrelated website code.

## Owner information still needed

1. Destination business email and a verified sending address/domain for Resend.
2. Verified Google Business Profile/review URL and approved customer feedback. Set `googleReviewUrl` in `assets/config.js`; its link stays hidden until configured.
3. Approved company and project photography, with usage permission.
4. A real owner story, optional names and company history. No unfinished story placeholders appear in public copy.
5. Confirmed service scope, city coverage, scheduling details and the retained 24/7 label.
6. Final production domain if different from the original Vercel domain. Update canonical URLs, Open Graph URLs, Article `mainEntityOfPage`, robots and sitemap consistently.

## Verification performed

- File audit: all original pages preserved; all local links, assets and fragments resolved; one H1, description and contact form on all 41 pages; Article JSON-LD parsed.
- JavaScript syntax checked with Node.
- Endpoint exercised with mocked provider responses: method rejection, absent configuration, missing fields, invalid email, excessive input, honeypot rejection, successful acceptance, HTML escaping, provider rejection and network failure. No live email was sent.
- Simulated DOM checks cover Spanish text on all pages, drawer opening/closing and focus, scroll locking, gallery changes, lightbox controls, reduced-motion/session/skip behavior and form failure/confirmation states. These are JavaScript/DOM checks, not rendered device tests.

## Verification limits

The local preview server could not be reached from the in-app browser (connection timeout). Browser policy subsequently blocked access to the failed preview tab. No successful visual browser QA, viewport-overflow measurement or physical iPhone/Android test was completed. Before production launch, check 1440, 1024, 768, 390 and 360px layouts and actual Safari/Chrome behavior, particularly drawer focus, native dialog, text wrapping and the logo transition. Live email delivery remains unverified until the owner configures the environment variables and confirms receipt of a test request.
