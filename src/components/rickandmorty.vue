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
                <Button v-if="!(ApiResponse.info.prev === '')" @tap="apiCall(ApiResponse.info.prev)"> Prev</Button>
                <Button v-if="!(ApiResponse.info.next === '')" @tap="apiCall(ApiResponse.info.next)"> Next</Button>
            </StackLayout>
            <StackLayout orientation="horizontal" height="30%">
            </StackLayout>
            <ScrollView orientation="horizontal" height="50%">
                <StackLayout orientation="horizontal">
                    <StackLayout v-for="(item, index) in ApiResponse.results" :key="index">
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

        ApiResponse: {
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
      getCharacters () {
        return api.getCharacters(this.filters.name)
          .then(res => {
            this.ApiResponse = res
            console.log(res)
          })
          .catch(e => { console.log('\n\n\n', e.data, '\n\n\n') })
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
