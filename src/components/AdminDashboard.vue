<template>
  <section class="flex flex-col w-full">
    <div class="m-auto">
      <div class="mt-10 max-w-max">
        <AddUserComponent
          @newUserAdded="addUser"
          :mode="'create'"
        ></AddUserComponent>

        <table v-if="users.length > 0">
          <thead>
            <tr>
              <th class="border px-4 py-2">ID</th>
              <th class="border px-4 py-2">Name</th>
              <th class="border px-4 py-2">Email</th>
              <th class="border px-4 py-2">Status</th>
              <th class="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user._id">
              <td class="border px-4 py-2">
                {{ user._id }}
              </td>

              <td class="border px-4 py-2">
                {{ user.name }}
              </td>
              <td class="border px-4 py-2">
                {{ user.email }}
              </td>
              <td
                class="border px-4 py-2"
                :class="
                  user.status === 'active' ? 'bg-green-300' : 'bg-red-300'
                "
              >
                {{ user.status }}
              </td>
              <td class="border px-4 py-2">
                <RemoveUserComponent
                  :userID="user._id"
                  @userDeleted="removeUser"
                ></RemoveUserComponent>
                <AddUserComponent
                  @userUpdated="updateUser"
                  :mode="update"
                  :user="user"
                ></AddUserComponent>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "../plugins/axios";
import AddUserComponent from "./crud/user/AddUserComponent.vue";
import RemoveUserComponent from "./crud/user/RemoveUserComponent.vue";
export default {
  components: { AddUserComponent, RemoveUserComponent },
  data() {
    return {
      users: [],
    };
  },
  async mounted() {
    const { data } = await axios.get(`/users`);
    this.users = data;
  },
  methods: {
    addUser(data) {
      this.users.push(data);
    },
    removeUser(userID) {
      this.users = this.users.filter((user) => user._id !== userID);
    },
    async updateUser() {
      const { data } = await axios.get(`/users`);
      this.users = data;
    },
  },
};
</script>

<style></style>
