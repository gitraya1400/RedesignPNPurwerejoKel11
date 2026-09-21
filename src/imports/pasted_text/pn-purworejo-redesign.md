# MEGA PROMPT FIGMA AI: PN PURWOREJO WEBSITE REDESIGN (PN CIKARANG STYLE)
*This is an ultra-detailed, 100-point architectural prompt for Figma AI / v0.dev. The goal is to redesign the pn-purworejo.go.id website by strictly adopting the premium, glassmorphic, and card-based visual identity of pn-cikarang.go.id, while simultaneously solving the 31 Usability Heuristics problems identified previously.*

---

## PART 1: CORE PHILOSOPHY & VISUAL IDENTITY
1. **The Vision:** Transform the legacy PN Purworejo website into a premium, transparent, and authoritative civic tech platform identical in quality to PN Cikarang.
2. **The Vibe:** Authoritative yet modern. Clean, highly spacious, utilizing glassmorphism, subtle gradients, and rounded aesthetic cards.
3. **Primary Color:** Deep Court Red (`#9A2109`). Used for the sticky header transition, primary buttons, hero gradient overlays, and hover states.
4. **Accent Color:** Soft Gold/Yellow (`#F9C784`). Used for top utility bar links, active state indicators, and premium icons (Garuda/Timbangan).
5. **Background Colors:** Pure White (`#FFFFFF`) for content cards. Off-White/Soft Gray (`#F9FAFB`) for section backgrounds. Dark Charcoal (`#0F172A`) for data dashboard panels (IKM/IPAK) and the footer.
6. **Typography - Headings:** `Inter` (Bold, ExtraBold). Must feel geometric and commanding.
7. **Typography - Body:** `Inter` or `Roboto` (Regular, Medium). High legibility for long text.
8. **Grid & Layout Archetype:** Fully card-based layout. Nothing floats loosely; every widget, news item, and schedule must be encapsulated in a beautiful `rounded-2xl` (16px radius) card with a very subtle border (`1px solid #E5E7EB`).

## PART 2: THE HEADER & NAVIGATION SYSTEM (Solving H4)
9. **Top Utility Bar:** A very thin, dark-red bar at the absolute top. Left side: Golden text link "Bagaimana cara mengetahui website resmi?". Right side: Search Icon and a Pill-shaped Dual Language Toggle (ID/EN) where active is white/red, inactive is semi-transparent.
10. **Dynamic Glassmorphic Header:** The main navbar must be sticky. Initial state (at the very top): Transparent background over the red hero image, white text. Scrolled state: Transitions smoothly to a solid white background, dark charcoal text, and a soft drop shadow.
11. **Logo Placement:** Left side of the navbar. Official Mahkamah Agung green/gold circular logo, followed by 2 lines of text: "MAHKAMAH AGUNG RI" (small) over "PN PURWOREJO KELAS IB" (bold).
12. **Navigation Links:** Beranda, Tentang Pengadilan, Layanan Publik, Layanan Hukum, Berita, Hubungi Kami, Reformasi Birokrasi.
13. **Active Menu State:** Active menu items must have a visible underline or gold accent to tell users exactly where they are (Solving H1).
14. **Mega Menu Dropdowns:** Hovering over links opens an elegant floating white card (`rounded-2xl` corners). Deep red hover states (`hover:bg-[#9A2109] hover:text-white`) for sub-menu items with custom chevron arrows. No more dead links (Solving H5).

## PART 3: PREMIUM HERO SECTION
15. **Hero Layout:** Full-width. A rich Deep Red gradient background with an elegant, very thin cross/grid mesh pattern for texture.
16. **Hero Content (Left):** High-priority digital platforms (e.g., e-BERPADU, SIPP). Massive bold white typography. A clean explanatory paragraph below it.
17. **Hero CTA Button:** Pill-shaped (`rounded-full`), white background, deep red text (`#9A2109`). Text: "Selengkapnya →".
18. **Hero Image (Right):** A high-quality, isometric 3D mockup of a laptop/tablet showing the e-Court or SIPP dashboard.
19. **Carousel Controls:** 5 small, clean pagination dots at the absolute bottom center of the hero section.

## PART 4: QUICK LINKS GRID (AKSES CEPAT) - Solving H7
20. **Section Header:** A vertical Deep Red brand bar (`4px` wide) next to bold text: "AKSES CEPAT".
21. **Container:** A horizontal slider or grid layout containing 12 distinct service cards.
22. **Card Design:** White background, `rounded-xl` (12px radius), thin light-gray border (`#E5E7EB`). 
23. **Card Interiors:** A colorful circular container at the top center housing a flat-line icon (e.g., Green for SIPP, Blue for e-Court, Pink for Eraterang). Bold black text below it.
24. **Hover Interaction:** When hovered, the card lifts up (`-translate-y-2`) and casts a slightly larger, soft shadow (Solving H1 feedback).
25. **External Click Prevention:** Clicking any external system (e-Court, SIPP) here MUST trigger a confirmation modal, preventing sudden off-site navigation (Solving H3, H5).

