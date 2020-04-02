import Vue from 'vue/dist/vue'
import axios from 'axios'


new Vue({
    el: "#app",
    data: () => {
        return {
            "pageList": [],
            "newPageName": ''
        }

    },
    methods: {
        createPage() {
            axios
                .post("./api/createNewHtmlPage.php", {name: this.newPageName})
                .then(response => this.updatePage()
                )
        },
        updatePage() {
            axios
                .get("./api/")
                .then(response => {
                    this.pageList = response.data
                })
        },
        removePage(page) {
            axios
                .post("./api/removeHtmlPage.php", {remove: page})
                .then(response => this.updatePage()
                )
        }
    },
    created() {
        this.updatePage()
    }
})