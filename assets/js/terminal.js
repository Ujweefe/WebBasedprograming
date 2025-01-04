const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');

let commandHistory = [];
let historyIndex = -1;

const commands = {
    help: {
        description: 'Mevcut komutları listeler',
        execute: () => {
            addOutput('Mevcut Komutlar:');
            Object.keys(commands).forEach(cmd => {
                addOutput(`  ${cmd}: ${commands[cmd].description}`);
            });
        }
    },
    clear: {
        description: 'Terminal ekranını temizler',
        execute: () => {
            terminalOutput.innerHTML = '';
        }
    },
    echo: {
        description: 'Girilen metni ekrana yazdırır',
        execute: (args) => {
            addOutput(args.join(' '));
        }
    },
    date: {
        description: 'Mevcut tarih ve saati gösterir',
        execute: () => {
            addOutput(new Date().toLocaleString());
        }
    },
    pwd: {
        description: 'Mevcut dizini gösterir',
        execute: () => {
            addOutput('/home/user/html5-course');
        }
    }
};

function addOutput(text, type = '') {
    const line = document.createElement('div');
    line.className = `output-line ${type}`;
    line.textContent = text;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function executeCommand(input) {
    const [cmd, ...args] = input.trim().split(' ');
    
    if (cmd === '') return;
    
    commandHistory.push(input);
    historyIndex = commandHistory.length;

    addOutput(`$ ${input}`);

    if (commands[cmd]) {
        commands[cmd].execute(args);
    } else {
        addOutput(`Komut bulunamadı: ${cmd}`, 'error-line');
        addOutput("Mevcut komutları görmek için 'help' yazın.", 'info-line');
    }
}

function clearTerminal() {
    terminalOutput.innerHTML = '';
}

terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const input = terminalInput.value;
        terminalInput.value = '';
        executeCommand(input);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            terminalInput.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            terminalInput.value = '';
        }
    }
});

// Terminal her zaman fokuslanmış olsun
document.addEventListener('click', () => {
    terminalInput.focus();
}); 