# Taski Admin Panel - Development Plan
## Complete Step-by-Step Guide for Junior Developers

---

## 🎯 Project Goal
Build a Persian (RTL) admin panel that serves as a reusable boilerplate for future projects.

---

## 📋 Prerequisites Checklist
- [ ] Node.js 22+ installed
- [ ] Bun installed (package manager)
- [ ] Code editor (VS Code recommended)
- [ ] Basic understanding of React hooks (useState, useEffect)
- [ ] Git installed for version control

---

## Phase 1: Foundation & RTL Setup (Week 1)

### Step 1.1: Understand Current Structure (Day 1)
**Goal:** Familiarize yourself with the existing codebase

**Tasks:**
- [ ] Read `AGENTS.md` to understand project architecture
- [ ] Explore the folder structure:
  - `src/pages/` - Page components
  - `src/components/` - Reusable UI components
  - `src/layout/` - Layout structure (Header, Sidebar, Footer)
  - `src/themes/` - MUI theme configuration
  - `src/menu-items/` - Navigation menu config
- [ ] Run the project: `yarn start`
- [ ] Navigate through all existing pages
- [ ] Take notes on how routing works (check `src/routes/`)

**Learning Resources:**
- React Router v7 documentation
- Material-UI components overview

**Expected Output:**
- Written notes on folder structure
- Understanding of how pages are connected

---

### Step 1.2: Install RTL & i18n Dependencies (Day 1-2)
**Goal:** Add libraries for Persian language and RTL support

**Tasks:**
```bash
# Install internationalization library
bun add i18next react-i18next i18next-browser-languagedetector

# Install date handling for Persian calendar
bun add date-fns-jalali
```

**Files to Create:**
- `src/i18n/index.js` - i18n configuration
- `src/i18n/locales/fa.json` - Persian translations
- `src/i18n/locales/en.json` - English translations (backup)

**Expected Output:**
- Dependencies installed successfully
- i18n folder structure created

---

### Step 1.3: Configure RTL Support (Day 2-3)
**Goal:** Enable RTL layout throughout the application

**Tasks:**
- [ ] Update `src/themes/index.jsx` to add RTL direction
- [ ] Create RTL-aware theme function
- [ ] Add RTL CSS support for MUI components
- [ ] Test RTL in main layout

**Key Files to Modify:**
1. `src/themes/index.jsx` - Add `direction: 'rtl'`
2. `src/App.jsx` - Wrap with RTL provider
3. `src/index.jsx` - Add RTL stylesheets

**Code Example Structure:**
```javascript
// In themes/index.jsx
import { createTheme } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// Create RTL cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

// Add direction: 'rtl' to theme
```

**Expected Output:**
- Layout flows right-to-left
- Text alignment is correct
- Drawer opens from the right side

---

### Step 1.4: Implement Basic i18n (Day 3-4)
**Goal:** Add Persian language throughout the app

**Tasks:**
- [ ] Configure i18next in `src/i18n/index.js`
- [ ] Create translation files for all UI text
- [ ] Replace hardcoded English text with `t()` function
- [ ] Add language switcher component
- [ ] Test switching between Persian and English

**Translation Categories:**
- Navigation menu items
- Button labels
- Form labels
- Error messages
- Page titles

**Expected Output:**
- All text can be translated
- Language switcher in header works
- Translations persist in localStorage

---

## Phase 2: Core Features Setup (Week 2)

### Step 2.1: Setup Authentication System (Day 5-7)
**Goal:** Create a working login/logout system

**Tasks:**
- [ ] Install `axios` for API calls: `bun add axios`
- [ ] Create `src/contexts/AuthContext.jsx` for auth state
- [ ] Update login form to actually submit credentials
- [ ] Create protected route wrapper
- [ ] Add logout functionality
- [ ] Store JWT token in localStorage
- [ ] Add token to API requests

**Files to Create:**
- `src/contexts/AuthContext.jsx`
- `src/utils/axios.js` - Axios instance with interceptors
- `src/routes/ProtectedRoute.jsx`
- `src/api/auth.js` - Auth API functions

**Key Concepts to Learn:**
- React Context API
- JWT tokens
- Axios interceptors
- Protected routes

