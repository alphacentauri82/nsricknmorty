<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Rick and Morty">
        </ActionBar>

        <StackLayout class="hello-world">
            <StackLayout orientation="horizontal" height="10%">
                <SearchBar v-model="filters.name" :text="listOfNames" hint="Select name..."/>
            </StackLayout>
            <StackLayout orientation="horizontal" height="50" width="100%">
                <Button class="k-primary" @tap="apiCall()">Search</Button>
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
  const configApi = {
    url: 'https://rickandmortyapi.com/api/'
  }
  const httpModule = require('http')

  export default {
    data () {
      return {
        urlBase: configApi.url,
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
    mounted () {
      this.apiCall()
    },
    methods: {
      apiCall (url = null) {
        let me = this
        let extraUrl = (this.filters.name) ? this.urlBase + 'character/?name=' + this.filters.name : this.urlBase + 'character/'
        let callUrl = (url) ? url : extraUrl
        httpModule.request({
          url: callUrl,
          method: 'GET'
        }).then((response) => {
          me.ApiResponse = response.content.toJSON()
          console.log(me.ApiResponse.info.next)
        }, (e) => {
          console.log(e.data)
        })
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
