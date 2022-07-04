<template>
  <button
    v-if="mode === 'create'"
    class="px-2 py-1 rounded border border-black my-4"
    @click="isModalOpen = true"
  >
    Add User
  </button>
  <button
    v-else
    class="m-2 px-2 py-1 rounded border border-green-600"
    @click="isModalOpen = true"
  >
    Edit User
  </button>

  <teleport to="body">
    <Modal v-if="isModalOpen" @closeModal="isModalOpen = false">
      <template #ModalHeader v-if="mode === 'create'"> Add New User </template>
      <template #ModalHeader v-else> Update User </template>
      <template #ModalBody>
        <form class="p-2 my-2" @submit.prevent="submit">
          <div class="my-4">
            <label for="">Name</label>
            <input
              v-model="form.name"
              type="text"
              class="rounded shadow p-2 w-full border border-black"
              placeholder="Enter your Name"
            />
          </div>
          <div class="my-4">
            <label for="">Email</label>
            <input
              v-model="form.email"
              type="email"
              class="rounded shadow p-2 w-full border border-black"
              placeholder="Enter your Email"
            />
          </div>
          <div class="my-4">
            <label for="">Status</label>
            <select
              name=""
              id=""
              v-model="form.status"
              class="rounded shadow p-2 w-full border border-black"
              required
            >
              <option value="disabled">Disabled</option>
              <option value="active">Active</option>
            </select>
          </div>
          <div class="my-4">
            <button
              type="submit"
              class="
                w-full
                rounded
                bg-green-600
                p-2
                hover:shadow hover:bg-green-500
              "
            >
              <span v-if="mode === 'create'">Create</span>
              <span v-else>Update</span>
            </button>
          </div>
        </form>
      </template>
    </Modal>
  </teleport>
</template>

<script>
import Modal from "../../ModalComponent.vue";
import axios from "../../../plugins/axios";
export default {
  props: ["mode", "user"],
  data() {
    return {
      isModalOpen: false,
    };
  },
  computed: {
    form() {
      if (this.mode === "create") {
        return {
          name: "",
          email: "",
          status: "",
        };
      } else {
        return {
          name: this.user.name,
          email: this.user.email,
          status: this.user.status,
        };
      }
    },
  },
  methods: {
    async submit() {
      if (this.mode === "create") {
        const { data } = await axios.post(`/users`, this.form);
        this.isModalOpen = false;
        this.form.name = "";
        this.form.email = "";
        this.form.status = "";
        this.$emit("newUserAdded", data);
      } else {
        await axios.put(`/users/${this.user._id}`, this.form);
        this.isModalOpen = false;
        this.form.name = "";
        this.form.email = "";
        this.form.status = "";
        this.$emit("userUpdated");
      }
    },
  },
  components: { Modal },
};
</script>

<style></style>
