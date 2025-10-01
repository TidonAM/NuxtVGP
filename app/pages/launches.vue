<script lang="ts" setup>
const { launches, pending, error } = useLaunches()
const favorites = useFavoritesStore()
const toggleLaunch = (id: string) => {
	favorites.toggleLaunch(id)
}
const { selectedYears, sortOrder, availableYears, filteredAndSortedLaunches } =
	useLaunchesFilterSort(launches)
</script>
<template>
	<v-container>
		<v-container>
			<h2>SpaceX Launches</h2>
		</v-container>

		<!-- Filter Sort -->
		<v-row>
			<v-col cols="12" md="3">
				<v-combobox
					v-model="selectedYears"
					:items="availableYears"
					label="Filter by Year"
					multiple
					chips
					clearable
				/>

				<v-select
					v-model="sortOrder"
					:items="[
						{ title: 'Oldest First', value: 'asc' },
						{ title: 'Newest First', value: 'desc' },
					]"
					label="Sort by Launch Date"
					id="sort-launch-date"
				/>
			</v-col>

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

			<v-col v-else cols="12" md="9">
				<LaunchTable
					:launches="filteredAndSortedLaunches"
					:launchFavorites="favorites.launchIds"
					:toggleLaunch="toggleLaunch"
					emptyText="No favorite launches yet. Go add some!"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>
