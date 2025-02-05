import { defineStore } from 'pinia';

export const useAnswerStore = defineStore('answerStore', {
    state: () => ({
        userAnswers: []
    }),
    getters: {
        allAnswers: (state) => state.userAnswers
    },
    actions: {
        addAnswer(answer) {
            this.userAnswers.push(answer);
        }
    }
});
