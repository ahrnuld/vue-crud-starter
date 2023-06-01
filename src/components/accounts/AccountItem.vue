<template>
    <div class="table-responsive">
        <table class="table table-striped">
            <thead class="text-center">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">IBAN</th>
                    <th scope="col">Account Type</th>
                    <th scope="col">Transaction Limit</th>
                    <th scope="col">Day Limit</th>
                    <th scope="col">Balance</th>
                    <th scope="col">Status</th>
                    <th></th>
                </tr>
            </thead>

            <tbody class="text-center">
                <tr>
                    <td>{{ account.id }}</td>
                    <td>{{ account.IBAN }}</td>
                    <td>{{ account.account_type }}</td>
                    <td>0</td>
                    <td>0</td>
                    <td>{{ account.balance }}</td>
                    <td>{{ account.isActive }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    name: 'AccountItem',
    props: {
        account: Object,
    },
    methods: {
    },
};
</script>