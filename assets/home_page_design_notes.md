# Home Page Design Notes

## 1. Layout & Structure

- **Overall Structure:**  
  - A responsive two-row Grid layout with three columns per row (visible: 6 cards).
  - Each cell contains a **feature card** with a prominent icon, a header, description text, and a "More" link.
- **Spacing:**
  - Consistent gap (approx. 12–16px) between cards horizontally and vertically.
  - Card padding: ~16px.
  - Grid has margin to page edges (~24px).
- **Card Structure:**
  - Top: Large centered icon
  - Middle: Title (bold), Subtitle/Category (caps), short paragraph (body text)
  - Bottom: “More” link, aligned left.
  - Each card uses rounded corners (border-radius: 10–12px) and drop-shadow for elevation.
- **Responsive:**  
  - On smaller screens, grid stacks to one or two columns; cards expand full width.

## 2. Color Palette

- **Primary BG:** #20272D (dark blue-gray, from lower portion cards)
- **Accent BG:** #F04C40 (red), #00C46F (green), #60E1E0 (teal), #B9BEC9 (gray), #5E5A5A (med-dark gray), #161E39 (deep blue), #67DEF6 (light blue), #EA4C89 (magenta/pink)
- **Card BG colors:**
    - Brakes: #20272D (dark blue-gray)
    - Engine: #B9BEC9 (light gray)
    - Engine Performance: #F04C40 (red)
    - Trouble Codes: #00C46F (green)
    - Drivetrain: #60E1E0 (teal)
    - Body: #161E39 (deep blue)
- **Text:** 
    - White: #FFFFFF
    - Muted Gray: #B9BEC9
    - Black/dark: #20272D
    - Card Titles: White  
- **Links:** #67DEF6 (cyan/light-blue)
- **Icons:** Solid black/dark for cards with light backgrounds, white for dark cards.

## 3. Typography

- **Font Family:** "Helvetica Neue, Arial, sans-serif" (assumed)
- **Card Title:**  
  - Font-size: 1.2–1.4rem  
  - Font-weight: bold (700)
  - Letter-Spacing: normal
- **Card Subtitle/category:**  
  - All caps
  - Small font-size (0.8rem)
  - Semibold (600)
- **Body Text:**
  - Font-size: 0.95–1rem
  - Regular weight (400)
  - Muted color (gray/white depending on BG)
- **Link (“More”):**
  - Font-size: 0.92rem
  - Underlined on hover/focus
  - Contrasting color (cyan/light-blue)

## 4. Key Visual Elements

- **Icons:**  
  - Each card has a bold, simple line/vector icon (brake, engine, graph, code, drivetrain, car silhouette).
  - Sized to approx. 32–48px, color adapted for contrast.
- **Cards:**  
  - Box-shadow: 0 2px 8px rgba(0,0,0,0.05)
  - Border-radius: 10–12px
  - Flat color backgrounds (no gradient)
  - Padding inside cards: ~16px

## 5. Accessibility Cues

- **Color contrast:**  
  - All text/links maintain strong contrast over card backgrounds for readability.
- **Keyboard focus:**  
  - “More” links should be focusable (use `tabindex=0`) and have visible focus ring (suggested: outline: 2px solid #67DEF6;).
- **Alt Text:**  
  - All icons/images should have meaningful alt text, e.g., “Brakes Icon”
- **Semantic Structure:**
  - Use `<section>` for each card, headings as `<h2>` for card titles.
  - Ensure links use `<a href>` with discernible text.
- **ARIA:**  
  - For dynamic cards, use `aria-label` summarizing content.

## 6. Example Semantic Markup for Each Card

```html
<section class="feature-card" aria-label="Brakes Card">
  <img src="icon-brakes.svg" alt="Brakes Icon" />
  <h2>BRAKES</h2>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
  <a href="#" tabindex="0">More</a>
</section>
```

## 7. Interactive/Navigation Elements

- "More" in each card navigates to deeper informational or sub-feature pages.
- All cards present actionable info & links in a consistent spot for usability.
- Accessibility: All links keyboard-visible, logical tab order.
- Hover/active/focus states for links: Underline and color accent.

## 8. Layout Method

- Use CSS Grid for main card arrangement:  
```css
.display-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
}
@media (max-width: 960px) {
    .display-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
    .display-grid { grid-template-columns: 1fr; }
}
```
- Each `.feature-card` is a grid item.

---

**Summary**:  
This design employs a visually engaging, accessible card grid with a modern color palette and clear typographic hierarchy. All navigation points are visually and functionally accessible, and iconography is clear, high-contrast, and meaningful. The consistent layout supports rapid scanning and touch-friendly use.

