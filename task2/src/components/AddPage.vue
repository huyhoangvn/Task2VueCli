<template>
    <div class="w-full">
    <form class="bg-white rounded px-8 pt-6 pb-8 mb-4 text-start">
        <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Tên công việc:
        </label>
        <input v-model="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Nhập tên công việc...">
        </div>
        <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Nội dung
        </label>
        <input v-model="content" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" placeholder="Nhập nội dung...">
        <p v-if="isError" class="text-red-500 text-xs italic" :error="error">{{ error }}</p>
        </div>
        <div class="flex items-center justify-start ">
            <button @click="addNewItem" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Thêm công việc
            </button>
        </div>
    </form>
    <p class="text-center text-gray-500 text-xs">
        &copy;2023 IMTA Corp. All rights reserved.
    </p>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from 'vue'
    export default defineComponent({
        name: 'AddPage',
        data() {
            return {
                name: "",
                content: "",
                error: "",
                isError: false
            }
        },
        methods: {
            addNewItem(){
                this.isError = false
                if(this.name == ""){
                    this.error = "Chưa nhập tên công việc"
                    this.isError = true
                    return
                }
                this.$emit("add", this.name, this.content)
            }
        }
    });
</script>

<style scoped>
    
</style>