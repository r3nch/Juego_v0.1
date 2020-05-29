const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 15

class Juego {
    constructor() {
    //Esto es para enlazar el metodo de elegir color con el This de su constructor
    //y no con el this del elemento que se esta tratando (como el boton)
    this.elegirColor = this.elegirColor.bind(this)
    this.sigNivel = this.sigNivel.bind(this)
    this.inicializar = this.inicializar.bind(this)
    this.inicializar()
    this.generarSecuencia()
    setTimeout(this.sigNivel, 500)
  }

    inicializar() {
        btnEmpezar.classList.toggle('hide')
        this.startCountLevel()
        this.nivel = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde: verde
        }
    }
    generarSecuencia(){
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() *4))
    }
    sigNivel(){
        this.subNivel = 0
        this.iluminarSecuencia()
        this.agregarEventoClick()
        this.updateCountLevel()
    }
    updateCountLevel(){
        countLevel.value = `Nivel: ${this.nivel}`
    }
    startCountLevel(){
        countLevel.value = `Nivel: 0`;
    }
    trasansformarNumeroAColor(num){
        switch(num){
            case 0:
                return 'celeste'  
            case 1:
                return 'violeta'
            case 2: 
                return 'naranja'
            case 3:
                return 'verde'
        }
    }
    trasansformarColorANumero(col){
        switch(col){
            case 'celeste':
                return 0  
            case 'violeta':
                return 1
            case 'naranja': 
                return 2
            case 'verde':
                return 3
        }
    }
    iluminarSecuencia(){
        for (let i = 0; i < this.nivel; i++)
        {
            const color = this.trasansformarNumeroAColor(this.secuencia[i])
            setTimeout(() => this.ilumunarColor(color), 600 * i)
        }
    }
    ilumunarColor(color){
        this.colores[color].classList.add('light')
        setTimeout(()=> this.apagarColor(color), 300)
    }
    apagarColor(color){
        this.colores[color].classList.remove('light')
    }
    agregarEventoClick(){
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
    }

    eliminarEventosClick(){
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
    }

    elegirColor(ev){
        const nombreColor = ev.target.dataset.color
        var numeroColor = this.trasansformarColorANumero(nombreColor)
        this.ilumunarColor(nombreColor)
        console.log(numeroColor)
        console.log(this.secuencia[this.subNivel])
        if(numeroColor === this.secuencia[this.subNivel]){
            this.subNivel++
            if (this.subNivel === this.nivel){
                this.nivel++
                this.eliminarEventosClick()
                swal(`Nivel: ${this.nivel}`, `Bien Hecho pasaste al siguiente nivel!`, 'success', {
                    buttons: false,
                    timer: 1500,
                  });
                if (this.nivel === (ULTIMO_NIVEL + 1)){
                    this.ganoElJuego()
                }else{
                    console.log(`paso nivel ${this.nivel}`)
                    setTimeout(this.sigNivel, 2000)
                }
            }
        }else{
          this.perdioElJuego()
        }
    }

    ganoElJuego(){
        swal ('Genial..!!', 'Ganaste el Juego ^_^', 'success')
            .then(this.inicializar)
    }
    perdioElJuego(){
        swal ('Que mal..!!', 'Has perdido >_<', 'error')
            .then(()=>{
                this.eliminarEventosClick()
                this.inicializar()
            })
    }

}

function empezarJuego() {
  var juego = new Juego()
}
