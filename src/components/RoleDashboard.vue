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
        <RoleFormComponent
          @newRoleAdded="updateRoles"
          :mode="'create'"
        ></RoleFormComponent>
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
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="role in sortRoles()" :key="role._id">
          <td class="border px-4 py-2">
            {{ role.title }}
          </td>

          <td class="group border px-4 py-2 truncate max-w-[100px]">
            {{ role.description }}
          </td>

          <td
            class="border px-4 py-2"
            :class="role.status === 'active' ? 'bg-green-300' : 'bg-red-300'"
          >
            {{ role.status }}
          </td>
          <td class="border px-4 py-2">
            <RemoveRoleComponent
              :roleTitle="role.title"
              @roleDeleted="updateRoles"
            >
            </RemoveRoleComponent>
            <RoleFormComponent
              @roleUpdated="updateRoles"
              :mode="update"
              :role="role"
            ></RoleFormComponent>
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
          currentPage * pageSize >= table.roles.length
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
import RoleFormComponent from "./crud/role/RoleFormComponent.vue";
import RemoveRoleComponent from "./crud/role/RemoveRoleComponent.vue";
export default {
  components: { RoleFormComponent, RemoveRoleComponent },
  data() {
    return {
      table: {
        headers: ["Title", "Description", "Role State"],
        sortingAttribute: "title",
        sortingType: "ascendingly",
        searchFilter: "",
        roles: [],
        statusFilter: "all",
      },
      pageSize: 5,
      currentPage: 1,
    };
  },
  mounted() {
    if (localStorage.getItem("Roles") !== null)
      this.table.roles = JSON.parse(localStorage.getItem("Roles"));
    this.table.searchFilter = "";
  },
  methods: {
    nextPage() {
      if (this.currentPage * this.pageSize < this.table.roles.length)
        this.currentPage++;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    updateRoles() {
      this.table.searchFilter = "";
      this.table.roles = JSON.parse(localStorage.getItem("Roles"));
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
    sortRoles() {
      return this.fliteredRoles
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
    fliteredRoles() {
      return this.table.roles.filter((role) => {
        const roleTitles = role.title.toLowerCase();
        const roleDescriptions = role.description.toLowerCase();
        const roleStates = role.status.toLowerCase();
        const searchTerm = this.table.searchFilter.toLowerCase();
        if (this.table.statusFilter == "all") {
          return (
            roleTitles.includes(searchTerm) ||
            roleDescriptions.includes(searchTerm) ||
            roleStates.includes(searchTerm)
          );
        } else {
          return (
            (roleTitles.includes(searchTerm) ||
              roleDescriptions.includes(searchTerm)) &&
            roleStates.includes(this.table.statusFilter)
          );
        }
      });
    },
  },
};
</script>

<style>
</style>