**Expected Output:**
- Users can login with credentials
- Invalid credentials show error
- Logged-in users stay logged in on refresh
- Logout clears session
- Protected pages redirect to login if not authenticated

---

### Step 2.2: Build User Profile Page (Day 8-9)
**Goal:** Create a complete user profile management page

**Tasks:**
- [ ] Create `src/pages/profile/index.jsx`
- [ ] Design profile layout (avatar, name, email, bio)
- [ ] Add profile edit form (using Formik)
- [ ] Add avatar upload functionality
- [ ] Save profile changes to API
- [ ] Add success/error notifications

**Components to Create:**
- `ProfileCard` - Display user info
- `ProfileEditForm` - Edit user details
- `AvatarUpload` - Upload user photo

**Expected Output:**
- Complete profile page
- Users can edit their information
- Changes are saved and displayed

---

### Step 2.3: Create Settings Page (Day 9-10)
**Goal:** Add application settings

**Tasks:**
- [ ] Create `src/pages/settings/index.jsx`
- [ ] Add theme color picker
- [ ] Add language selector
- [ ] Add timezone settings
- [ ] Add notification preferences
- [ ] Persist settings in localStorage

**Expected Output:**
- Settings page with multiple sections
- All settings are saved
- Settings apply immediately

---

## Phase 3: Data Management (Week 3)

### Step 3.1: Setup API Integration (Day 11-12)
**Goal:** Connect to a real or mock backend

**Option A: Mock API (Recommended for Learning)**
```bash
bun add json-server
```
Create `db.json` with mock data

**Option B: Real Backend**
Setup axios with your actual API

**Tasks:**
- [ ] Create `src/api/` folder structure
- [ ] Setup axios instance with base URL
- [ ] Create API service files (users, tasks, etc.)
- [ ] Add loading states
- [ ] Add error handling
- [ ] Add success notifications

**Files to Create:**
- `src/api/client.js` - Axios configuration
- `src/api/users.js` - User API calls
- `src/api/tasks.js` - Task API calls

**Expected Output:**
- Axios configured with interceptors
- API calls work correctly
- Errors are handled gracefully

---

### Step 3.2: Build Data Table Page (Day 13-14)
**Goal:** Create a reusable data table with CRUD operations

**Tasks:**
- [ ] Install table library: `bun add @mui/x-data-grid`
- [ ] Create `src/pages/users/list.jsx`
- [ ] Display users in a table
- [ ] Add pagination
- [ ] Add search/filter
- [ ] Add sorting
- [ ] Add actions (view, edit, delete)

**Key Features:**
- Server-side pagination
- Search by name/email
- Column sorting
- Row selection
- Actions menu

**Expected Output:**
- Fully functional data table
- All CRUD operations work
- Table can be reused for other entities

---

### Step 3.3: Build Create/Edit Forms (Day 14-15)
**Goal:** Create reusable form pages

**Tasks:**
- [ ] Create `src/pages/users/create.jsx`
- [ ] Create `src/pages/users/edit.jsx`
- [ ] Use Formik + Yup for validation
- [ ] Add all necessary fields
- [ ] Add Persian validation messages
- [ ] Handle form submission
- [ ] Redirect after success

**Form Fields Example:**
- Name (required)
- Email (required, email format)
- Phone (required, Persian format)
- Role (dropdown)
- Status (toggle)

**Expected Output:**
- Create form works
- Edit form pre-fills with data
- Validation shows Persian messages
- Success redirects to list page

---

## Phase 4: Dashboard & Widgets (Week 4)

### Step 4.1: Customize Dashboard (Day 16-17)
**Goal:** Build a useful dashboard with Persian data

**Tasks:**
- [ ] Update `src/pages/dashboard/default.jsx`
- [ ] Replace mock data with real API data
- [ ] Create Persian-friendly charts
- [ ] Add date range filters (Persian calendar)
- [ ] Add export functionality
- [ ] Make widgets responsive

**Widgets to Create:**
- Statistics cards (users, tasks, revenue)
- Line chart (monthly trends)
- Pie chart (status distribution)
- Recent activities list
- Quick actions panel

