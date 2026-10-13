1ST CHOICE PLUMBING — V7
Upload/deploy this folder to Vercel. Site uses pure black backgrounds.

EMAIL FORM SETUP — REQUIRED BEFORE FORM CAN DELIVER EMAIL
1. Obtain the business owner's destination email address.
2. Create a Resend account and verify a domain authorized to send email.
3. In Vercel Project Settings > Environment Variables set:
   CONTACT_EMAIL = owner's destination email
   RESEND_API_KEY = Resend API key
   RESEND_FROM_EMAIL = verified sender address, e.g. requests@yourdomain.com
4. Redeploy. The /api/contact endpoint will then deliver submissions.
Without these settings the form deliberately displays a configuration error and does NOT falsely claim the request was sent.
Do not place API keys in HTML or browser JavaScript.

Content to confirm before publishing: 24/7 service availability, exact service list, family-owned claim, city coverage, company story, licensing, review links.
All photo URLs are temporary stock/inspiration imagery and are not represented as completed projects.
Replace sample About text and reviews page with verified owner information.
