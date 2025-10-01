<script setup lang="ts">
const favorites = useFavoritesStore()

const { rockets, pending: rocketsPending, error: rocketsError } = useRockets()
const { launches, pending: launchesPending, error: launchesError } = useLaunches()

const tab = ref<'rockets' | 'launches'>('rockets')

const favoriteRockets = computed(() => rockets.value.filter((r) => favorites.rocketIds.includes(r.id)))

const favoriteLaunches = computed(() => launches.value.filter((l) => favorites.launchIds.includes(l.id)))

const toggleRocketFavorite = (id: string) => favorites.toggleRocket(id)
const toggleLaunchFavorite = (id: string) => favorites.toggleLaunch(id)
</script>

<template>
	<v-container>
		<v-container>
			<h2>Favorites</h2>
		</v-container>

		<v-tabs v-model="tab">
			<v-tab value="rockets"><h3>Rockets</h3></v-tab>
			<v-tab value="launches"><h3>Launches</h3></v-tab>
		</v-tabs>

		<v-window v-model="tab" class="mt-4">
			<!-- Rockets -->
			<v-window-item value="rockets">
				<v-col v-if="rocketsPending">
					<v-progress-linear indeterminate color="primary" />
				</v-col>
				<v-col v-else-if="rocketsError">
					<v-alert type="error" title="Error">
						{{ rocketsError.message }}
					</v-alert>
				</v-col>
				<template v-else>
					<v-btn color="error" class="mb-4" @click="favorites.clearRockets">
						Clear Rocket Favorites
					</v-btn>
					<RocketTable
						:rockets="favoriteRockets"
						:rocketFavorites="favorites.rocketIds"
						:toggleRocket="toggleRocketFavorite"
						emptyText="No favorite rockets yet. Go add some!"
					/>
				</template>
			</v-window-item>

			<!-- Launches -->
			<v-window-item value="launches">
				<v-col v-if="launchesPending">
					<v-progress-linear indeterminate color="primary" />
				</v-col>
				<v-col v-else-if="launchesError">
					<v-alert type="error" title="Error">
						{{ launchesError.message }}
					</v-alert>
				</v-col>
				<template v-else>
					<v-btn color="error" class="mb-4" @click="favorites.clearLaunches">
						Clear Launch Favorites
					</v-btn>
					<LaunchTable
						:launches="favoriteLaunches"
						:launchFavorites="favorites.launchIds"
						:toggleLaunch="toggleLaunchFavorite"
						emptyText="No favorite launches yet. Go add some!"
					/>
				</template>
			</v-window-item>
		</v-window>
	</v-container>
</template>
