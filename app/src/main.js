import Editor from "./editor";
import Vue from "vue/dist/vue.js"
import UIkit from "uikit";
import axios from 'axios'

window.editor = new Editor()

new Vue({
    el: '#app',
    data: {
        page: 'index.html',
        loader: true,
        pageList: [],
        backupList: [],
        meta: {
            title: '',
            keywords: '',
            desc: ''
        }
    },
    methods: {
        onBtnSave() {
            this.loader = true
            window.editor.save(() => {
                    this.loadBackupList()
                this.loader = false
                UIkit.notification({message: 'Успешно сохранено!', status: 'success'})
            },
            () => {
                this.loader = false
                UIkit.notification({message: 'Ощибка при сохранении!', status: 'danger'})
            })
        },
        openPage(page) {
            this.page = page
            this.loadBackupList()
            this.loader = true
            window.editor.open(page, ()=> {
                this.loader = false
                this.meta = window.editor.metaEditor.getMeta()
            })
        },
        loadBackupList() {
            axios
                .get("./backups/backups.json")
                .then(res => {
                    this.backupList = res.data.filter(b => {
                        return (b.page === this.page)
                    })

                })
        },
        restoreBackup(backup) {
            UIkit.modal
                .confirm('Вы действительно хотите восстановить страницу из этой резервной копии? Все несохраненные изменения будут утеряны!',
                    {labels: {ok: "Восстановить", cancel: "Отмена"}}
                    )
                .then(() => {
                    this.loader = true
                    return axios.post("./api/restoreBackup.php", {"page": backup.page, "file": backup.file })
                })
                .then(() => {
                    window.editor.open(this.page, () => {
                        this.loader = false
                    })
                })
        },
        applyMeta() {
            window.editor.metaEditor.setMeta(this.meta.title, this.meta.keywords, this.meta.desc)
        }
    },
    created() {

        this.openPage(this.page)
        axios
            .get('./api/pageList.php')
            .then(res => {
                this.pageList = res.data
            })
        this.loadBackupList()
    }
})
