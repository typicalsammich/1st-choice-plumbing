# 1st Choice Plumbing Services — V9 update

This ZIP contains the complete multipage site, retaining the original URLs, logo, phone number, family-owned and 24/7 indicators, language switching, contact integration, mobile call button and custom scrollbar.

## No arrows or emoji

Arrow characters were removed from links, button labels, gallery controls, CSS pseudo-elements and both language versions across the entire site. The glyphs were removed at source, rather than relying on a font or text-presentation selector. No replacement arrow icons were added. The original SVG clock and hamburger remain ordinary vector shapes. The mobile close action and gallery navigation use plain words.

The source audit covers all public HTML, CSS and JavaScript, checking raw arrow ranges, pictographs, emoji variation selectors, regional indicators and encoded arrow forms. Copyright uses a word rather than a potentially emoji-capable symbol. Original brand image files are unchanged.

## Supplied work gallery

All eleven supplied photographs and both supplied clips appear in Inside the Work. The two PNG screenshots are used only as references and are not included in the website.

The gallery is arranged as a five-chapter work journal: Below ground, Behind the walls, Copper connections, Under the house, and Access & equipment. Each chapter reveals a large photograph or film poster, a description of the visible details and a strip of selectable views. A thin plumbing-drawing line tracks the chapter. Selection produces a short shutter-like reveal and a fine lighting sweep. There is no autoplay carousel or continuous animation.

Desktop uses a vertical chapter directory beside the media. Tablet and mobile use horizontally scrollable chapter selectors and detail strips, with large images, word-based navigation and horizontal gesture support. Photos use contain sizing so portrait and landscape work details remain visible. Reduced motion disables transitions.

Opening a photograph shows a native dialog lightbox with previous/next buttons, keyboard navigation and focus restoration. Opening a film loads and plays the video in response to that click; other gallery selections load only posters. Clips open muted, have native controls and inline mobile playback, and retain the supplied audio. Changing detail or closing the dialog pauses video and clears its source. A blocked-playback or loading error has readable feedback.

Images are optimized WebP with separate small thumbnails. HEIC images were converted. Clips are H.264/AAC MP4 with fast-start metadata, preserved portrait orientation and trimmed metadata; the HDR clip was converted to standard display color. Both full clips remain, approximately 28.7 and 8.8 seconds. Video sizes are about 3.7 MB and 0.5 MB. No movie downloads are required to render the page initially.

Gallery data: `assets/gallery-data.js`. Interaction: `assets/work-gallery.js`. Styles: `assets/work-gallery.css`. Local media and source-name mapping: `assets/work/`.

Captions describe what can be seen. They do not invent customer names, project locations, claims of code compliance or project outcomes. Stock photos outside this gallery remain clearly marked and credited.

## Distinct service-area pages

Every one of the 22 original city URLs has an individually written English and Spanish introduction, explanation, three practical observations and two FAQ answers. The repeated six-service grid was replaced with a relevant service link and a related homeowner guide. Each page also has its own page subtitle and metadata. Shared navigation, contact forms and coverage notices stay consistent.

The pages use different homeowner situations, rather than substituting a city name in the same marketing paragraph: connected household symptoms in Los Angeles, shower compatibility in Beverly Hills, under-sink water in Burbank, remodel planning in Culver City, a running toilet in Downey, access in Encino, recurring drains in Gardena, shower flow in Glendale, bathroom odor in Hawthorne, hot-water demand in Inglewood, property coordination in Long Beach, active leaking in Manhattan Beach, fixture fit in North Hollywood, altered connections in Pasadena, shower scope in Redondo Beach, heater decisions in Santa Monica, underfloor symptoms in Sherman Oaks, kitchen installation in Studio City, heater noise in Torrance, shower temperature in Van Nuys, building arrangements in West Hollywood and new-installation planning in Whittier.

No separate city offices, city-specific customer stories or local completed jobs are claimed. Coverage and availability still need direct confirmation.

## Verification completed

- 41 HTML pages retain one H1, contact forms and SEO metadata. All original HTML URLs remain.
- Local link, asset and fragment checks passed.
- The public-source scan found no arrow glyphs or emoji in 49 HTML/CSS/JS files.
- The city-copy audit found 176 distinct English paragraphs outside the shared forms; Spanish paragraphs were checked separately as well.
- 2,956 simulated DOM assertions passed across all 41 pages, including bilingual content, all 13 gallery entries, chapter selection, image/video dialog controls, deferred video sources, pause/release behavior, menu and lightbox focus, form feedback and intro behavior.
- All eleven optimized photos passed image verification. Both complete video files decoded successfully; H.264/AAC streams and fast-start box ordering were confirmed.
- Ten contact-endpoint cases passed using mocked provider responses. No live email was sent.

## Remaining verification limits and owner setup

The local preview endpoint remained unreachable in this environment. These checks do not verify rendered desktop/mobile layouts or native playback on physical Safari/Chrome devices. Responsive styles are implemented at desktop, tablet and phone sizes, but visual/device QA remains unconfirmed. The earlier browser-policy restriction is documented in the baseline notes.

Email still needs `CONTACT_EMAIL`, `RESEND_API_KEY` and `RESEND_FROM_EMAIL` in Vercel. Confirm actual receipt after configuration. The verified Google review link and any approved company story are still owner inputs. See README-SETUP.txt for deployment instructions. No deployment was performed.
