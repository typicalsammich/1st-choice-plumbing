1ST CHOICE PLUMBING SERVICES — RENOVATED MULTIPAGE SITE — V9

DEPLOY TO GITHUB / VERCEL
Extract the ZIP and upload its contents to the repository root. index.html, assets/, api/, areas/ and blog/ should be at that root, not inside another nested folder.
Import the repository into Vercel. Choose the Other framework preset, leave Build Command empty, and use the repository root as the static output directory (.). No frontend installation or build is required. Keep api/contact.js at the project root's api directory. package.json declares ES modules for this function.
Preserve the .html page URLs. The included vercel.json sets cleanUrls to false.
The package is prepared for Vercel; a deployment was not performed in this session.

EMAIL DELIVERY — REQUIRED CONFIGURATION
The existing Resend integration is retained. In Vercel project environment variables set:
CONTACT_EMAIL = the owner's destination business email
RESEND_API_KEY = the private Resend API key
RESEND_FROM_EMAIL = a sender authorized by the verified domain in Resend
Redeploy after setting these values. Test a request and confirm actual receipt with the owner.
Do not put keys or the recipient configuration into browser JavaScript. .env.example documents names only; .gitignore excludes local secret files.
Without all three values, /api/contact returns 503 and the form offers the phone route. A request is shown as accepted only after an HTTP success response with ok: true. Provider acceptance is not a guarantee of inbox receipt or an appointment.

REVIEWS
Set the verified Google review profile URL in assets/config.js. The review button is hidden until that URL is configured. Add only approved, verified customer feedback; there are no fabricated quotes, counts or star ratings.

PHOTOGRAPHY
Concept images are local optimized WebP files. They are explicitly labeled and credited on photo-credits.html. Replace them with approved real photography and update the five entries records in assets/site.js, including both languages and alt descriptions. Retain attribution/license links while the licensed concept images are used.
Fonts are bundled locally. Their OFL license notices are in assets/fonts/.

SEO
The original https://1st-choice-plumbing-nine.vercel.app domain is retained in canonical URLs, Open Graph, Article JSON-LD, sitemap.xml and robots.txt. If the production domain changes, update those places consistently before launch. All original article and service-area URLs remain.

VALIDATION
All 41 HTML pages passed local-link, anchor, H1, form and metadata audits. 2,956 simulated DOM assertions passed for V9. Ten email-endpoint cases passed with mocked provider responses; no email was sent. See V9-UPDATE-NOTES.md for current details.
Browser preview failed due local connection timeout and then a browser security-policy rejection. Visual QA at 1440, 1024, 768, 390 and 360px and physical Safari/Chrome testing remain unverified. Live email needs the configuration above.

Reference documentation:
https://vercel.com/docs/functions/runtimes/node-js
https://vercel.com/docs/functions/configuring-functions/runtime
https://vercel.com/docs/project-configuration/vercel-json
