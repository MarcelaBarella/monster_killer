new Vue({
    el: '#app',
    data: {
        running: false,
        playerHealth: 100,
        monsterHealth: 100,
    },
    computed: {
        hasResult() {
            return this.playerHealth === 0 || this.monsterHealth === 0
        }
    },
    methods: {
        startGame() {
            this.running = true
            this.playerHealth = 100
            this.monsterHealth = 100
        },
        attack(ult) {
            this.damage('monsterHealth', 5, 10, ult)
            this.damage('playerHealth', 7, 12, false)
        },
        damage(atr, min, max, ult){
            const plus = ult ? 5 : 0
            const damage = this.getRandom(min + plus, max + plus)
            this[atr] = Math.max(this[atr] - damage, 0)
        },
        heal(min, max) {
            const heal = this.getRandom(min, max)
            this.playerHealth = Math.min(this.playerHealth + heal, 100)
        },
        healAndDamage() {
            this.heal(10, 15)
            this.damage('playerHealth', 7, 12, false)
        },
        getRandom(min, max) {
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        }
    },
    watch: {
        hasResult(value) {
            if (value) this.running = false
        }
    }
})