**Expected Output:**
- Dashboard shows real data
- Dates display in Persian calendar
- Charts are interactive
- Data refreshes automatically

---

### Step 4.2: Add Notifications System (Day 18)
**Goal:** Real-time notifications

**Tasks:**
- [ ] Install toast library: `bun add react-hot-toast`
- [ ] Create `src/utils/toast.js` helper
- [ ] Add success notifications
- [ ] Add error notifications
- [ ] Add info notifications
- [ ] Style with Persian font

**Expected Output:**
- Notifications show for all actions
- Toast messages in Persian
- Auto-dismiss after 3 seconds

---

### Step 4.3: Add Loading States (Day 18-19)
**Goal:** Better UX with loading indicators

**Tasks:**
- [ ] Create `src/components/LoadingScreen.jsx`
- [ ] Add skeleton loaders for tables
- [ ] Add button loading states
- [ ] Add page transition loading

**Expected Output:**
- Loading states everywhere
- No blank screens during fetch
- Smooth transitions

---

## Phase 5: Make it a Boilerplate (Week 5)

### Step 5.1: Create Reusable Components Library (Day 20-21)
**Goal:** Extract common patterns into reusable components

**Components to Create:**
- `DataTable` - Reusable table component
- `FormDialog` - Modal form wrapper
- `ConfirmDialog` - Confirmation popup
- `PageHeader` - Consistent page headers
- `EmptyState` - When no data exists
- `ErrorBoundary` - Catch errors gracefully

**Expected Output:**
- Component library documented
- Easy to reuse in new pages

---

### Step 5.2: Setup Environment Configuration (Day 21)
**Goal:** Easy configuration for different environments

**Tasks:**
- [ ] Create `.env.development`
- [ ] Create `.env.production`
- [ ] Add environment-specific settings
- [ ] Document all environment variables

**Variables to Configure:**
```
VITE_API_BASE_URL=
VITE_APP_NAME=
VITE_APP_VERSION=
VITE_ENABLE_ANALYTICS=
```

**Expected Output:**
- Easy to switch between dev/prod
- All configs documented

---

### Step 5.3: Add Error Handling (Day 22)
**Goal:** Robust error handling

**Tasks:**
- [ ] Create error boundary component
- [ ] Add 404 page
- [ ] Add 500 error page
- [ ] Add network error handling
- [ ] Add form error handling

**Expected Output:**
- No crashes from errors
- User-friendly error messages

---

### Step 5.4: Performance Optimization (Day 22-23)
**Goal:** Fast and efficient app

**Tasks:**
- [ ] Add React.memo to heavy components
- [ ] Implement code splitting
- [ ] Optimize images
- [ ] Add lazy loading for routes
- [ ] Remove unused dependencies

**Expected Output:**
- Faster initial load
- Better lighthouse scores

---

### Step 5.5: Documentation (Day 23-24)
**Goal:** Document everything for future use

**Tasks:**
- [ ] Update README.md with:
  - Setup instructions
  - Folder structure explanation
  - How to add new pages
  - How to add new API endpoints
  - Environment variables
  - Deployment guide
- [ ] Add JSDoc comments to all functions
- [ ] Create component usage examples
- [ ] Document common patterns

**Expected Output:**
- Complete README
- Easy for others to understand
- Easy to start new projects

---

### Step 5.6: Testing Setup (Day 24-25)
**Goal:** Basic testing setup

**Tasks:**
- [ ] Install testing libraries:
```bash
bun add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event
```
- [ ] Create test for a component
- [ ] Create test for a utility function
- [ ] Add test script to package.json

**Expected Output:**
- Tests run successfully
- Foundation for future testing

---

## Phase 6: Polish & Deploy (Week 6)

### Step 6.1: UI/UX Polish (Day 26-27)
**Goal:** Make it look professional

**Tasks:**
- [ ] Consistent spacing everywhere
- [ ] Smooth animations
- [ ] Mobile responsiveness check
- [ ] Tablet responsiveness check
- [ ] Desktop optimization
- [ ] Persian font optimization
- [ ] Accessibility improvements

**Expected Output:**
- Professional look and feel
- Works on all devices
- Smooth animations

