<template>
	<v-btn color="primary" @click="$emit('toggle')">
		<v-icon>{{ active ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
	</v-btn>
</template>

<script setup lang="ts">
defineProps<{ active: boolean }>()
defineEmits<{ toggle: [] }>()
</script>
