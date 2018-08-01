<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Rick and Morty">
        </ActionBar>

        <StackLayout class="hello-world">
            <StackLayout orientation="horizontal" height="10%">
                <SearchBar v-model="filters.name" :text="listOfNames" hint="Select name..."/>
            </StackLayout>
            <StackLayout orientation="horizontal" height="50" width="100%">
                <Button class="k-primary" @tap="getCharacters">Search</Button>
                <Button v-if="response.info.prev" @tap="getPrev"> Prev</Button>
                <Button v-if="response.info.next" @tap="getNext"> Next</Button>
            </StackLayout>
            <StackLayout orientation="horizontal" height="30%">
            </StackLayout>
            <ScrollView orientation="horizontal" height="50%">
                <StackLayout orientation="horizontal">
                    <StackLayout v-for="(item, index) in response.results" :key="index">
                        <Image :src="item.image" height="80%"/>
                    </StackLayout>
                </StackLayout>
            </ScrollView>
        </StackLayout>
    </Page>
</template>

<script>
  import api from '../api'

  export default {
    data () {
      return {
        listOfNames: [],

        filters: {
          name: ''
        },

        response: {
          info: {
            next: '',
            prev: ''
          }
        }
      }
    },

    created () {
      this.getCharacters()
    },

    methods: {
      getCharacters (url) {
        const apiCall = url && typeof url === 'string'
          ? api.getCharactersByUrl(url)
          : api.getCharactersByName(this.filters.name)

        return apiCall
            .then(res => (this.response = res))
            .catch(err => alert({ message: 'Something went wrong!', okButtonText: 'Close' }))
      },

      getNext () {
        if (!this.response.info.next) { return }
        return this.getCharacters(this.response.info.next)
      },

      getPrev () {
        if (!this.response.info.prev) { return }
        return this.getCharacters(this.response.info.prev)
      }
    }
  }
</script>

<style scoped>
    .hello-world {
        margin: 20;
    }

    Label {
        color: red;
    }
</style>
