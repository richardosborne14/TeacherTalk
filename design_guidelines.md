# Design Guidelines: AI Language Learning Companion

## Design Approach
**Reference-Based Approach**: Drawing inspiration from conversational interfaces like Intercom, Duolingo's encouragement patterns, and cozy productivity apps like Bear Notes. The aesthetic is "teacher's study" - warm, personal, and inviting rather than corporate or sterile.

## Core Design Principles
- **Warm & Welcoming**: Create a safe, encouraging space for learning
- **Mobile-First**: Phone usage is primary; desktop is enhancement
- **Conversational, Not Corporate**: Friendly teacher, not eLearning platform
- **Whimsical Touches**: Subtle personality without being childish

## Typography
**Font Families**:
- Primary: Inter or system-ui for clean readability
- Optional accent: A warm, friendly serif for headings (e.g., Merriweather)

**Scale**:
- Body text: 16px minimum (mobile), 18px (desktop)
- Subheadings: 20-24px
- Main heading: 32-40px (mobile), 48-56px (desktop)
- Chat messages: 16-18px for comfort reading

**Weights**: Regular (400) for body, Medium (500) for emphasis, Bold (700) for headings

## Color Palette
**Backgrounds**:
- Primary: #FFF8F0 (warm cream)
- Chat bubbles (user): #FFE5E5 (light warm pink)
- Chat bubbles (AI): #FFFFFF with subtle shadow

**Accents**:
- Primary CTA: #FF6B6B (warm coral-red)
- Hover state: #FF5252 (slightly deeper)
- Secondary actions: #2C3E50 (dark blue-gray)

**Text**:
- Primary: #2C3E50 (readable dark blue-gray)
- Secondary: #5A6C7D (muted for timestamps, hints)
- On accent: #FFFFFF

## Layout System
**Spacing Units**: Use Tailwind's 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Component padding: p-6 to p-8 (mobile), p-8 to p-12 (desktop)
- Section spacing: gap-6 to gap-8 between major elements
- Chat message spacing: gap-4 between messages

**Container**:
- Max-width: 768px for chat interface (optimal reading width)
- Full-width on mobile with px-4 padding
- Centered on desktop with generous side margins

## Component Library

### Landing Section
- **Header**: Large, warm welcome text centered at top
- **Subheading**: Encouraging copy that removes friction ("No signup needed - just start talking")
- **Chat Container**: Primary focus, positioned prominently below header

### Chat Interface
**Message Bubbles**:
- Rounded corners: rounded-2xl (16px radius)
- Padding: px-4 py-3 (cozy feel)
- Max-width: 80% of container
- User messages: Right-aligned, warm accent background
- AI messages: Left-aligned, white with soft shadow (shadow-sm)
- Timestamp: Small, muted text below each message

**Input Area**:
- Fixed at bottom on mobile (sticky positioning)
- Rounded input field: rounded-full for friendly appearance
- Generous padding: px-6 py-4
- Send button: Icon-only, circular, warm accent color
- Soft shadow: shadow-lg to lift above content

**Welcome State** (before first message):
- Centered greeting card with warm background
- Suggested starter prompts as tappable chips
- Friendly icon (from react-icons, e.g., chat bubble or book)

### UI Elements
**Buttons**:
- Primary: bg-[#FF6B6B], rounded-full, px-8 py-3, shadow-md
- Secondary: Outlined style with warm accent border
- Hover: Slight scale (1.02) and deeper color

**Shadows**:
- Soft, warm shadows: Use colored shadows (not pure black)
- Example: shadow-[0_4px_14px_rgba(255,107,107,0.15)]

**Icons**: React Icons library - prioritize friendly, rounded icon sets like HeroIcons (rounded style)

## Animations
**Framer Motion Applications** (subtle only):
- Message entrance: Gentle slide-up with fade (y: 10, opacity: 0 → 1)
- Input focus: Subtle scale on chat input
- Button hover: Slight lift (y: -2px)
- Loading state: Gentle pulse on AI "typing" indicator

**Performance**: Keep animations under 300ms, use transform and opacity only

## Images
**Hero Section**: Not applicable - this is a chat-first interface. Focus immediately on conversation.

**Optional Decorative Elements**:
- Small, warm illustration in empty chat state (hand-drawn style, like a friendly book or teacher figure)
- Subtle background texture: Very light paper/grain texture on cream background

## Mobile-First Considerations
- Touch targets: Minimum 44x44px for all interactive elements
- Thumb-friendly: Input and send button in easy reach at bottom
- No horizontal scroll: All content fits viewport width
- Readable: Large text, high contrast, no tiny UI elements
- Fast tap response: Instant visual feedback on all interactions

## Accessibility
- Focus states: Clear outline in warm accent color
- Label all inputs properly
- ARIA labels for icon-only buttons
- Maintain contrast ratios (WCAG AA minimum)
- Keyboard navigation: Chat input accessible, messages readable by screen readers

## Unique Characteristics
- **Personality Over Polish**: Slight imperfections okay (hand-drawn feel in illustrations)
- **Encouraging Micro-copy**: Every empty state, error, or waiting moment has warm, supportive text
- **No Corporate Jargon**: Avoid terms like "dashboard," "platform," "portal"
- **Teacher's Voice**: UI copy sounds like a patient, enthusiastic teacher