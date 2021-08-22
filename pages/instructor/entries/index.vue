
<template>
  <div class="heroes-page">
    <div class="container">
      <h1 class="title">Contentful Entries</h1>
      
      <portal-target
        v-for="entry in entries"
        :key="entry.sys.id"
        :name="`modal-view-${entry.sys.id}`" />
      <table class="heroes-table table is-responsive">
        <thead>
          <tr class="main-table-row">
            <th>Id</th>
            <th>Name</th>
            <th>Environment</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="entry in entries"
            :key="entry.sys.id"
            @click="openModal(entry.sys.id)"
            :class="{'isActive': false}"
            class="table-row"
          >
            <td>{{entry.sys.id || 'Not Set'}}</td>
            <td>{{entry.fields.name || 'Not Set'}}</td>
            <td>{{entry.sys.environment}}</td>
            <td>{{entry.sys.createdAt | formatDate   }}</td>
            <td>{{entry.sys.updatedAt | formatDate }}</td>
            <td class="modal-td" v-show="false">
            <portal :to="`modal-view-${entry.sys.id}`">
              <Modal
                @submitted="activateEntry($event, entry.sys.id)"
                :ref="`modal-${entry.sys.id}`"
                :showButton="false"
                actionTitle="Ok"
                openTitle="Favorite"
                title="Entry Summary">
                <div>
                  <div class="subtitle">
                    Id: {{entry.sys.id || 'Not Set'}}
                  </div>
                  <div class="subtitle">
                    Name: {{entry.fields.name || 'Not Set'}}
                  </div>
                  <div class="subtitle">
                    Created At: {{entry.sys.createdAt | formatDate }}
                  </div>
                  <figure v-if="entry.fields.file" class="image is-3by1">
                    <img :src="entry.fields.file.url">
                  </figure>
                </div>
              </Modal>
            </portal>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Modal from '~/components/shared/Modal'
export default {
  middleware: 'admin',
  components: {
    Modal
  },
  computed: {
    entries() {
      return this.$store.state.instructor.entries
    },
  },
  async fetch({store}) {
    await store.dispatch('instructor/fetchEntries')
  },
  methods: {
    openModal(modalId) {
      const modal = this.$refs[`modal-${modalId}`][0]
      modal.openModal()
    },
    activateEntry({ closeModal },entryId) {
       closeModal()
    }
  },
  
}
</script>
<style scoped lang="scss">
  .heroes-page {
    max-width: 1000px;
    margin: 0 auto 5rem auto;
    margin-top: 40px;
  }
  .title {
    font-size: 45px;
    font-weight: bold;
  }
  .table-row {
    margin: 20px;
    &.isActive {
      background-color: #dfffe1
    }
    &:hover {
      cursor: pointer;
      background-color: #e4e4e4;
    }
  }
</style>
