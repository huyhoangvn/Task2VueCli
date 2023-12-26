<script lang="ts">
    import { defineComponent} from 'vue';

    export default defineComponent({
        name: 'ModelPopup',
        props: {
            title: {
                required: true,
                type: String
            },
            content: {
                required: true,
                type: String
            }
        },
        methods: {
            closeModel(){
                this.$emit("close")
            }
        }
    });
</script>

<template>
    <div class="p-2 inline-block w-96 h-fit bg-white absolute text border-2 m-auto left-0 right-0 bottom-0 top-0 rounded-lg shadow-md">
        <h1 class="m-2 text-2xl font-bold text-blue-900">{{title}}</h1>
        <h2 class="m-2 text-m font-bold text-blue-900">{{content}}</h2>
        <slot name="more-option"></slot>
        <div class="flex justify-end m-2">
            <button class=" bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mx-1" @click="closeModel">Đóng</button>

            <slot name="button-delete"></slot>
            <slot name="button-edit"></slot>
        </div>
    </div>
</template>

<style scoped>
    
</style>