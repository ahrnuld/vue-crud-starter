<template>
  <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xxl-3 p-2">
    <div class="card product-card h-100">
      <div class="card-body">
        <img :src="product.image" :alt="product.title" :title="product.title" />
        <div class="float-start">
          <p>{{ product.name }}</p>
          <p>
            <small>{{ product.category.name }}</small>
          </p>
        </div>
        <span class="price float-end">{{ product.price }}</span>
      </div>
      <div class="card-footer">
        <button class="btn btn-warning" @click="editProduct(product.id)">
          Edit</button
        >&nbsp;&nbsp;
        <button class="btn btn-danger" @click="deleteProduct(product.id)">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductListItem",
  props: {
    product: Object,
  },
  methods: {
    deleteProduct(id) {
      alert("product not deleted: " + id);
      // use axios to delete the product
    },
    editProduct(id) {
      alert("product not edited: " + id);
      // use the router to navigate to the editproduct route and pass the id
    },
  },
};
</script>

<style>
</style>