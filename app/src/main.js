import Editor from "./editor";

window.editor = new Editor()

window.onload = () => {
    window.editor.open('index.html')
}