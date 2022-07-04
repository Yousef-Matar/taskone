<template>
  <button
    class="px-2 py-1 rounded border border-red-600 m-2"
    @click="isModalOpen = true"
  >
    Delete User
  </button>
  <teleport to="body">
    <Modal v-if="isModalOpen" @closeModal="isModalOpen = false">
      <template #ModalHeader> User Deletion </template>
      <template #ModalBody>
        <div class="text-center">
          Are You sure you want to delete this User ?
        </div>
        <div class="flex justify-around">
          <button
            class="px-2 py-1 rounded border border-green-500 bg-green-200 my-4"
            @click="deleteUser(userEmail)"
          >
            Yes
          </button>
          <button
            class="px-2 py-1 rounded border border-red-500 bg-red-200 my-4"
            @click="isModalOpen = false"
          >
            No
          </button>
        </div>
      </template>
    </Modal>
  </teleport>
</template>

<script>
import Modal from "../../ModalComponent.vue";
export default {
  components: { Modal },
  props: ["userEmail"],
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    deleteUser(userEmail) {
      var users = JSON.parse(localStorage.getItem("Users"));
      users = users.filter((user) => user.email !== userEmail);
      localStorage.setItem("Users", JSON.stringify(users));
      this.isModalOpen = false;
      this.$emit("userDeleted", userEmail);
    },
  },
};
</script>

<style></style>
