<template>
  <div class="hello">
    <h1>{{ msg + ", hôm nay " + (new Date()).toLocaleDateString() }}</h1>
    <form class="flex flex-row w-full justify-start my-2">
      <input v-model="searchName" class="m-1 shadow appearance-none rounded w-3/6 py-2 px-3 bg-white border border-gray-400 hover:border-gray-500 leading-tight focus:outline-none focus:shadow-outline" id="tenCongViec" type="text" placeholder="Tên công việc">
      <input class="m-1 shadow appearance-none rounded w-1/6 py-2 px-3 bg-white border border-gray-400 hover:border-gray-500 leading-tight focus:outline-none focus:shadow-outline" id="ngayTao" type="date" placeholder="Ngày tạo">
      <select class="m-1 ppearance-none w-1/6 bg-white border border-gray-400 hover:border-gray-500 py-2 px-3 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
          <option>Hoàn thành</option>
          <option>Chưa hoàn thành</option>
      </select>
      <button @click="filterSearch(searchName)" class="m-1 bg-blue-500 hover:bg-blue-700 text-white w-1/6 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          Tìm kiếm
      </button>
    </form>
    <table class="table-auto border-solid border-2 border-blue-900 border-collapse p-1 w-full">
      <thead>
        <tr class="border-solid border-2 border-blue-900 border-collapse p-1 bg-blue-50">
          <th class="border-solid border-2 border-blue-900 border-collapse p-1 w-1/12">Id</th>
          <th class="border-solid border-2 border-blue-900 border-collapse p-1 w-4/12">Tên công việc</th>
          <th class="border-solid border-2 border-blue-900 border-collapse p-1 w-2/12">Ngày tạo</th>
          <th class="border-solid border-2 border-blue-900 border-collapse p-1 w-2/12">Hoàn thành</th>
          <th class="border-solid border-2 border-blue-900 border-collapse p-1 w-3/12">Lựa chọn</th>
        </tr>
      </thead>
      <tbody v-if="tasks.length > 0">
        <tr v-for="task in tasks" :key="task.id" class="border-solid border-2 border-blue-900 border-collapse p-1">
          <td class="border-solid border-2 border-blue-900 border-collapse p-1">{{task.id}}</td>
          <td class="border-solid border-2 border-blue-900 border-collapse p-1">{{task.name}}</td>
          <td class="border-solid border-2 border-blue-900 border-collapse p-1">{{task.createdAt}}</td>
          <td class="border-solid border-2 border-blue-900 border-collapse p-1">
            <input type="checkbox" v-model="task.isDone" disabled><span class="mx-1">{{task.isDone?"Hoàn thành":"Chưa hoàn thành"}}</span>
          </td>
          <td class="border-solid border-2 border-blue-900 border-collapse p-1">
            <button class="bg-info-600 hover:bg-info-800 text-white font-bold py-2 px-4 rounded mx-2" @click="showDetailModel(task.id)">Chi tiết</button>
            <button class="bg-danger-600 hover:bg-danger-800 text-white font-bold py-2 px-4 rounded mx-2" @click="showDeleteModel(task.id)">Xóa</button>
            <button class="bg-emerald-600 hover:bg-emerald-800 text-white font-bold py-2 px-4 rounded mx-2" @click="showEditModel(task.id)">Sửa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType} from 'vue';
  import {Task} from './../objects/Task';
  //Optional api
  export default defineComponent({
    name: 'HomePage',
    props: {
      msg: String,
      tasks : {
        required: true,
        type: Array as PropType<Task[]>,
        default: () => [],
      }
    },
    methods: {
      showDetailModel(id: number){
        this.$emit("show", id)
      },
      showDeleteModel(id: number){
        this.$emit("delete", id)
      },
      showEditModel(id: number){
        this.$emit("edit", id)
      },
      filterSearch(searchName: string){
        this.$emit("filter", searchName);
      }
    },
    data() {
      return {
        searchName: ""
      }
    },
  });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
