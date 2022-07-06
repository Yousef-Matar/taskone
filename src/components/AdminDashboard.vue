<template>
  <section class="flex flex-col w-full m-10 p-5">
    <div class="flex flex-col items-start">
      <label class="text-lg font-bold">Search :</label>
      <div class="flex justify-between my-3 w-full">
        <input
          type="text"
          v-model="table.searchFilter"
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
            v-for="header in table.headers"
            :key="header"
            @click="sort(header.toLowerCase())"
            class="border px-4 py-2 cursor-pointer"
          >
            <div class="flex justify-between">
              {{ header }}
              <div class="flex flex-col">
                <font-awesome-icon
                  icon="fa-solid fa-sort-up"
                  :class="
                    header.toLowerCase() === table.sortingAttribute &&
                    table.sortingType === 'ascendingly'
                      ? 'text-black'
                      : 'text-[#969696]'
                  "
                />
                <font-awesome-icon
                  :class="
                    header.toLowerCase() === table.sortingAttribute &&
                    table.sortingType === 'descendingly'
                      ? 'text-black'
                      : 'text-[#969696]'
                  "
                  icon="fa-solid fa-sort-down"
                />
              </div>
            </div>
          </th>
          <th class="px-4 py-2">
            <div class="flex justify-start my-3 w-full">
              <div>
                <label class="text-lg font-bold">Status Filter :</label>
                <select
                  class="border border-black rounded p-2 shadow mx-2"
                  v-model="table.statusFilter"
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
              <div>
                <label class="text-lg font-bold">Role Filter :</label>
                <select
                  class="border border-black rounded p-2 shadow mx-2"
                  v-model="table.roleFilter"
                >
                  <option value="all">All</option>
                  <option
                    v-for="role in table.roles"
                    :key="role"
                    :value="role.title.toLowerCase()"
                  >
                    {{ role.title }}
                  </option>
                </select>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in sortUsers()" :key="user._id">
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
            {{ user.role.title }}
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
    <div class="flex justify-between">
      <button
        class="px-2 py-1 rounded border border-black m-2"
        :class="this.currentPage === 1 ? 'bg-gray-300' : 'bg-transparent'"
        @click="prevPage"
      >
        Previous
      </button>
      <button
        class="px-2 py-1 rounded border border-black m-2"
        :class="
          currentPage * pageSize >= table.users.length
            ? 'bg-gray-300'
            : 'bg-transparent'
        "
        @click="nextPage"
      >
        Next
      </button>
    </div>
  </section>
</template>

<script>
import UserFormComponent from "./crud/user/UserFormComponent.vue";
import RemoveUserComponent from "./crud/user/RemoveUserComponent.vue";
export default {
  components: { UserFormComponent, RemoveUserComponent },
  data() {
    return {
      table: {
        headers: ["Name", "Email", "Age", "Status", "Role"],
        roles: JSON.parse(localStorage.getItem("Roles")),
        sortingAttribute: "name",
        sortingType: "ascendingly",
        searchFilter: "",
        users: [],
        statusFilter: "all",
        roleFilter: "all",
      },
      pageSize: 5,
      currentPage: 1,
    };
  },
  mounted() {
    if (localStorage.getItem("Users") !== null)
      this.table.users = JSON.parse(localStorage.getItem("Users"));
    this.table.searchFilter = "";
  },
  methods: {
    nextPage() {
      if (this.currentPage * this.pageSize < this.table.users.length)
        this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    updateUsers() {
      this.table.searchFilter = "";
      this.table.users = JSON.parse(localStorage.getItem("Users"));
    },

    sort(tableHeader) {
      if (tableHeader === this.table.sortingAttribute) {
        this.table.sortingType =
          this.table.sortingType === "ascendingly"
            ? "descendingly"
            : "ascendingly";
      }
      this.table.sortingAttribute = tableHeader;
    },
    sortUsers() {
      return this.fliteredUsers
        .sort((a, b) => {
          let modifier = 1;
          if (this.table.sortingType === "descendingly") modifier = -1;
          if (a[this.table.sortingAttribute] < b[this.table.sortingAttribute])
            return -1 * modifier;
          if (a[this.table.sortingAttribute] > b[this.table.sortingAttribute])
            return 1 * modifier;
          return 0;
        })
        .filter((row, index) => {
          let start = (this.currentPage - 1) * this.pageSize;
          let end = this.currentPage * this.pageSize;
          if (index >= start && index < end) return true;
        });
    },
  },
  computed: {
    fliteredUsers() {
      return this.table.users.filter((user) => {
        const userNames = user.name.toLowerCase();
        const userEmails = user.email.toLowerCase();
        const userAges = user.age.toString().toLowerCase();
        const accountStates = user.status.toLowerCase();
        const accountRoles = user.role.title.toLowerCase();
        const accountRoleStatus = user.role.status.toLowerCase();
        const searchTerm = this.table.searchFilter.toLowerCase();

        if (
          this.table.statusFilter == "all" &&
          this.table.roleFilter == "all"
        ) {
          return (
            (userNames.includes(searchTerm) ||
              userEmails.includes(searchTerm) ||
              userAges.includes(searchTerm) ||
              accountStates.includes(searchTerm) ||
              accountRoles.includes(searchTerm)) &&
            !accountRoleStatus.includes("inactive")
          );
        } else if (
          this.table.statusFilter !== "all" &&
          this.table.roleFilter == "all"
        ) {
          return (
            (userNames.includes(searchTerm) ||
              userEmails.includes(searchTerm) ||
              userAges.includes(searchTerm) ||
              accountRoles.includes(searchTerm)) &&
            accountStates.includes(this.table.statusFilter) &&
            !accountRoleStatus.includes("inactive")
          );
        } else if (
          this.table.statusFilter == "all" &&
          this.table.roleFilter !== "all"
        ) {
          return (
            (userNames.includes(searchTerm) ||
              userEmails.includes(searchTerm) ||
              userAges.includes(searchTerm) ||
              accountStates.includes(searchTerm)) &&
            accountRoles.includes(this.table.roleFilter) &&
            !accountRoleStatus.includes("inactive")
          );
        } else {
          return (
            (userNames.includes(searchTerm) ||
              userEmails.includes(searchTerm) ||
              userAges.includes(searchTerm)) &&
            accountStates.includes(this.table.statusFilter) &&
            accountRoles.includes(this.table.roleFilter) &&
            !accountRoleStatus.includes("inactive")
          );
        }
      });
    },
  },
};
</script>

<style>
</style>
