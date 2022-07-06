<template>
  <button
    class="px-2 py-1 rounded border border-red-600 m-2"
    @click="isModalOpen = true"
  >
    Delete Role
  </button>
  <teleport to="body">
    <Modal v-if="isModalOpen" @closeModal="isModalOpen = false">
      <template #ModalHeader> Role Deletion </template>
      <template #ModalBody>
        <div class="text-center">
          Are You sure you want to delete this Role ?
        </div>
        <div class="flex justify-around">
          <button
            class="px-2 py-1 rounded border border-green-500 bg-green-200 my-4"
            @click="deleteRole(roleTitle)"
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
  props: ["roleTitle"],
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    deleteRole(roleTitle) {
      if (localStorage.getItem("Users") !== null) {
        var users = JSON.parse(localStorage.getItem("Users"));
        users = users.filter((user) => user.role.title !== roleTitle);
        localStorage.setItem("Users", JSON.stringify(users));
      }

      var roles = JSON.parse(localStorage.getItem("Roles"));
      roles = roles.filter((role) => role.title !== roleTitle);
      localStorage.setItem("Roles", JSON.stringify(roles));
      this.isModalOpen = false;
      this.$emit("roleDeleted", roleTitle);
    },
  },
};
</script>

<style></style>
