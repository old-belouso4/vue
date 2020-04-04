import Editor from "./editor";
import Vue from "vue/dist/vue.js"
import UIkit from "uikit";

window.editor = new Editor()

new Vue({
    el: '#app',
    data: {
        loader: true
    },
    methods: {
        onBtnSave() {
            this.loader = true
            window.editor.save(() => {
                this.loader = false
                UIkit.notification({message: 'Успешно сохранено!', status: 'success'})
            },
            () => {
                this.loader = false
                UIkit.notification({message: 'Ощибка при сохранении!', status: 'danger'})
            })
        }
    },
    created() {
        window.editor.open('index.html', () => {
            this.loader = false
        })
    }
})
