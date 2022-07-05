<template>
  <button
    v-if="mode === 'create'"
    class="px-2 py-1 rounded border border-black max-h-fit"
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
            <label>Name</label>
            <input
              v-model="form.name"
              required
              type="text"
              class="rounded shadow p-2 w-full border border-black"
              placeholder="Jan Doe"
            />
          </div>
          <div class="my-4">
            <label>Email</label>
            <input
              v-model="form.email"
              required
              type="email"
              class="rounded shadow p-2 w-full border border-black"
              placeholder="JanDoe@gmail.com"
            />
          </div>
          <div class="my-4">
            <label>Date of Birth</label>
            <input
              v-model="form.DOB"
              type="date"
              class="rounded shadow p-2 w-full border border-black"
              required
            />
          </div>
          <div class="my-4">
            <label>Account Role</label>
            <select
              v-model="form.role"
              class="rounded shadow p-2 w-full border border-black"
              required
            >
              <option v-for="role in roles" :key="role" :value="role.value">
                {{ role.text }}
              </option>
            </select>
          </div>
          <div class="my-4">
            <label>Account State</label>
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
  props: ["mode", "user"],
  data() {
    return {
      isModalOpen: false,
      users: [],
      roles: [
        {
          text: "Admin",
          value: "admin",
        },
        {
          text: "User",
          value: "user",
        },
      ],
      accountStates: [
        {
          text: "Active",
          value: "active",
        },
        {
          text: "Disabled",
          value: "disabled",
        },
      ],
    };
  },
  computed: {
    form() {
      if (this.mode === "create") {
        return {
          name: "",
          email: "",
          DOB: "",
          status: "",
          role: "",
        };
      } else {
        return {
          name: this.user.name,
          email: this.user.email,
          DOB: this.user.DOB,
          status: this.user.status,
          role: this.user.role,
        };
      }
    },
    getAge() {
      var today = new Date();
      var birthDate = new Date(this.form.DOB);
      var age = today.getFullYear() - birthDate.getFullYear();
      var month = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
  },
  methods: {
    submit() {
      if (this.mode === "create") {
        this.form.age = this.getAge;
        if (localStorage.getItem("Users") === null) {
          this.users.push(this.form);
        } else {
          this.users = JSON.parse(localStorage.getItem("Users"));
          this.users.push(this.form);
        }
        localStorage.setItem("Users", JSON.stringify(this.users));
        delete this.form.age;
        this.isModalOpen = false;
        this.form.name = "";
        this.form.email = "";
        this.form.status = "";
        this.form.DOB = "";
        this.form.role = "";
        this.$emit("newUserAdded", this.form);
      } else {
        this.form.age = this.getAge;
        this.users = JSON.parse(localStorage.getItem("Users"));
        this.users = this.users.filter(
          (user) => user.email !== this.user.email
        );
        this.users.push(this.form);
        localStorage.setItem("Users", JSON.stringify(this.users));
        delete this.form.age;
        this.isModalOpen = false;
        this.form.name = "";
        this.form.email = "";
        this.form.status = "";
        this.form.DOB = "";
        this.form.role = "";
        this.$emit("userUpdated", this.form);
      }
    },
  },

  components: { Modal },
};
</script>

<style></style>
