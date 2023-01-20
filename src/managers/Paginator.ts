import { Paginator, paginatorOptions } from "dsc-pagination"
import { cancel } from "../utils/contents"

export const paginator = (options: paginatorOptions) => {
    return new Paginator({
        ...options,
        modal: {
            title: "Page",
            fieldName: "numéro de page"
        },
        displayPages: 'footer',
        interactionNotAllowedContent: {
            content: `Vous n'êtes pas autorisé à interagir avec ce message`,
            ephemeral: true
        },
        invalidPageContent: (max) => {
            return {
                content: `Veuillez saisir un numéro de page entre **1** et **${max}**`,
                ephemeral: true
            }
        },
        cancelContent: {
            embeds: [cancel()]
        },
        numeriseLocale: 'fr'
    })
}