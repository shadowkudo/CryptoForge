import {Terminal} from "@xterm/xterm"; // comment for prod
/*import xtermPkg from "@xterm/xterm"; // comment for dev
const { Terminal } = xtermPkg;*/
import {FitAddon} from "@xterm/addon-fit/src/FitAddon.js";

export const initializeTerminal = (container, theme) => {
    const term = new Terminal({
        cursorBlink: true,
        theme,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    requestAnimationFrame(() => {
        if (container) {
            container.innerHTML = '';
            term.open(container);
            fitAddon.fit();
            const observer = new ResizeObserver(() => fitAddon.fit());
            observer.observe(container);
        }
        term.writeln('Welcome to CryptoForge Tool (TIP: help)');
        term.write('$> ');
    });

    window.addEventListener("resize", () => fitAddon.fit());

    return term;
};
