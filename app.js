const { select, input, checkbox } = require('@inquirer/prompts')

let meta = { value: "Beba água", checked: false }

let metas = [ meta ]

const adicionarMeta = async () => {

    const meta = await input({ message: "Digite a meta:" })

    if ( meta.length == 0 ) {

        console.log("A Meta deve ter pelo menos 1 caracter..")
        return

    }

    metas.push(
        { value: meta, checked: false }
    )

}

const listarMetas = async () => {

    const respostas = await checkbox({
        message: "Use as SETAS para selecionar as metas e o ESPAÇO para marcar",
        choices: [...metas],
        instructions: false
    })

    metas.forEach((m) => {

        m.checked = false

    })

    if ( respostas.length == 0 ) {

        console.log("Nenhuma meta selecionada")
        return

    }

    respostas.forEach((resposta) => {

        const meta = metas.find(( m ) => {

            return m.value == resposta

        })

        meta.checked = true

    })

    console.log("Meta(s) concluída(s):")

}

const metasRealizadas = async () => {

    const realizadas = metas.filter((meta) => {

        return meta.checked

    })

    if ( realizadas.length == 0 ) {

        console.log("Nenhuma meta realizada")
        return

    }

    await select({
        message: "Metas Realizadas" + " " + "=" + " " +realizadas.length,
        choices: [...realizadas]
    })

}

const metasNaoRealizadas = async () => {

    const naoRealizadas = metas.filter((meta) => {

        return !meta.checked

    })

    if ( naoRealizadas.length == 0 ) {

        console.log("Nenhuma meta não realizada:")
        return

    }

    await select({
        message: "Metas Não Realizadas",
        choices: [...naoRealizadas]
    })

}

const start = async () => {

    while(true) {

        const opcao = await select({

            message: "Menu >",
            choices: [
                {
                    name: "Inserir Meta",
                    value: "adicionar"
                },
                {
                    name: "Listar Metas",
                    value: "listar"
                },
                {
                    name: "Metas Realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas Não Realizadas",
                    value: "naoRealizadas"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch(opcao) {
            case "adicionar":
                await adicionarMeta()
                console.log(metas)
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "naoRealizadas":
                await metasNaoRealizadas()
                break
            case "sair":
                console.log("Saindo...")
                return
        }

    }

}

start()