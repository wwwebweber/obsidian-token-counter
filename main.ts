import { App, Plugin, PluginSettingTab, Setting, TFile, WorkspaceLeaf } from 'obsidian';
import { encode } from 'gpt-tokenizer';

export default class TokenCounterPlugin extends Plugin {
    statusBarItemEl: HTMLElement;

    async onload() {
        this.statusBarItemEl = this.addStatusBarItem(); [6]
        this.statusBarItemEl.setText('');

        this.registerEvent(
            this.app.workspace.on('active-leaf-change', this.updateTokenCount)
        );

        this.registerEvent(
            this.app.workspace.on('editor-change', this.updateTokenCount)
        );

        this.updateTokenCount();
    }

    onunload() {
        this.statusBarItemEl.remove();
    }

    updateTokenCount = async () => {
        const activeFile = this.app.workspace.getActiveFile(); [8]
        if (activeFile) {
            const content = await this.app.vault.read(activeFile); [8, 13]
            const tokens = encode(content);
            this.statusBarItemEl.setText(`${tokens.length} Token`);
        } else {
            this.statusBarItemEl.setText('');
        }
    }
}