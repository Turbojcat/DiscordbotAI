class CraftingRecipe {
    constructor(id, name, requiredItems, resultItem) {
        this.id = id;
        this.name = name;
        this.requiredItems = requiredItems;
        this.resultItem = resultItem;
    }
}

class CraftingManager {
    constructor() {
        this.recipes = [];
    }

    addRecipe(recipe) {
        this.recipes.push(recipe);
    }

    craftItem(recipeId, inventory) {
        const recipe = this.recipes.find(r => r.id === recipeId);
        if (recipe && recipe.requiredItems.every(item => inventory.includes(item))) {
            inventory.push(recipe.resultItem);
            recipe.requiredItems.forEach(item => {
                const index = inventory.indexOf(item);
                inventory.splice(index, 1);
            });
            console.log(`Crafted ${recipe.resultItem}.`);
            return true;
        }
        return false;
    }
}

module.exports = { CraftingRecipe, CraftingManager };
