<template>
  <div :class="['product-item', {
    'product-item--deleting': deleting
  }]">
    <div class="product-item__delete" @click="deleteProductFun">
      <img src="@/assets/svg/delete.svg" alt="delete" />
    </div>
    <div class="product-item__img" v-lazy-container="{ selector: 'img'}">
      <img 
        :data-src="product.img" 
        data-loading="https://i.pinimg.com/originals/1f/2d/f8/1f2df8fad7e9bfcb18d9d553f8fc259b.gif"
        data-error="https://ds-blobs-1.cdn.devapps.ru/12230530.png"
        alt="product" 
      />
    </div>

    <div class="product-item__info">
      <div class="product-item__info-general">
        <h4 class="product-item__title">{{ product.name }}</h4>
        <p class="product-item__desc" v-if="product.desc">{{ product.desc }}</p>
        <p class="product-item__desc" v-else>Описание отсутсвует</p>
      </div>
      <p class="product-item__price">{{ product.price }} руб.</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    product: {
      type: Object,
      required: false,
    }
  },

  data() {
    return {
      deleting: false,
    }
  },

  methods: {
    ...mapActions({
      deleteProduct: 'data/deleteProduct'
    }),

    deleteProductFun() {
      this.deleting = true

      setTimeout(() => {
        this.deleteProduct(this.product.id)
      }, 550)
    }
  },

  name: 'ProductItem'
}
</script>

<style lang="scss" scoped>
@import './ProductItem.scss';
</style>