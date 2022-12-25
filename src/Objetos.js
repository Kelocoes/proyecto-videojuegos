class Objetos {
    
    constructor () {
        this.flag = true
        this.objetosJugador = [[]]
        this.objetos = [
            [
                {   id: 1,  
                    title: 'Pata`e cabra I',
                    description: 'Pega acuchilladas',
                },
                {   id: 1,  
                    title: 'Pata`e cabra II',
                    description: 'Reduce el tiempo del acuchillado',
                },
                {  
                    id: 1,
                    title: 'Pata`e cabra III',
                    description: 'Aumenta 1 proyectil',
                },
            ],
            [
                {   id: 2,  
                    title: 'Papa Bomba I',
                    description: 'Pega acuchilladas',
                },
                {   id: 2,  
                    title: 'Papa Bomba II',
                    description: 'Reduce el tiempo del acuchillado',
                },
                {  
                    id: 2,
                    title: 'Papa Bomba III',
                    description: 'Aumenta 1 proyectil',
                },
            ],
            [
                {   id: 3,  
                    title: 'Molotov I',
                    description: 'Pega acuchilladas',
                },
                {   id: 3,  
                    title: 'Molotov II',
                    description: 'Reduce el tiempo del acuchillado',
                },
                {  
                    id: 1,
                    title: 'Molotov III',
                    description: 'Aumenta 1 proyectil',
                },
            ],
        ]
    }

    updateObjetosJugador (objeto) {
        
        // Mover objetos a la bolsa del jugador
        for(let i = 0; i < this.objetos.length;i ++) {
            if (this.objetos[i].length !== 0) {
                if (this.objetos[i][0].id === objeto.id) {
                    this.guardarObjetosJugador(this.objetos[i][0])
                    this.objetos[i].shift()
                    if (this.objetos[i].length === 0) {
                        this.objetos.splice(i, 1); // 2nd parameter means remove one item only
                    }
                    break
                }
            }
        }

        if (this.objetosJugador[this.objetosJugador.length - 1].length !== 0 && this.flag) {
            var aux = []
            for(let i = 0; i < this.objetos.length; i++) {
                for(let j = 0; j < this.objetosJugador.length; j++) {
                    if (this.objetos[i].length !== 0 && this.objetosJugador[j].length !== 0) {
                        if (this.objetos[i][0].id === this.objetosJugador[j][0].id) {
                            aux.push(this.objetos[i])
                        }
                    }
                }

            }
            this.flag = false
            this.objetos = aux
        } 

    }

    guardarObjetosJugador(objetoAIngresar){
        for (let j = 0; j < this.objetosJugador.length; j ++) {
            if (this.objetosJugador[j].length === 0 || this.objetosJugador[j][0].id === objetoAIngresar.id) {
                this.objetosJugador[j].push(objetoAIngresar)
            }
        }
    }

}