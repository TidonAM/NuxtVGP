import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export default defineNuxtRouteMiddleware((to, _from) => {
	const router = useRouter()

	// Check if the route exists in the router
	const routeExists = router.getRoutes().some((r) => r.path === to.path)

	if (!routeExists) {
		return navigateTo('/launches')
	}
})
