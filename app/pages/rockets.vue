<script lang="ts" setup>
const { rockets, pending, error } = useRockets()
const favorites = useFavoritesStore()
const toggleRocket = (id: string) => {
	favorites.toggleRocket(id)
}
</script>
<template>
	<v-container>
		<v-container><h2>SpaceX Rockets</h2></v-container>
		<v-row>
			<v-col v-if="pending">
				<v-col cols="12">
					<v-progress-linear indeterminate color="primary"></v-progress-linear>
				</v-col>
			</v-col>
			<v-col v-else-if="error">
				<v-col cols="12">
					<v-alert type="error" title="Error">
						{{ error.message }}
					</v-alert>
				</v-col>
			</v-col>
			<v-col v-else>
				<!-- <v-table striped="even" fixed-header height="600px" theme="bg-surface">
					<thead>
						<tr>
							<th class="text-no-wrap">Rocket Name</th>
							<th class="text-no-wrap">Description</th>
							<th class="text-no-wrap">First Flight Date</th>
							<th class="text-no-wrap">Height</th>
							<th class="text-no-wrap">Diameter</th>
							<th class="text-no-wrap">Mass</th>
							<th class="text-no-wrap">Stages</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="rocket in rockets" :key="rocket.id">
							<td>{{ rocket.name }}</td>
							<td>{{ rocket.description }}</td>
							<td class="text-no-wrap">
								{{
									(() => {
										const d = new Date(rocket.first_flight)
										const year = d.getFullYear()
										const month = d.toLocaleString('en-US', { month: 'short' })
										const day = String(d.getDate()).padStart(2, '0')
										return `${year} ${month} ${day}`
									})()
								}}
							</td>
							<td class="text-no-wrap">{{ rocket.height.meters }} m</td>
							<td class="text-no-wrap">{{ rocket.diameter.meters }} m</td>
							<td class="text-no-wrap">
								{{ rocket.mass?.kg ? `${(rocket.mass.kg / 1000).toFixed(1)} tonnes` : '—' }}
							</td>
							<td>{{ rocket.stages }}</td>
							<td>
								<v-btn color="primary" icon @click="toggleFavorite(rocket.id)">
									<v-icon>
										{{
											favorites.rocketIds.includes(rocket.id)
												? 'mdi-heart'
												: 'mdi-heart-outline'
										}}
									</v-icon>
								</v-btn>
							</td>
						</tr>
					</tbody>
				</v-table> -->
				<RocketTable
					:rockets="rockets"
					:rocketFavorites="favorites.rocketIds"
					:toggleRocket="toggleRocket"
					emptyText="No rockets available."
				/>
			</v-col>
		</v-row>
	</v-container>
</template>
