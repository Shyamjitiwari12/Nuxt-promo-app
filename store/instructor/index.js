

export const state = () => ({
  heroes: [],
  entries: []
})

export const actions = {
  fetchHeroes({state, commit}) {
    return this.$axios.$get('/api/v1/product-heroes')
      .then(heroes => {
        commit('setHeroes', heroes)
        return state.heroes
      })
  },
  activateHero({commit}, heroId) {
    return this.$axios.$patch(`/api/v1/product-heroes/${heroId}`)
      .then(activeHero => {
        commit('hero/setHero', activeHero, {root: true})
        return activeHero
      })
      .catch(error => Promise.reject(error))
  },
  fetchEntries({state, commit}) {
    return this.$axios.$get('https://cdn.contentful.com/spaces/cfexampleapi/entries?access_token=b4c0n73n7fu1',{ 'Authorization' : 'Bearer b4c0n73n7fu1', 'Content-Type' : 'application/json'})
      .then(entries => {
        commit('setEntries', entries.items)
        return state.entries
      })
  },
}

export const mutations = {
  setHeroes(state, heroes) {
    state.heroes = heroes
  },
  setEntries(state, entries) {
    state.entries = entries
  }
}
