<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-white">
    <div class="flex items-center justify-center h-screen px-4">
        <div class="bg-white shadow-lg rounded-2xl w-full max-w-lg p-8">
            <div class="text-center">
                <h1 class="text-4xl font-extrabold text-gray-800 mb-4">Quiz sur moi</h1>
                <p class="text-gray-600 mb-6">Tu penses que tu me connais bien ? Découvrons-le !</p>
            </div>

            <div class="space-y-4">
                <RouterLink to='/quiz' class="block text-center w-full bg-indigo-600 text-white text-lg font-medium py-3 rounded-md shadow-md hover:bg-indigo-700 focus:ring focus:ring-indigo-300 transition">Démarrer le quiz </RouterLink>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>





</script>