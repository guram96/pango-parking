import { createSessionStore } from "./";
import { describe, expect, test } from 'vitest'

describe('createSessionStore', () => {
    test('it saves initial state to session storage and returns the state and setState', () => {
            const initialState = { todos: [], newTitle: "saved" };
            const [state] = createSessionStore(initialState, 'todos');
            expect(state).toStrictEqual(initialState)
    })
    test('it saves updated state to session storage and returns the state and setState', () => {
            const initialState = { todos: [], newTitle: "saved" };
            const [state, setState] = createSessionStore(initialState, 'todos');
            setState({ ...initialState, newTitle: 'updated' })

           // @ts-ignore
           expect(JSON.parse(sessionStorage.getItem('todos')).newTitle).toStrictEqual(state.newTitle)

    })
})


