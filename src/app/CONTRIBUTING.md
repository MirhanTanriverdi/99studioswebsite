# Contributing to 99 Roots Studio Website

Thank you for your interest in contributing to the 99 Roots Studio website! We welcome contributions that help improve the website's functionality, design, and user experience.

## 🎯 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager
- Basic knowledge of React, TypeScript, and Tailwind CSS
- Familiarity with the design guidelines (see `Guidelines.md`)

## 📋 Code of Conduct

- Be respectful and professional in all interactions
- Follow the established design system and guidelines
- Write clean, maintainable, and well-documented code
- Test your changes thoroughly before submitting

## 🔄 Development Workflow

### 1. Fork and Clone
```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/99-roots-studio.git
cd 99-roots-studio
```

### 2. Create a Branch
```bash
# Create a new branch for your feature or fix
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Make Your Changes
- Follow the design guidelines in `Guidelines.md`
- Maintain the existing code style and structure
- Keep components modular and reusable
- Use TypeScript types properly
- Follow the established naming conventions

### 5. Test Your Changes
```bash
# Run the development server
npm run dev

# Test on multiple devices and browsers
# Verify mobile responsiveness
# Check parallax animations
# Validate all interactions
```

### 6. Commit Your Changes
```bash
# Use clear, descriptive commit messages
git add .
git commit -m "feat: Add new artist gallery feature"
# or
git commit -m "fix: Resolve navigation menu bug on mobile"
```

**Commit Message Format:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### 7. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear title and description
- Screenshots or videos of UI changes
- List of changes made
- Any breaking changes or dependencies

## 🎨 Design Guidelines

### Must Follow
- Use `#151515` (soft black) for backgrounds
- Use `#FF9D56` (gold) for accents and highlights
- Maintain premium, minimalistic aesthetic
- Include parallax scrolling for new sections
- Ensure mobile responsiveness
- Follow the typography system (Roboto for headings, Space Mono for body)

### Don't Override
- Font sizes, weights, or line-heights (unless specifically needed)
- The core design system colors
- Existing parallax implementations
- Protected files (listed in Guidelines.md)

## 🧩 Component Guidelines

### Creating New Components
1. Place in `/components` directory
2. Use TypeScript with proper types
3. Follow existing naming conventions
4. Include PropTypes or TypeScript interfaces
5. Make components reusable where possible
6. Add comments for complex logic

### Example Component Structure
```tsx
import { useState } from 'react';
import { motion } from 'motion/react';

interface ComponentProps {
  title: string;
  description?: string;
}

export function Component({ title, description }: ComponentProps) {
  const [state, setState] = useState(false);

  return (
    <motion.div className="bg-[#151515] text-white">
      <h2 className="text-[#FF9D56]">{title}</h2>
      {description && <p>{description}</p>}
    </motion.div>
  );
}
```

## 📱 Testing Requirements

Before submitting a PR, test on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile Safari (iOS)
- ✅ Chrome Mobile (Android)

### Test Checklist
- [ ] All links work correctly
- [ ] Navigation scrolls to correct sections
- [ ] Mobile menu opens and closes properly
- [ ] Parallax effects work smoothly
- [ ] Images load with fallbacks
- [ ] Forms validate properly
- [ ] Responsive on all screen sizes
- [ ] No console errors or warnings

## 🐛 Reporting Bugs

### Before Submitting a Bug Report
1. Check existing issues to avoid duplicates
2. Test on the latest version
3. Verify it's not a local environment issue

### Bug Report Template
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- Browser: [e.g., Chrome 120]
- Device: [e.g., iPhone 14, Desktop]
- OS: [e.g., iOS 17, Windows 11]
```

## 💡 Feature Requests

### Before Requesting a Feature
1. Check if it aligns with the design philosophy
2. Search existing feature requests
3. Consider if it's universally beneficial

### Feature Request Template
```markdown
**Feature Description**
Clear description of the feature.

**Problem it Solves**
What problem does this feature address?

**Proposed Solution**
How should this feature work?

**Design Considerations**
Any design or UX considerations?

**Alternatives Considered**
Other solutions you've thought about.
```

## 📚 Resources

- **Design Guidelines:** See `Guidelines.md`
- **Component Library:** [shadcn/ui](https://ui.shadcn.com/)
- **Animation Library:** [Motion](https://motion.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Tailwind CSS:** [Documentation](https://tailwindcss.com/)

## ✅ Pull Request Checklist

Before submitting your PR:
- [ ] Code follows the project's style guidelines
- [ ] Changes are documented in commit messages
- [ ] All tests pass
- [ ] New features have been tested
- [ ] Mobile responsiveness verified
- [ ] No console errors or warnings
- [ ] README updated if needed
- [ ] Screenshots/videos included for UI changes

## 🤝 Review Process

1. **Submission:** Create PR with clear description
2. **Review:** Maintainers review code and design
3. **Feedback:** Address any requested changes
4. **Approval:** PR approved by maintainers
5. **Merge:** Changes merged into main branch

## 💬 Questions?

If you have questions about contributing:
- Open a GitHub Discussion
- Comment on relevant issues
- Reach out to the maintainers

---

Thank you for contributing to 99 Roots Studio! 🎨✨
