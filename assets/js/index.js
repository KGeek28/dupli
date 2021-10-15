document.addEventListener('alpine:init', () => {
    Alpine.data('main', () => ({
        texte: '',
        line: false,
        nbr: 0,

        setTexte() {
            this.texte = document.querySelector('#texte').value
        },

        setLine() {
            this.line = !this.line
        },

        setNbr() {
            this.nbr = parseInt(document.querySelector('#nbr').value)
        },

        dupli() {
            if (this.texte.length > 0 && this.nbr > 1 && typeof(this.nbr) != 'string' && this.nbr != NaN && this.nbr < 501) {
                let backline = '', i = 0, output = '', timer, number = this.nbr, txt = this.texte

                if(this.line) {
                    backline = '\n'
                } else {
                    backline = ' '
                }

                document.querySelector('.loading').style.display = "flex"
                document.querySelector('.loading .container').innerHTML = "0 / " + this.nbr

                timer = setInterval(() => {

                    output += txt + backline
                    document.querySelector('.loading .container').innerHTML = i + " / " + number
                    
                    if (i == number - 1) {
                        clearInterval(timer)
                        document.querySelector('.loading .container').innerHTML = "Termin&eacute;"
                        this.reset()
                        document.querySelector('#texte').value = output
                        document.querySelector('#texte').select()
                        document.execCommand('copy')
                        document.querySelector('.alert .display').innerHTML = "Copié dans le presse-papier !"
                        document.querySelector('.alert').className = 'alert active green'

                        setTimeout(() => {
                            document.querySelector('.loading').style.display = "none"
                        }, 200);
                    }

                    i++

                }, 200);

            } else {
                document.querySelector('.alert').className = 'alert active'
                document.querySelector('.alert .display').innerHTML = "Une erreur s'est produite <br/><br/> Veillez &agrave; ce que le nombre de duplications soit sup&eacute;rieur &agrave; 1, inf&eacute;rieur &agrave; 501 et que le texte &agrave; dupliquer comporte au moins 1 caract&egrave;re."
                setTimeout(() => {
                    if(document.querySelector('.alert').className = 'alert active') {
                        document.querySelector('.alert').className = 'alert'
                    }
                }, 5000);
            }
        },

        reset() {
            this.texte = ''
            this.nbr = 0
            document.querySelector('#texte').value = ''
            document.querySelector('#nbr').value = 0
        }
    }))
})

window.onload = () => {
    if(!window.Worker) {
        alert('Vous ne pouvez pas utilisé cet outils correctement sur ce navigateur \n Nous vous conseillons de mettre à jour votre navigateur ou utiliser un navigateur plus récent.')
    }
}

function closeAlert() {
    document.querySelector('.alert').className = 'alert'
}