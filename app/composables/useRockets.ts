const queryGetRockets = gql`
	query getRockets {
		rockets {
			id
			name
			description
			first_flight
			height {
				meters
				feet
			}
			diameter {
				meters
				feet
			}
			mass {
				kg
				lb
			}
			stages
		}
	}
`

type Rocket = {
	id: string
	name: string
	description: string
	first_flight: string
	height: {
		meters: number | null
		feet: number | null
	}
	diameter: {
		meters: number | null
		feet: number | null
	}
	mass: {
		kg: number | null
		lb: number | null
	}
	stages: number
}

type GetRocketsResult = {
	rockets: Rocket[]
}

export function useRockets() {
	const { data, pending, error } = useAsyncQuery<GetRocketsResult>(queryGetRockets)
	const rockets = computed(() => data.value?.rockets || [])
	return { rockets, pending, error }
}
