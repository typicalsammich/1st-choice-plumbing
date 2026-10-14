1ST CHOICE PLUMBING SERVICES — RENOVATED MULTIPAGE SITE — V13

DEPLOY TO GITHUB / VERCEL
Extract the ZIP and upload its contents to the repository root. index.html, assets/, api/, areas/ and blog/ should be at that root, not inside another nested folder.
Import the repository into Vercel. Choose the Other framework preset, leave Build Command empty, and use the repository root as the static output directory (.). No frontend installation or build is required. Keep api/contact.js at the project root's api directory. package.json declares ES modules for this function.
Preserve the .html page URLs. The included vercel.json sets cleanUrls to false.
The package is prepared for Vercel; a deployment was not performed in this session.

EMAIL DELIVERY — REQUIRED CONFIGURATION
The existing Resend integration is retained. In Vercel project environment variables set:
CONTACT_EMAIL = optional recipient override (defaults to 1stchoiceplumbing31@gmail.com)
RESEND_API_KEY = the private Resend API key
RESEND_FROM_EMAIL = a sender authorized by the verified domain in Resend
Redeploy after setting these values. Test a request and confirm actual receipt with the owner.
Do not put keys or the recipient configuration into browser JavaScript. .env.example documents names only; .gitignore excludes local secret files.
Without the Resend key and verified sender, /api/contact returns 503 and the form offers the phone route. A request is shown as accepted only after an HTTP success response with ok: true. Provider acceptance is not a guarantee of inbox receipt or an appointment.

REVIEWS
Set the verified Google review profile URL in assets/config.js. The review button is hidden until that URL is configured. Add only approved, verified customer feedback; there are no fabricated quotes, counts or star ratings.

PHOTOGRAPHY
All project photos and videos are supplied by the plumber. The supplied company logo is used throughout, including the cinematic intro. No stock or concept photographs are included. Fonts and their licenses remain bundled locally.

SEO
The original https://1st-choice-plumbing-nine.vercel.app domain is retained in canonical URLs, Open Graph, Article JSON-LD, sitemap.xml and robots.txt. If the production domain changes, update those places consistently before launch. All original article and service-area URLs remain.

VALIDATION
See V13-UPDATE-NOTES.md for current checks and verification limits.

Reference documentation:
https://vercel.com/docs/functions/runtimes/node-js
https://vercel.com/docs/functions/configuring-functions/runtime
https://vercel.com/docs/project-configuration/vercel-json
