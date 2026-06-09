# Carisma Slimming Website - Setup & Customization Guide

## Project Overview

This is a complete Next.js recreation of your Carisma Slimming website, migrated from Wix.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
# http://localhost:3000
```

## What's Included

✅ Complete page structure matching your Wix site
✅ All service pages (Fat Freezing, Fat Dissolving, etc.)
✅ Team/Doctor profiles page
✅ Weight Loss program page
✅ GLP-1 medications page
✅ Slimming guide page
✅ Contact/consultation form
✅ Privacy policy and terms pages
✅ Responsive mobile design
✅ Professional component structure

## Customization Checklist

### 1. Business Information
- [ ] Update phone number (+35627802062 → your number)
- [ ] Update email (info@carismaslimming.com → your email)
- [ ] Update social media links (Instagram, Facebook)

**Files to edit:**
- `components/Header.tsx` (line 30, 44)
- `components/Footer.tsx` (line 27-31)

### 2. Images & Media
- [ ] Add hero image to `public/images/hero.jpg`
- [ ] Add doctor photos (doctor-1.jpg, doctor-2.jpg, doctor-3.jpg)
- [ ] Add treatment images
- [ ] Add before/after transformation images

**Then update:**
- `components/HeroSection.tsx` - Add Image component
- `components/DoctorProfiles.tsx` - Add doctor images
- `app/packages/[service]/page.tsx` - Add treatment images

### 3. Update Service Descriptions

Edit `lib/services.ts`:
- Update service titles, subtitles, descriptions
- Customize benefits for each service
- Adjust duration information

### 4. Update Doctor Information

Edit `app/team/page.tsx`:
- Replace doctor names
- Update specialties
- Update experience years
- Customize bios with real information

Edit `components/DoctorProfiles.tsx`:
- Update initials to match real names
- Update descriptions

### 5. Add Testimonials

Edit `components/TestimonialsSection.tsx`:
```typescript
const testimonials = [
  {
    name: 'Client Name',
    result: 'XYkg weight loss in X weeks',
    quote: 'Your actual testimonial here',
    rating: 5,
  },
  // Add more...
];
```

### 6. Setup Contact Form

The form in `app/consultation/page.tsx` needs email integration.

**Option 1: SendGrid**
```bash
npm install @sendgrid/mail
```
Then create API route: `app/api/send-email/route.ts`

**Option 2: Nodemailer**
```bash
npm install nodemailer
```
Create API route for email handling

**Option 3: Third-party service**
- Use Formspree, Basin, or similar
- Update form action to external endpoint

### 7. Update Legal Pages

- [ ] `app/privacy-policy/page.tsx` - Add your privacy policy
- [ ] `app/terms/page.tsx` - Add your terms and conditions

### 8. Homepage Content

The home page includes these sections (edit as needed):
- `components/HeroSection.tsx` - Main headline and CTA
- `components/PillarsSection.tsx` - Four pillars of approach
- `components/ServicesGrid.tsx` - Featured services
- `components/DoctorProfiles.tsx` - Doctor bios
- `components/TestimonialsSection.tsx` - Client reviews

## Page Routes

- `/` - Home page
- `/weight-loss` - Weight loss program details
- `/glp1` - GLP-1 medications information
- `/packages` - All packages overview
- `/packages/fat-freezing` - Fat freezing service
- `/packages/fat-dissolving` - Fat dissolving service
- `/packages/muscle-stimulation` - Muscle stimulation
- `/packages/skin-tightening` - Skin tightening
- `/packages/lipocavitation` - Lipocavitation
- `/packages/anti-cellulite` - Anti-cellulite treatment
- `/packages/lymphatic-drainage` - Lymphatic drainage
- `/slimming-guide` - Nutrition and lifestyle guide
- `/team` - Doctor profiles and team info
- `/consultation` - Contact form and inquiry
- `/privacy-policy` - Privacy policy
- `/terms` - Terms and conditions

## Data Management

All service information is in `lib/services.ts`:
```typescript
export const services: Record<string, Service> = {
  'fat-freezing': {
    id: 'fat-freezing',
    title: 'Fat Freezing (CoolSculpting)',
    subtitle: 'Non-invasive fat reduction',
    description: 'Target stubborn fat...',
    benefits: [...],
    duration: '30-60 minutes per session',
    color: 'blue',
  },
  // ... more services
};
```

Edit this file and all service pages update automatically!

## Styling

The site uses Tailwind CSS. To change the color scheme:

1. Search for all instances of `bg-blue-600` and replace with your color
2. Or modify `tailwind.config.ts` for more control

Current color hierarchy:
- Primary: Blue (`bg-blue-600`)
- Secondary: Purple, Green, Red (for different service pages)

## Deployment

### To Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

### To Netlify
1. Push code to GitHub
2. Connect GitHub repo to Netlify
3. Deploy with one click

### To Other Platforms
Build and start production server:
```bash
npm run build
npm start
```

Works on: AWS, Heroku, DigitalOcean, etc.

## Testing Before Launch

- [ ] Test all links work
- [ ] Test contact form sends emails
- [ ] Test on mobile devices
- [ ] Check all images load
- [ ] Verify phone numbers are clickable
- [ ] Test email links work
- [ ] Check page load speed

## File Structure Reference

```
app/
├── layout.tsx           # Root layout with Header/Footer
├── page.tsx            # Home page
├── weight-loss/
├── glp1/
├── packages/
│   ├── page.tsx
│   └── [service]/page.tsx  # Dynamic pages
├── slimming-guide/
├── team/
├── consultation/
├── privacy-policy/
├── terms/
└── globals.css

components/
├── Header.tsx
├── Footer.tsx
├── HeroSection.tsx
├── PillarsSection.tsx
├── ServicesGrid.tsx
├── DoctorProfiles.tsx
└── TestimonialsSection.tsx

lib/
└── services.ts         # All service data

public/
└── images/            # Add your images here
```

## Getting Help

- Next.js Docs: https://nextjs.org/docs
- Tailwind Docs: https://tailwindcss.com/docs
- TypeScript Docs: https://www.typescriptlang.org/docs

## Next Steps

1. ✅ Project created and structure set up
2. ⏳ Add your images to `public/images/`
3. ⏳ Update all text content with your information
4. ⏳ Setup contact form email integration
5. ⏳ Test thoroughly on all devices
6. ⏳ Deploy to production

Good luck with your new website!
