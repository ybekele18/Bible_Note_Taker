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

### Option 2: Cloudflare Pages / GitHub Pages via `stlite` (Static Hosting)

If you strictly want to deploy to a static host without a python backend server (Cloudflare Pages, GitHub Pages, Vercel), you can use [stlite](https://github.com/whitphx/stlite) to run Streamlit completely within the browser using WebAssembly.

To do this:
1. Create an `index.html` file in your root folder with the following `stlite` wrapper:
   ```html
   <!DOCTYPE html>
   <html>
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
       <title>Bible Note Taker</title>
       <!-- stlite style -->
       <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@stlite/mountable@0.31.1/build/stlite.css" />
     </head>
     <body>
       <div id="root"></div>
       <script src="https://cdn.jsdelivr.net/npm/@stlite/mountable@0.31.1/build/stlite.js"></script>
       <script>
         stlite.mount(
           {
             requirements: ["requests", "fpdf2"],
             entrypoint: "app.py",
             files: {
               "app.py": {
                 url: "./app.py",
               },
             },
           },
           document.getElementById("root")
         );
       </script>
     </body>
   </html>
   ```
2. Upload `index.html`, `app.py`, and `requirements.txt` to Cloudflare Pages or GitHub Pages. 
3. The browser will download Pyodide, install `requests` and `fpdf2`, and execute `app.py` directly on the client. *(Note: Loading might take a few seconds initially as it downloads the Python runtime).*

---

*Note: For further modularity, search for the DB stub functions inside `app.py` to connect user accounts and cloud storage later.*
