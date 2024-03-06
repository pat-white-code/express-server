import mtg from 'mtgsdk'
import {appendFile} from 'node:fs/promises'

mtg.card.where({ set: 'NEO' }).then(results => {
    const rows = results.map(card => `('${card.id}', ${card.multiverseid}, "${card.name}", '${card.rarity}', '${card.imageUrl}'), \n`)
    console.log(rows)
    for(const row of rows)  {
        try {
            appendFile('./values.txt', row);
        } catch (err) {
            console.log(err)
        }
    }
})