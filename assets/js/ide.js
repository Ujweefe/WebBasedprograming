// Varsayılan HTML şablonu
const defaultTemplate = `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web Based Programming - Preview</title>
    <style>
        :root {
            --primary-color: #6366f1;
            --text-color: #333;
            --bg-color: #f8fafc;
        }

        body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            margin: 0;
            padding: 0;
            background: var(--bg-color);
            color: var(--text-color);
        }

        .header {
            background: var(--primary-color);
            color: white;
            padding: 1rem;
            text-align: center;
        }

        .container {
            max-width: 800px;
            margin: 2rem auto;
            padding: 0 1rem;
        }

        .welcome-message {
            text-align: center;
            padding: 2rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .footer {
            text-align: center;
            padding: 1rem;
            color: #666;
            position: fixed;
            bottom: 0;
            width: 100%;
            background: white;
            border-top: 1px solid #eee;
        }
    </style>
</head>
<body>
    <header class="header">
        <h1>Web Based Programming</h1>
        <p>İstinye Üniversitesi</p>
    </header>

    <div class="container">
        <div class="welcome-message">
            <h2>Hoş Geldiniz!</h2>
            <p>Bu alan kodunuzun önizlemesini gösterir.</p>
            <p>Soldaki editörde değişiklik yaparak sonucu burada görebilirsiniz.</p>
        </div>
    </div>

    <footer class="footer">
        <p>Web Based Programming - IDE Preview</p>
    </footer>
</body>
</html>`;

// IDE başlatıldığında varsayılan şablonu yükle
window.onload = function() {
    const codeEditor = document.getElementById('codeEditor');
    const previewFrame = document.getElementById('previewFrame');
    
    if (codeEditor) {
        codeEditor.value = defaultTemplate;
    }
    
    // Önizlemeyi güncelle
    updatePreview();
}

// Preview update
function updatePreview() {
    const code = codeEditor.value;
    const preview = previewFrame.contentDocument;
    preview.open();
    preview.write(code);
    preview.close();
}

// Run code
function runCode() {
    updatePreview();
}

// Tab handling
codeEditor.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        e.preventDefault();
        const start = this.selectionStart;
        const end = this.selectionEnd;
        this.value = this.value.substring(0, start) + '    ' + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 4;
    }
});

// Events
codeEditor.addEventListener('input', () => {
    updateLineNumbers();
});

// Initial setup
updateLineNumbers();

// Toggle preview
function togglePreview() {
    const previewArea = document.querySelector('.preview-area');
    previewArea.classList.toggle('expanded');
    if (previewArea.classList.contains('expanded')) {
        document.querySelector('.ide-layout').style.gridTemplateColumns = '250px 1fr 50%';
    } else {
        document.querySelector('.ide-layout').style.gridTemplateColumns = '250px 1fr 400px';
    }
} 