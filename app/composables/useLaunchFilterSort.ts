import { computed, ref, type Ref } from 'vue'

export type SortOrder = 'asc' | 'desc'

export function useLaunchesFilterSort(launches: Ref<any[]>) {
	const selectedYears = ref<string[]>([])
	const sortOrder = ref<SortOrder>('asc')

	const availableYears = computed(() => {
		const years = launches.value.map((l) => new Date(l.launch_date_utc).getFullYear().toString())
		return [...new Set(years)].sort((a, b) => Number(b) - Number(a))
	})

	const filteredAndSortedLaunches = computed(() => {
		let result = launches.value

		// filter
		if (selectedYears.value.length) {
			result = result.filter((l) =>
				selectedYears.value.includes(new Date(l.launch_date_utc).getFullYear().toString()),
			)
		}

		// sort
		result = [...result].sort((a, b) => {
			const dateA = new Date(a.launch_date_utc).getTime()
			const dateB = new Date(b.launch_date_utc).getTime()
			return sortOrder.value === 'asc' ? dateA - dateB : dateB - dateA
		})

		return result
	})

	return {
		selectedYears,
		sortOrder,
		availableYears,
		filteredAndSortedLaunches,
	}
}
