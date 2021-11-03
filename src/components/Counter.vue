<template>
	<v-container>
		<v-row class="text-center">
			<v-col cols="12">
				<h1 style="margin-top:5em;">contador de personas manual</h1>
				<br>
				<v-btn
					class="mx-4"
					fab
					small
					color="secundary"
					@click="decrement()"
					>
						<v-icon >
							mdi-minus
						</v-icon>
				</v-btn>

				<v-btn
					class="mx-1"
					fab
					dark
					color="primary"
					small
					@click="increment()"
					>
						<v-icon>
							mdi-plus
						</v-icon>
					</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: 'Counter',
	created () {
		this.$store.dispatch('live')
	},
	data: () => ({
		
	}),
	methods: mapActions([
		'increment',
		'decrement',
	]),
}
  </script>