## PART 5: LIVE DASHBOARDS & WIDGETS
26. **Jadwal Sidang Widget (Live Hearings):** A highly modern widget showing today's hearings.
27. **Tabs for Hearings:** Pill-shaped category chips (e.g., [Semua] [Perdata] [Pidana]). Active chip has a deep red background.
28. **Hearing Cards:** Each hearing is a sleek horizontal card showing: Room Number (Badge), Case Number (Bold), Time, Plaintiff vs Defendant, and a button to "Lihat di SIPP".
29. **Public Satisfaction (IKM/IPAK) Dashboard:** A special dark-themed section (`#0F172A` background).
30. **Dashboard Data:** Render beautiful, animated circular progress charts showing "Indeks Kepuasan Masyarakat: 99.93%" and "Indeks Persepsi Anti Korupsi: 100%". White and gold text on the dark background.

## PART 6: NEWS & ANNOUNCEMENTS (Solving H8 Clutter)
31. **Berita Terkini Layout:** Replace the chaotic 4-column layout of the old site. Use a structured, asymmetrical grid.
32. **Hero News Item:** The left column (`60%` width) features a double-height featured card. Large cover photo on top, red category tag, bold title, short body preview, and author/date meta-footer.
33. **Secondary News Items:** The right column (`40%` width) holds a 2x2 grid of smaller standard rectangular cards.
34. **"Baca Selengkapnya" Link:** Deep red text with a right arrow `→`.
35. **Pengumuman Section:** Use a Tab Filter System. [Pengumuman PN Purworejo] (solid active red tab) vs [Pengumuman MA RI] (outline tab).
36. **Pengumuman Cards:** Left side list. Each item features a high-contrast red square badge displaying the Date (e.g., "15" on top, "Mar" below).
37. **Empty States:** If an article category has no content, display a clean empty state graphic (e.g., a stylized open folder) with the text "Belum Ada Artikel" (Solving H9).

## PART 7: FOOTER DESIGN
38. **Footer Vibe:** Premium dark charcoal (`#1E293B`) or dark red background.
39. **Layout:** 4 neat columns. Very legible white and light gray text. High contrast (Solving H8).
40. **Information Integrity:** Fix the email mismatch (ensure `delegasi@pn-purworejo.go.id` is used) and ensure no broken links (Solving H2, H5).

## PART 8: NEWS DETAIL PAGE (Solving H3, H6)
41. **Breadcrumbs:** Must be properly formatted, separated by `>` icons, and the parent categories MUST be clickable links (Solving H3).
42. **Back Navigation:** Add a prominent ghost button `< Kembali ke Daftar Berita` below the breadcrumbs.
43. **Article Layout:** A clean, centered white card container for the reading area. Massive title (`36px`), metadata row (Author, Date), and high-resolution featured image.
44. **Sidebar:** A right-hand column featuring "Artikel Terkait" (Related News) cards. This reduces cognitive load (Solving H6).
45. **Broken Image Fallback:** If an image fails to load, render a gray placeholder with an icon and the text "Gambar tidak tersedia" (Solving H5, H9).

## PART 9: THE SEARCH EXPERIENCE (Solving H1, H7, H9)
46. **Search Interaction:** When the magnifying glass in the top bar is clicked, it expands smoothly into a full-width search input field.
47. **Typing Feedback:** Include a small loading spinner inside the search bar when the user types (Solving H1).
48. **Search Result Page:** A dedicated page titled "Hasil Pencarian". Do not redirect to the homepage.
49. **No Results Found (Empty State):** If a search fails, show a beautiful illustration of a magnifying glass over an empty box.
50. **Recovery Text:** "Maaf, hasil untuk '[Keyword]' tidak ditemukan. Coba periksa ejaan kata atau gunakan kata kunci yang lebih umum." (Solving H9).

## PART 10: EXTERNAL TRANSITION MODAL (Solving H3, H5)
51. **Trigger:** Clicking any link that goes to SIPP, e-Court, or E-Tilang.
52. **UI Design:** Dark blurred overlay (backdrop-filter). Centered white card (`rounded-2xl`).
53. **Content:** A prominent warning icon (Gold/Yellow). Title: "Menuju Sistem Eksternal". Text: "Anda akan meninggalkan website PN Purworejo dan menuju aplikasi eksternal MA RI. Lanjutkan?"
54. **Buttons:** [Batal] (Ghost style) and [Lanjutkan] (Solid Deep Red). This prevents accidental exits and provides an emergency exit.

## PART 11: ZONA INTEGRITAS (ZI) PORTAL
55. **Section Design:** A dedicated maroon/red block on the homepage.
56. **ZI Grid:** An 8-card grid detailing each reform area (Manajemen Perubahan, Penataan Tatalaksana, dll).
57. **ZI Cards:** Customized semi-transparent white/glass panels over the maroon background. Minimalist modern icons for each area.

## PART 12: ACCESSIBILITY & HELP (Solving H10)
58. **Floating Widget:** A persistent headset icon floating on the bottom right of the screen. When hovered, it expands to a pill shape saying "Butuh Bantuan?".
59. **Complaint Map:** Create a step-by-step visual map illustration showing citizens exactly how to submit complaints online (Solving H10).
60. **Form Error Prevention:** Ensure any mocked-up input forms (like search or contact) have explicit inline validation (red borders + error text) if formatted incorrectly (Solving H5).

---
**END OF MEGA PROMPT**
