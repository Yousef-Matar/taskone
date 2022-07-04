<template>
  <section class="flex flex-col w-full m-10 p-5">
    <div class="flex flex-col items-start">
      <label class="text-lg mb-2 font-bold">Search :</label>
      <div class="flex justify-between mb-5 w-full">
        <input
          type="text"
          v-model="filter"
          class="border border-black rounded p-2 shadow"
          placeholder="Search"
        />
        <UserFormComponent
          @newUserAdded="updateUsers"
          :mode="'create'"
        ></UserFormComponent>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th
            v-for="header in tableHeaders"
            :key="header"
            @click="sort(header.toLowerCase())"
            class="border px-4 py-2 cursor-pointer"
          >
            {{ header }}
          </th>
          <th class="px-4 py-2">
            Table is sorted {{ sortFilterDirection }} by the {{ sortFilter }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in sortedUsers()" :key="user._id">
          <td class="border px-4 py-2">
            {{ user.name }}
          </td>

          <td class="group border px-4 py-2 truncate max-w-[100px] cursor-help">
            {{ user.email }}
            <div
              class="
                invisible
                absolute
                z-10
                bg-black
                text-white
                rounded
                text-center
                p-2
                mt-1
                opacity-0
                duration-500
                min-w-[125px]
                group-hover:visible group-hover:opacity-100
              "
            >
              {{ user.email }}
            </div>
          </td>
          <td class="border px-4 py-2">
            {{ user.age }}
          </td>
          <td
            class="border px-4 py-2"
            :class="user.status === 'active' ? 'bg-green-300' : 'bg-red-300'"
          >
            {{ user.status }}
          </td>
          <td class="border px-4 py-2">
            {{ user.role }}
          </td>
          <td class="border px-4 py-2">
            <RemoveUserComponent
              :userEmail="user.email"
              @userDeleted="updateUsers"
            ></RemoveUserComponent>
            <UserFormComponent
              @userUpdated="updateUsers"
              :mode="update"
              :user="user"
            ></UserFormComponent>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import UserFormComponent from "./crud/user/UserFormComponent.vue";
import RemoveUserComponent from "./crud/user/RemoveUserComponent.vue";
export default {
  components: { UserFormComponent, RemoveUserComponent },
  data() {
    return {
      filter: "",
      sortFilter: "name",
      sortFilterDirection: "ascendingly",
      users: [],
      tableHeaders: ["Name", "Email", "Age", "Status", "Role"],
    };
  },
  mounted() {
    if (localStorage.getItem("Users") !== null)
      this.users = JSON.parse(localStorage.getItem("Users"));
    this.filter = "";
  },
  methods: {
    updateUsers() {
      this.filter = "";
      this.users = JSON.parse(localStorage.getItem("Users"));
    },
    sort(tableHeader) {
      if (tableHeader === this.sortFilter) {
        this.sortFilterDirection =
          this.sortFilterDirection === "ascendingly"
            ? "descendingly"
            : "ascendingly";
      }
      this.sortFilter = tableHeader;
    },
    sortedUsers() {
      return this.users.sort((a, b) => {
        let modifier = 1;
        if (this.sortFilterDirection === "descendingly") modifier = -1;
        if (a[this.sortFilter] < b[this.sortFilter]) return -1 * modifier;
        if (a[this.sortFilter] > b[this.sortFilter]) return 1 * modifier;
        return 0;
      });
    },
  },
  computed: {
    fliteredUsers() {
      return this.users.filter((user) => {
        const userNames = user.name.toLowerCase();
        const userEmails = user.email.toLowerCase();
        const userAges = user.age.toString().toLowerCase();
        const accountStates = user.status.toLowerCase();
        const accountRoles = user.role.toLowerCase();
        const searchTerm = this.filter.toLowerCase();

        return (
          userNames.includes(searchTerm) ||
          userEmails.includes(searchTerm) ||
          userAges.includes(searchTerm) ||
          accountStates.includes(searchTerm) ||
          accountRoles.includes(searchTerm)
        );
      });
    },
  },
};
</script>

<style>
</style>
