import Editor from "./editor";
import "./iframe-load"
window.editor = new Editor()

window.onload = () => {
    window.editor.open('index.html')
}