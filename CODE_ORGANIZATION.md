# VisionAI Code Organization

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (shadcn/ui)
│   ├── Header.tsx       # Main navigation header
│   ├── TestCard.tsx     # Test selection cards
│   ├── Education.tsx    # Eye health education content
│   ├── MedicationReminder.tsx  # Medication reminder functionality
│   ├── RefractiveTest.tsx      # Vision acuity test
│   ├── ColorBlindTest.tsx      # Color blindness test
│   ├── LanguageProvider.tsx    # Language management
│   └── ThemeProvider.tsx       # Theme management
├── pages/               # Main application pages
│   ├── Index.tsx        # Landing page
│   ├── NotFound.tsx     # 404 error page
│   └── MedicationReminderPage.tsx  # Medication reminder page
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── App.tsx              # Main application component
```

## 🎯 Component Organization

### Core Components

#### **LanguageProvider.tsx**
- **Purpose**: Manages multilingual support (English/Hindi)
- **Sections**:
  - Type definitions
  - English translations
  - Hindi translations
  - Theme provider
  - Language provider
  - Language hook

#### **ThemeProvider.tsx**
- **Purpose**: Manages light/dark theme switching
- **Sections**:
  - Type definitions
  - Context creation
  - Theme provider
  - Theme hook

#### **Header.tsx**
- **Purpose**: Main navigation with language and theme toggles
- **Sections**:
  - Type definitions
  - Header component

### Test Components

#### **RefractiveTest.tsx**
- **Purpose**: Vision acuity testing with letter recognition
- **Sections**:
  - Main component
  - Timer logic
  - Letter generation
  - Helper functions
  - Event handlers
  - Results logic
  - Render sections

#### **ColorBlindTest.tsx**
- **Purpose**: Color blindness detection using Ishihara plates
- **Sections**:
  - Ishihara plates data
  - Main component
  - Timer logic
  - Plate generation
  - Helper functions
  - Event handlers
  - Results logic
  - Render sections

### UI Components

#### **TestCard.tsx**
- **Purpose**: Displays test options on landing page
- **Features**: Responsive design, dark mode support

#### **Education.tsx**
- **Purpose**: Eye health education content
- **Features**: Responsive layout, multilingual support

#### **MedicationReminder.tsx**
- **Purpose**: Medication reminder functionality
- **Features**: Form handling, notification support

## 🎨 Design System

### Color Schemes
- **Primary**: Blue (#0D6EFD)
- **Secondary**: Purple (#6F42C1)
- **Success**: Green (#198754)
- **Warning**: Yellow (#FFC107)
- **Danger**: Red (#DC3545)
- **Info**: Cyan (#17A2B8)

### Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Typography
- **Headings**: Bold, responsive sizing
- **Body**: Regular weight, readable sizes
- **Buttons**: Medium weight, clear hierarchy

## 🔧 Technical Features

### State Management
- **React Context**: For global state (language, theme)
- **Local State**: For component-specific data
- **localStorage**: For persistence

### Performance Optimizations
- **Lazy Loading**: Components loaded on demand
- **Memoization**: Expensive calculations cached
- **Responsive Images**: Optimized for different screen sizes

### Accessibility
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG compliant
- **Focus Management**: Clear focus indicators

## 📱 Responsive Design

### Mobile Optimizations
- **Touch Targets**: Minimum 44px touch areas
- **Readable Text**: Minimum 16px font size
- **Simplified Navigation**: Collapsible menus
- **Optimized Images**: Compressed and responsive

### Tablet Optimizations
- **Grid Layouts**: Adaptive column counts
- **Touch Interactions**: Optimized for touch
- **Medium Screens**: Balanced layouts

### Desktop Optimizations
- **Full Features**: All functionality available
- **Hover States**: Rich interaction feedback
- **Large Screens**: Optimal use of space

## 🌐 Internationalization

### Language Support
- **English**: Primary language
- **Hindi**: Secondary language with proper Unicode support
- **RTL Support**: Ready for right-to-left languages

### Translation Structure
```typescript
const translations = {
  en: {
    // English translations
  },
  hi: {
    // Hindi translations
  }
}
```

## 🎭 Theme System

### Light Theme
- **Background**: White (#FFFFFF)
- **Text**: Dark gray (#1F2937)
- **Accents**: Blue variants

### Dark Theme
- **Background**: Dark gray (#111827)
- **Text**: Light gray (#F9FAFB)
- **Accents**: Blue variants with higher contrast

## 🧪 Testing Strategy

### Test Types
1. **Refractive Test**: 10 questions, 10 seconds each
2. **Color Blindness Test**: 10 Ishihara plates, 10 seconds each
3. **Education**: Informational content
4. **Medication Reminder**: Form-based functionality

### Scoring Systems
- **Refractive**: Based on correct letter identification
- **Color Blindness**: Based on correct number identification
- **Medical Accuracy**: Follows standard medical guidelines

## 📊 Code Quality

### Organization Principles
1. **Separation of Concerns**: Each component has a single responsibility
2. **Reusability**: Components are designed for reuse
3. **Maintainability**: Clear structure and documentation
4. **Scalability**: Easy to add new features

### Best Practices
- **TypeScript**: Full type safety
- **ESLint**: Code quality enforcement
- **Prettier**: Consistent formatting
- **Component Composition**: Small, focused components

## 🚀 Performance

### Optimization Techniques
- **Code Splitting**: Lazy loading of components
- **Image Optimization**: WebP format with fallbacks
- **Bundle Analysis**: Regular bundle size monitoring
- **Caching**: Strategic use of browser caching

### Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔒 Security

### Data Protection
- **No Personal Data**: Tests don't store personal information
- **Local Storage**: Only preferences stored locally
- **HTTPS**: Secure data transmission
- **Privacy First**: No tracking or analytics

## 📈 Future Enhancements

### Planned Features
- **Additional Tests**: More eye health screening options
- **User Accounts**: Optional user registration
- **Progress Tracking**: Historical test results
- **Export Results**: PDF report generation
- **Offline Support**: Service worker implementation

### Technical Improvements
- **PWA Support**: Progressive Web App features
- **Advanced Analytics**: Usage insights (privacy-preserving)
- **API Integration**: Connection to health databases
- **AI Enhancement**: Machine learning for better accuracy
