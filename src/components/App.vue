<template>
    <Page class="page">
        <ActionBar class="action-bar" title="Rick and Morty">
        </ActionBar>

        <FlexboxLayout flexDirection="column" justifyContent="space-between">
            <StackLayout orientation="horizontal" height="10%">
                <SearchBar v-model="filters.name" @submit="getCharacters" :text="listOfNames" hint="Type a name..."/>
            </StackLayout>

            <StackLayout orientation="vertical" height="5%">
            </StackLayout>

            <FlexboxLayout alignConent="center" justifyContent="center" class="status" v-show="isLoading" height="70%">
              <Label text="..." class="blinker" />
            </FlexboxLayout>

            <ScrollView orientation="vertical" height="70%">
                <StackLayout orientation="vertical" v-show="!isLoading">
                    <StackLayout class="response" v-for="(item, index) in response.results" :key="index">
                        <Image :src="item.image" height="80%"/>
                        <Label :text="item.name"></Label>
                    </StackLayout>
                </StackLayout>
            </ScrollView>

            <StackLayout height="10%">
            </StackLayout>

            <FlexboxLayout justifyContent="center" v-show="!isLoading">
                <Button v-show="response.info.prev" @tap="getPrev">Prev</Button>
                <Button v-show="response.info.next" @tap="getNext">Next</Button>
            </FlexboxLayout>

            <StackLayout height="5%">
            </StackLayout>
        </FlexboxLayout>
    </Page>
</template>

<script>
  import api from '../api'

  export default {
    data () {
      return {
        listOfNames: [],
        isLoading: false,

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
        this.isLoading = true
        const apiCall = url && typeof url === 'string'
          ? api.getCharactersByUrl(url)
          : api.getCharactersByName(this.filters.name)

        return apiCall
            .then(res => {
              this.response = res
              this.isLoading = false
            })
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

<style lang="scss" scoped>
  .response {
    margin-bottom: 30px;
    text-align: center;
    padding: 40px;
  }

  .status {
    text-align: center;
    font-size: 40px;
    Label {
      color: tomato;
    }
  }

  .blink {
    animation: blinker 1s linear infinite;
  }

  @keyframes blinker {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  Label {
    color: #3d3d3d;
    font-weight: bold;
  }

  Button {
    padding: 10px;
    margin-left: 10px;
    width: 100px;
  }
</style>
