<template>
    <section>
        <div class="container">
            <h2 class="mt-3 mt-lg-5">Account overview</h2>
        </div>
        <div>
            <h3>This is your personal account info:</h3>
            <br>
            <p>Account number: 123456789</p>
            <p>Account holder: John Doe</p>
            <p>Account balance(total): 1000</p>
            <p>Account balance(saving): 1000</p>
            <p>Account balance(credit): 1000</p>
        </div>
        <div class="row g-2">
            <div class="col-6">
                <div class="form-floating">
                    <input type="number" class="form-control" placeholder="123456789" value="123456789">
                    <label for="floatingInputGrid">Account number</label>
                </div>
            </div>
        </div>
            <button class="btn btn-primary" @click="editAccount(Account.id)">
                Edit</button>*/
    </section>
</template>
  
<script>
export default {
    name: "Account",
};
</script>
  
<style></style>