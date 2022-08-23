<template>
	<div class="products">
		<div class="products__sort" v-show="products.length > 0">
			<button class="products__add" @click="showMediaForm">Добавить товар</button>
			<SortButton />
		</div>

		<section 
			class="products__list" 
			v-if="products.length > 0" 
			v-masonry="'products'"
			transition-duration="0.7s"
			column-width=".products__item"
			item-selector=".products__item"
			stagger="0.03s"
			gutter="16"
		>
			<ProductItem
				v-for="product in products"
				:key="product.id"
				:product="product"
				v-masonry-tile
				class="products__item"
			/>

		</section>

		<div class="products__empty" v-else>
			<h3 class="products__empty-title">Добавьте свой первый товар!</h3>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import SortButton from "@/components/SortButton/SortButton";

export default {
    components: { SortButton },

		data() {
			return {
				sortedProducts: this.products
			}
		},

		methods: {
			...mapActions({
				showMediaForm: 'data/mediaForm'
			})
		},

		computed: {
			...mapGetters({
				products: "data/getSortedProducts"
			}),
		},

		watch: {
			products: {
				handler: function() {
					setTimeout(() => {
						this.$redrawVueMasonry('products')
					}, 100)
				},
				deep: true			
			}
		}
}
</script>

<style lang="scss" scoped>
@import './ProductsList.scss';
</style>