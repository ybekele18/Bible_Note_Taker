# Bible Note Taker 📖

A modern, responsive web application for fetching Bible verses and writing personal notes/reflections. Built with Vanilla HTML, CSS, and JavaScript.

## Features

- **Search & Fetch**: Automatically pull Bible verses using an open REST API (bible-api.com).
- **Rich User Interface**: Custom dark-mode styling with beautiful typography (Inter & Merriweather fonts) and a distraction-free environment.
- **Note Taking**: Dedicated editor area for writing insights and reflections.
- **Exporting Options**:
  - Export notes and verses directly to **Markdown** (`.md`).
  - Export to **PDF** format (using `jsPDF`).
- **Database Ready**: Modular structure with stubbed functions (`stub_save_to_db`, etc.) to easily integrate with Supabase, Firebase, or SQLite in the future.

## Local Development

Because this application uses a pure frontend architecture (HTML/CSS/JS), there are **zero dependencies** to install!

1. **Clone the repository** (if applicable) and open the project directory.
2. Double-click on `index.html` to open it in any modern web browser. 
3. *Alternatively*, use a simple local server like VSCode's Live Server extension or `python -m http.server 8000` for a better development experience.

## Deployment

This app is a standard static website, meaning it can be deployed **anywhere** instantly and natively, without complex configurations.

### Deploying to Cloudflare Pages (Recommended for Free Hosting)

1. Log into your Cloudflare account and go to "Pages".
2. Click **Connect to Git** and select your repository: `Bible_Note_Taker`.
3. Set the **Framework preset** to `None`.
4. Leave the **Build command** and **Build output directory** empty (it defaults to your root folder which contains `index.html`).
5. Click **Save and Deploy**. 

Cloudflare will automatically deploy your site! Every time you push an update, it will automatically rebuild.

### Deploying to GitHub Pages

1. Go to your repository settings on GitHub.
2. Navigate to "Pages" on the left sidebar.
3. Under "Build and deployment", select **Deploy from a branch**.
4. Choose the `main` branch and the `/ (root)` folder.
5. Click **Save**. Within a minute, your app will be live at `https://yourusername.github.io/Bible_Note_Taker`.
