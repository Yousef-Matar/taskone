<template>
  <button
    v-if="mode === 'create'"
    class="px-2 py-1 rounded border border-black max-h-fit"
    @click="isModalOpen = true"
  >
    Add Role
  </button>
  <button
    v-else
    class="m-2 px-2 py-1 rounded border border-green-600"
    @click="isModalOpen = true"
  >
    Edit Role
  </button>

  <teleport to="body">
    <Modal v-if="isModalOpen" @closeModal="closeModal">
      <template #ModalHeader v-if="mode === 'create'"> Add New Role </template>
      <template #ModalHeader v-else> Update Role </template>
      <template #ModalBody>
        <form class="p-2 my-2" @submit.prevent="submit">
          <div class="my-4">
            <label>Title</label>
            <input
              v-model="form.title"
              required
              type="text"
              class="rounded shadow p-2 w-full border border-black"
              placeholder="Admin"
              :disabled="mode !== 'create'"
              :class="mode !== 'create' ? 'cursor-not-allowed' : 'cursor-auto'"
            />
          </div>
          <div class="my-4">
            <label>Description</label>
            <input
              v-model="form.description"
              required
              type="text"
              class="rounded shadow p-2 w-full border border-black"
              placeholder="Manage Something"
            />
          </div>

          <div class="my-4">
            <label>Role State</label>
            <select
              v-model="form.status"
              class="rounded shadow p-2 w-full border border-black"
              required
            >
              <option
                v-for="status in accountStates"
                :key="status"
                :value="status.value"
              >
                {{ status.text }}
              </option>
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
export default {
  props: ["mode", "role"],
  data() {
    return {
      roles: [],
      isModalOpen: false,
      accountStates: [
        {
          text: "Active",
          value: "active",
        },
        {
          text: "Inactive",
          value: "inactive",
        },
      ],
    };
  },
  computed: {
    form() {
      if (this.mode === "create") {
        return {
          title: "",
          description: "",
          status: "",
        };
      } else {
        return {
          title: this.role.title,
          description: this.role.description,
          status: this.role.status,
        };
      }
    },
  },
  methods: {
    submit() {
      if (this.mode === "create") {
        if (localStorage.getItem("Roles") === null) {
          this.roles.push(this.form);
        } else {
          this.roles = JSON.parse(localStorage.getItem("Roles"));
          this.roles.push(this.form);
        }
        localStorage.setItem("Roles", JSON.stringify(this.roles));
        this.closeModal();

        this.$emit("newRoleAdded", this.form);
      } else {
        this.roles = JSON.parse(localStorage.getItem("Roles"));
        this.roles = this.roles.filter(
          (role) => role.title !== this.role.title
        );
        this.roles.push(this.form);
        localStorage.setItem("Roles", JSON.stringify(this.roles));
        this.closeModal();
        this.$emit("roleUpdated", this.form);

        var users = JSON.parse(localStorage.getItem("Users"));
    
        for (let index = 0; index < users.length; index++) {
          if (users[index].role.title === this.form.title) {
            users[index].role = this.form;
          }
        }
  

        localStorage.setItem("Users", JSON.stringify(users));
      }
    },
    closeModal() {
      if (this.mode === "create") {
        this.form.title = "";
        this.form.description = "";
        this.form.status = "";
      }
      this.isModalOpen = false;
    },
  },

  components: { Modal },
};
</script>

<style></style>
