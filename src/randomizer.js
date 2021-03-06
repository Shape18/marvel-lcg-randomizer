import {shuffleArray} from "@/helpers";

export default class Randomizer {
    randomizeScenario(scenarios, availableModules, defaultDifficulties, {additionalModules = 0 } = { additionalModules: 0}){
        const scenario = shuffleArray(scenarios).shift();
        const encounterDecks = scenario.decks || [{name: "encounter"}];

        const shuffledModules = shuffleArray(availableModules);
        const modules = encounterDecks.map((deck) => {
            const numberOfModules = (deck.minModules !== undefined ? deck.minModules : 1 ) + additionalModules;
            return {deck, modules: shuffledModules.splice(0, numberOfModules)};
        });

        const difficulties = scenario.difficulties || defaultDifficulties;
        const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];

        return {
            scenario,
            modules,
            difficulty,
        };
    }

    randomizeHeroes(availableHeroes, availableAspects){
        const heroes = shuffleArray(availableHeroes);
        const aspects = shuffleArray(availableAspects);
        return Array.from({length: Math.min(4, heroes.length)}, (n, i) => ({hero: heroes[i], aspect: aspects[i]}));
    }
}
