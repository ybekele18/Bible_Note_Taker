// script.js

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const searchInput = document.getElementById('searchInput');
    const fetchBtn = document.getElementById('fetchBtn');
    const errorMsg = document.getElementById('errorMsg');
    const emptyState = document.getElementById('emptyState');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const contentSection = document.getElementById('contentSection');
    
    const verseRefDisplay = document.getElementById('verseRefDisplay');
    const verseTextDisplay = document.getElementById('verseTextDisplay');
    const noteInput = document.getElementById('noteInput');
    
    const saveCloudBtn = document.getElementById('saveCloudBtn');
    const exportMdBtn = document.getElementById('exportMdBtn');
    const exportPdfBtn = document.getElementById('exportPdfBtn');
    const toastContainer = document.getElementById('toastContainer');

    // State
    let currentVerseData = null;

    // --- EVENT LISTENERS ---

    fetchBtn.addEventListener('click', handleFetch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleFetch();
    });

    noteInput.addEventListener('input', () => {
        const hasNotes = noteInput.value.trim().length > 0;
        exportMdBtn.disabled = !hasNotes;
        exportPdfBtn.disabled = !hasNotes;
    });

    saveCloudBtn.addEventListener('click', async () => {
        const success = await stub_save_to_db("demo_user", currentVerseData, noteInput.value);
        if (success) showToast("Note securely saved! (Simulated)");
    });

    exportMdBtn.addEventListener('click', generateMarkdown);
    exportPdfBtn.addEventListener('click', generatePDF);


    // --- CORE FUNCTIONS ---

    async function handleFetch() {
        const query = searchInput.value.trim();
        if (!query) return;

        showLoading(true);
        hideError();

        try {
            // Using bible-api.com
            const response = await fetch(`https://bible-api.com/${encodeURIComponent(query)}`);
            
            if (!response.ok) {
                if (response.status === 404) throw new Error("Verse not found. Please check the reference format (e.g., 'John 3:16').");
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            
            currentVerseData = {
                reference: data.reference,
                text: data.text.trim(),
                translation: data.translation_name
            };

            displayVerse(currentVerseData);

        } catch (error) {
            showError(error.message);
        } finally {
            showLoading(false);
        }
    }

    function displayVerse(data) {
        verseRefDisplay.textContent = `${data.reference} (${data.translation})`;
        verseTextDisplay.textContent = data.text;
        
        // Reset notes state for new passage
        noteInput.value = "";
        exportMdBtn.disabled = true;
        exportPdfBtn.disabled = true;

        emptyState.classList.add('hidden');
        contentSection.classList.remove('hidden');
    }

    // --- EXPORT FUNCTIONS ---

    function generateMarkdown() {
        if (!currentVerseData) return;
        
        const note = noteInput.value.trim();
        const mdContent = `# ${currentVerseData.reference}\n\n> ${currentVerseData.text}\n\n## Notes\n\n${note}\n`;
        
        const blob = new Blob([mdContent], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        
        triggerDownload(url, `${currentVerseData.reference.replace(/[: ]/g, '_')}_notes.md`);
        URL.revokeObjectURL(url);
    }

    function generatePDF() {
        if (!currentVerseData || !window.jspdf) {
            showError("PDF library failed to load.");
            return;
        }

        const note = noteInput.value.trim();
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text(`Bible Note: ${currentVerseData.reference}`, 15, 20);

        // Verse Text
        doc.setFont("helvetica", "italic");
        doc.setFontSize(14);
        const splitVerse = doc.splitTextToSize(`"${currentVerseData.text}"`, 180);
        
        // Draw Light Gray Rectangle behind verse
        const verseHeight = splitVerse.length * 7 + 10;
        doc.setFillColor(245, 245, 245);
        doc.rect(12, 25, 186, verseHeight, "F");
        
        doc.text(splitVerse, 15, 33);

        const currentY = 25 + verseHeight + 15;

        // Notes Header
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Reflections & Notes", 15, currentY);
        
        doc.setDrawColor(200, 200, 200);
        doc.line(15, currentY + 3, 195, currentY + 3);

        // Notes Content
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        const splitNotes = doc.splitTextToSize(note, 180);
        doc.text(splitNotes, 15, currentY + 12);

        doc.save(`${currentVerseData.reference.replace(/[: ]/g, '_')}_notes.pdf`);
    }

    function triggerDownload(url, filename) {
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    // --- UI HELPERS ---

    function showLoading(isLoading) {
        if (isLoading) {
            loadingOverlay.classList.remove('hidden');
            emptyState.classList.add('hidden');
            contentSection.classList.add('hidden');
        } else {
            loadingOverlay.classList.add('hidden');
        }
    }

    function showError(message) {
        errorMsg.textContent = message;
        errorMsg.classList.remove('hidden');
        
        if (!currentVerseData) {
            emptyState.classList.remove('hidden');
        }
    }

    function hideError() {
        errorMsg.classList.add('hidden');
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3500);
    }

    // --- DB STUBS ---
    
    async function stub_save_to_db(user_id, verseData, note) {
        // console.log(`Saving ${verseData.reference} for user ${user_id}`);
        // Simulate network request
        return new Promise(resolve => setTimeout(() => resolve(true), 500));
    }
});