---

### Step 6.2: SEO & Meta Tags (Day 27)
**Goal:** Better SEO

**Tasks:**
- [ ] Add React Helmet: `yarn add react-helmet-async`
- [ ] Add page titles
- [ ] Add meta descriptions
- [ ] Add Open Graph tags
- [ ] Add favicon

**Expected Output:**
- Proper meta tags on all pages
- Good social media previews

---

### Step 6.3: Build & Deploy (Day 28)
**Goal:** Deploy to production

**Tasks:**
- [ ] Test production build: `bun run build`
- [ ] Fix any build errors
- [ ] Setup deployment (Vercel/Netlify/GitHub Pages)
- [ ] Configure custom domain
- [ ] Setup CI/CD with GitHub Actions
- [ ] Test production deployment

**Expected Output:**
- App deployed and accessible
- Auto-deployment on push

---

### Step 6.4: Create Boilerplate Template (Day 29)
**Goal:** Make it reusable

**Tasks:**
- [ ] Clean up test/demo data
- [ ] Remove project-specific code
- [ ] Create `BOILERPLATE_SETUP.md` guide
- [ ] Create branch template script
- [ ] Tag as v1.0.0
- [ ] Push to GitHub template repository

**Expected Output:**
- Clean boilerplate ready
- Easy to start new projects

---

### Step 6.5: Final Review & Launch (Day 30)
**Goal:** Ship it!

**Tasks:**
- [ ] Full app walkthrough
- [ ] Check all features work
- [ ] Test on different browsers
- [ ] Test on mobile devices
- [ ] Fix any bugs found
- [ ] Update documentation
- [ ] Celebrate! 🎉

**Expected Output:**
- Production-ready admin panel
- Reusable boilerplate
- Complete documentation

---

## 📚 Learning Resources

### React & JavaScript
- React official docs: https://react.dev
- JavaScript info: https://javascript.info
- React Router: https://reactrouter.com

### Material-UI
- MUI docs: https://mui.com
- MUI examples: https://mui.com/material-ui/getting-started/templates/

### RTL Development
- RTL styling guide: https://rtlstyling.com
- Material-UI RTL: https://mui.com/material-ui/guides/right-to-left/

### Persian Development
- Persian date handling: https://github.com/fingerpich/jalali-moment
- Persian fonts: https://github.com/rastikerdar/vazir-font

### Best Practices
- React patterns: https://reactpatterns.com
- Clean code React: https://github.com/ryanmcdermott/clean-code-javascript

---

## 💡 Tips for Success

### For Junior Developers:
1. **Don't rush** - Take time to understand each step
2. **Read documentation** - Always check official docs first
3. **Ask for help** - Use Stack Overflow, GitHub issues
4. **Test frequently** - Test after every change
5. **Commit often** - Small commits with clear messages
6. **Learn by doing** - Don't just copy-paste, understand why

### Daily Routine:
- Start with a goal for the day
- Break tasks into 1-2 hour chunks
- Take breaks every hour
- Test your changes frequently
- Commit working code at the end of the day
- Document what you learned

### When Stuck:
1. Read the error message carefully
2. Check the documentation
3. Search on Google/Stack Overflow
4. Look at similar examples
5. Ask for help in communities
6. Take a break and come back fresh

---

## ✅ Success Criteria

By the end of this plan, you should have:
- [ ] Fully functional RTL admin panel
- [ ] Complete Persian language support
- [ ] Authentication system
- [ ] CRUD operations for at least one entity
- [ ] Working dashboard with widgets
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Deployed to production
- [ ] Reusable as a boilerplate
- [ ] Complete documentation
- [ ] Understanding of React fundamentals

---

## 🎯 Next Steps After Completion

1. Add more features based on your needs
2. Integrate with your backend API
3. Add advanced features (websockets, real-time updates)
4. Improve testing coverage
5. Use this boilerplate for new projects
6. Share with the community

---

## 📞 Support

If you need help during development:
- GitHub Issues: Create issues for bugs/questions
- Email: hafez.gh.mohammadi@gmail.com
- Community: React and MUI communities

---

**Good luck with your development! Take it one step at a time. 🚀**
