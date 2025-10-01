const queryGetLaunches = gql`
	query getLaunches {
		launches {
			id
			mission_name
			launch_date_utc
			launch_site {
				site_name_long
			}
			rocket {
				rocket_name
			}
			details
		}
	}
`

type Launch = {
	id: string
	mission_name: string
	launch_date_utc: string
	launch_site: {
		site_name_long: string
	}
	rocket: {
		rocket_id: string
		rocket_name: string
	}
	details: string
}

type GetLaunchesResult = {
	launches: Launch[]
}

export function useLaunches() {
	const { data, pending, error } = useAsyncQuery<GetLaunchesResult>(queryGetLaunches)
	const launches = computed(() => data.value?.launches || [])
	return { launches, pending, error }
}
