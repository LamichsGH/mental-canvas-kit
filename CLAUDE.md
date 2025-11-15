# CLAUDE.md - Fuel Haus 2.0 Development Guide

## **Development Commands**
```bash
# Testing
npm test
npm run test:coverage

# Linting & Type Checking  
npm run lint
npm run typecheck

# Build Commands
npm run build
npm run dev
```

## **Project Structure & Conventions**
- **Styling**: Uses Tailwind CSS + inline styles for specific brand colors
- **Components**: Located in `/src/components/` - follow existing patterns
- **Assets**: Images go in `/src/assets/`
- **UI Components**: Custom components in `/src/components/ui/`

## **Brand Colors & Design System**
- **Primary Background**: #8b5e46 (rich cocoa brown)
- **Text Color**: #f5efea (soft cream) or white
- **Button Background**: #f5efea (soft cream)
- **Button Text**: #1c1c1c (dark charcoal)
- **Accent/Border**: rgba(245, 239, 234, 0.15) for translucent backgrounds

## **Design Patterns**
- **Hero Sections**: Rich cocoa brown backgrounds (#8b5e46) with cream text
- **Buttons**: Cream background with dark text for optimal contrast
- **Background Images**: 30% opacity, bg-cover positioning, bg-left-center for product visibility
- **Social Proof**: Bold text in translucent pill-shaped badges
- **Typography**: Large, bold headlines as focal points; medium weight subheadlines

## **Git Workflow**
- Always stage specific files before committing: `git add [specific-files]`
- Use descriptive commit messages with context and purpose
- Include Claude Code attribution in commits
- Push after each logical change set
- Repository: https://github.com/LamichsGH/Fuel-Haus-2.0

## **Brand Voice & Messaging**
- **Main Value Proposition**: "For when you need to refill more than your cup"
- **Product Description**: "Electrolyte-infused comfort drinks designed to help you recharge softly"
- **Social Proof**: "Loved by our first 50 testers"
- **CTA**: "Shop now"
- **Tone**: Emotional, comfort-focused, premium, cozy, wellness-oriented

## **Key Components**

### **Hero Component (`/src/components/Hero.tsx`)**
- Rich cocoa brown background (#8b5e46)
- Background image with 30% opacity and bg-left-center positioning
- Cream text throughout (#f5efea)
- Cream CTA button with dark text
- Maintains existing animations and responsive behavior

### **Asset Management**
- Hero background: `/src/assets/hero-background.png`
- Other brand assets stored in `/src/assets/` directory
- Use absolute paths when referencing assets

## **Development Notes**
- **Always maintain existing animations and transitions**
- **Keep responsive behavior patterns intact**
- **Follow established component structure and naming**
- **Use inline styles for brand-specific colors to ensure consistency**
- **Preserve accessibility and semantic HTML structure**

## **Testing & Quality**
- Run linting and type checking after major changes
- Test responsive behavior across breakpoints  
- Verify color contrast for accessibility
- Check image loading and positioning across devices

## **Brand Personality**
Creates an immediate cozy, premium feel that sets the emotional tone for the entire site. Focus on comfort, wellness, and the emotional benefits of the product beyond just hydration.