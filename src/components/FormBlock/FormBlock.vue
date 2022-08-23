<template>
	<div :class="['form-block', {
		'form-block--mobile': showMediaForm
	}]">
		<h3 class="form-block__title">Добавление товара</h3>
		<form action="add-product" class="form" @submit.prevent="submitForm">
			<img 
				src="@/assets/svg/cross.svg" 
				alt="close" 
				class="form__close" 
				@click="closeMediaForm"
			/>
			<h3 class="form__title">Добавление товара</h3>
			<fieldset 
				:class="{
					'form--error': v$.product.name.$invalid && v$.$dirty,
					'form--success': !v$.product.name.$invalid && v$.$dirty,
        }"
			>
				<label for="name" class="form__label">
					<p class="form__label-title">Наименование товара</p>
					<span class="form__label-required"></span>
				</label>
				<input 
					type="text" 
					name="name" 
					id="name" 
					placeholder="Введите наименование товара" 
					class="form__input"
					v-model.trim="product.name"
				/>
				<span class="form__hint">Поле является обязательным</span>
			</fieldset>

			<fieldset
				:class="{
					'form--success': product.desc
        }"
			>
				<label for="desc" class="form__label">
					<p class="form__label-title">Описание товара</p>
				</label>
				<textarea 
					type="text" 
					name="desc" 
					id="desc" 
					placeholder="Введите описание товара" 
					class="form__input form__textarea"
					v-model.trim="product.desc"
				></textarea>
			</fieldset>

			<fieldset
				:class="{
					'form--error': v$.product.img.$invalid && v$.$dirty,
					'form--success': !v$.product.img.$invalid && v$.$dirty,
        }"
			>
				<label for="src" class="form__label">
					<p class="form__label-title">Ссылка на изображение товара</p>
					<span class="form__label-required"></span>
				</label>
				<input 
					type="text" 
					name="src" 
					id="src" 
					placeholder="Введите ссылку" 
					class="form__input"
					v-model.trim="product.img"
				/>
				<span class="form__hint">Поле является обязательным</span>
			</fieldset>

			<fieldset
				:class="{
					'form--error': v$.product.price.$invalid && v$.$dirty,
					'form--success': !v$.product.price.$invalid && v$.$dirty,
        }"
			>
				<label for="price" class="form__label">
					<p class="form__label-title">Цена товара</p>
					<span class="form__label-required"></span>
				</label>
				<input 
					type="text" 
					name="price" 
					id="price" 
					placeholder="Введите цену" 
					class="form__input"
					v-mask="[
						'####', 
						'# ###',
						'## ###',
						'### ####',
						'# ### ###'
					]"
					v-model="product.price"
				/>
				<span class="form__hint">Поле является обязательным</span>
			</fieldset>

			<ButtonUI :disabled="!validForm">Добавить товар</ButtonUI>
		</form>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { mask } from 'vue-the-mask'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'

export default {
	setup() {
    return { v$: useVuelidate() }
  },
	
	data() {
		return {
			product: {
				name: null,
				desc: null,
				img: null,
				price: null,
			}
		}
	},

	validations() {
    return {
      product: {
        name: { required, $lazy: true },
        img: { required, $lazy: true },
        price: { required, $lazy: true },
      }
    }
  },

	methods: {
		...mapActions({
      addProduct: 'data/addProduct',
			closeMediaForm: 'data/mediaForm'
    }),

		async submitForm() {
      const isFormCorrect = await this.v$.$validate()
 
      if (isFormCorrect) {
				this.product.id = Math.random().toString(20).substr(2, 6)
        this.addProduct(this.product)

				this.product = {
					name: null,
					desc: null,
					img: null,
					price: null,
				}

				this.v$.$reset()
      } else {
        this.disabled = true
      }
    }
	},	

	computed: {
		...mapGetters({
			showMediaForm: 'data/getShowMediaForm'
		}),	

		validForm() {
			let product = this.product
			
			return product.name && product.img && product.price
		},
	},

	directives: { mask },
}
</script>

<style lang="scss" scoped>
@import './FormBlock.scss';
</style>