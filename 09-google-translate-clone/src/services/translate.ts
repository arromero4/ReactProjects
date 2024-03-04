import OpenAI from 'openai';
const apiKey = import.meta.env.VITE_OPENAI_API_KEY

const openai = new OpenAI({
  apiKey: apiKey, // This is also the default, can be omitted,
  dangerouslyAllowBrowser: true,
});


import { type FromLanguage, type Language } from "../types.d"
import { SUPPORTED_LANGUAGES } from "../constants"

// NO PUBLIQUES ESTO O SE COLARÁ TU API KEY EN EL CLIENTE
// ESTO LO HACEMOS PORQUE NOS ESTAMOS ENFOCANDO EN ESTE CURSO
// EN REACT y TYPESCRIPT
// DEBES CREAR UNA API PARA ESTO

export async function translate({ 
  fromLanguage, 
  toLanguage, 
  text} : {
    fromLanguage: FromLanguage,
    toLanguage: Language,
    text: string,
  }) {
    if(fromLanguage === toLanguage) return text
    const messages = [
      {
        role: "system",
        content: 'You are a AI that translates text. You receive a text from the user. Do not answer, just translate the text. The original language is surrounded by `{{` and `}}`. You can also recive {{auto}} which means that you have to detect the language. You can translate to any language. The language you translate to is surrounded by `[[` and `]]`.'
      },
      {
        role: "user",
        content: 'Hola mundo {{Spanish}} [[English]]' 
      },
      {
        role: "assistant",
        content: 'Hello World' 
      },
      {
        role: "user",
        content: 'How are you? {{auto}} [[Deutsch]]'  
      },
      {
        role: "assistant",
        content: 'Wie gent es dir?' 
      },
      {
        role: "user",
        content: 'Bon dia, com estas? {{auto}} [[Spanish]]'  
      },
      {
        role: "assistant",
        content: 'Buenos dias, ¿cómo estas?' 
      },
    ]
    const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
    const toCode = SUPPORTED_LANGUAGES[toLanguage]


    const completion = await openai.chat.completions.create(

      {
      model: 'gpt-3.5-turbo',
      messages: [
        { 
          role: "user",
          content: `${text} {{${fromCode}}} [[${toCode}]]`
        }
      ]
    })

    
    return completion.choices[0]?.message?.content
  }