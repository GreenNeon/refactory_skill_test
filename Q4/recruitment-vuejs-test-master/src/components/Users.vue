<template>
	<div class="main">
		<div class="main-title">{{ msg }}</div>
		<div class="user-count">
			<div class="count">{{ count }}</div>
			<div> Users</div>
		</div>
		<div class="wrapper">
			<div v-for="user in users" :key="user.name" class="card">
				<div class="body-card">
					<div class="title">Name</div>
					<div class="name">{{ user.name }}</div>
					<div class="wrapper-card">
						<div>
							<div class="title">Email</div>
							<div class="email">{{ user.email }}</div>
						</div>
						<div>
							<div class="title">Phone</div>
							<div class="phone">{{ user.phone }}</div>
						</div>
						<div>
							<div class="title">Website</div>
							<div class="website">{{ user.website }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
// import { SET_DATA } from "../mutation-types";

export default {
	name: "Users",
	props: {
		msg: String,
	},
	computed: {
		...mapGetters({
			// map `this.doneCount` to `this.$store.getters.doneTodosCount`
			count: "getCountData",
			users: "getData",
		}),
	},
	mounted() {
		axios
			.get("https://jsonplaceholder.typicode.com/users")
			.then((response) => {
				this.setData(response.data);
			})
			.catch(() => (this.loading = false));
	},
	methods: {
		setData(data) {
			this.$store.dispatch("setDatas", data);
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
	background-color: #f5f7fa;
	padding: 20px;
}
.main-title {
	font-size: 1.4rem;
	font-weight: 600;
}
.count {
	color: #83dd8b;
	font-weight: 800;
	margin-right: 10px;
}
.user-count {
	border-bottom: 1px solid #e1e1e7;
	color: #646464;
	display: flex;
	align-items: center;
}
.card {
	margin: 0.8rem 0.8rem;
	padding: 2rem 1rem 1rem 1rem;
	background: white;
	border-bottom: 1px solid #e1e1e7;
	color: #646464;
	display: flex;
	width: 45%;
	border-radius: 5px;
}
.wrapper {
	display: flex;
	flex-wrap: wrap;
	max-width: 100vw;
}

.body-card {
	width: 100%;
}
.wrapper-card {
	display: flex;
	justify-content: space-between;
}

.title {
	font-size: 0.7rem;
	color: rgba(128, 128, 128, 0.315);
	margin: 0.3rem 0;
}
.name {
	font-weight: 700;
}
.email,
.phone,
.website {
	font-weight: 600;
	font-size: 0.9rem;
}
.website {
	color: rgb(133, 255, 144);
}
</style>
