# Bible Note Taker 📖

A modern, responsive web application for fetching Bible verses and writing personal notes/reflections. Built with Python and Streamlit.

## Features

- **Search & Fetch**: Automatically pull Bible verses using an open REST API (bible-api.com).
- **Rich User Interface**: Custom dark-mode styling with beautiful typography (Inter & Merriweather fonts) and a distraction-free environment.
- **Note Taking**: Dedicated editor area for writing insights and reflections.
- **Exporting Options**:
  - Export notes and verses directly to **Markdown** (`.md`).
  - Export to **PDF** format (using `fpdf2`).
- **Database Ready**: Modular structure with stubbed functions (`save_note_to_db`, etc.) to easily integrate with Supabase, Firebase, or SQLite in the future.

## Local Development

To run the application locally on your machine:

1. **Clone the repository** (if applicable) and open the project directory.

2. **Install the dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Streamlit app**:
   ```bash
   streamlit run app.py
   ```

4. The app will automatically open in your default browser at `http://localhost:8501`.

## Deployment

Because this is a standard Streamlit application without complex backend dependencies yet, there are two primary ways to easily deploy this app:

### Option 1: Streamlit Community Cloud (Recommended & Easiest)
1. Push your code to a GitHub repository.
2. Sign in to [Streamlit Community Cloud](https://share.streamlit.io).
3. Click "New App", link your GitHub repo, select `app.py` as the main file, and click "Deploy". 
4. Streamlit will automatically install dependencies from `requirements.txt` and host your app.

### Option 2: Cloudflare Pages / GitHub Pages (Static Hosting)

The repository is now pre-configured to deploy easily to static web hosts utilizing WebAssembly via **`stlite`** (which runs Python inside the user's browser).

**Deploying to Cloudflare Pages:**
1. Log into your Cloudflare account and go to "Pages".
2. Click **Connect to Git** and select your repository: `Bible_Note_Taker`.
3. Set the **Framework preset** to `None` (or leave default).
4. Leave the **Build command** and **Build output directory** empty (it defaults to your root folder which contains `index.html`).
5. Click **Save and Deploy**. 

Cloudflare will automatically deploy your site using the `index.html` file provided in the repository! Every time you push an update to `app.py`, it will automatically rebuild and be ready for your users.

*(Note: On the first load, the browser will download Pyodide to run Python, which may take a few seconds before the application fully renders.)*

---

*Note: For further modularity, search for the DB stub functions inside `app.py` to connect user accounts and cloud storage later.*
