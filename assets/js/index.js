window.onload = () => {
    //part enregistrement du service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(error => {
            console.error("Impossible d'enregistrer l'application")
        })
    }

    //? fonction dupli
    document.querySelector('#dupliForm').addEventListener('submit', (e) => {
        e.preventDefault()  // On annule l'action par defaut de l'envoi du formulaire

        // affichage du loader
        document.querySelector('.loader .container .icon').style.animationPlayState = "running"
        document.querySelector('.loader .container .txt').innerHTML = ""
        loaderController(true)

        // definition et assignation des variables
        const texte = document.querySelector("textarea").value
        const nombre_de_dupli = parseInt(document.querySelector(".nbr").value)
        const retour_a_la_ligne = document.querySelector("#newLine").checked
        let output, line = ''

        // handle de retour a la ligne
        if (retour_a_la_ligne) {
            line = '\n'
        }

        // operation
        output = texte.concat(line)
        output = output.repeat(nombre_de_dupli)
        document.querySelector("textarea").value = output

        // on cache le loader apres 5 secondes
        setTimeout(() => {
            document.querySelector('.loader .container .icon').style.animationPlayState = "paused"
            document.querySelector('.loader .container .txt').innerHTML = "Termin&eacute; !"

            setTimeout(() => {
                let box = document.createElement('span')
                box.style.display = "flex"
                box.style.flexDirection = 'column'
                box.style.justifyContent = 'space-between'
                box.style.marginTop = '15px'
                box.className = 'box'

                let share_link = document.createElement('a')
                share_link.addEventListener('click', (e) => {
                    e.preventDefault()
                    partager(output)
                })
                share_link.style.color = 'blue'
                share_link.style.display = 'block'
                share_link.style.fontWeight = 600
                share_link.style.textDecoration = "none"
                share_link.href = '#share'
                share_link.innerHTML = "Partager"

                let copy_link = document.createElement('a')
                copy_link.innerHTML = "Copier dans le presse-papier"
                copy_link.href = "#copy"
                copy_link.style.fontWeight = 600
                copy_link.style.marginBottom = '10px'
                copy_link.style.textDecoration = "none"
                copy_link.addEventListener('click', (e) => {
                    e.preventDefault()
                    document.querySelector("textarea").select()
                    document.execCommand('copy')
                    document.querySelector('.loader .container .txt').innerHTML = "Copi&eacute; dans le presse-papier !"
                    setTimeout(() => {
                        loaderController(false)
                    }, 1500);
                })

                let donone = document.createElement('a')
                donone.innerHTML = "Ne rien faire"
                donone.href = "#donone"
                donone.style.color = "#474747"
                donone.style.fontWeight = 600
                donone.style.marginTop = '10px'
                donone.style.textDecoration = "none"
                donone.addEventListener('click', e => {
                    e.preventDefault()
                    loaderController(false)
                })

                box.append(copy_link)
                box.append(share_link)
                box.append(donone)
                document.querySelector('.loader .container .txt').append(box)
            }, 1000);
        }, 2000);
    })
}

function loaderController(state) {
    if (state) {
        document.querySelector('.loader').className = 'loader active'
    } else {
        document.querySelector('.loader').className = 'loader'
    }
}

function partager (toShare) {
    document.querySelector('.loader .container .txt').innerHTML = "Partage..."
    if (navigator.share) {
        navigator.share({
            title: "ok dupli test",
            text: toShare,
            url: '/ok'
        }).then(() => {
            setTimeout(() => loaderController(false), 1700);
        }).catch(err => {
            document.querySelector('.loader .container .txt').innerHTML = "Une erreur est survenue lors du partage, le r&eacute;sultat a &eacute;t&eacute; copi&eacute; dans votre presse-papier"
            setTimeout(() => loaderController(false), 3000);
        })
    }
}