<template>
	<div class="sort">
		<a href="#" class="sort__title" @click="changeModal">
			<p>{{ selectedCategory }}</p>
			<img src="@/assets/svg/arrow.svg" alt="arrow">
		</a>

		<section class="sort__list">
			<ul>
				<a 
					href="#"
					@click="sortDefault" 
					v-show="selectedCategory !== 'По умолчанию'"
				><li>По умолчанию</li></a>
				<a 
					href="#"
					@click="sortMin"
					v-show="selectedCategory !== 'По возрастанию'"
				><li>По возрастанию</li></a>
				<a 
					href="#"
					@click="sortMax" 
					v-show="selectedCategory !== 'По убыванию'"
				><li>По убыванию</li></a>
				<a 
					href="#"
					@click="sortName" 
					v-show="selectedCategory !== 'По наименованию'"
				><li>По наименованию</li></a>
			</ul>
		</section>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	methods: {
		changeModal() {
			this.showModal = !this.showModal
		},

		selectCategory() {
			this.showModal = !this.showModal
		},

		...mapActions({
			sortMin: 'data/sortMin',
			sortMax: 'data/sortMax',
			sortName: 'data/sortName',
			sortDefault: 'data/sortDefault'
		})
	},

	computed: {
		...mapGetters({
			selectedCategory: 'data/getSelectedCategory'
		})
	}

}
</script>

<style lang="scss" scoped>
@import './SortButton.scss';
</style>