# Telegram Bot Integration Guide

This Task Tracker Web App is designed to work seamlessly with a Telegram Bot. Below is a complete guide on how to integrate it.

## Features

### Web App Features
- ✅ Create, edit, and delete tasks
- 📊 View task statistics and completion rates
- 🎯 Set task priority (low, medium, high)
- 📅 Set due dates for tasks
- 🔄 Filter tasks (all, active, completed)
- 💾 Persistent storage using localStorage
- 🎨 Adapts to Telegram theme colors
- 📱 Telegram MainButton and BackButton integration
- 🔔 Haptic feedback for user interactions
- 📤 Sends task data back to the bot

### Telegram Integration Features
- **MainButton**: Used for creating new tasks
- **BackButton**: Used for navigation (cancel form)
- **HapticFeedback**: Provides tactile feedback
- **Theme Integration**: Matches Telegram's color scheme
- **Data Sending**: Sends task updates back to bot
- **User Info**: Displays user name and premium status

## Telegram Bot Setup

### 1. Create a Bot

Talk to [@BotFather](https://t.me/botfather) on Telegram:

```
/newbot
```

Follow the instructions to create your bot and get your bot token.

### 2. Set Up Web App

After creating your bot, set the Web App URL:

```
/newapp
```

Or use the menu button:

```
/setmenubutton
```

Set the Web App URL to your deployed application URL (e.g., from Vercel, Netlify, etc.)

### 3. Bot Commands

Set up these commands for your bot:

```
/setcommands

start - Start the bot
tasks - Open task tracker
stats - View task statistics
help - Show help message
```

## Sample Bot Code (Node.js)

Here's a basic Telegram Bot implementation using `node-telegram-bot-api`:

```javascript
const TelegramBot = require('node-telegram-bot-api');

const token = 'YOUR_BOT_TOKEN';
const webAppUrl = 'YOUR_WEB_APP_URL';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  
  bot.sendMessage(chatId, '👋 Welcome to Task Tracker Bot!', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '✅ Open Task Tracker', web_app: { url: webAppUrl } }]
      ]
    }
  });
});

bot.onText(/\/tasks/, (msg) => {
  const chatId = msg.chat.id;
  
  bot.sendMessage(chatId, '📝 Manage your tasks:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '➕ Open Task Tracker', web_app: { url: webAppUrl } }]
      ]
    }
  });
});

bot.on('web_app_data', (msg) => {
  const chatId = msg.chat.id;
  const data = JSON.parse(msg.web_app_data.data);
  
  if (data.action === 'tasks_updated') {
    const { stats, tasks } = data;
    
    const message = `📊 Task Update:
    
Total Tasks: ${stats.total}
Active: ${stats.active}
Completed: ${stats.completed}
    
Completion Rate: ${stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%`;
    
    bot.sendMessage(chatId, message);
  }
});

bot.onText(/\/stats/, async (msg) => {
  const chatId = msg.chat.id;
  
  bot.sendMessage(chatId, '📊 Open the Task Tracker to view your stats!', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '📊 View Stats', web_app: { url: webAppUrl } }]
      ]
    }
  });
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  
  const helpText = `🤖 Task Tracker Bot Help

Available Commands:
/start - Start the bot
/tasks - Open task tracker
/stats - View task statistics
/help - Show this help message

Features:
✅ Create and manage tasks
📊 Track your progress
🎯 Set priorities and due dates
🔔 Get notifications for updates

Just click the button to open the Task Tracker!`;
  
  bot.sendMessage(chatId, helpText);
});

console.log('Bot is running...');
```

## Sample Bot Code (Python)

Using `python-telegram-bot`:

```python
from telegram import Update, WebAppInfo, InlineKeyboardMarkup, InlineKeyboardButton
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes
import json

TOKEN = 'YOUR_BOT_TOKEN'
WEB_APP_URL = 'YOUR_WEB_APP_URL'

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [[InlineKeyboardButton("✅ Open Task Tracker", web_app=WebAppInfo(url=WEB_APP_URL))]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(
        '👋 Welcome to Task Tracker Bot!',
        reply_markup=reply_markup
    )

async def tasks(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [[InlineKeyboardButton("➕ Open Task Tracker", web_app=WebAppInfo(url=WEB_APP_URL))]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(
        '📝 Manage your tasks:',
        reply_markup=reply_markup
    )

async def stats(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [[InlineKeyboardButton("📊 View Stats", web_app=WebAppInfo(url=WEB_APP_URL))]]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(
        '📊 Open the Task Tracker to view your stats!',
        reply_markup=reply_markup
    )

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    help_text = """🤖 Task Tracker Bot Help

Available Commands:
/start - Start the bot
/tasks - Open task tracker
/stats - View task statistics
/help - Show this help message

Features:
✅ Create and manage tasks
📊 Track your progress
🎯 Set priorities and due dates
🔔 Get notifications for updates

Just click the button to open the Task Tracker!"""
    
    await update.message.reply_text(help_text)

async def web_app_data(update: Update, context: ContextTypes.DEFAULT_TYPE):
    data = json.loads(update.effective_message.web_app_data.data)
    
    if data.get('action') == 'tasks_updated':
        stats = data.get('stats', {})
        total = stats.get('total', 0)
        active = stats.get('active', 0)
        completed = stats.get('completed', 0)
        completion_rate = round((completed / total * 100)) if total > 0 else 0
        
        message = f"""📊 Task Update:

Total Tasks: {total}
Active: {active}
Completed: {completed}

Completion Rate: {completion_rate}%"""
        
        await update.message.reply_text(message)

def main():
    application = Application.builder().token(TOKEN).build()
    
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("tasks", tasks))
    application.add_handler(CommandHandler("stats", stats))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(MessageHandler(filters.StatusUpdate.WEB_APP_DATA, web_app_data))
    
    print('Bot is running...')
    application.run_polling()

if __name__ == '__main__':
    main()
```

## Deployment

### Deploy the Web App

You can deploy the web app to any static hosting service:

1. **Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify**
   ```bash
   npm install -g netlify-cli
   netlify deploy
   ```

3. **GitHub Pages**
   - Push to GitHub
   - Enable GitHub Pages in repository settings
   - Use `gh-pages` branch or `/docs` folder

### Important Notes

- The Web App URL must be HTTPS
- Make sure to set the correct Web App URL in your bot settings
- The Telegram Web App works only inside Telegram (not in regular browsers)
- Test your bot in Telegram after deployment

## Data Flow

1. User opens the Task Tracker from Telegram bot
2. Web App loads with user's Telegram data
3. User creates/manages tasks
4. Tasks are stored in localStorage
5. On task updates, data is sent back to bot via `sendData()`
6. Bot receives the data and can process it (send notifications, etc.)

## Testing

To test the integration:

1. Send `/start` to your bot
2. Click the "Open Task Tracker" button
3. Create some tasks
4. The bot should receive updates about task changes

## Customization

You can customize:
- Bot messages and responses
- How the bot handles task data
- Additional bot commands
- Notifications and reminders
- Multi-language support

## Support

For more information, refer to:
- [Telegram Bot API Documentation](https://core.telegram.org/bots/api)
- [Telegram Web Apps Documentation](https://core.telegram.org/bots/webapps)
