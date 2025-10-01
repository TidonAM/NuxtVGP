<script setup lang="ts">
defineProps<{
	rockets: any[]
	rocketFavorites?: string[]
	emptyText?: string
	toggleRocket?: (id: string) => void
}>()
</script>

<template>
	<v-table striped="even" fixed-header height="600px">
		<thead>
			<tr>
				<th>Name</th>
				<th>Description</th>
				<th>First Flight</th>
				<th>Height</th>
				<th>Diameter</th>
				<th>Mass</th>
				<th>Stages</th>
				<th>Favorite</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="rocket in rockets" :key="rocket.id">
				<td class="text-no-wrap">{{ rocket.name }}</td>
				<td>{{ rocket.description }}</td>
				<td class="text-no-wrap">
					{{
						new Date(rocket.first_flight).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'short',
							day: '2-digit',
						})
					}}
				</td>
				<td class="text-no-wrap">{{ rocket.height.meters }} m</td>
				<td class="text-no-wrap">{{ rocket.diameter.meters }} m</td>
				<td class="text-no-wrap">
					{{ rocket.mass?.kg ? `${(rocket.mass.kg / 1000).toFixed(1)} tonnes` : '—' }}
				</td>
				<td>{{ rocket.stages }}</td>
				<td>
					<FavoriteButton
						v-if="rocket.id"
						:active="rocketFavorites?.includes(rocket.id) ?? false"
						@toggle="toggleRocket && toggleRocket(rocket.id)"
					/>
				</td>
			</tr>
			<tr v-if="rockets.length === 0">
				<td colspan="8" class="text-center text-medium-emphasis">{{ emptyText }}</td>
			</tr>
		</tbody>
	</v-table>
</template>
