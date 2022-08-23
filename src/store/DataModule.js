import products from './products.json'

const localstore = localStorage.getItem('products')

export const DataModule = {
	state: () => ({
		allProducts: localstore ? JSON.parse(localstore) : products,
		category: 'По умолчанию',
		showMediaForm: false
	}),

	getters: {
		getAllProducts(state) {
			return state.allProducts
		},

		getSelectedCategory(state) {
			return state.category
		},

		getSortedProducts(state) {
			switch (state.category) {
				case 'По умолчанию':
					return state.allProducts

				case 'По возрастанию':
					return state.allProducts.slice().sort((a, b) => {
						return Number(a.price.replace(/ /g, '')) - Number(b.price.replace(/ /g, ''))
					})

				case 'По убыванию':
					return state.allProducts.slice().sort((a, b) => {
						return Number(b.price.replace(/ /g, '')) - Number(a.price.replace(/ /g, ''))
					})

				case 'По наименованию':
					return state.allProducts.slice().sort((a, b) => {
						return a.name.localeCompare(b.name)
					})
			}
		},

		getShowMediaForm(state) {
			return state.showMediaForm
		}
	},

	mutations: {
		setAllProducts(state, data) {
			state.allProducts = data
			localStorage.setItem('products', JSON.stringify(data))
		},

		setSelectedCategory(state, category) {
			state.category = category
		},

		setShowMediaForm(state) {
			state.showMediaForm = !state.showMediaForm
		}
	},

	actions: {
		deleteProduct({ state, commit }, id) {
			let products = state.allProducts.filter((product) => product.id !== id)

			commit('setAllProducts', products)
		},

		addProduct({ state, commit }, product) {
			let products = [...state.allProducts, product]

			commit('setAllProducts', products)
			commit('setShowMediaForm')
		},

		sortMin({ commit }) {
			commit('setSelectedCategory', 'По возрастанию')
		},

		sortMax({ commit }) {
			commit('setSelectedCategory', 'По убыванию')
		},

		sortName({ commit }) {
			commit('setSelectedCategory', 'По наименованию')
		},

		sortDefault({ commit }) {
			commit('setSelectedCategory', 'По умолчанию')
		},

		mediaForm({ commit }) {
			commit('setShowMediaForm')
		}
	},

	namespaced: true
}