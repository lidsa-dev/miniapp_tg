# Telegram Task Tracker Web App

A modern, feature-rich task tracker built as a Telegram Mini App using React 19, TypeScript, Vite 7, and Tailwind CSS 4.

![React](https://img.shields.io/badge/React-19.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Vite](https://img.shields.io/badge/Vite-7.2-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-cyan)

## ✨ Features

### Task Management
- ✅ **Create, Edit & Delete Tasks** - Full CRUD operations
- 🎯 **Priority Levels** - Low, Medium, High
- 📅 **Due Dates** - Track deadlines
- 📝 **Descriptions** - Add detailed notes
- 🔄 **Task Status** - Active/Completed with toggle
- 🗂️ **Smart Filtering** - View All, Active, or Completed tasks

### Statistics & Analytics
- 📊 **Real-time Stats** - Track total, active, and completed tasks
- 📈 **Completion Rate** - Visual progress bar
- 🎨 **Beautiful UI** - Glassmorphic design with smooth animations

### Telegram Integration
- 🎨 **Theme Adaptation** - Matches Telegram's color scheme (light/dark)
- 👤 **User Info** - Displays user name and premium status
- 🔘 **MainButton** - Native Telegram button for creating tasks
- ⬅️ **BackButton** - Native navigation support
- 📳 **Haptic Feedback** - Tactile responses for all interactions
- 📤 **Data Sending** - Send task updates back to bot
- 🔔 **Notifications** - Success, warning, and error feedback

### Storage & Performance
- 💾 **Persistent Storage** - Tasks saved in localStorage
- ⚡ **Fast Performance** - Optimized React 19 with Vite
- 📱 **Responsive Design** - Works on all Telegram platforms

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd tgapp

# Install dependencies
npm install

# Run development server
npm run dev
```

### Build for Production

```bash
# Build the app
npm run build

# Preview production build
npm run preview
```

## 📱 Telegram Bot Integration

This app is designed to work with a Telegram Bot. See [TELEGRAM_BOT_INTEGRATION.md](./TELEGRAM_BOT_INTEGRATION.md) for:
- Complete bot setup guide
- Sample bot code (Node.js & Python)
- Deployment instructions
- Data flow documentation

### Quick Setup

1. Create a bot with [@BotFather](https://t.me/botfather)
2. Deploy this app to a hosting service (Vercel, Netlify, etc.)
3. Set the Web App URL in your bot settings
4. Users can now access the task tracker from your bot!

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── FilterTabs.tsx   # Filter tabs (All/Active/Completed)
│   ├── Stats.tsx        # Statistics display
│   ├── TaskForm.tsx     # Task creation/editing form
│   ├── TaskItem.tsx     # Individual task component
│   └── TaskList.tsx     # Task list container
├── hooks/               # Custom React hooks
│   ├── useTasks.ts      # Task management logic
│   └── useTelegram.ts   # Telegram WebApp integration
├── types/               # TypeScript type definitions
│   ├── task.ts          # Task-related types
│   └── telegram.d.ts    # Telegram WebApp API types
├── utils/               # Utility functions
│   └── storage.ts       # localStorage helpers
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Tailwind CSS imports
```

## 🛠️ Tech Stack

- **React 19.2** - Latest React with improved hooks
- **TypeScript 5.9** - Type safety and better DX
- **Vite 7.2** - Lightning-fast build tool
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Telegram WebApp API** - Native Telegram integration

## 🎨 Customization

### Styling
The app automatically adapts to Telegram's theme colors:
- Background color
- Text color
- Button color
- Link color
- Hint color

You can customize additional styles in the component files.

### Features
Add or modify features by:
1. Updating types in `src/types/task.ts`
2. Modifying hooks in `src/hooks/`
3. Creating/updating components in `src/components/`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Development

### ESLint Configuration

The project uses ESLint 9 with modern flat config. To enable type-aware linting:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

## 🌐 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

### GitHub Pages
1. Build the app: `npm run build`
2. Deploy the `dist` folder to GitHub Pages

**Important**: The app must be served over HTTPS to work with Telegram.

## 📚 Resources

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Telegram Web Apps](https://core.telegram.org/bots/webapps)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [Tailwind CSS](https://tailwindcss.com)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

This project is open source and available under the MIT License.

## 💡 Tips

1. **Testing**: Test your bot in Telegram, not in a regular browser
2. **Storage**: Tasks are stored locally per user
3. **Haptic**: Haptic feedback enhances user experience
4. **Theme**: Always use Telegram's theme colors for consistency
5. **MainButton**: Use the native MainButton for primary actions

## 🆘 Support

For questions or issues:
- Check [TELEGRAM_BOT_INTEGRATION.md](./TELEGRAM_BOT_INTEGRATION.md)
- Review Telegram's [Web Apps documentation](https://core.telegram.org/bots/webapps)
- Open an issue on GitHub

---

Made with ❤️ for Telegram
