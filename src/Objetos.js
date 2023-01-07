class Objetos {
    
    constructor () {
        this.flag = true
        this.objetosJugador = [[], []]
        this.objetos = [
            [
                {   id: 1,  
                    name: 'cuchillo',
                    title: 'Pata`e cabra I',
                    description: 'Pega acuchilladas',
                    dano: 25,
                    status: true,
                    velocidad: 400,
                    spawningVel: 300,
                },
                {   id: 1,  
                    name: 'cuchillo',
                    title: 'Pata`e cabra II',
                    description: 'Aumenta dano de acuchillado',
                    dano: 45,
                    status: true,
                    velocidad: 400,
                    spawningVel: 300,
                },
                {  
                    id: 1,
                    name: 'cuchillo',
                    title: 'Pata`e cabra III',
                    description: 'Más achuchilladas',
                    dano: 45,
                    status: true,
                    velocidad: 400,
                    spawningVel: 200,
                },
            ],
            [
                {   id: 2,  
                    name: 'papabomba',
                    title: 'Papa Bomba I',
                    description: 'Lanza papas bomba',
                    dano: 20,
                    status: true,
                    velocidad: 400,
                    spawningVel: 1000,
                },
                {   id: 2,  
                    name: 'papabomba',
                    title: 'Papa Bomba II',
                    description: 'Aumenta el daño',
                    dano: 50,
                    status: true,
                    velocidad: 400,
                    spawningVel: 1000,
                },
                {  
                    id: 2,
                    title: 'Papa Bomba III',
                    description: 'Reduce el tiempo de lanzamiento',
                    name: 'papabomba',
                    dano: 50,
                    status: true,
                    velocidad: 400,
                    spawningVel: 700,
                },
            ],
            [
                {   id: 3,  
                    name: 'molotov',
                    title: 'Molotov I',
                    description: 'Para quemar el pais',
                    dano: 70,
                    status: true,
                    velocidad: 300,
                    spawningVel: 2000,
                },
                {   id: 3,  
                    name: 'molotov',
                    title: 'Molotov II',
                    description: 'Reduce tiempo de lanzamiento',
                    dano: 70,
                    status: true,
                    velocidad: 300,
                    spawningVel: 1700,
                },
                {  
                    id: 3,
                    name: 'molotov',
                    title: 'Molotov III',
                    description: 'Reduce tiempo de lanzamiento',
                    dano: 70,
                    status: true,
                    velocidad: 300,
                    spawningVel: 1500,
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
                    break;
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
        // console.log('Objetos jugador',this.objetosJugador)
        // console.log('Objetos restantes',this.objetos)
        
    }

    guardarObjetosJugador(objetoAIngresar){
        for (let j = 0; j < this.objetosJugador.length; j ++) {
            if (this.objetosJugador[j].length === 0 || this.objetosJugador[j][0].id === objetoAIngresar.id) {
                this.objetosJugador[j].push(objetoAIngresar)
                break
            }
        }
    }

}