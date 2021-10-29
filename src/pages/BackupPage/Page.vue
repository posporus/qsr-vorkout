<template>
  <q-page class="q-pa-md q-gutter-md">
    <q-card>
      <q-card-section class="text-bold">
        Backup
      </q-card-section>
      <q-separator />
      <q-card-section>
        You can save a backup file from all your data (workouts, exercises,
        logs) to your local filesystem. Backup files are saved in your document
        folder.
        <span class="text-warning text-bold">Will overwrite existing filenames!</span>
        <q-input v-model="backupName" label="Backup name" @focus="$event.target.select()">
          <template #after>
            <q-btn icon="save" flat @click="saveBackup" />
          </template>
        </q-input>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section class="text-bold">
        Restore
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-list bordered>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">Available Backups </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn flat icon="refresh" @click="updateBackupList" />
            </q-item-section>
          </q-item>
          <q-separator />
          <template v-for="backupItem in backupList" :key="backupItem">
            <q-item>
              <q-item-section>
                {{ backupItem.split('.')[0] }}
              </q-item-section>
              <q-item-section side>
                
                <q-btn icon="remove_circle" flat dense @click="confirmDelete(backupItem)" />
              </q-item-section>
              <q-item-section side>
                <q-btn icon="restore" flat dense @click="confirmRestore(backupItem)" />
                
              </q-item-section>
            </q-item>
            <q-separator v-if="backupList.length > 1" inset />
          </template>
          <q-item v-if="backupList.length <= 0">
            <q-item-section> no backup found. </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- <q-card>
      <q-card-section>
        Select a backup file (*.json) to restore it. Restart needed to take
        effect.
      </q-card-section>
      <q-card-section>
        <q-file
          v-model="file"
          label="Pick Backup file (*.json)"
          outlined
          @change="restore"
        >
          <template #prepend>
            <q-icon name="attach_file" />
          </template>
          <template #append>
            <q-btn :disable="!file" icon="restore" @click="restore" flat />
          </template>
        </q-file>
      </q-card-section>
    </q-card> -->
  </q-page>
</template>

<script lang="ts">
import { LocalStorage } from 'quasar'
import { defineComponent } from 'vue'
import {
  Filesystem,
  Directory,
  Encoding,
  WriteFileResult,
  ReadFileResult,
} from '@capacitor/filesystem'
//import { QFile } from 'quasar'

export default defineComponent({
  name: 'BackupPage',
  data() {
    return {
      key: 'vorkout',
      file: null as Blob | null,
      backupList: [] as string[],
      backupName_: null as string | null,
    }
  },

  computed: {
    backupName: {
      get() {
        const backupName: string =
          this.backupName_ ||
          this.$dayjs().format('[backup_]DD-MM-YY_HH-mm').toString()

        return backupName
      },
      set(backupName: string) {
        this.backupName_ = backupName
      },
    },
  },

  mounted() {
    this.updateBackupList()
  },

  methods: {
    confirmRestore(filename:string) {
      this.$q.notify({
        message:'Do you really want to restore this backup? It will completely overwrite any current data.',
        color:'warning',
        icon:'warning',
        actions: [
          {
            label:'confirm',
            handler: () => {this.restoreBackup(filename)}
          }
        ]

      })
    },
    confirmDelete(filename:string) {
      this.$q.notify({
        message:'Do you really want to delete this backup?',
        color:'warning',
        icon:'warning',
        actions: [
          {
            label:'confirm',
            handler: () => {this.deleteBackup(filename)}
          }
        ]

      })
    },
    restoreBackup(fileName: string) {
      console.log('restoreBackup', fileName)
      this.readFile(this.key + '/' + fileName)
        .then((result: ReadFileResult) => {
          console.log(result.data)
          localStorage.setItem(this.key, result.data)
          this.$router.go(0)
        })
        .catch(console.error)
    },

    saveBackup() {
      const filename = this.backupName + '.json'
      const backup: string = LocalStorage.getItem('vorkout') || ''
      this.writeFile(backup, this.key + '/' + filename)
        .then((result: WriteFileResult) => {
          this.$q.notify(`Saved backupfile as '${result.uri}'`)
          this.updateBackupList()
        })
        .catch((err) => {
          console.error(err)
          this.$q.notify('There was an error saving the file.')
        })
      /* const blob = new Blob([backup], { type: 'application/json' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = label
      link.click()
      URL.revokeObjectURL(link.href) */
    },

    restore() {
      console.log('restore', this.file)
      if (!this.file) throw new Error('file is null')
      this.loadFileToString(this.file)
        .then((fileString: string) => {
          localStorage.setItem(this.key, fileString)
          console.log('filestring', fileString)
          this.$q.notify('Restored backup.')
        })
        .catch(console.error)
    },

    loadFileToString(file: Blob): Promise<string> {
      return new Promise((resolve, reject) => {
        const fr = new FileReader()
        fr.onload = function (e) {
          resolve(e.target?.result?.toString() || '')
        }
        fr.onerror = function (e) {
          reject(e.target?.error)
        }
        fr.readAsText(file)
      })
    },

    updateBackupList() {
      //console.log(this.listFilesFromDirectory(this.key))
      this.listFilesFromDirectory(this.key)
        .then((result) => {
          this.backupList = result.files
        })
        .catch(console.error)
    },

    deleteBackup(filename:string) {
      this.deleteFile(this.key + '/' + filename).then(result => {
        console.log(result)
        this.updateBackupList()
      }).catch(console.error)
    }
  },

  setup() {
    const listFilesFromDirectory = async (path: string) => {
      return await Filesystem.readdir({
        path: path,
        directory: Directory.Documents,
      })
    }

    const writeFile = async (fileContent: string, path: string) => {
      return await Filesystem.writeFile({
        path: path,
        data: fileContent,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
        recursive: true,
      })
    }

    const readFile = async (path: string) => {
      return await Filesystem.readFile({
        path: path,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      })
    }

    const deleteFile = async (path:string) => {
      return await Filesystem.deleteFile({
        path:path,
        directory: Directory.Documents,
      })
    }
    return {
      listFilesFromDirectory,
      writeFile,
      readFile,
      deleteFile,
    }
  },
})
</script>

<style lang="scss"></style>
