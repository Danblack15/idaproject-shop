<template>
	<div class="home-page">
		<div class="home-page__content">
			<FormBlock />
			<ProductsList />
		</div>
	</div>
</template>

<script>
import FormBlock from '@/components/FormBlock/FormBlock'
import ProductsList from '@/components/ProductsList/ProductsList'

export default {
	components: {
		FormBlock,
		ProductsList
	}
}	
</script>

<style lang="scss" scoped>
@import './HomePage.scss';
</style>