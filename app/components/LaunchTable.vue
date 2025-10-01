<script setup lang="ts">
defineProps<{
	launches: any[]
	emptyText?: string
	launchFavorites?: string[]
	toggleLaunch?: (id: string) => void
}>()
</script>

<template>
	<v-table striped="even" fixed-header height="600px" theme="bg-surface">
		<thead>
			<tr>
				<th class="text-no-wrap">Mission Name</th>
				<th class="text-no-wrap">Rocket Name</th>
				<th class="text-no-wrap">Launch Site</th>
				<th>Launch Date</th>
				<th>Details</th>
				<th v-if="toggleLaunch">Favorite</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="launch in launches" :key="launch.id">
				<td>{{ launch.mission_name }}</td>
				<td class="text-no-wrap">
					{{ launch.rocket?.rocket_name || 'No rocket info' }}
				</td>

				<td v-if="launch.launch_site?.site_name_long" class="text-no-wrap">
					{{ launch.launch_site?.site_name_long }}
				</td>
				<td v-else class="text-medium-emphasis">—</td>

				<td class="text-no-wrap">
					{{
						(() => {
							const d = new Date(launch.launch_date_utc)
							const year = d.getFullYear()
							const month = d.toLocaleString('en-US', { month: 'short' })
							const day = String(d.getDate()).padStart(2, '0')
							return `${year} ${month} ${day}`
						})()
					}}
				</td>

				<td v-if="launch.details">{{ launch.details }}</td>
				<td v-else class="text-medium-emphasis">—</td>

				<td v-if="toggleLaunch">
					<FavoriteButton
						:active="launchFavorites?.includes(launch.id) ?? false"
						@toggle="toggleLaunch(launch.id)"
					/>
				</td>
			</tr>

			<tr v-if="launches.length === 0">
				<td :colspan="toggleLaunch ? 6 : 5" class="text-center text-medium-emphasis">
					{{ emptyText }}
				</td>
			</tr>
		</tbody>
	</v-table>
</template>
