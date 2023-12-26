<script lang="ts">
import HomePage from './components/HomePage.vue';
import AddPage from './components/AddPage.vue';
import ModelPopup from './components/ModelPopup.vue';
import {Task} from './objects/Task'
import { ref } from 'vue'
import { defineComponent} from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    HomePage,
    AddPage,
    ModelPopup
  },
  data() {
    const listFirst = ref<Task[]>([
      new Task(1,"Học bài Typescript","Học Typescript Type/Class/Function/...","02/26/2023", false),
      new Task(2,"Học bài VueJs","Học VueJs Props/Ref/Reactive/...","12/26/2023", true),
      new Task(3,"Học bài Tailwind","Học Tailwind...","12/08/2023", true),
      new Task(4,"Học bài Python","Học Python 2 bài tập","12/26/2023", true),
      new Task(5,"Thực tập sáng","Đi thực tập sáng 9:00","01/26/2023", false)
    ]);//Nên dùng reactive cho array và object
    const list = ref<Task[]>(listFirst.value as Array<Task>)
    return {
      tab: 1,
      isShowModal: false,
      isShowDelete: false,
      isShowEdit: false,
      title: "N/A",
      content: "N/A",
      id: 0,
      list,
      listFirst,
      editName: "",
      editContent: "",
      editError: "",
      isEditError: false
    };
  },
  methods: {
    currentTab: function (tabNumber: number) {
      this.tab = tabNumber;
    },
    showDetailModel: function (id: number){
      this.id = id
      this.title = "Chi tiết công việc"
      let temp = this.list.find(obj => obj.id == id)
      if (temp) {this.content = temp.content}
      this.isShowModal = true
      this.isShowDelete = false
      this.isShowEdit = false
    },
    showDeleteModel: function (id: number){
      this.id = id
      this.title = "Xóa công việc"
      this.content = "Bạn có muốn xóa công việc đã chọn?"
      this.isShowModal = true
      this.isShowDelete = true
      this.isShowEdit = false
    },
    closeModel: function (){
      this.isShowModal = false
      this.isShowDelete = false
      this.isShowEdit = false
    },
    deleteItem: function (){
      this.listFirst = this.listFirst.filter(obj => obj.id !== this.id)
      this.list = this.listFirst
      this.isShowModal = false
    },
    filterItem: function (searchName: string){
      if(searchName != ""){
        this.list = this.list.filter(obj => obj.name.match(searchName))
      }
      else {
        this.list = this.listFirst
      }
    },
    addNewTask: function (name: string, content: string){
      this.listFirst.push(new Task(Math.floor(Math.random() * 100), name, content, (new Date()).toLocaleDateString(), false,))
      this.isShowModal = true
      this.title = "Thêm mới công việc"
      this.content = "Đã thêm mới thành công"
    },
    showEditModel: function (id: number){
      this.id = id
      this.title = "Sửa công việc"
      this.content = "Bạn có muốn sửa công việc đã chọn?"
      this.isShowModal = true
      this.isShowEdit = true
    },
    editItem: function (){
      const item = this.listFirst.find(obj => obj.id === this.id)
      if(item){
        item.name = this.editName
        item.content = this.content
        this.isShowEdit = false
        this.isShowModal = false
        this.isShowDelete = false
      }

    }
  }
});
</script>

<template>
  <div>
    <ModelPopup :title="title" :content="content" v-if="isShowModal" @close="closeModel" @delete="deleteItem" >
      <template v-slot:more-option v-if="isShowEdit">
        <div>
          <div class="mb-4 text-start">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                Tên công việc:
            </label>
            <input v-model="editName" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Nhập tên công việc...">
            </div>
            <div class="mb-6 text-start">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                Nội dung
            </label>
            <input v-model="editContent" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" placeholder="Nhập nội dung...">
            <p v-if="isEditError"  class="text-red-500 text-xs italic">
                <span :error="editError">Lỗi hiển thị</span>
            </p>
          </div>          
        </div>
      </template>
      <template v-slot:button-delete v-if="isShowEdit">
        <div>
          <button class=" bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mx-1" @click="editItem">Sửa</button>
        </div>
      </template>
      <template v-slot:button-edit v-if="isShowDelete">
        <div>
          <button class=" bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mx-1" @click="deleteItem">Xóa</button>
        </div>
      </template>
    </ModelPopup>

    <h1 class="m-4 font-bold text-center text-blue-900 text-6xl">To-do App</h1>
    <div class="container mx-auto">
      <ul class="flex justify-center text-white space-x-3">
        <li>
          <button
            @click="currentTab(1)"
            class="inline-block px-4 py-2 text-blue-900 focus:bg-gray-200 font-semibold outline-dashed w-72"
            role="tab" id="list-tab">
            Danh sách công việc
          </button>
        </li>
        <li>
          <button
            @click="currentTab(2)"
            value="Tab 2"
            class="inline-block px-4 py-2 text-blue-900 focus:bg-gray-200 font-semibold outline-dashed w-72">
            Thêm công việc
          </button>
        </li>
      </ul>
      <div class="p-3 text-center bg-white">
        <transition name="fade" mode="out-in">
          <div :key="tab">
            <!-- Không có lỗi ở đây -->
            <p>{{ list.length }} công việc...</p>
            <HomePage v-if="tab === 1" msg="Danh sách công việc" :tasks="list" @show="showDetailModel" @delete="showDeleteModel" @edit="showEditModel" @filter="filterItem"/>
            <AddPage v-else @add="addNewTask"/>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.fade-enter-active,
.fade-leave-active {
  /* transform: translateY(30px); */
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
