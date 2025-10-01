// stores/favorites.ts
import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore('favorites', {
	state: () => ({
		rocketIds: [] as string[],
		launchIds: [] as string[],
	}),
	actions: {
		// Rockets
		toggleRocket(id: string) {
			if (this.rocketIds.includes(id)) {
				this.rocketIds = this.rocketIds.filter((r) => r !== id)
			} else {
				this.rocketIds.push(id)
			}
		},
		clearRockets() {
			this.rocketIds = []
		},

		// Launches
		toggleLaunch(id: string) {
			if (this.launchIds.includes(id)) {
				this.launchIds = this.launchIds.filter((l) => l !== id)
			} else {
				this.launchIds.push(id)
			}
		},
		clearLaunches() {
			this.launchIds = []
		},
	},
})
